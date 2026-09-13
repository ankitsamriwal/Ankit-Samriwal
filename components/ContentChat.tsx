import React, { useState } from 'react';

type Msg = { role: 'user' | 'assistant'; text: string; sources?: {title:string;url:string}[] };

const ContentChat: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>([{role:'assistant', text:"Ask me about Ankit's writing on agents, enterprise AI, governance, or the weekly build log. I answer from his published work only."}]);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const ask = async (e: React.FormEvent) => {
    e.preventDefault(); const q=question.trim(); if(!q || busy) return;
    setQuestion(''); setBusy(true); setMessages(m=>[...m,{role:'user',text:q}]);
    try {
      const r=await fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q})});
      const d=await r.json();
      setMessages(m=>[...m,{role:'assistant',text:d.answer || "The content chat is busy. Try again shortly.",sources:d.sources}]);
    } catch { setMessages(m=>[...m,{role:'assistant',text:"The content chat is busy. Try again shortly."}]); }
    finally { setBusy(false); }
  };
  return <section id="ask-ankit" className="mb-20">
    <div className="flex items-center gap-4 mb-10"><span className="mono text-xs text-orange-300/90">07</span><span className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-500">Ask Ankit's writing</span><div className="h-px flex-1 bg-neutral-800" /></div>
    <div className="glass rounded-[2rem] overflow-hidden border border-white/10">
      <div className="p-7 md:p-10 border-b border-white/10"><h2 className="text-3xl md:text-4xl font-extrabold mb-3">Chat with the body of work.</h2><p className="text-neutral-400 text-sm leading-relaxed">Grounded in the essays, the agentic landscape, and AI Chronicles. If it is not in the writing, the chat says so.</p></div>
      <div className="p-5 md:p-7 h-80 overflow-y-auto space-y-4" aria-live="polite">
        {messages.map((m,i)=><div key={i} className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role==='user'?'ml-auto bg-orange-300 text-black':'bg-white/[0.05] border border-white/10 text-neutral-200'}`}><p>{m.text}</p>{m.sources?.length ? <div className="mt-3 pt-3 border-t border-white/10 text-xs space-y-1">{m.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="block text-orange-200 underline underline-offset-4">{s.title} →</a>)}</div>:null}</div>)}
        {busy && <div className="text-xs text-neutral-500">Checking the writing…</div>}
      </div>
      <form onSubmit={ask} className="p-4 md:p-5 border-t border-white/10 flex gap-2"><input value={question} onChange={e=>setQuestion(e.target.value)} maxLength={500} placeholder="What has Ankit written about agent governance?" aria-label="Question for Ankit's content" className="min-w-0 flex-1 rounded-full bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:border-orange-300/70"/><button disabled={busy||!question.trim()} className="rounded-full bg-orange-300 text-black px-5 py-3 text-sm font-extrabold disabled:opacity-40">Ask</button></form>
      <div className="px-6 pb-5 text-[11px] text-neutral-600">Answers can miss context. Open the cited source for the full argument.</div>
    </div>
  </section>;
};
export default ContentChat;
