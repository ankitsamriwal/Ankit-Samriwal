import { Article } from './chronicles';

export const articles57: Article[] = [
  {
    title: 'The Week the Datacenter Sprung a Leak',
    date: '2026-09-10',
    week: 'Sep 10, 2026',
    category: 'AI Infrastructure',
    readTime: '5 min read',
    excerpt: 'Within 24 hours, two projects showed frontier-scale models running on consumer hardware: a 2.78-trillion-parameter model in 8GB of RAM from a single C file, and a 35B model streamed into about 1GB. The trick is not compression. It is scheduling.',
    tags: ['On-Device AI', 'Edge0', 'Kimi K3', 'MoE', 'Inference'],
    body: [
      'For three years the comfortable assumption held: serious models live in serious datacenters, and the rest of us rent. This week that assumption cracked twice in 24 hours, from two opposite directions.',
      'Yesterday it was kimi-k3-in-c: Kimi K3, a 2.78-trillion-parameter mixture-of-experts model, running in 8.24GB of RAM, written in pure C with no engine dependencies, weights streamed from SSD at roughly a token a second. Nobody will hold a conversation at that speed. That is not the point. The largest open model in the world ran, unpruned, on hardware you can buy at a mall. It is a craft flex that doubles as a proof of floor: the minimum hardware a frontier-scale model needs is no longer a cluster.',
      'Today it was Edge0, and the tone shifted from craft to product. The team is real and pedigreed: founder Samuel Zeng, formerly Alibaba’s machine translation lead and an Ant Group AI co-founder, the same group behind the Audio8 TTS model. Edge0 streams a 35B MoE into about 1GB of RAM and claims around 25 tokens a second on the 8B preview, laptop-class speed. The genuinely novel piece is the prerouter: a small trained head that predicts which experts the next token will need and prefetches them before the router decides. Everyone sharing "35B on an iPhone" is celebrating the wrong thing. The contribution is not compression. It is prediction.',
      'The honest frame matters here. Edge0 did not train these models; the 35B is Qwen3.5-MoE and the 8B is Ling 3.0, quantized and served with their stack. Every benchmark is self-reported, run by the team with OpenCompass, with zero independent verification so far. And the iPhone demo is not reproducible from the open-source repo, which today supports only macOS Apple Silicon via MLX. Real team, real stack, promising direction, unproven numbers. All four can be true at once.',
      'Both projects exploit the same structural fact about MoE models: only a small fraction of experts fire per token, so RAM only ever needs to hold the active few while the rest stream in from storage, the way a database pages from disk. One project proved the floor. The other is productizing the pattern. The distance between a trickle and a usable stream turned out to be a scheduling problem, and scheduling problems get solved.',
      'For enterprise planning, the disciplined read is this: hosted APIs still win today, and nothing about your current vendor strategy should change this quarter. But the hardware floor under frontier-class capability is collapsing, which revives scenarios we had filed away: data-residency-constrained deployments, offline and sovereign workloads, factory floors and field sites with no reliable link to a cloud region. If your risk register assumed frontier models always mean an external API call, pencil in a review date about twelve months out.'
    ],
    takeaways: [
      'kimi-k3-in-c ran a 2.78T-parameter MoE in 8.24GB of RAM from a single C file: walking speed, but unpruned and on consumer hardware.',
      'Edge0, from an ex-Alibaba team, streams a 35B MoE into roughly 1GB of RAM at usable speed; the real innovation is a prerouter that prefetches experts ahead of the router.',
      'Both lean on the same MoE fact: only a fraction of weights activate per token, so storage can impersonate memory.',
      'Believe the direction, not the benchmarks yet: Edge0’s numbers are self-reported and the iPhone demo is not in the open-source repo.'
    ],
    note: 'The floor under "frontier-class" moved from a datacenter to a laptop this week. Data-residency assumptions deserve a fresh look.'
  }
];
