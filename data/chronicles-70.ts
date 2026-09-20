import { Article } from './chronicles';

export const articles70: Article[] = [
  {
    title: 'Teaching the Watchlist to Judge',
    date: '2026-09-20',
    week: 'Sep 20, 2026',
    category: 'Building With Agents',
    readTime: '6 min read',
    excerpt: 'A Sunday where the decision layer got its first production job: the what-to-watch app now merges TMDB and Rotten Tomatoes into one Jev-scored verdict. Around it: a notebook rescue, a four-pack of skillbox pilots, the first Medium import, and one standing rule about tunnels that will save real money.',
    tags: ['Building With Agents', 'Jev', 'Ship Log', 'Indie Projects', 'Ratings'],
    body: [
      'Yesterday the decision layer went into everything. Today it got its first real production job, and the job is judging movies. The what-to-watch app no longer shows you a platform score and wishes you luck: every card now carries one consolidated rating. TMDB and Rotten Tomatoes get pulled behind the scenes, Jev reads both, weighs them, and returns a single 0-10. Verified live on Oppenheimer: TMDB says 8.1, RT says 9.3, the card says 8.7. That is the whole idea in one line - not another recommendation algorithm, but a critic that reads all the other critics first.',
      'The plumbing grew with it: upcoming movies and currently airing TV feeds are in, and recommendations now sort high to low against my genres and watch history instead of whatever the API felt like returning. It is also the textbook case for why the typed layer earns its keep: ratings from multiple sources have to come back as clean structured data - show, source scores, consolidated verdict - not prose somebody has to parse. Typed schema in, typed schema out, and it sips credits compared to a general model doing the same job.',
      'Second ship: the proposalforge-slm-lab Colab notebook is fixed and closed. It had real bugs, the kind that only show up when someone actually presses run-all: it pulled training data from public GitHub URLs (dead the moment the repo goes private), unpinned packages, a missing import, and a sixteen-minute GGUF conversion forced into the default path. All four fixed, pushed to main, and the repo flipped private and verified. Boring work, but this is the work that decides whether a lab notebook is a tool or a trap.',
      'Third: the skillbox pilot pack went out - one Windows runbook plus four skill packages (alphahealth, decaf, cafdetox, proposalforge-local). Every package passes skillbox\u2019s own audit, carries zero credentials and zero customer content, and the runbook is paste-commands with the three spots it usually breaks. Forty-five minutes on the Windows box and the pilot is running.',
      'The runbook needed a v2 within hours, for a good reason. He found Cloudflare quick tunnels - one command, free, no account, and your localhost is on the internet at a random HTTPS URL. His follow-up is now a standing rule, and it will save real money: at prototype stage, ask tunnel or Vercel. The audience decides - just him, tunnel; anyone else testing, Vercel. Not everything needs a deploy pipeline. Some things need to be seen once, on a phone, in a room.',
      'Fourth: the NanoJev closer look landed. Verdict: good research base, not a drop-in scorer. It is a small Qwen model with learned decision heads - you hand it state, a question and fixed candidates, it returns clean probability distributions, no text generation at all. That shape fits the bid-scorer pilot, so the Oct 1 plan is locked: hard mandatory gates first (deadline, geography, certs, budget - the model can never override those), then NanoJev advisory scoring on synthetic cases only, with calibrated abstain thresholds and humans on everything real. The whole pilot now lives in a one-page project dossier: pipeline, data design, locked decisions, three open questions, and the day-by-day road to the first.',
      'The Medium backlog started moving too. First import went in clean - original Sep 4 date preserved, canonical link back to Substack, diagram intact. Then the platform\u2019s human-check wall came back on number two, and the honest answer to a wall is not a battering ram. His call, and the right one: slow trickle, one per day. Seventeen articles will take seventeen days. Fine. They waited months; they can wait weeks.',
      'The honest paragraph, because this series keeps one: this evening I asked the mirror question - why do all my builds stop at personal use? The answer is not ideation; a dozen shipped apps say the idea muscle works. Personal apps are safe because I am the customer and nobody can say no. The gap to D2C and enterprise is distribution, and distribution is a skill I have not trained yet. Naming it in public is the first rep.',
      'The evening ended in infrastructure math: what a vector database would actually cost across the indie projects, free-tier sharding to stay at zero during pilots, and a proper box at roughly AED 37 a month when the pilots earn it. Nothing shipped there tonight - but the cost-versus-return sheet exists now, and next week\u2019s decisions get made with numbers instead of vibes.',
      'And the content line held: Bots At Brunch day fourteen shipped, Wonderbyte episode sixteen went out with four vocab cards, and two more Geetlekha tracks are banked. The image backend behind the daily videos died overnight, so backdrops now come from free stock photos - same look, zero cost, one less dependency.'
    ],
    takeaways: [
      'The watchlist app now consolidates TMDB and Rotten Tomatoes into one Jev-scored 0-10 verdict per title, sorted against my genres and watch history - live at aajkya.vercel.app.',
      'A standing rule was born: prototypes ask tunnel or Vercel, and the audience decides. Just me means a Cloudflare quick tunnel; anyone else testing means Vercel.',
      'The Colab notebook rescue was the unglamorous win of the day: private-repo-safe data, pinned packages, and no sixteen-minute surprise in the run-all path.',
      'NanoJev is a research base, not a drop-in scorer - so the Oct 1 bid-scorer pilot runs it advisory-only, behind hard gates, on synthetic cases.',
      'Medium imports go one per day by choice. The platform\u2019s wall set the pace; pretending otherwise risks the account.'
    ],
    note: 'The decision layer stopped being an experiment today. It has a job.'
  }
];
