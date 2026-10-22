import { Article } from './chronicles';

export const articles87: Article[] = [
  {
    title: 'Building the AI Weekly Video Template: Voices, Captions and Motion on a 15-Second Clip',
    date: '2026-10-22',
    week: 'Oct 22, 2026',
    category: 'Building With Agents',
    readTime: '3 min read',
    excerpt: 'Turned a silent 15-second 3D reference clip into a reusable AI Weekly template for YouTube and Instagram: per-character English voices, burned-in captions, a licensed music bed, and a layered motion pass.',
    tags: ['Video Pipeline', 'TTS', 'Captions', 'Bots At Brunch'],
    body: [
      'The input was a fifteen-second vertical clip I made elsewhere: a 3D brunch-table scene, an orange THIS WEEK IN AI banner, a cream mug-bot reading an AI WEEKLY newspaper, and a dark hunched bot with glowing eyes. No audio, no captions, no end card. The job today was to turn that single clip into a repeatable template for the AI Weekly format on YouTube and Instagram.',
      '## Reading the reference',
      'The clip was analysed frame by frame before anything was built. The full-resolution frames settled a design question: the cream bot is not a round blob, it has a mug body with a spoon antenna, which makes it the Mugsy character rather than a new design. That frame became the scene reference the whole template is layered over.',
      '## Voice and captions',
      'Each bot gets its own generated English voice: Kernel (the dark bot) and Mugsy (the cream one). The script for the first episode is two items from the day\u2019s AI news, one per character. Captions are burned into the video rather than relying on platform captioning, kept to a maximum of seven words per line so they stay readable at 9:16 on a phone.',
      '## The motion pass',
      'Version two adds a music bed and a motion layer over the scene. The speaking bot bobs while it talks, Kernel blinks and tics before his lines and dips his head to the coffee for the sips, Mugsy flips the newspaper, and steam rises off the cups. The music is Monkeys Spinning Monkeys by Kevin MacLeod, Creative Commons Attribution 4.0, which keeps the template free to publish with a credit line.',
      '## Honest limits',
      'There is no lip sync, because the bots have no mouths to sync. There is no real cup lift; the head dip is what sells the sip. The episode runs 23.9 seconds, not the planned 15, because the generated voices speak slower than the script timing assumed, and the source clip\u2019s fifteen-second loop point is subtly visible. Real talking-head sync or full 3D character motion would need a paid generative video tool, which stays out of scope for now.',
      '## Status',
      'The template is a draft, not a published episode: two cuts were produced and reviewed, and it locks once I approve the motion and length. Separately, the channel\u2019s About text went live today with the new weekly schedule.'
    ],
    takeaways: [
      'Read the reference asset frame by frame before building on it; the full-res frames answered a character-design question the thumbnail could not.',
      'Burn captions into the video with a hard word cap per line; platform captioning is not reliable enough to be the template.',
      'State what the motion layer fakes and what it cannot do; a head dip selling a sip is fine as long as nobody claims lip sync.'
    ],
    note: 'Template is a reviewed draft, not yet published; nothing goes out until the motion and length are approved.'
  }
];
