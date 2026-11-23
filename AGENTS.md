<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Vizo site — project guide

The public website of **Vizo**: website design and AI video creation. Contact is WhatsApp (+974 7741 8054) and email. There are no accounts, payments or plans.

- Pages: `src/app/(platform)/(marketing)` — home, `/showcase` (AI videos and websites), `/legal/[doc]`. The header, footer, theme switch and WhatsApp button live in `src/components/marketing`.
- Copy: next-intl, `src/i18n/messages/{en,ar}/{common,nav,marketing}.json`. Both languages, same keys (a test checks). Write `{app}` for the product name. Only video copy says "AI".
- Theme: light/dark tokens in `src/app/globals.css` (`bg-vz-bg`, `text-fg`, `text-vz-accent`). Never hard-code white or black text outside image overlays.
- Website demos on the showcase: `/demo/<template>` renders `src/templates/<id>/template.json` with the block library in `src/blocks` (route `src/app/(sites)`). Validate with `npx tsx scripts/check-template.ts`.
- RTL: logical properties only (ms/me/ps/pe/start/end).
- Next 16.4 with Cache Components: no `dynamic`/`revalidate` exports; no `new Date()` or random values in server components.
- Checks: `npx tsc --noEmit`, `npx eslint src tests scripts`, `npm test`. Keep machine load low: no parallel heavy jobs.
