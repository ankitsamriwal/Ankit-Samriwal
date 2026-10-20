import { Article } from './chronicles';

export const articles84: Article[] = [
  {
    title: 'Testing a New OCR Model Against Its Own Claims on 227 Real Pages',
    date: '2026-10-20',
    week: 'Oct 20, 2026',
    category: 'Building With Agents',
    readTime: '4 min read',
    excerpt: 'Hardened my docintel pipeline on Indra OCR, then benchmarked the model against its published claims on 227 pages of real documents: the speed claim holds, the accuracy gap does not.',
    tags: ['OCR', 'Indra', 'Tesseract', 'Benchmarking', 'Document AI'],
    body: [
      'Datalab just released Indra OCR 1.1 with a strong scorecard, and I had a docintel scaffold sitting unfinished: convert incoming files, OCR them, route pages by confidence, optionally hand sections to an LLM for extraction, then report, all behind a small API. Today I hardened it end to end and, more importantly, tested the model\u2019s claims instead of trusting the announcement.',
      '## The build',
      'The pipeline fix that mattered was the router: pages below a confidence threshold escalate to a heavier path, and the routing logic was sending the wrong pages. After the fix, thirty-two tests pass against a synthetic set of sixteen files I generated for the purpose: invoices, forms, scans, rotated pages, Office documents, and Arabic and Hindi pages. A demo page sits on top of the API so a file can be uploaded and parsed in a browser.',
      '## The evaluation setup',
      'The test set was twenty real documents from my own files, 227 pages in total, a deliberately mixed batch, plus the sixteen synthetic files. Everything ran locally in a sandbox: no page left the machine and no hosted model saw a document. For ground truth I scored Indra\u2019s output against each PDF\u2019s own embedded text layer and measured word recall, with a head-to-head against Tesseract on a fifteen-page subset.',
      '## What the numbers said',
      'The speed claim holds. Indra averaged about 0.5 seconds per page on a single core with zero crashes across all 227 pages. On the synthetic benchmark it ran at 157 ms per page against Tesseract\u2019s 1,153 ms. Accuracy is more honest. Word recall on the real batch averaged 0.83 with a median of 0.95, meaning most pages come through nearly complete but the tail is long. On the fifteen-page head-to-head Indra edged Tesseract, 0.863 to 0.844. On clean synthetic print, Tesseract actually won, 0.995 to 0.970. The large accuracy gap in the published scorecard does not show up on clean text.',
      '## Where it struggles',
      'One dense 85-page document came back with only about 67 percent of its words. Two documents read the words correctly but in a different order, which breaks downstream extraction that assumes reading order. One Arabic document scored low, though that score may be unfair since text-layer ordering in the source file can sink a correct transcription. The router\u2019s confidence signal also misses dropped words on dense pages, so escalation triggers on layout complexity, not on actual text loss. Handwriting, the claimed 80-plus languages, and the published benchmark suites are untested.',
      '## Shipping it',
      'The demo ran live from the sandbox over a short-lived tunnel, synthetic files only, and I tested twenty-eight UI cases through the live tunnel before calling it done. The code, tests and a BENCHMARK.md with the full methodology sit in a private repo. One licence note for anyone evaluating Indra: the weights are OpenRAIL-M, free below a revenue and funding threshold, but a commercial deployment needs a licence from Datalab.',
      '## The verdict',
      'Fast and solid as a first-pass OCR, especially on speed and stability, but not a clear accuracy win over Tesseract on my documents. The published numbers are not wrong exactly; they are measured on benchmarks that do not look like my files. That is the point of running your own eval.'
    ],
    takeaways: [
      'Benchmark a model against its claims on your own documents before believing the scorecard; ground truth can be as simple as the PDF\u2019s own text layer.',
      'Speed and stability claims held up perfectly, accuracy claims did not survive clean print; the right OCR depends on the workload, not the leaderboard.',
      'Keep real documents local: pages never leave the sandbox, and only aggregate metrics make it out.'
    ],
    note: 'Real-document runs stayed fully local; only aggregate metrics left the sandbox, and the live demo serves synthetic files only.'
  }
];
