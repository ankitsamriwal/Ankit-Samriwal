import React, { useEffect, useMemo, useState } from 'react';
import { Article, articles as baseArticles } from '../data/chronicles';
import { articles21To25 } from '../data/chronicles-21-25';
import { articles26To30 } from '../data/chronicles-26-30';
import { articles31To35 } from '../data/chronicles-31-35';

const articles = [...baseArticles, ...articles21To25, ...articles26To30, ...articles31To35];

const heroImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1552664688-cf412ec27db2?auto=format&fit=crop&q=85&w=1400',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=85&w=1400'
];

const AiChronicles: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Article | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((article) => article.category)))], []);
  const filtered = articles.filter((article) => {
    const text = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(' ')}`.toLowerCase();
    return (category === 'All' || article.category === category) && text.includes(query.toLowerCase());
  });

  return (
    <section id="chronicles" className="py-12 md:py-20">
      <div className="mb-10">
        <div className="mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-5">AI Chronicles</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">The evolution of AI, agents and the human edge.</h2>
            <p className="text-lg text-neutral-400 leading-8 max-w-2xl">A weekly retrospective on how AI moved from chatbots to agentic systems, written from the lens of enterprise delivery and real work.</p>
          </div>
          <div className="glass rounded-[2rem] p-6 border border-white/10 grid grid-cols-3 gap-4 text-center">
            <div><div className="text-3xl font-extrabold">104</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Target weeks</div></div>
            <div><div className="text-3xl font-extrabold">{articles.length}</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Live now</div></div>
            <div><div className="text-3xl font-extrabold">2024</div><div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Start</div></div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <input aria-label="Search AI Chronicles" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search AI agents, governance, delivery..." className="w-full lg:max-w-md px-5 py-4 rounded-full bg-white/[0.04] border border-white/10 outline-none focus:border-blue-400/50 text-sm text-white placeholder:text-neutral-600" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-wrap lg:justify-end">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap px-4 py-2 rounded-full mono text-[11px] uppercase tracking-[0.16em] border transition-all ${category === item ? 'bg-white text-black border-white' : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white'}`}>{item}</button>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((article, index) => (
          <button key={`${article.week}-${article.title}`} onClick={() => setSelected(article)} className="group text-left glass rounded-[2rem] overflow-hidden border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.05] transition-all duration-500">
            <div className="h-52 overflow-hidden bg-neutral-900"><img src={heroImages[index % heroImages.length]} alt="" loading="lazy" className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" /></div>
            <div className="p-6 md:p-8">
              <div className="mono text-[11px] uppercase tracking-[0.22em] text-blue-300 mb-4">{article.week} · {article.date} · {article.category}</div>
              <h3 className="text-2xl font-extrabold tracking-tight leading-tight mb-4 group-hover:text-blue-100 transition-colors">{article.title}</h3>
              <p className="text-neutral-400 leading-7 mb-6">{article.excerpt}</p>
              <div className="flex items-center justify-between gap-4"><span className="mono text-xs text-neutral-500">{article.readTime}</span><span className="text-sm font-semibold text-white">Read article →</span></div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 glass rounded-[2rem] p-6 md:p-8 border border-white/10">
        <div className="mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-5">Publishing roadmap</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-neutral-300 leading-7">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">2024: foundations, copilots and context</div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">2025: agents, tools and enterprise governance</div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">2026: digital workers and human leadership</div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xl overflow-y-auto" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className="min-h-screen px-4 py-8 md:py-14">
            <article onClick={(event) => event.stopPropagation()} className="max-w-4xl mx-auto rounded-[2rem] glass overflow-hidden border border-white/10 shadow-2xl bg-black/80">
              <div className="p-6 md:p-10 lg:p-12">
                <button onClick={() => setSelected(null)} className="float-right w-10 h-10 rounded-full bg-white text-black font-bold">×</button>
                <div className="mono text-xs uppercase tracking-[0.25em] text-blue-300 mb-4">{selected.week} · {selected.date} · {selected.readTime}</div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">{selected.title}</h2>
                <div className="flex flex-wrap gap-2 mb-8">{selected.tags.map((tag) => <span key={tag} className="mono text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">{tag}</span>)}</div>
                <div className="space-y-6 text-neutral-300 text-lg leading-8">{selected.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                <div className="my-10 p-6 rounded-3xl bg-white/[0.04] border border-white/10"><h3 className="text-xl font-bold mb-4">Key takeaways</h3><ul className="space-y-3 text-neutral-300">{selected.takeaways.map((item) => <li key={item} className="flex gap-3"><span className="text-blue-400">→</span><span>{item}</span></li>)}</ul></div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20"><div className="mono text-xs uppercase tracking-[0.25em] text-blue-300 mb-3">Coffee with Ankit ☕</div><p className="text-xl md:text-2xl font-medium leading-snug text-white">{selected.note}</p></div>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};

export default AiChronicles;
