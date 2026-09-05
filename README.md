# Ankit Samriwal - Personal Site

Source for [ankit-samriwal.vercel.app](https://ankit-samriwal.vercel.app/), my personal site: essays on agentic AI and the enterprise, the AI Chronicles series, and prototypes built with AI agents.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 (PostCSS build, no CDN)
- Deployed on Vercel (auto-deploys from `main`)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `App.tsx` - page composition
- `components/` - sections (About, Writing/Substack, AI Chronicles, Built with Agents, Socials, Contact)
- `data/` - AI Chronicles article data
- `constants.tsx` - essays, prototypes, social links
