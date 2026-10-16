import { Article } from './chronicles';

export const articles82: Article[] = [
  {
    title: 'Hardening Auth on a Shared Worker Without Breaking What Is Live',
    date: '2026-10-16',
    week: 'Oct 16, 2026',
    category: 'Building With Agents',
    readTime: '3 min read',
    excerpt: 'Decaf\u2019s v2 auth rebuild is on a staging Worker: email OTP sign-in, sessions, a scoped service token for the MCP, and a restore-verified D1 backup, with production untouched.',
    tags: ['Cloudflare Workers', 'D1', 'Auth', 'OTP', 'MCP'],
    body: [
      'Decaf\u2019s backend is a Cloudflare Worker over a D1 database, and the same Worker also serves other apps. The v2 work replaces email-only open sync with real authentication: sign-in codes sent by email through Resend, server-side sessions, and authenticated reads and writes on every state route.',
      '## The constraint',
      'The live Worker carries a token-guarded write route used by my workboard, and the Decaf MCP server calls the state endpoint with only an email. A straight swap to v2 would break both. So v2 keeps the stronger auth, preserves the existing separately-token-guarded workboard write contract unchanged, and adds a narrow authenticated service route for the MCP. The MCP gets its own scoped token instead of any general email-only access.',
      '## Backup before anything',
      'Before any change I took a full D1 export and verified the restore against the three user rows. The v2 schema and migrations ran on the staging database only. Worker secrets are set as Resend API key, the VAPID key pair for push, and an OTP pepper, with the public VAPID key matching the client. The deploy used a short-lived Cloudflare token with only D1 edit and Workers deploy scope, deleted and verified dead after.',
      '## Testing',
      'Seventy-eight local synthetic tests plus thirty-nine checks against the live staging deployment, covering OTP issue and verify, session lifecycle, the MCP service route, and the preserved workboard writes. Synthetic test data was cleaned up after.',
      '## Rate limits and current state',
      'OTP sends are capped in the app at ninety per day and 2,800 per month, under Resend\u2019s free limits. Everything above runs on a separate staging Worker; production still serves v1 untouched. The cutover waits on a verified sending domain, then a fresh backup and real OTP and phone push tests before anything moves.'
    ],
    takeaways: [
      'Before replacing a shared Worker, enumerate its dependents; auth hardening that breaks existing clients is a regression, not an upgrade.',
      'Export and restore-verify the database before running any migration.',
      'Give each machine client its own scoped token rather than keeping a shared open route.'
    ],
    note: 'Production still runs v1. Cutover waits on the sending domain, a fresh backup, and a real OTP and push test.'
  }
];
