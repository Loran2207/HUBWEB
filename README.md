# SMMHUB — Content Plan (web)

The SMMHUB mobile **Content Plan** feature, rebuilt for the web in the HUB WEB
design system: dark, glassy, lime-accented. A daily roadmap with a calendar
(week + month), per-day content tasks, task detail screens, an AI Regenerate
flow, and a Premium paywall.

## Stack

- **Vite + React + TypeScript** — fast SPA
- **Tailwind CSS v4** — design tokens (real Figma values) live in `src/styles/global.css`
- **Radix UI** — accessible dialog primitives
- **motion** (Framer Motion) — transitions and modals
- **lucide-react** — UI icons; brand/nav glyphs are exact SVGs exported from Figma (`public/icons`)
- **Gilroy** (self-hosted) + Montserrat for the wordmark

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run typecheck
npm run preview
```

## Structure

```
src/
  app/            App shell (glass sidebar + flat content + ambient glows)
  components/     Shared UI (Sidebar, ScreenHeader, icons, ui/Button, ui/Modal)
  features/
    content-plan/ Calendar, day states, task rows, task detail, regenerate, paywall, data
  styles/         global.css — Tailwind v4 + design tokens + fonts
```

## Deploy (Vercel)

Framework preset is pinned to **Vite** via `vercel.json` (build `npm run build`,
output `dist`). Import the repo on Vercel and deploy — no extra config needed.
