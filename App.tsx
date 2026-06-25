import React, { useEffect, useState } from 'react';
import Section from './components/Section';
import RepoCard from './components/RepoCard';
import TechCarousel from './components/TechCarousel';
import AiChronicles from './components/AiChronicles';
import { GITHUB_REPOS, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen selection:bg-neutral-100 selection:text-neutral-900 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 glass border-t-0 border-x-0 bg-black/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-lg font-bold tracking-tight">Ankit.</a>
          <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#chronicles" className="hover:text-white transition-colors">AI Chronicles</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#socials" className="hover:text-white transition-colors">Socials</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#chronicles" className="md:hidden text-sm text-neutral-300 hover:text-white transition-colors">Chronicles</a>
        </div>
      </nav>

      <main id="top" className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <section className="mb-24 max-w-4xl">
          <div className="mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-6">Programme Director · Enterprise AI · Agentic Systems</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 gradient-text leading-[1.1]">
            Digital Transformation Leader <br className="hidden md:block" />
            documenting the <span className="text-white">AI shift.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mb-10">
            Hi, I'm <span className="text-white font-medium">Ankit Samriwal</span>. I work at the intersection of enterprise delivery, AI adoption, programme governance, and modern digital products.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#chronicles" className="px-5 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-sm font-bold">
              Read AI Chronicles
            </a>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-full glass hover:bg-white/10 transition-all text-sm font-medium border border-white/5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
                {link.platform}
              </a>
            ))}
          </div>
        </section>

        <Section id="about" label="About">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6 text-neutral-400 leading-relaxed">
              <p>My work sits between strategy and execution: turning ambitious transformation ideas into systems, governance, delivery plans, and outcomes that survive real enterprise pressure.</p>
              <p>I am especially interested in how AI moves from impressive demos into operating models: copilots, agents, knowledge systems, automation, governance, adoption, and human leadership.</p>
            </div>
            <div className="glass rounded-3xl p-2 aspect-square md:aspect-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" alt="Code focus" className="w-full h-full object-cover rounded-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
          </div>
          <TechCarousel />
        </Section>

        <AiChronicles />

        <Section id="projects" label="Featured Repositories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GITHUB_REPOS.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
          </div>
          <div className="mt-8 text-center">
            <a href="https://github.com/ankitsamriwal" className="text-sm font-medium text-neutral-500 hover:text-white transition-colors underline underline-offset-8" target="_blank" rel="noopener noreferrer">View all projects on GitHub →</a>
          </div>
        </Section>

        <Section id="socials" label="Connect">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="https://www.linkedin.com/in/ankitsamriwal" target="_blank" rel="noopener noreferrer" className="glass group p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-blue-500/50 hover:bg-blue-500/[0.02]">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </div>
              <div className="text-center"><h3 className="text-xl font-bold mb-1">LinkedIn</h3><p className="text-neutral-500 text-sm">Professional Network</p></div>
            </a>
            <a href="https://x.com/ankitsamriwal" target="_blank" rel="noopener noreferrer" className="glass group p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.02]">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </div>
              <div className="text-center"><h3 className="text-xl font-bold mb-1">X / Twitter</h3><p className="text-neutral-500 text-sm">Tech & Thoughts</p></div>
            </a>
          </div>
        </Section>

        <Section id="contact" label="Get In Touch">
          <div className="glass p-8 md:p-12 rounded-[2rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
            <h2 className="text-3xl font-bold mb-4">Let's build something great.</h2>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto">I'm open to opportunities, collaborations, or conversations about enterprise AI, digital transformation, and the future of work.</p>
            <a href="mailto:hello@ankitsamriwal.dev" className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95">Send an Email</a>
          </div>
        </Section>

        <footer className="mt-20 pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Ankit Samriwal. Built with React.</p>
          <div className="flex gap-6">
            <a href="#chronicles" className="hover:text-white transition-colors">AI Chronicles</a>
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
