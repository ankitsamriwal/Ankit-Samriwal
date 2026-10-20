import React from 'react';
import { ESSAY_POSTS } from '../data/essays';

const inline = (text: string, key = 'i'): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*([^*]+?(?:\[[^\]]*\]\([^)]*\)[^*]*?)*)\*/g;
  let last = 0, m: RegExpExecArray | null, n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${n++}`;
    if (m[1] !== undefined) out.push(<strong key={k} className="font-semibold">{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<a key={k} href={m[3]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-oxblood break-words">{m[2]}</a>);
    else out.push(<em key={k}>{inline(m[4], k)}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const Essays: React.FC = () => (
  <div id="essays" className="mt-20 pt-12 border-t border-rule">
    <div className="mono text-[11px] uppercase tracking-[0.25em] text-stone mb-8">Full essays</div>
    <div className="space-y-12">
      {ESSAY_POSTS.map((post) => (
        <article key={post.slug} id={post.slug} className="max-w-3xl">
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-stone mb-3">{post.date} · {post.readTime}</div>
          <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3">{post.title}</h3>
          <p className="text-stone mb-5">{post.subtitle}</p>
          <p className="leading-relaxed mb-6">{post.intro}</p>
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold underline underline-offset-4 hover:text-oxblood list-none">Read the full essay →</summary>
            <div className="mt-8 space-y-5 leading-8">
              {post.body.map((b, i) =>
                b.k === 'h2' ? <h4 key={i} className="font-display text-2xl leading-snug pt-4">{b.t}</h4>
                : b.k === 'p' ? <p key={i}>{inline(b.t || '', `p${i}`)}</p>
                : b.k === 'ol' ? <ol key={i} className="list-decimal pl-6 space-y-2">{b.items!.map((it, j) => <li key={j}>{inline(it, `o${i}-${j}`)}</li>)}</ol>
                : <ul key={i} className="list-disc pl-6 space-y-2 break-words">{b.items!.map((it, j) => <li key={j}>{inline(it, `u${i}-${j}`)}</li>)}</ul>
              )}
            </div>
          </details>
          <div className="mt-6">
            <a href={post.substackUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-stone underline underline-offset-4 hover:text-oxblood">Also on Substack →</a>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default Essays;
