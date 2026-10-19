import React, { useState } from 'react';
import { BOOKING_EMAIL, OFFERS } from '../advisory';
import type { DiagnosticResult } from './Diagnostic';

const BUDGETS = ['Under USD 25k', 'USD 25k–75k', 'USD 75k–200k', 'USD 200k+', 'Not yet defined'];
const TIMELINES = ['This quarter', 'Next quarter', 'Within 6 months', 'Exploring'];

// Builds a pre-filled email in the visitor's own mail client.
// Nothing is sent to or stored by this site.
const Briefing: React.FC<{ diagnostic: DiagnosticResult | null }> = ({ diagnostic }) => {
  const [form, setForm] = useState({ name: '', org: '', role: '', region: '', interest: '', budget: '', timeline: '', problem: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const belowMinimum = form.budget === BUDGETS[0];
  const interest = form.interest || diagnostic?.offer || '';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Organisation: ${form.org}`,
      `Role: ${form.role}`,
      `Region: ${form.region}`,
      `Interested in: ${interest || 'Not sure yet'}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      ...(diagnostic ? [`Readiness score: ${diagnostic.score}/100 (${diagnostic.tier})`] : []),
      '',
      'What we are trying to solve:',
      form.problem,
    ];
    const subject = `Briefing request: ${form.org || 'new enquiry'}`;
    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const field = 'w-full bg-transparent border-b border-rule focus:border-ink outline-none py-3 text-base placeholder:text-stone/70';
  const label = 'mono text-[11px] uppercase tracking-[0.2em] text-stone';

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-x-8 gap-y-6">
      <label className="block"><span className={label}>Name</span><input required value={form.name} onChange={set('name')} className={field} autoComplete="name" /></label>
      <label className="block"><span className={label}>Organisation</span><input required value={form.org} onChange={set('org')} className={field} autoComplete="organization" /></label>
      <label className="block"><span className={label}>Your role</span><input required value={form.role} onChange={set('role')} className={field} placeholder="e.g. CIO, Head of Transformation" /></label>
      <label className="block"><span className={label}>Region</span><input value={form.region} onChange={set('region')} className={field} placeholder="e.g. UAE, KSA, Netherlands" /></label>
      <label className="block"><span className={label}>Interested in</span>
        <select value={interest} onChange={set('interest')} className={field}>
          <option value="">Not sure yet</option>
          {OFFERS.map((o) => <option key={o.name} value={o.name}>{o.name}</option>)}
        </select>
      </label>
      <label className="block"><span className={label}>Budget band</span>
        <select required value={form.budget} onChange={set('budget')} className={field}>
          <option value="" disabled>Select</option>
          {BUDGETS.map((b) => <option key={b}>{b}</option>)}
        </select>
      </label>
      <label className="block md:col-span-2"><span className={label}>Timeline</span>
        <select required value={form.timeline} onChange={set('timeline')} className={field}>
          <option value="" disabled>Select</option>
          {TIMELINES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block md:col-span-2"><span className={label}>What are you trying to solve?</span>
        <textarea required rows={4} value={form.problem} onChange={set('problem')} className={`${field} resize-y`} placeholder="Two or three sentences is plenty. Please don't include confidential data." />
      </label>

      {belowMinimum && (
        <p className="md:col-span-2 text-sm text-oxblood leading-relaxed">
          Engagements usually start above this band. Send it anyway if the problem is sharp, or start with the free writing and the Chronicles below.
        </p>
      )}
      {diagnostic && (
        <p className="md:col-span-2 text-sm text-stone">Your readiness score ({diagnostic.score}/100, {diagnostic.tier}) will be included.</p>
      )}

      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" className="px-8 py-4 bg-ink text-ivory text-sm font-semibold whitespace-nowrap hover:bg-oxblood transition-colors">Request a briefing</button>
        <span className="text-xs text-stone">Opens your email client with the details filled in. Reply within two working days.</span>
      </div>
    </form>
  );
};

export default Briefing;
