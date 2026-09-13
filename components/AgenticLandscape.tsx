import React from 'react';

const layers = [
  {
    n: '01', title: 'Intelligence', accent: 'text-violet-300', line: 'Models are rented. Interfaces try to become infrastructure.',
    players: [
      ['OpenAI', 'Model + agent runtime'], ['Anthropic', 'Claude + MCP + managed agents'], ['Google DeepMind', 'Gemini + the Google surface area'],
    ]
  },
  {
    n: '02', title: 'Control plane', accent: 'text-blue-300', line: 'Identity, permissions and installed distribution are the product.',
    players: [
      ['Microsoft Copilot Studio', 'Best inside Microsoft estates'], ['Salesforce Agentforce', 'Best where CRM owns the workflow'], ['Google Gemini Enterprise', 'Search, agents and Workspace context'],
    ]
  },
  {
    n: '03', title: 'Orchestration', accent: 'text-emerald-300', line: 'Builders trade convenience for control, portability and operating work.',
    players: [
      ['LangGraph', 'Durable state and human checkpoints'], ['CrewAI', 'Fast crews-and-flows composition'], ['MCP / AAIF', 'The connector standard taking shape'],
    ]
  },
  {
    n: '04', title: 'Finished work', accent: 'text-orange-300', line: 'Vertical agents win by owning exceptions, evidence and the last mile.',
    players: [
      ['Legal & compliance', 'Citation and review paths'], ['Revenue & service', 'Actions inside systems of record'], ['Operations', 'Close loops, escalate exceptions'],
    ]
  }
];

const AgenticLandscape: React.FC = () => (
  <section id="agentic-landscape" className="mb-20">
    <div className="flex items-center gap-4 mb-10">
      <span className="mono text-xs text-orange-300/90">03</span>
      <span className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-500">Agentic AI Landscape</span>
      <div className="h-[1px] flex-1 bg-neutral-800" />
    </div>
    <div className="glass rounded-[2rem] overflow-hidden">
      <div className="p-8 md:p-12 border-b border-white/10">
        <div className="mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-4">Updated 13 September 2026</div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">Four markets.<br/><span className="text-orange-300">One overloaded word.</span></h2>
        <p className="text-neutral-400 leading-relaxed max-w-2xl">The model vendors, enterprise platforms, open frameworks and vertical agents are selling different parts of the same stack. The buying question is which layer should own the work.</p>
      </div>
      <div className="grid md:grid-cols-2">
        {layers.map((layer, i) => (
          <article key={layer.n} className={`p-7 md:p-9 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < 2 ? 'border-b' : ''} border-white/10`}>
            <div className="flex items-center justify-between mb-5">
              <span className={`mono text-xs ${layer.accent}`}>{layer.n}</span>
              <span className="mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">Layer</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{layer.title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">{layer.line}</p>
            <div className="space-y-3">
              {layer.players.map(([name, verdict]) => (
                <div key={name} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="text-sm font-bold mb-1">{name}</div>
                  <div className="text-xs text-neutral-500 leading-relaxed">{verdict}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="p-8 md:p-10 bg-white/[0.02] border-t border-white/10">
        <div className="mono text-[10px] uppercase tracking-[0.25em] text-orange-300/80 mb-3">Working conclusion</div>
        <p className="text-xl md:text-2xl font-bold leading-snug mb-5">Intelligence will be rented. Orchestration will be mixed. Trusted workflow and distribution will be owned.</p>
        <a href="#" aria-label="Substack article link coming after publication" className="pointer-events-none text-sm text-neutral-600 underline underline-offset-8">Full analysis on Substack - publishing link pending</a>
      </div>
    </div>
  </section>
);
export default AgenticLandscape;
