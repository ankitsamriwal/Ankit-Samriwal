import React, { useEffect, useState } from 'react';
import TechCarousel from './components/TechCarousel';
import AiChronicles from './components/AiChronicles';
import { SOCIAL_LINKS, ESSAYS, PROTOTYPES, SUBSTACK_URL } from './constants';

const Num: React.FC<{ n: string; label: string }> = ({ n, label }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="mono text-xs text-orange-300/90">{n}</span>
    <span className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-500">{label}</span>
    <div className="h-[1px] flex-1 bg-neutral-800"></div>
  </div>
);

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-orange-300 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-lg font-bold tracking-tight">Ankit.</a>
          <div className="flex gap-5 text-xs font-medium text-neutral-400 overflow-x-auto no-scrollbar max-w-[70vw]">
            <a href="#about" className="hover:text-white transition-colors whitespace-nowrap">About</a>
            <a href="#writing" className="hover:text-white transition-colors whitespace-nowrap">Writing</a>
            <a href="#chronicles" className="hover:text-white transition-colors whitespace-nowrap">Chronicles</a>
            <a href="#built-with-agents" className="hover:text-white transition-colors whitespace-nowrap">Built</a>
            <a href="#socials" className="hover:text-white transition-colors whitespace-nowrap">Socials</a>
            <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top" className="max-w-3xl mx-auto px-6 pt-36 pb-24">

        <section className="text-center mb-28">
          <div className="mono text-xs uppercase tracking-[0.3em] text-orange-300/90 mb-8">Programme Director · Enterprise AI · Agentic Systems</div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8">
            Digital Transformation Leader documenting the <span className="text-orange-300">AI shift.</span>
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto mb-4">
            Hi, I'm <span className="text-white font-medium">Ankit Samriwal</span>. I work at the intersection of enterprise delivery, AI adoption, programme governance, and modern digital products.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto mb-10">
            Agentic AI and the enterprise, written by someone who builds and sells these systems for a living. 21+ years in enterprise software.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#writing" className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-sm font-bold">Read the Essays</a>
            <a href="#built-with-agents" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-medium">See the Builds</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-orange-300/60 transition-all text-xs font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
                {link.platform}
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="mb-20">
          <Num n="01" label="About" />
          <div className="glass rounded-[2rem] p-8 md:p-12">
            <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/9]">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" alt="Code focus" className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="space-y-6 text-neutral-400 leading-relaxed">
              <p>My work sits between strategy and execution: turning ambitious transformation ideas into systems, governance, delivery plans, and outcomes that survive real enterprise pressure.</p>
              <p>I am especially interested in how AI moves from impressive demos into operating models: copilots, agents, knowledge systems, automation, governance, adoption, and human leadership.</p>
            </div>
            <div className="mt-10 -mx-2"><TechCarousel /></div>
          </div>
        </section>

        <section id="writing" className="mb-20">
          <Num n="02" label="Writing on Substack" />
          <div className="glass rounded-[2rem] p-8 md:p-12 mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-4">Essays on the agentic shift.</h2>
            <p className="text-neutral-400 leading-relaxed mb-10">Long-form analysis lives on Substack; the weekly build log lives below in AI Chronicles. Same thesis, two tempos.</p>
            <div className="divide-y divide-neutral-800/80">
              {ESSAYS.map((essay) => (
                <a key={essay.url} href={essay.url} target="_blank" rel="noopener noreferrer" className="block py-8 first:pt-0 last:pb-0 group">
                  <div className="mono text-[10px] uppercase tracking-[0.25em] text-orange-300/80 mb-3">{essay.readTime}</div>
                  <h3 className="text-xl font-bold mb-2 leading-snug group-hover:text-orange-200 transition-colors">{essay.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">{essay.subtitle}</p>
                  <span className="text-sm font-medium text-neutral-500 group-hover:text-white transition-colors underline underline-offset-8">Read on Substack →</span>
                </a>
              ))}
            </div>
          </div>
          <div className="glass rounded-[2rem] p-8 md:p-10 text-center">
            <h3 className="text-2xl font-bold mb-2">Get the next essay in your inbox.</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">Agentic AI and the enterprise, written by someone who builds and sells these systems for a living. No noise, unsubscribe anytime.</p>
            <div className="flex justify-center">
              <iframe src="https://ankitsamriwal.substack.com/embed" width="480" height="150" style={{ maxWidth: '100%', border: 'none', background: 'transparent' }} frameBorder="0" scrolling="no" title="Subscribe"></iframe>
            </div>
            <div className="mt-4">
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-500 hover:text-white transition-colors underline underline-offset-8">Browse all essays on Substack →</a>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="glass rounded-[2rem] p-4 md:p-8">
            <AiChronicles />
          </div>
        </section>

        <section id="built-with-agents" className="mb-20">
          <Num n="04" label="Built with Agents" />
          <div className="glass rounded-[2rem] p-8 md:p-12">
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">Working prototypes built end-to-end with AI agents doing the heavy lifting - from spec to deployed code. Learning exercises, shipped anyway.</p>
            <div className="divide-y divide-neutral-800/80">
              {PROTOTYPES.map((proto) => (
                <div key={proto.name} className="py-10 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                    <span className="mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/80">{proto.status}</span>
                    <span className="mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">{proto.tagline}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{proto.name}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">{proto.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proto.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-300">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={proto.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-orange-200 transition-colors underline underline-offset-8">
                      {proto.repoUrl && proto.url === proto.repoUrl ? 'View on GitHub →' : 'Open the live app →'}
                    </a>
                    {proto.repoUrl && proto.url !== proto.repoUrl && (
                      <a href={proto.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-500 hover:text-white transition-colors underline underline-offset-8">Source →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="socials" className="mb-20">
          <Num n="05" label="Connect" />
          <div className="glass rounded-[2rem] p-4 md:p-6 divide-y divide-neutral-800/80">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-4 py-5 group hover:bg-white/[0.02] rounded-xl transition-all">
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
                <span className="font-medium">{link.platform}</span>
                <span className="ml-auto text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact">
          <Num n="06" label="Get in touch" />
          <div className="glass rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-300 opacity-60"></div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Let's build something great.</h2>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto">I'm open to opportunities, collaborations, or conversations about enterprise AI, digital transformation, and the future of work.</p>
            <a href="mailto:ankitsamriwal@gmail.com" className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all">Send an Email</a>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Ankit Samriwal. Built with React.</p>
          <div className="flex gap-6">
            <a href="#writing" className="hover:text-white transition-colors">Writing</a>
            <a href="https://x.com/ankitsamriwal" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/in/ankitsamriwal" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/ankitsamriwal" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
