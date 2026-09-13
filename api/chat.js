import corpus from './corpus.json' with { type: 'json' };
const buckets = new Map();
const stop = new Set('what has have does did about with from that this your ankit writing wrote into where when which could would should their there'.split(' '));
function relevant(q){const terms=(q.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(x=>x.length>2&&!stop.has(x));return corpus.map(d=>({...d,score:terms.reduce((n,t)=>n+(d.title+' '+d.text).toLowerCase().split(t).length-1,0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4)}
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const ip=(req.headers['x-forwarded-for']||'unknown').split(',')[0], now=Date.now(), b=buckets.get(ip)||[]; const recent=b.filter(t=>now-t<60000); if(recent.length>=8) return res.status(429).json({answer:'The content chat is busy. Try again in a minute.'}); recent.push(now); buckets.set(ip,recent);
  const q=String(req.body?.question||'').trim().slice(0,500); if(!q) return res.status(400).json({answer:'Ask a question about the published writing.'});
  const docs=relevant(q); if(!docs.length) return res.status(200).json({answer:"I could not find that in Ankit's published writing. Try asking about agents, enterprise AI, governance, work, or a specific essay.",sources:[]});
  const sources=docs.slice(0,3).map(({title,url})=>({title,url}));
  if(!process.env.GEMINI_API_KEY) return res.status(200).json({answer:`The closest match in Ankit's writing is “${docs[0].title}”. ${docs[0].text.slice(0,420).replace(/\s+/g,' ')}…`,sources,engine:'search'});
  try { const prompt=`Answer only from SOURCES. Write 2-4 plain, direct paragraphs in third person ("Ankit argues"). If the sources do not answer, say that. Never invent his view.\nQUESTION: ${q}\nSOURCES:\n${docs.map((d,i)=>`[${i+1}] ${d.title}\n${d.text}`).join('\n\n')}`;
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:.2,maxOutputTokens:650}})});
    if(!r.ok) throw new Error('quota'); const d=await r.json(); const answer=d.candidates?.[0]?.content?.parts?.[0]?.text; if(!answer) throw new Error('empty'); return res.status(200).json({answer,sources,engine:'gemini'});
  } catch { return res.status(200).json({answer:`The smart answer service is busy. The closest source is “${docs[0].title}”. Open it below for Ankit's full argument.`,sources,engine:'fallback'}); }
}
