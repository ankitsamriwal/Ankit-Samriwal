import React, { useMemo, useState } from 'react';
import { ChronicleArticle, chronicleArticles } from '../data/chronicles';

const ArticleModal: React.FC<{ article: ChronicleArticle; onClose: () => void }> = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xl overflow-y-auto">
      <div className="min-h-screen px-4 py-8 md:py-14">
        <article className="max-w-4xl mx-auto rounded-[2rem] glass overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img src={article.hero} alt="" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
              aria-label="Close article"
            >
              ×
            </button>
            <div className="absolute left-6 right-6 bottom-6 md:left-10 md:right-10 md:bottom-10">
              <div className="mono text-xs uppercase tracking-[0.25em] text-blue-300 mb-3">
                {article.week} · {article.date} · {article.readTime}
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">{article.title}</h2>
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span key={tag} className="mono text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-neutral-300 text-lg leading-8">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="my-10 p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <h3 className="text-xl font-bold mb-4">Key takeaways</h3>
              <ul className="space-y-3 text-neutral-300">
                {article.takeaways.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-blue-400 mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20">
              <div className="mono text-xs uppercase tracking-[0.25em] text-blue-300 mb-3">Coffee with Ankit ☕</div>
              <p className="text-xl md:text-2xl font-medium leading-snug text-white">{article.coffeeNote}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

const ArticleCard: React.FC<{ article: ChronicleArticle; featured?: boolean; onOpen: () => void }> = ({ article, featured = false, onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className={`group text-left glass rounded-[2rem] overflow-hidden border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.05] transition-all duration-500 ${featured ? 'md:grid md:grid-cols-[1.1fr_0.9fr]' : ''}`}
    >
      <div className={`${featured ? 'h-72 md:h-full' : 'h-52'} overflow-hidden bg-neutral-900`}>
        <img src={article.hero} alt="" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
      </div>
      <div className="p-6 md:p-8">
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-blue-300 mb-4">
          {article.week} · {article.date} · {article.category}
        </div>
        <h3 className={`${featured ? 'text-3xl md:text-4xl' : 'text-2xl'} font-extrabold tracking-tight leading-tight mb-4 group-hover:text-blue-100 transition-colors`}>
          {article.title}
        </h3>
        <p className="text-neutral-400 leading-7 mb-6">{article.excerpt}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="mono text-xs text-neutral-500">{article.readTime}</span>
          <span className="text-sm font-semibold text-white group-hover:translate-x-1 transition-transform">Read article →</span>
        </div>
      </div>
    </button>
  );
};

const AiChronicles: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<ChronicleArticle | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(chronicleArticles.map((article) => article.category)))], []);

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return chronicleArticles.filter((article) => {
      const matchesCategory = category === 'All' || article.category === category;
      const text = `${article.title} ${article.excerpt} ${article.tags.join(' ')} ${article.category}`.toLowerCase();
      return matchesCategory && (!search || text.includes(search));
    });
  }, [category, query]);

  const featuredArticle = chronicleArticles[0];
  const remainingArticles = filteredArticles.filter((article) => article.id !== featuredArticle.id);

  return (
    <section id="chronicles" className="py-16 md:py-24">
      <div className="mb-10 md:mb-14">
        <div className="mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-5">AI Chronicles</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              The evolution of AI, agents and the human edge.
            </h2>
            <p className="text-lg text-neutral-400 leading-8 max-w-2xl">
              A weekly retrospective on how AI moved from chatbots to agentic systems — written from the lens of enterprise delivery, technology leadership, and real work.
            </p>
          </div>
          <div className="glass rounded-[2rem] p-6 border border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-extrabold">104</div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-1">Target weeks</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold">12</div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-1">Live drafts</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold">2024</div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-1">Start point</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ArticleCard article={featuredArticle} featured onOpen={() => setSelectedArticle(featuredArticle)} />

      <div className="mt-10 md:mt-14 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search AI agents, governance, recruitment..."
          className="w-full lg:max-w-md px-5 py-4 rounded-full bg-white/[0.04] border border-white/10 outline-none focus:border-blue-400/50 text-sm text-white placeholder:text-neutral-600"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap px-4 py-2 rounded-full mono text-[11px] uppercase tracking-[0.16em] border transition-all ${category === item ? 'bg-white text-black border-white' : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {remainingArticles.map((article) => (
          <ArticleCard key={article.id} article={article} onOpen={() => setSelectedArticle(article)} />
        ))}
      </div>

      <div className="mt-10 glass rounded-[2rem] p-6 md:p-8 border border-white/10">
        <div className="mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-5">Publishing roadmap</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['2024: foundations, copilots and context', '2025: agents, tools and enterprise governance', '2026: digital workers and human leadership'].map((item) => (
            <div key={item} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 text-neutral-300 leading-7">
              {item}
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </section>
  );
};

export default AiChronicles;
