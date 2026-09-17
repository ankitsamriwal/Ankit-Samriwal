import { Article } from './chronicles';

export const articles67: Article[] = [
  {
    title: 'Two Rungs, Two Passes',
    date: '2026-09-17',
    week: 'Sep 17, 2026',
    category: 'Building With Agents',
    readTime: '6 min read',
    excerpt: 'Yesterday the MCP ladder got built. Today it got climbed, rung by rung, on my own laptop, by my own hands. Both rungs ended in PASS. The recorder kept its promise, two more essays went live, and I got caught two weeks stale on a flagship model.',
    tags: ['Building With Agents', 'Ship Log', 'MCP', 'Gateway', 'Homework'],
    body: [
      'Wednesday the homework ladder got built for me. Thursday I climbed it myself. Step by step over chat: check Node, Python, Git; clone the local ProposalForge MCP; create the encrypted export; run the installer; watch the test. The line that mattered: PASS - the official MCP client listed all 8 tools and read the encrypted synthetic proposal, requirements, rate card, BOQ, costing and search, locally, on my own Windows laptop. First MCP server running on hardware I own, installed by my own hands. Then wired into Cline through the same form, enabled, green.',
      'It was not clean, and that is the honest part. Two real bugs surfaced live and got patched mid-session: the installer needed a DPAPI assembly my PowerShell did not load, and the test doubled a Windows path into "C:\\C:\\" and could not find its own server. Plus the human moments: me double-clicking an encrypted file that is never meant to be opened, and pasting a path in quotes that PowerShell took literally. This is what real installs look like. A tutorial would have hidden all of it; the ladder made each stumble a lesson with a fix attached.',
      'Rung two was the Homework Gateway: one local front door in front of all four MCPs plus a free model route. The test proved the point of the whole exercise - a read call was allowed through, a write call was denied before it ever touched upstream data, and a metadata-only audit record was written. Every model call now carries data_collection: deny with no fallback. One loose wire at day’s end, honestly noted: Cline was not registering the gateway’s tools yet, so the final proof waits for tomorrow. Passed rung, one cable still out.',
      'The recorder kept its promise. Wednesday it deliberately did not ship because there was no private storage path; Thursday it went live with the privacy posture intact: audio saves on the device first, uploads only when asked, nothing in a public bucket, Whisper verified end to end on synthetic speech. And the Android APK landed: it keeps recording through screen lock as a foreground service with a wake lock, saving eight-minute segments locally. "Wait until tomorrow" turned out to be a one-day promise, kept.',
      'The writing line stayed hot. The morning Substack pair went live - the god-agent flagship (one agent that can do everything is an accountability problem, not an efficiency) and the speech short (text leaves human information behind) - plus an honest footnote: the markdown headings pasted raw into the first publish, caught and cleaned the same morning. Then the introverts piece, then the Go follow-up: do not build another chatbot this weekend, build a support API with retrieval, typed actions and a backend that keeps the keys. A 15-page "How to Get Into AI" mini-book came off a forwarded roadmap post and went through three revision rounds until every trace of the source thread was out and it read as mine.',
      'The enterprise-shaped work moved too. A 14-page consolidated technical response went out for a live RFP, all thirteen clarification points answered against earlier positions. A 24-page onboarding primer and an eight-minute hire-to-retire walkthrough video got built for an HR-platform session. The TypeSafe skill file got saved as a standing skill. The daily AI scan became a product: numbered, only genuinely new launches, every morning. Ten dollars of OpenRouter credit quietly raised the free-model quota from 50 to 1,000 requests a day - headroom, not spend.',
      'The honest paragraph has two entries today. First: I got caught stale. Asked about GPT-6 Astra, I answered from two-week-old knowledge and was wrong; he made me dig, and the real answer was better than my confident one. Fair hit, corrected in writing. Second: the gateway’s last wire is still out. A day that ships this much and still says both of those out loud is the kind I want more of.'
    ],
    takeaways: [
      'The homework ladder got climbed, not just built: ProposalForge local MCP installed by hand on my own laptop, PASS with all 8 tools reading encrypted data locally.',
      'Two live bugs patched mid-session (DPAPI assembly, doubled Windows path) - real installs are never clean, and that is the point of doing them.',
      'Homework Gateway v0 enforces policy for real: read allowed, write denied before upstream, metadata-only audit, data_collection: deny on every call. One Cline wiring issue left for tomorrow.',
      'The recorder shipped a day later with privacy intact - on-device first, no public bucket - plus an Android APK that records through screen lock.',
      'Three Substack essays, a 15-page AI-roadmap mini-book, a 14-page RFP response, an onboarding tutor pack, and a standing daily AI scan - and one fair correction for being two weeks stale on a flagship model.'
    ],
    note: 'Two rungs climbed by hand, two PASS lines, one loose wire honestly noted. The ladder works when you climb it yourself.'
  }
];
