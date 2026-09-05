import React from 'react';
import Section from './Section';
import { PROTOTYPES } from '../constants';

const PrototypesSection: React.FC = () => {
  return (
    <Section id="built-with-agents" label="Built with Agents">
      <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl mb-10 -mt-4">
        Working prototypes built end-to-end with AI agents doing the heavy lifting - from spec to deployed code. Learning exercises, shipped anyway.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROTOTYPES.map((proto) => (
          <div key={proto.name} className="glass p-8 rounded-[2rem] flex flex-col transition-all duration-300 hover:border-neutral-600 hover:bg-white/[0.05]">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-4">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/80">{proto.status}</span>
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">{proto.tagline}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{proto.name}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">{proto.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {proto.stack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={proto.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-emerald-200 transition-colors underline underline-offset-8">
                {proto.repoUrl && proto.url === proto.repoUrl ? 'View on GitHub →' : 'Open the live app →'}
              </a>
              {proto.repoUrl && proto.url !== proto.repoUrl && (
                <a href={proto.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-500 hover:text-white transition-colors underline underline-offset-8">
                  Source →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default PrototypesSection;
