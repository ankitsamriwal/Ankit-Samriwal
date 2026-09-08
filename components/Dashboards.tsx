import React, { useState } from 'react';

const ENDPOINT = 'https://formsubmit.co/ajax/23f2301e31f8071f06c70cd9f3b02751';

const DASHBOARDS = [
  { key: 'banking', label: 'Banking', blurb: 'NIM, CASA, NPL, capital adequacy, segment revenue and market inflows.' },
  { key: 'manufacturing', label: 'Manufacturing', blurb: 'OEE, OTIF, scrap, downtime root-cause and plant network performance.' },
  { key: 'healthcare', label: 'Healthcare', blurb: 'Occupancy, length of stay, readmissions, ER wait and payer mix.' },
];

const Dashboards: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Dashboard suite request - $500',
          _template: 'table',
          _captcha: 'false',
          name: form.name,
          email: form.email,
          company: form.company,
          message: `Request for the executive dashboard suite ($500, 6 industry dashboards). Note from buyer: ${form.message || '-'}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data.success === 'true' ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const mailto = `mailto:ankitsamriwal@gmail.com?subject=${encodeURIComponent('Dashboard suite request - $500')}&body=${encodeURIComponent('Hi Ankit, I would like to request the executive dashboard suite ($500, 6 industry dashboards).\n\nName:\nCompany:\nNote:')}`;

  return (
    <div className="glass rounded-[2rem] p-8 md:p-12">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] mb-4">Boardroom dashboards, ready to rebrand.</h2>
      <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-2">
        Executive dashboard templates for presales, steering committees and board packs - KPI structure, definitions, targets and layout per industry, delivered as editable Excel files.
      </p>
      <p className="text-neutral-500 text-xs leading-relaxed mb-10">All figures in the previews are illustrative sample data.</p>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {DASHBOARDS.map((d) => (
          <div key={d.key} className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="aspect-video overflow-hidden">
              <video
                src={`/dashboards/${d.key}.mp4`}
                poster={`/dashboards/${d.key}.jpg`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm font-bold mb-1">{d.label}</div>
              <div className="text-xs text-neutral-500 leading-relaxed">{d.blurb}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.03] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-extrabold tracking-tight">$500</span>
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-orange-300/80">One-time</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">Full suite of 6 industry dashboards - editable Excel, yours to rebrand and reuse. A request is not a payment: you'll receive delivery and payment details by email.</p>
        </div>
        <div className="shrink-0">
          {!open && status !== 'sent' && (
            <button onClick={() => setOpen(true)} className="px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-sm font-bold">
              Request the suite
            </button>
          )}
        </div>
      </div>

      {open && status !== 'sent' && (
        <form onSubmit={submit} className="mt-6 rounded-2xl border border-white/10 p-6 md:p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input required value={form.name} onChange={set('name')} placeholder="Your name" className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-orange-300/50 text-sm text-white placeholder:text-neutral-600" />
            <input required type="email" value={form.email} onChange={set('email')} placeholder="Work email" className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-orange-300/50 text-sm text-white placeholder:text-neutral-600" />
          </div>
          <input value={form.company} onChange={set('company')} placeholder="Company (optional)" className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-orange-300/50 text-sm text-white placeholder:text-neutral-600" />
          <textarea value={form.message} onChange={set('message')} rows={3} placeholder="Which industries do you need? (optional)" className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-orange-300/50 text-sm text-white placeholder:text-neutral-600 resize-none" />
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-sm font-bold disabled:opacity-50">
              {status === 'sending' ? 'Sending...' : 'Send request - $500 suite'}
            </button>
            <a href={mailto} className="text-sm font-medium text-neutral-500 hover:text-white transition-colors underline underline-offset-8">or email directly</a>
          </div>
          {status === 'error' && (
            <p className="text-sm text-red-300">Something went wrong sending the request. Please use the direct email link instead.</p>
          )}
        </form>
      )}

      {status === 'sent' && (
        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-6 md:p-8 text-center">
          <div className="text-lg font-bold mb-2">Request sent.</div>
          <p className="text-neutral-400 text-sm">Thanks {form.name.split(' ')[0]} - you'll hear back at <span className="text-white">{form.email}</span> with payment and delivery details for the $500 suite.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboards;
