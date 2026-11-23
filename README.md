# Vizo

The public website of **Vizo** — website design and AI video creation. English and Arabic, light and dark mode.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 (Arabic: http://localhost:3000/ar).

## Edit content

- Text: `src/i18n/messages/en/marketing.json` and `ar/marketing.json` (keep both in step).
- Contact details: `src/components/marketing/site.tsx` (`WHATSAPP`, `EMAIL`).
- Showcase video: `public/showcase-explainer.mp4`.
- Website demos: `src/templates/<id>/template.json`. Refresh their preview images with `npm run screenshots` while the dev server runs.

## Checks

`npm test`, `npx tsc --noEmit` and `npx eslint src tests scripts`.

`docs/` keeps the original product spec this codebase started from.
