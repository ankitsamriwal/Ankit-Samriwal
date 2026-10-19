import React, { useState } from 'react';
import AiChronicles from './components/AiChronicles';
import AgenticLandscape from './components/AgenticLandscape';
import ContentChat from './components/ContentChat';
import Diagnostic, { DiagnosticResult } from './components/Diagnostic';
import Briefing from './components/Briefing';
import { SOCIAL_LINKS, ESSAYS, SUBSTACK_URL } from './constants';
import { OFFERS, CASE_FILES, PROOF, CERTS, LAB } from './advisory';
import { Chip, CertBadge, LineIcon, BrandIcon, PLATFORMS } from './components/Logos';

const Label: React.FC<{ n: string; children: React.ReactNode; dark?: boolean }> = ({ n, children, dark }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className={`mono text-xs ${dark ? 'text-brass' : 'text-oxblood'}`}>{n}</span>
    <span className={`mono text-[11px] uppercase tracking-[0.25em] ${dark ? 'text-neutral-400' : 'text-stone'}`}>{children}</span>
    <div className={`h-px flex-1 ${dark ? 'bg-white/10' : 'bg-rule'}`} />
  </div>
);

const NAV = [
  { href: '#offers', label: 'Engagements' },
  { href: '#cases', label: 'Case files' },
  { href: '#diagnostic', label: 'Diagnostic' },
  { href: '#writing', label: 'Writing' },
  { href: '#archive', label: 'Archive' },
];

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);

  const discuss = (r: DiagnosticResult) => {
    setDiagnostic(r);
    document.getElementById('briefing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory text-ink selection:bg-ink selection:text-ivory">
      <nav className="fixed top-0 left-0 w-full z-50 bg-ivory/90 backdrop-blur border-b border-rule">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-xl">Ankit Samriwal</a>
          <div className="hidden md:flex items-center gap-7 text-sm text-stone">
            {NAV.map((l) => <a key={l.href} href={l.href} className="hover:text-ink transition-colors">{l.label}</a>)}
            <a href="#briefing" className="px-4 py-2 bg-ink text-ivory hover:bg-oxblood transition-colors font-semibold">Book a briefing</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} className="md:hidden text-sm mono uppercase tracking-[0.2em]">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-rule bg-ivory px-4 py-2 flex flex-col">
            {[...NAV, { href: '#briefing', label: 'Book a briefing' }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-3 border-b border-rule last:border-0">{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <main id="top">
        {/* 1. Hero */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 pt-36 md:pt-44 pb-20">
          <div className="mono text-[11px] uppercase tracking-[0.3em] text-oxblood mb-8">Agentic AI advisory · Regulated & sovereign environments</div>
          <h1 className="font-display text-[2.6rem] leading-[1.05] md:text-7xl md:leading-[1.02] max-w-4xl mb-8">
            Agentic AI for institutions that can't afford to get it wrong.
          </h1>
          <p className="text-lg md:text-xl text-stone leading-relaxed max-w-2xl mb-10">
            I design and deliver AI and enterprise platforms inside government, banking, defence and other regulated estates, where data can't leave the building and every agent action needs an owner. 21 years of doing this work, not watching it.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#briefing" className="px-7 py-4 bg-ink text-ivory font-semibold hover:bg-oxblood transition-colors">Book a briefing</a>
            <a href="#diagnostic" className="px-7 py-4 border border-ink hover:bg-ink hover:text-ivory transition-colors">Take the 3-minute diagnostic</a>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-3 max-w-3xl">
            {CERTS.slice(0, 3).map((c) => <CertBadge key={c.name} c={c} />)}
          </div>
        </section>

        {/* 2. Proof strip */}
        <section className="border-y border-rule">
          <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4">
            {PROOF.map((p, i) => (
              <div key={p.label} className={`py-8 md:py-10 ${i % 2 === 1 ? 'pl-6 border-l border-rule' : ''} ${i >= 2 ? 'border-t md:border-t-0 border-rule' : ''} ${i === 2 ? 'md:pl-6 md:border-l' : ''}`}>
                <div className="font-display text-3xl md:text-4xl mb-1">{p.figure}</div>
                <div className="text-sm text-stone">{p.label}</div>
              </div>
            ))}
          </div>
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 border-t border-rule text-xs text-stone mono uppercase tracking-[0.15em] leading-relaxed">
            Government · Financial services · Insurance · Healthcare · Transport & logistics · Media
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-6 pt-16">
          <div className="mono text-[11px] uppercase tracking-[0.25em] text-stone mb-5">Platforms I design and deliver on</div>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((t) => <Chip key={t.label} t={t} />)}
          </div>
        </section>

        {/* 3. Engagements */}
        <section id="offers" className="max-w-5xl mx-auto px-4 md:px-6 py-24">
          <Label n="01">Engagements</Label>
          <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-3xl mb-14">Three ways to work together. Each one has a fixed scope and a named outcome.</h2>
          <div className="grid md:grid-cols-3 gap-px bg-rule border border-rule">
            {OFFERS.map((o) => (
              <article key={o.name} className="bg-ivory p-7 md:p-8 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-oxblood text-2xl">{o.code}</span>
                  <LineIcon name={o.icon} className="w-7 h-7 text-ink" />
                </div>
                <h3 className="font-display text-2xl leading-snug mb-2">{o.name}</h3>
                <div className="mono text-[11px] uppercase tracking-[0.18em] text-stone mb-6">{o.format}</div>
                <p className="text-sm text-stone mb-4"><span className="text-ink font-semibold">For: </span>{o.forWho}</p>
                <p className="text-sm leading-relaxed mb-6"><span className="font-semibold">You leave with: </span>{o.outcome}</p>
                <ul className="text-sm text-stone space-y-2 mb-8 flex-1">
                  {o.includes.map((x) => <li key={x} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rule">{x}</li>)}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-6">{o.stack.map((t) => <Chip key={t.label} t={t} />)}</div>
                <div className="pt-5 border-t border-rule">
                  <div className="text-sm font-semibold mb-3">{o.fromPrice || 'Fixed fee, scoped after a briefing'}</div>
                  <a href="#briefing" className="text-sm underline underline-offset-4 hover:text-oxblood">Enquire →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Case files */}
        <section id="cases" className="bg-paper border-y border-rule">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-24">
            <Label n="02">Case files</Label>
            <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-3xl mb-4">Selected work.</h2>
            <p className="text-stone max-w-2xl mb-14">Clients are anonymised. Detailed references are shared under NDA once we've spoken.</p>
            <div className="space-y-px bg-rule border border-rule">
              {CASE_FILES.map((c) => (
                <article key={c.no} className="bg-ivory p-7 md:p-10 grid md:grid-cols-[180px_1fr] gap-6 md:gap-10">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-10 h-10 grid place-items-center border border-rule bg-paper"><LineIcon name={c.icon} className="w-5 h-5" /></span>
                      <span className="mono text-xs text-oxblood">File {c.no}</span>
                    </div>
                    <div className="font-display text-xl mb-1">{c.sector}</div>
                    <div className="text-sm text-stone mb-3">{c.client}</div>
                    <span className="inline-block mono text-[10px] uppercase tracking-[0.18em] border border-rule px-2 py-1">{c.stage}</span>
                  </div>
                  <dl className="grid sm:grid-cols-3 gap-6 text-sm leading-relaxed">
                    <div><dt className="mono text-[11px] uppercase tracking-[0.18em] text-stone mb-2">Problem</dt><dd>{c.problem}</dd></div>
                    <div><dt className="mono text-[11px] uppercase tracking-[0.18em] text-stone mb-2">Approach</dt><dd>{c.approach}</dd></div>
                    <div><dt className="mono text-[11px] uppercase tracking-[0.18em] text-stone mb-2">Result</dt><dd>{c.result}</dd></div>
                    <div className="sm:col-span-3 flex flex-wrap gap-1.5 pt-2">{c.stack.map((t) => <Chip key={t.label} t={t} />)}</div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Diagnostic */}
        <section id="diagnostic" className="max-w-3xl mx-auto px-4 md:px-6 py-24">
          <Label n="03">Readiness diagnostic</Label>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-4">Where does your organisation actually stand?</h2>
          <p className="text-stone mb-12">Six questions, about three minutes. You get a score, a plain-English readout and a suggested starting point.</p>
          <Diagnostic onDiscuss={discuss} />
        </section>

        {/* 6. Writing */}
        <section id="writing" className="border-t border-rule">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-24">
            <Label n="04">Writing</Label>
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-12">
              <div>
                <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">Thinking in public.</h2>
                <p className="text-stone leading-relaxed mb-6">Essays on the agentic shift, and a weekly build log that has run for more than 80 issues. It's the best way to see how I think before we talk.</p>
                <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-oxblood"><BrandIcon id="substack" />All essays on Substack →</a>
              </div>
              <div className="divide-y divide-rule border-y border-rule">
                {ESSAYS.map((e) => (
                  <a key={e.url} href={e.url} target="_blank" rel="noopener noreferrer" className="block py-7 group">
                    <div className="mono text-[11px] uppercase tracking-[0.18em] text-stone mb-2">{e.readTime}</div>
                    <h3 className="font-display text-2xl leading-snug mb-2 group-hover:text-oxblood transition-colors">{e.title}</h3>
                    <p className="text-sm text-stone leading-relaxed">{e.subtitle}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Archive band (existing interactive sections) */}
        <section id="archive" className="bg-ink text-neutral-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6 pt-24 pb-8">
            <Label n="05" dark>The archive</Label>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-4">The working notebook.</h2>
            <p className="text-neutral-400 mb-6">The weekly Chronicles, a map of the agentic market, and a chat grounded only in what I've published.</p>
          </div>
          <div className="max-w-3xl mx-auto px-4 md:px-6 pb-12">
            <AiChronicles />
            <AgenticLandscape />
            <ContentChat />
            <div className="border-t border-white/10 pt-10">
              <div className="mono text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-6">From the lab</div>
              <div className="grid sm:grid-cols-2 gap-6">
                {LAB.map((l) => (
                  <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="block border border-white/10 p-6 hover:border-brass transition-colors">
                    <h3 className="font-display text-2xl mb-2">{l.name}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">{l.line}</p>
                    <div className="flex flex-wrap gap-1.5">{l.stack.map((t) => <Chip key={t.label} t={t} dark />)}</div>
                  </a>
                ))}
              </div>
              <a href="https://github.com/ankitsamriwal" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm text-neutral-400 underline underline-offset-4 hover:text-white">More experiments on GitHub →</a>
            </div>
          </div>
        </section>

        {/* 8. Briefing */}
        <section id="briefing" className="max-w-5xl mx-auto px-4 md:px-6 py-24">
          <Label n="06">Book a briefing</Label>
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">A 30-minute briefing, no pitch.</h2>
              <p className="text-stone leading-relaxed mb-8">Tell me what you're trying to solve. If I'm not the right person, I'll say so and point you to someone who is.</p>
              <div className="grid gap-2">
                {CERTS.map((c) => <CertBadge key={c.name} c={c} />)}
              </div>
            </div>
            <Briefing diagnostic={diagnostic} />
          </div>
        </section>
      </main>

      <footer className="border-t border-rule">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row gap-6 md:items-center justify-between text-sm text-stone">
          <p>© {new Date().getFullYear()} Ankit Samriwal · Dubai</p>
          <div className="flex flex-wrap gap-5">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="inline-flex items-center gap-2 hover:text-ink">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={s.icon} /></svg>
                <span className="hidden sm:inline">{s.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
