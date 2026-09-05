import React from 'react';
import Section from './Section';
import { ESSAYS, SUBSTACK_URL } from '../constants';

const SubstackSection: React.FC = () => {
  return (
    <Section id="writing" label="Writing on Substack">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {ESSAYS.map((essay) => (
          <a
            key={essay.url}
            href={essay.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-8 rounded-[2rem] block group transition-all duration-300 hover:border-neutral-600 hover:bg-white/[0.05]"
          >
            <div className="mono text-[10px] uppercase tracking-[0.25em] text-orange-300/80 mb-4">{essay.readTime}</div>
            <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-orange-200 transition-colors">
              {essay.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">{essay.subtitle}</p>
            <span className="text-sm font-medium text-neutral-500 group-hover:text-white transition-colors underline underline-offset-8">
              Read on Substack →
            </span>
          </a>
        ))}
      </div>
      <div className="glass rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">Get the next essay in your inbox.</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Agentic AI and the enterprise, written by someone who builds and sells these systems for a living. No noise, unsubscribe anytime.
          </p>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <iframe
            src="https://ankitsamriwal.substack.com/embed"
            width="480"
            height="150"
            style={{ maxWidth: '100%', border: 'none', background: 'transparent' }}
            frameBorder="0"
            scrolling="no"
            title="Subscribe to Ankit Samriwal on Substack"
          ></iframe>
        </div>
      </div>
      <div className="mt-6 text-center">
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-500 hover:text-white transition-colors underline underline-offset-8">
          Browse all essays on Substack →
        </a>
      </div>
    </Section>
  );
};

export default SubstackSection;
