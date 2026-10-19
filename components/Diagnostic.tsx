import React, { useState } from 'react';

export interface DiagnosticResult {
  score: number;
  tier: string;
  offer: string;
}

const QUESTIONS: { area: string; q: string; options: string[] }[] = [
  {
    area: 'Use cases',
    q: 'How clear is your first agentic use case?',
    options: ['We have a mandate, not a use case', 'A long list, nothing ranked', 'A ranked shortlist', 'Ranked and tied to a P&L owner'],
  },
  {
    area: 'Data',
    q: 'Can an agent reach the data that use case needs?',
    options: ['It lives in spreadsheets and inboxes', 'In systems, but no API access', 'APIs exist for most of it', 'Governed, documented and accessible'],
  },
  {
    area: 'Governance',
    q: 'Who signs off when an agent acts inside a system of record?',
    options: ['Nobody has asked yet', 'IT, case by case', 'A draft policy exists', 'A named owner with an approval path'],
  },
  {
    area: 'Sovereignty',
    q: 'Do you know which data may leave your environment?',
    options: ['No classification yet', 'Informally', 'Classified, not enforced', 'Classified and enforced in tooling'],
  },
  {
    area: 'Platform',
    q: 'Where are you on platform choice?',
    options: ['Not started', 'Running scattered pilots', 'Shortlisted vendors', 'Platform chosen, reference architecture agreed'],
  },
  {
    area: 'Ownership',
    q: 'Who runs agents once they are live?',
    options: ['Unclear', 'The vendor', 'A project team', 'A standing product and ops team'],
  },
];

const tierFor = (pct: number, sovereignty: number): DiagnosticResult => {
  if (pct < 40) return { score: pct, tier: 'Foundations first', offer: 'Agentic Readiness Sprint' };
  if (pct < 72) return { score: pct, tier: 'Ready to design', offer: sovereignty < 2 ? 'Sovereign & Air-gapped AI Architecture Review' : 'Agentic Readiness Sprint' };
  return { score: pct, tier: 'Ready to scale', offer: 'Fractional AI Programme Director' };
};

const READOUT: Record<string, string> = {
  'Foundations first': 'The risk is spending on a platform before you know what it should do. Settle the first use case and its owner, then buy.',
  'Ready to design': 'You have enough clarity to design properly. The next mistake to avoid is an architecture your regulator or security team will reject later.',
  'Ready to scale': 'The hard part now is delivery discipline across vendors, workstreams and the people who will run agents day to day.',
};

const Diagnostic: React.FC<{ onDiscuss: (r: DiagnosticResult) => void }> = ({ onDiscuss }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(QUESTIONS.map(() => null));
  const done = answers.every((a) => a !== null);
  const total = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const pct = Math.round((total / (QUESTIONS.length * 3)) * 100);
  const result = done ? tierFor(pct, answers[3] ?? 0) : null;
  const answered = answers.filter((a) => a !== null).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 text-xs text-stone">
        <span className="mono uppercase tracking-[0.2em]">{answered} of {QUESTIONS.length} answered</span>
        <span className="mono uppercase tracking-[0.2em]">Nothing is stored</span>
      </div>
      <ol className="space-y-8">
        {QUESTIONS.map((item, qi) => (
          <li key={item.area} className="border-t border-rule pt-6">
            <div className="mono text-[11px] uppercase tracking-[0.2em] text-oxblood mb-2">{String(qi + 1).padStart(2, '0')} · {item.area}</div>
            <fieldset>
              <legend className="font-display text-xl md:text-2xl leading-snug mb-4">{item.q}</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {item.options.map((opt, oi) => {
                  const on = answers[qi] === oi;
                  return (
                    <button
                      type="button"
                      key={opt}
                      aria-pressed={on}
                      onClick={() => setAnswers((prev) => prev.map((v, i) => (i === qi ? oi : v)))}
                      className={`text-left text-sm px-4 py-3 border transition-colors ${on ? 'bg-ink text-ivory border-ink' : 'border-rule hover:border-ink'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-10 border border-ink p-6 md:p-8" aria-live="polite">
        {result ? (
          <>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-display text-5xl md:text-6xl">{result.score}</span>
              <span className="mono text-xs uppercase tracking-[0.2em] text-stone">/ 100 readiness</span>
            </div>
            <h3 className="font-display text-2xl mb-2">{result.tier}</h3>
            <p className="text-stone leading-relaxed mb-5">{READOUT[result.tier]}</p>
            <p className="text-sm mb-6">Suggested starting point: <span className="font-semibold">{result.offer}</span></p>
            <button type="button" onClick={() => onDiscuss(result)} className="px-6 py-3 bg-ink text-ivory text-sm font-semibold hover:bg-oxblood transition-colors">
              Discuss this result →
            </button>
          </>
        ) : (
          <p className="text-stone">Answer all six to see your readiness score and a suggested starting point.</p>
        )}
      </div>
    </div>
  );
};

export default Diagnostic;
