import corpus from './corpus.json' with { type: 'json' };
const buckets = new Map();
// Rate limiting. With UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN set, limits are shared across
// all serverless instances; without them it falls back to per-instance memory (best effort only).
const PER_MIN = 8;
const DAILY_CAP = Number(process.env.CHAT_DAILY_CAP || 400); // site-wide model calls per UTC day
const upstash = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
async function incr(key, ttl){
  const r = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {method:'POST', headers:{authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'content-type':'application/json'}, body:JSON.stringify([['INCR',key],['EXPIRE',key,String(ttl),'NX']])});
  if(!r.ok) throw new Error('ratelimit store');
  const d = await r.json(); return Number(d?.[0]?.result || 0);
}
async function limited(ip){
  if(upstash){
    try { return (await incr(`chat:ip:${ip}:${Math.floor(Date.now()/60000)}`, 70)) > PER_MIN; }
    catch { /* store unavailable: fall through to memory */ }
  }
  const now=Date.now(), recent=(buckets.get(ip)||[]).filter(t=>now-t<60000);
  if(recent.length>=PER_MIN) return true; recent.push(now); buckets.set(ip,recent);
  if(buckets.size>5000) buckets.clear();
  return false;
}
async function overDailyCap(){
  if(!upstash) return false;
  try { return (await incr(`chat:day:${new Date().toISOString().slice(0,10)}`, 90000)) > DAILY_CAP; }
  catch { return true; } // fail closed for paid model calls
}
const stop = new Set('what has have does did about with from that this your ankit writing wrote into where when which could would should their there'.split(' '));
function relevant(q){const terms=(q.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(x=>x.length>2&&!stop.has(x));return corpus.map(d=>({...d,score:terms.reduce((n,t)=>n+(d.title+' '+d.text).toLowerCase().split(t).length-1,0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4)}
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  // Vercel sets x-real-ip / x-vercel-forwarded-for; don't trust the client-controlled first hop of x-forwarded-for.
  const ip=String(req.headers['x-real-ip']||req.headers['x-vercel-forwarded-for']||'unknown').split(',')[0].trim();
  if(await limited(ip)) return res.status(429).json({answer:'The content chat is busy. Try again in a minute.'});
  const q=String(req.body?.question||'').trim().slice(0,500); if(!q) return res.status(400).json({answer:'Ask a question about the published writing.'});
  const docs=relevant(q); if(!docs.length) return res.status(200).json({answer:"I could not find that in Ankit's published writing. Try asking about agents, enterprise AI, governance, work, or a specific essay.",sources:[]});
  const sources=docs.slice(0,3).map(({title,url})=>({title,url}));
  if(!process.env.GEMINI_API_KEY || await overDailyCap()) return res.status(200).json({answer:`The closest match in Ankit's writing is “${docs[0].title}”. ${docs[0].text.slice(0,420).replace(/\s+/g,' ')}…`,sources,engine:'search'});
  try { const prompt=`Answer only from SOURCES. Write 2-4 plain, direct paragraphs in third person ("Ankit argues"). If the sources do not answer, say that. Never invent his view.\nQUESTION: ${q}\nSOURCES:\n${docs.map((d,i)=>`[${i+1}] ${d.title}\n${d.text}`).join('\n\n')}`;
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:.2,maxOutputTokens:650}})});
    if(!r.ok) throw new Error('quota'); const d=await r.json(); const answer=d.candidates?.[0]?.content?.parts?.[0]?.text; if(!answer) throw new Error('empty'); return res.status(200).json({answer,sources,engine:'gemini'});
  } catch { return res.status(200).json({answer:`The smart answer service is busy. The closest source is “${docs[0].title}”. Open it below for Ankit's full argument.`,sources,engine:'fallback'}); }
}
