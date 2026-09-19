import { Article } from './chronicles';

export const articles69: Article[] = [
  {
    title: 'The Jev Weekend: Three Builds, One Kill',
    date: '2026-09-19',
    week: 'Sep 19, 2026',
    category: 'Building With Agents',
    readTime: '6 min read',
    excerpt: 'After a week of reading about harnesses and running one synthetic pilot, Friday night turned into the real question: what if the decision layer went into everything I am building. By morning there were three builds, one deliberate kill, and a results view stolen from the best demo on the timeline.',
    tags: ['Building With Agents', 'Jev', 'Indie Projects', 'Decision Layer', 'Ship Log'],
    body: [
      'Thursday’s chronicle ended with a verdict: the typed-action bet is real, and it earns a synthetic pilot before it earns trust. Friday night skipped the slow version of that plan. The question stopped being "where does Jev fit" and became "what happens if it goes into everything I am building." One API key into the vault, a $1-a-day cap with a circuit breaker, one rule that never bends: the client never talks to Jev directly, every app calls its own backend, the key stays server-side.',
      'One more rule mattered as much: public apps stay untouched. Every experiment runs in a private clone, and a Jev version gets promoted only if it proves itself against the plain version. Experiments are cheap; my users’ trust is not.',
      'Build one: the nutrition tracker, revived as a private clone. Photo and voice logging stay exactly as they were. What is new is the decide layer: a 51-food catalog (my 20 presets kept byte-identical, plus 31 from public nutrient databases), a "what should I eat now" card that scores options against how the day is actually going, and swap-with-deltas on anything logged. Jev does not touch the food data; the backend pulls candidates, Jev ranks them with confidence. The unglamorous part is what makes it real: 53 of 53 endpoint tests and 892 of 892 data checks passing before anyone eats a bite of it.',
      'Build two: the car decision platform. Cars fit this approach far better than stocks ever will: a car’s attributes are stable and knowable (price, mileage, service cost, safety, resale, seating), so a decision layer ranks reality instead of guessing the future. One app, country first (UAE or India), currency follows automatically, then the full selector underneath: budget, family, driving pattern, variant. Three modules share one car master and one decision service: a new-car shortlister, a used-car price referee, and a listing scorer. The pitch is not magic. It is "we know how sure we are." A weighted scoresheet does 70 percent of this; the decision layer adds calibrated confidence when objectives conflict, and one pass with a gate instead of forty open tabs.',
      'Build three: Feed Sieve, a Chrome extension for my own scrolling. It watches the feed, sends each post’s text to the backend, and the decision layer classifies keep versus cringe, clickbait, engagement-bait. Junk collapses to a one-line stub with a Show button; anything uncertain stays visible. Sideloaded, no Chrome store, personal use only. The honest caveat is printed on the box: post text goes to the model provider for classification, so it stays off any confidential feed.',
      'And the kill, which deserves its own paragraph. Mid-evening I sketched the grand version: every stock and mutual fund across four exchanges, all metrics, the decision layer returning a top three. Then I looked at it for two minutes and killed it. Free master data is mostly backward-looking price history, so the model ends up ranking the past with confidence. A mechanical top-three does not survive contact with real markets, and my own analysis has been the better tool all along. The sharper version survives as a note: candidate-first, where screeners cut the universe to a dozen names by rules I set, and the decision layer scores only those against my actual context. Maybe later. Killing fast is a feature.',
      'The night had two inspirations, both worth crediting properly. The first is Nikunj Kothari’s snack sorter: his post ran the decision layer across a kids’ snack catalog (three questions per product, thousands judged in seconds for eleven cents) and rendered the verdicts as a waffle grid with a run-facts panel. That grid is exactly how decision output should look, and a version of it is heading for the car platform.',
      'IMG: /chronicles/jev-snack-waffle-nikunj-kothari.jpg | Credit: Nikunj Kothari (@nikunjk on X) - his Jev snack sorter: thousands of products judged per run, verdicts rendered as a waffle grid with run facts.',
      'The second is Sagar Tamang’s sarvam-jev: an open engine that reads typed decisions straight from an Indic model’s logits instead of generating JSON token by token, running entirely in the browser with Hindi, Tamil and Bengali demos. A different animal: free, local, and community-built, so judgment quality will not match the real model. Good for demos; not for decisions you would act on.',
      'IMG: /chronicles/sarvam-jev-sagar-tamang.jpg | Credit: Sagar Tamang (@sagar_builds on X) - sarvam-jev, his open browser engine reading typed decisions from model logits.',
      'The honest state of play, because this entry goes up while the night is still landing: specs, tests, keys and budgets are all real; the deploys queued behind a stalled Vercel queue overnight and are landing as it clears. Links follow as each one goes live. The weekend question was whether a decision layer could live inside everything. The early answer: yes, in three places, at pocket-change cost, with one grand idea correctly killed on the way.'
    ],
    takeaways: [
      'Three Jev builds in one night: a nutrition tracker clone with a decide layer, a car decision platform, and the Feed Sieve cringe filter.',
      'The rules made the speed: key in the vault, $1/day cap with circuit breaker, backend-only calls, public apps untouched, private clones for every experiment.',
      'One kill matters as much as the three builds: universe-wide stock and fund scoring was killed in two minutes because backward-looking data plus confident ranking is a trap.',
      'Credit where due: Nikunj Kothari’s waffle-grid results view and Sagar Tamang’s browser-native sarvam-jev shaped the weekend’s thinking.',
      'Total marginal cost of decisions all night: pocket change. The scarce resource was judgment, not tokens.'
    ],
    note: 'Three builds, one kill, two credits. The decision layer earns its place one honest test at a time.'
  }
];
