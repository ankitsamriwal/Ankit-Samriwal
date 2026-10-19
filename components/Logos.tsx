import React from 'react';
import {
  siAnthropic, siUipath, siDatabricks, siSap, siNeo4j, siHuggingface, siGooglegemini, siOllama,
  siLangchain, siKubernetes, siDocker, siGmail, siSubstack, siPostgresql, siTypescript, siPython,
} from 'simple-icons';

// Brand marks are used to identify the platforms this work is delivered on (nominative use).
// Microsoft product marks aren't distributed by Simple Icons, so those chips use the
// Microsoft four-square mark with the product name.

type Icon = { path: string; hex: string; title: string };
const SI: Record<string, Icon> = {
  anthropic: siAnthropic, uipath: siUipath, databricks: siDatabricks, sap: siSap, neo4j: siNeo4j,
  huggingface: siHuggingface, gemini: siGooglegemini, ollama: siOllama, langchain: siLangchain,
  kubernetes: siKubernetes, docker: siDocker, gmail: siGmail, substack: siSubstack,
  postgresql: siPostgresql, typescript: siTypescript, python: siPython,
};

export const MsMark: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <span className={`grid grid-cols-2 gap-[1.5px] shrink-0 ${className}`} aria-hidden="true">
    <span className="bg-[#F25022]" /><span className="bg-[#7FBA00]" /><span className="bg-[#00A4EF]" /><span className="bg-[#FFB900]" />
  </span>
);

export const BrandIcon: React.FC<{ id: string; className?: string; mono?: boolean }> = ({ id, className = 'w-4 h-4', mono }) => {
  const icon = SI[id];
  if (!icon) return null;
  // Very dark brand colours are swapped for currentColor so they stay visible on the dark band.
  const dark = parseInt(icon.hex, 16) < 0x333333;
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill={mono || dark ? 'currentColor' : `#${icon.hex}`} role="img" aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  );
};

export interface Tech { label: string; icon?: string; ms?: boolean }

export const Chip: React.FC<{ t: Tech; dark?: boolean }> = ({ t, dark }) => (
  <span className={`inline-flex items-center gap-2 px-2.5 py-1.5 border text-xs whitespace-nowrap ${dark ? 'border-white/15 text-neutral-200' : 'border-rule bg-ivory text-ink'}`}>
    {t.ms ? <MsMark /> : t.icon ? <BrandIcon id={t.icon} className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-stone" aria-hidden="true" />}
    {t.label}
  </span>
);

export const PLATFORMS: Tech[] = [
  { label: 'Dynamics 365', ms: true },
  { label: 'Power Platform', ms: true },
  { label: 'Azure', ms: true },
  { label: 'SharePoint Online', ms: true },
  { label: 'Copilot Studio', ms: true },
  { label: 'UiPath', icon: 'uipath' },
  { label: 'SAP SuccessFactors', icon: 'sap' },
  { label: 'Claude', icon: 'anthropic' },
  { label: 'Gemini', icon: 'gemini' },
  { label: 'OpenAI' },
  { label: 'Databricks', icon: 'databricks' },
  { label: 'Neo4j', icon: 'neo4j' },
  { label: 'Hugging Face', icon: 'huggingface' },
  { label: 'Ollama', icon: 'ollama' },
  { label: 'LangChain', icon: 'langchain' },
  { label: 'Kubernetes', icon: 'kubernetes' },
  { label: 'Docker', icon: 'docker' },
];

// Simple line icons (original artwork) for offers and sectors.
const P: Record<string, string> = {
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm3.5 5.5-2 5-5 2 2-5 5-2z',
  shield: 'M12 3 4.5 6v5.5c0 4.4 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5.1 7.5-9.5V6L12 3zm-3 9 2 2 4-4',
  helm: 'M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.9 2.9m7 7 2.9 2.9m0-12.8-2.9 2.9m-7 7-2.9 2.9M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  defence: 'M12 3 4.5 6v5.5c0 4.4 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5.1 7.5-9.5V6L12 3z',
  bank: 'M3 9.5 12 4l9 5.5M5 10v8m4.7-8v8m4.6-8v8M19 10v8M3 20h18',
  factory: 'M3 20V10l5 3V10l5 3V6h3l1 4h4v10H3zm4-4h2m4 0h2',
  retail: 'M4 8h16l-1.5 12h-13L4 8zm4 0V6a4 4 0 0 1 8 0v2',
};
export const LineIcon: React.FC<{ name: keyof typeof P | string; className?: string }> = ({ name, className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={P[name]} />
  </svg>
);

// Certification badge: generic seal shape with the issuer's mark. Not the issuers' official badge art.
export interface Cert { name: string; issuer: 'Microsoft' | 'PMI' | 'Scaled Agile'; level?: string }
export const CertBadge: React.FC<{ c: Cert }> = ({ c }) => (
  <div className="flex items-center gap-3 border border-rule bg-ivory px-3 py-3">
    <div className="relative w-11 h-11 shrink-0 grid place-items-center">
      <svg viewBox="0 0 44 44" className="absolute inset-0 w-full h-full text-ink" aria-hidden="true">
        <path d="M22 2l5 3.4 6-.4 2.6 5.4 5.4 2.6-.4 6L44 22l-3.4 5 .4 6-5.4 2.6L33 41l-6-.4L22 44l-5-3.4-6 .4-2.6-5.4L3 33l.4-6L0 22l3.4-5-.4-6 5.4-2.6L11 3l6 .4L22 2z" fill="currentColor" />
      </svg>
      <div className="relative">
        {c.issuer === 'Microsoft' ? <MsMark className="w-4 h-4" /> : <span className="mono text-[9px] font-semibold text-ivory tracking-tight">{c.issuer === 'PMI' ? 'PMI' : 'SAFe'}</span>}
      </div>
    </div>
    <div className="min-w-0">
      <div className="text-sm font-semibold leading-snug">{c.name}</div>
      <div className="mono text-[10px] uppercase tracking-[0.15em] text-stone">{c.issuer}{c.level ? ` · ${c.level}` : ''}</div>
    </div>
  </div>
);
