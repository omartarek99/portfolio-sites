# Showcase — Product & Technical Specification (v2)

> **Working name:** Showcase (rename via one config constant `APP_NAME`).
> **Companion file:** `TEMPLATES.md` — the full catalog of pre-made template designs with example content. Read both before building.
> **How to build:** follow the milestones in §16 in order. Finish, test and summarize each milestone before starting the next.

---

## 1. Product summary

Showcase is a portfolio and personal-website maker for anyone who wants to market themselves creatively: job seekers, freelancers, designers, photographers, developers, coaches, teachers, creators and small service businesses.

It mixes two familiar tools:
- **Like Canva:** start from a beautiful pre-made design, click anything on the page to edit it in place, swap colors and fonts in one click, drag blocks in from a library, and see the result instantly.
- **Like WordPress:** a real website with multiple pages, a blog, navigation menus, a media library, SEO settings, revisions, scheduled publishing and add-on integrations.

Users can get a site four ways:
1. **Pick a template** from a library of pre-made designs and replace the example content with their own.
2. **Describe it in a prompt** ("A dark, elegant portfolio for a wedding photographer in Doha, Arabic and English") and the AI generates the full site.
3. **Be interviewed by the AI**, which asks questions one at a time and then builds the site.
4. **Book an interview with a Showcase team member**, a human designer who learns their requirements, writes a brief and can build or refine the site for them.

**Core promise:** "A website that looks custom-designed, in minutes, without design skills, and with real people to help when you need them."

**Key differentiators**
1. Premium, distinctive templates with real example content, not color-swapped clones.
2. Arabic-first: every template, block and editor screen works fully in right-to-left layout.
3. Built to bring in work: contact forms, booking, WhatsApp, live chat, newsletter signup and analytics.
4. AI generation plus human help from the team in one product.

---

## 2. Target users

| Persona | Main need |
|---|---|
| Job seeker | Stand out to recruiters; downloadable CV; one link to share |
| Freelancer / consultant | Landing page that sells services and collects leads |
| Designer / illustrator / artist | Visual portfolio, case studies |
| Photographer / videographer | Large galleries, video reels, client booking |
| Developer | Projects, GitHub links, technical feel |
| Coach / tutor / teacher | Services, booking, testimonials, courses |
| Content creator | Link hub, media kit, brand-deal contact |
| Small business / founder | One-page pitch, services, contact |
| Academic / researcher | Publications, talks, teaching |

---

## 3. Tech stack (mandatory unless noted)

| Layer | Choice |
|---|---|
| Framework | **Next.js 14+ (App Router) + TypeScript (strict)**. One app for the marketing site, dashboard, editor, team workspace, API routes and public site rendering |
| Styling | Tailwind CSS + CSS variables for design tokens (themes) |
| Animation | Framer Motion (primary); GSAP + ScrollTrigger allowed inside blocks |
| Editor state | Zustand + Immer (undo/redo via patches) |
| Drag and drop | dnd-kit |
| Rich text | Tiptap (inline text editing on the canvas and for blog posts) |
| Database | MongoDB + Mongoose |
| Auth | Auth.js (NextAuth): email magic link + Google OAuth |
| File storage | Cloudinary behind a `storage` service |
| Stock images | Unsplash API behind a `stockMedia` service (with required attribution) |
| Payments | Stripe behind a `billing` service (regional gateway such as Tap Payments can be added later) |
| Email | Resend behind a `mailer` service |
| AI | Anthropic Claude API behind an `ai` service |
| Video meetings | Google Calendar API (Meet links) behind a `meetings` service; fallback: Jitsi link generator |
| Realtime (chat, team messages) | Pusher or Ably behind a `realtime` service |
| Validation | Zod (shared client + server) |
| Forms | React Hook Form + Zod |
| i18n | next-intl, locales `en` and `ar` |
| Testing | Vitest (unit), Playwright (end-to-end) |
| Deployment | Vercel (wildcard subdomains + Domains API for custom domains) |

**Rule:** every external service is accessed through an interface in `/src/services/*`, and each has a mock implementation. With `SERVICES_MODE=mock` the whole app runs locally with no API keys.

---

## 4. Architecture principles

1. **A site is JSON data; blocks are React components.** Templates are pre-filled site JSON plus a theme. The editor edits JSON and never generates code.
2. **Section-based visual editor, not an absolute-position canvas.** Pages are stacks of sections; sections contain blocks with layout variants. Free positioning is allowed only inside the special "Freeform" block (§7.3). This gives the Canva feel while keeping every site responsive and maintainable.
3. **One block library shared by all templates.** A template is a choice of blocks, variants, theme tokens and example content. Adding a template means adding a JSON file plus a preview image; no new code is required unless it introduces a new block variant.
4. **Design tokens drive styling.** Colors, fonts, radius, spacing scale, shadows and motion preset are CSS variables set from the site theme. Swapping a theme restyles the whole site instantly.
5. **Responsive by default, with optional per-device overrides.** Users may hide a block on mobile or change its variant per device; they cannot break layout.
6. **RTL everywhere.** Use logical properties only (Tailwind `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`). Every block and template is tested in `dir="rtl"` with mixed Arabic/English text.
7. **Fast public sites.** Server-rendered, cached and revalidated on publish; images served through the CDN with responsive sizes; animation libraries lazy-loaded. Target Lighthouse mobile performance ≥ 85 and accessibility ≥ 90 on every template.
8. **Draft and published are separate.** Editing never changes the live site until the user publishes.

---

## 5. Folder structure

```
/src
  /app
    /(marketing)              # home, templates gallery, template preview, pricing, team, help, legal
    /(auth)                   # sign-in, verify
    /(dashboard)/app          # user dashboard
      /sites                  # list of sites
      /sites/[id]/edit        # visual editor
      /sites/[id]/pages       # page manager
      /sites/[id]/blog        # posts manager
      /sites/[id]/media       # media library
      /sites/[id]/inbox       # form submissions, chat conversations, subscribers
      /sites/[id]/bookings    # booking settings + appointments
      /sites/[id]/analytics
      /sites/[id]/settings    # domain, SEO, integrations, collaborators, revisions
      /help                   # AI interview, book a team member, my sessions, messages
      /account                # profile, billing, notifications
    /(team)/team              # team workspace (team_member role)
    /(admin)/admin            # admin (admin role)
    /api
    /_sites/[host]/[[...path]] # public site rendering (rewritten by middleware)
  /blocks                     # block library: one folder per block type
    /registry.ts
    /hero/{manifest.ts, Hero.tsx, variants/*, schema.ts}
    ...
  /templates                  # template JSON files + preview images (see TEMPLATES.md)
    /registry.ts
    /aurora/{template.json, preview-desktop.jpg, preview-mobile.jpg, thumb.jpg}
  /themes                     # palettes, font pairs, motion presets
  /editor                     # editor components, store, commands, shortcuts
  /components                 # shared UI
  /lib                        # db, auth, plans, permissions, utils
  /models                     # Mongoose models
  /schemas                    # Zod schemas
  /services                   # storage, stockMedia, billing, mailer, ai, meetings, realtime, domains
  /i18n                       # en.json, ar.json
  middleware.ts               # host-based routing (subdomains + custom domains)
/tests
```

---

## 6. Data model for site content

Define with Zod in `/src/schemas/site.ts` and derive TypeScript types from it.

```ts
SiteContent {
  version: 1
  locales: ('en' | 'ar')[]          // one or both; first is default
  theme: Theme
  navigation: { header: NavItem[]; footer: NavItem[]; style: 'top' | 'side' | 'floating' | 'minimal' }
  pages: Page[]                      // at least one with slug '' (home)
  globalSections: { header?: Section; footer?: Section; announcementBar?: Section }
  settings: {
    favicon?: string
    seo: { titleTemplate: string; defaultDescription?: string; ogImageUrl?: string }
    social: SocialLink[]
    contact: { email?: string; phone?: string; whatsapp?: string; address?: string }
    cvFileUrl?: string               // downloadable CV
    cookieBanner: boolean
  }
}

Theme {
  templateId: string
  palette: { background, surface, text, mutedText, primary, secondary, accent, border }   // hex
  mode: 'light' | 'dark'
  fonts: { heading: FontRef; body: FontRef; arabicHeading: FontRef; arabicBody: FontRef }
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  spacing: 'compact' | 'comfortable' | 'airy'
  motion: 'none' | 'subtle' | 'expressive' | 'cinematic'
  backgroundStyle?: { type: 'solid' | 'gradient' | 'pattern' | 'noise' | 'image'; value: string }
  buttonStyle: 'solid' | 'outline' | 'pill' | 'brutal' | 'glass'
}

Page {
  id, slug, title: Localized, type: 'standard' | 'blogIndex' | 'link'
  sections: Section[]
  seo?: { title?, description?, ogImageUrl?, noIndex?: boolean }
  visibility: 'public' | 'password' | 'hidden'
  passwordHash?: string
}

Section {
  id
  blockType: BlockType               // see §7
  variant: string                    // layout variant id within the block type
  content: object                    // validated by the block's own Zod schema; text fields are Localized
  style: {                           // optional overrides of theme tokens
    background?: ...; paddingY?: 'sm'|'md'|'lg'|'xl'; width?: 'narrow'|'normal'|'wide'|'full'
    textAlign?: 'start'|'center'; colorScheme?: 'inherit'|'inverted'
  }
  animation: { entrance: 'none'|'fade'|'slide-up'|'slide-start'|'zoom'|'blur'|'stagger'|'parallax'|'reveal-mask'; delayMs?: number }
  responsive: { hideOn?: ('mobile'|'tablet'|'desktop')[]; mobileVariant?: string }
  anchor?: string                    // for one-page navigation
}

Localized = { en?: string; ar?: string }
```

Limits: 25 pages per site, 40 sections per page, 50 items per block, 100 gallery images per site on Pro (Free: 12).

Include a `version` field and `migrateSiteContent(raw)` for future schema changes.

Blog posts are stored separately (not inside `SiteContent`) because they can be numerous: see `Post` model in §13.

---

## 7. Block library

Every block lives in `/src/blocks/<type>/` and exports:

```ts
manifest: {
  type, name: Localized, icon, category: 'intro'|'about'|'work'|'social-proof'|'sell'|'contact'|'media'|'content'|'utility'
  variants: { id, name: Localized, thumbnail, tier: 'free'|'pro' }[]
  schema: ZodSchema                  // content schema
  defaultContent: object             // shown when a user adds the block
  editableFields: FieldConfig[]      // drives the side panel when no inline editing is possible
}
Component(props: { section: Section; theme: Theme; locale; mode: 'live' | 'editor' | 'preview'; siteId })
```

Requirements for every block: works with empty optional fields; responsive 360px to 1920px; correct in RTL; respects theme tokens and `prefers-reduced-motion`; accessible (semantic headings, alt text, focus states, AA contrast); in `editor` mode exposes inline-editable text and image slots (§8.3).

### 7.1 Block types and variants (MVP)

| Block | Variants (min.) | Notes |
|---|---|---|
| **Hero** | split image, centered big type, full-bleed image, video background, animated text (typewriter / word rotate), collage, 3D-tilt card, minimal name-only | Name, headline, tagline, CTA buttons, avatar/cover, availability badge |
| **About** | text + portrait, big quote, two-column story, timeline intro | Rich text |
| **Experience** | vertical timeline, cards, compact CV list | Role, org, dates, description, logo |
| **Education** | list, cards | |
| **Projects** | grid, masonry, carousel, alternating rows, hover-reveal list, bento | Title, image/video, description, tags, link, "case study" page link |
| **Case study** | header + problem/process/result layout, image story | Usually its own page |
| **Skills** | tags, bars, icon grid, radial | Optional level |
| **Services** | cards, pricing table, list with icons | Name, description, price, CTA |
| **Testimonials** | carousel, wall/masonry, single big quote | Quote, author, role, photo, rating |
| **Clients / logos** | marquee, grid | |
| **Stats** | counters (animated), row, big numbers | |
| **Gallery** | grid, masonry, slider, lightbox justified, before/after slider | Captions, categories filter |
| **Video** | embed (YouTube/Vimeo), uploaded reel, video grid | |
| **Process / steps** | numbered steps, horizontal flow | |
| **FAQ** | accordion, two-column | |
| **Pricing** | 2–4 tiers, toggle monthly/one-time | |
| **CTA band** | simple, with image, gradient | |
| **Contact** | form + details, split with map, minimal | Uses form builder (§10.1) |
| **Booking** | inline calendar, button opening modal | Uses booking system (§10.3) |
| **Newsletter** | inline, card | Uses subscribers (§10.5) |
| **Link hub** | stacked buttons (link-in-bio), icon grid | For creators |
| **Media kit** | audience stats, platforms, rates | For creators |
| **Publications** | list with citation, filters by year | For academics |
| **Blog list** | grid, list, featured + list | Pulls latest posts |
| **Rich text** | single column, two column | Free content |
| **Embed** | iframe/HTML (sanitized allow-list: YouTube, Vimeo, Spotify, SoundCloud, Google Maps, Calendly, Figma, Behance, Dribbble, GitHub gist) | Pro |
| **Freeform** | free canvas | §7.3 |
| **Divider / spacer** | line, wave, shape | |
| **Header** (global) | top bar, centered logo, side nav, floating pill | Logo/name, nav, language switch, CTA |
| **Footer** (global) | simple, columns, big name | Social links, copyright, badge |

### 7.2 Section templates ("pre-designed sections")
In addition to blank blocks, the block library offers **pre-designed sections**: a block + variant + style + example content combination, browsable by category with thumbnails (like Canva elements). At least 60 at launch, drawn from the templates in `TEMPLATES.md`. Adding a pre-designed section inserts it with the site's current theme applied.

### 7.3 Freeform block (Canva-style)
- A fixed-aspect canvas (desktop and mobile layouts stored separately; mobile auto-generated from desktop by stacking, then editable).
- Elements: text, image, shape (rectangle, circle, blob, line), icon, sticker/illustration, button.
- Drag, resize, rotate, layer order, align/distribute, snap guides, group, lock, opacity, border, shadow, per-element entrance animation.
- Used for hero collages, posters, creative intros. Pro only beyond 1 per site.

---

## 8. Editor (Canva-like experience)

### 8.1 Layout
- **Top bar:** site name, page switcher, undo/redo, device toggle (desktop/tablet/mobile), preview, language toggle (en/ar), save status, "Ask AI" button, "Get help" button, Publish.
- **Left sidebar (tabs):** Add (blocks + pre-designed sections), Pages, Layers/Outline, Theme, Media, AI.
- **Canvas (center):** the real site rendered in an iframe at device width, fully interactive for editing.
- **Right panel (contextual):** settings for whatever is selected (section, block item, text, image, button).

### 8.2 Selecting and arranging
- Hover shows the section outline and a floating toolbar: move up/down, drag handle, duplicate, change variant, style, hide on device, delete.
- Drag blocks or pre-designed sections from the Add tab onto the canvas between sections (drop indicator).
- Drag to reorder sections on canvas or in the Layers panel.
- Copy/paste sections between pages and sites.
- "Change layout" shows variant thumbnails of the same block with the user's content applied (instant switch, content kept).

### 8.3 Inline editing
- Click any text to edit in place (Tiptap): bold, italic, link, color from palette, size step, alignment, highlight.
- Click any image: replace (upload, media library, stock photos, AI-suggested), crop, focal point, filters (none, grayscale, warm, cool, duotone with palette colors), alt text.
- Click any button: label, link (page, section anchor, URL, email, phone, WhatsApp, file, booking modal), style.
- Lists (projects, testimonials, etc.): add item, reorder items by drag, duplicate, delete, directly on canvas.

### 8.4 Theme and styling ("one-click restyle")
- Palette picker: template palettes + 30 curated palettes + custom colors; "generate palette from my photo/logo" (extract colors).
- Font pair picker: at least 20 curated pairs, each with an Arabic pair (e.g. Playfair Display + Noto Naskh Arabic, Inter + IBM Plex Sans Arabic, Space Grotesk + Tajawal, Cairo, Readex Pro, Almarai, Amiri, El Messiri, Lalezar for display).
- Radius, spacing, button style, background style, motion level.
- "Shuffle style" button: applies a random tasteful palette + font pair combination; undo returns.
- "Switch template": applies another template's theme and block variants while keeping the user's content (best-effort mapping by block type).

### 8.5 Productivity
- Autosave every change (debounced 1 s); draft separate from published.
- Undo/redo (100 steps), keyboard shortcuts (Ctrl/Cmd+Z, Shift+Z, D duplicate, Delete, arrows to nudge in Freeform, Ctrl/Cmd+S save, ? shortcuts list).
- Revision history: snapshot on each publish and every 30 min of editing; view, compare and restore.
- Live device previews; "Preview" opens the real site in a new tab with a shareable private preview link (expires in 7 days).
- Spell-check; character counters on SEO fields.
- Onboarding tour of the editor on first open (skippable).
- Editor works on tablet; on phones offer a simplified "content mode" (forms per section) rather than the full canvas.

### 8.6 Media library
- Upload images (jpg/png/webp/gif/svg sanitized, max 10 MB), video (mp4/webm, max 100 MB, Pro), PDF (CV), with automatic compression and responsive variants.
- Folders, search, alt text, usage indicator ("used on 2 pages"), bulk delete.
- Stock photos via Unsplash search with attribution stored and shown where required.
- Icon library (Lucide + social brand icons), illustration/sticker packs (open-licensed set bundled with the app).
- Storage quota per plan (§12).

---

## 9. Ways to create a site

### 9.1 Template gallery
- Gallery of all templates (`TEMPLATES.md`), filterable by profession, style (minimal, bold, dark, elegant, playful, Arabic-first), and tier; search by keyword.
- Each template card: thumbnail, name, best-for tags, Pro badge, hover autoplay of a short scroll preview (pre-rendered video or animated screenshot).
- Template preview page: the full live demo site with its example content, device toggle, language toggle, "Use this template".
- "Use this template" copies the template JSON (with example content) into a new site, then opens the **Quick fill** step.

### 9.2 Quick fill (replace example content fast)
After choosing a template, a short form asks for: full name, headline, short bio, profile photo, contact method(s), up to 6 projects/works (title, image, link), and optional CV upload. The app maps these into the template, replacing example content. Unfilled parts keep clearly marked example content (highlighted in the editor with a "Replace example" badge) until edited. A checklist in the editor shows "3 example items left to replace".

### 9.3 Prompt-based website generator
- User writes a prompt (en or ar), optionally attaches a CV (PDF/DOCX), LinkedIn PDF export, existing site URL (text fetched server-side), images, or a logo.
- Optional quick choices: profession, style keywords, colors to use or avoid, languages, number of pages.
- AI returns structured output validated against the Zod schemas: chosen template (or mix of block variants), theme (palette + fonts + motion), pages, sections with content in the requested language(s), suggested stock-photo search terms (the app fetches images), SEO texts.
- Shows **3 generated directions** side by side (different templates/themes, same content); user picks one, then edits normally.
- Regenerate options: whole site, one page, one section, "more bold", "more minimal", "more professional".
- Rules in the prompt: never invent employers, degrees, clients, dates, testimonials or numbers that are not in the user's input. Missing facts become clearly marked placeholders.
- Retry once on invalid output; if still invalid, fall back to the closest template with the user's text.

### 9.4 AI assistant inside the editor
- Chat panel that edits the site via typed commands mapped to editor operations ("add a testimonials section after projects", "make the hero darker", "translate the whole site to Arabic", "shorten my about text", "rewrite project descriptions to focus on results").
- Every AI change is a single undoable step and is shown as a summary before applying when it touches more than one section.
- Field-level "Improve" menu on any text: shorter, longer, more professional, more creative, fix grammar, translate en↔ar.
- Image alt-text generation; SEO title/description generation.

### 9.5 AI interview
- A chat where the AI interviews the user one question at a time (purpose, audience, profession, achievements, projects, style preferences, colors, sites they admire, contact preferences, languages).
- Adapts follow-up questions to the answers; user can skip any question; progress indicator; can resume later.
- Ends with a **Requirements Brief** (§11.4) shown to the user for approval, then generates the site from it (same pipeline as §9.3).
- The brief is saved and can be shared with a team member (§11).

### 9.6 Import
- Import from CV/LinkedIn PDF (text extraction → content mapping).
- Duplicate an existing site.
- Later: import from Behance/Dribbble/GitHub profiles.

---

## 10. Communication and conversion features

### 10.1 Form builder
- Build forms used by Contact, Booking intake and custom forms: fields text, email, phone (with country code, default +974), textarea, dropdown, radio, checkbox, date, file upload (Pro, max 10 MB), budget range.
- Required/optional, placeholder, help text, all localized.
- After-submit: thank-you message or redirect; optional auto-reply email to the visitor.
- Spam protection: honeypot, time-to-submit check, rate limit (5/min per IP), optional Cloudflare Turnstile.
- Submissions in **Inbox** (read/unread, star, archive, delete, export CSV) + email notification to owner.

### 10.2 Direct contact methods
- Floating contact button (configurable): WhatsApp, phone call, email, Telegram, Instagram DM link, LinkedIn.
- WhatsApp button with prefilled message, e.g. "Hi, I found you through your website".
- "Save my contact" button that downloads a vCard (.vcf).
- QR code for the site (PNG/SVG download, colored with the theme).
- Downloadable CV button (PDF from media library).

### 10.3 Booking system (built-in)
- Owner defines services/meeting types: name, duration, price (display only in MVP), location (video link, phone, in-person address), buffer time, minimum notice, max per day.
- Weekly availability, date overrides, timezone (default Asia/Qatar), connect Google Calendar to block busy times (Pro).
- Visitor picks a slot shown in their own timezone, fills intake form, receives confirmation email with calendar invite (.ics) and video link if applicable; reminders 24 h and 1 h before.
- Owner sees appointments in a list/calendar, can cancel/reschedule; visitor gets reschedule/cancel link.
- Alternative: external booking link (Calendly etc.) as a CTA.

### 10.4 Live chat widget (Pro)
- Optional chat bubble on the public site. Visitor enters name + email (or just starts typing) and chats.
- Owner replies from the dashboard Inbox (realtime) and gets email/push notification for new chats; when offline, the widget shows "Leave a message" and converts to a form submission.
- Optional **AI auto-reply assistant** (Pro): answers visitor questions using only the site's content and owner-provided FAQ; always offers to pass the conversation to the owner; clearly labelled as an assistant.

### 10.5 Newsletter and subscribers
- Newsletter block collects emails (double opt-in confirmation email).
- Subscribers list with export CSV; integrations to Mailchimp / ConvertKit via Integrations (§10.7).
- MVP does not send campaigns itself.

### 10.6 Social and sharing
- Auto-generated Open Graph image per page (theme-styled, via `next/og`).
- Share buttons (WhatsApp, LinkedIn, X, Facebook, copy link).
- Social links set once in settings, displayed by header/footer/hero blocks.
- Instagram/YouTube/Behance feed embeds via Embed block.

### 10.7 Integrations ("Apps", WordPress-plugin-like)
An Apps page where users toggle and configure integrations. Each app is a module with a manifest (name, description, settings schema, where it injects). MVP apps:
- Google Analytics 4, Meta Pixel, Microsoft Clarity (Pro; user-provided IDs; shown in cookie banner)
- Google Calendar (booking busy times)
- Mailchimp / ConvertKit (subscriber sync)
- Calendly (booking CTA)
- Google Maps (contact block)
- Custom code in head/body (Pro, owner-only, with warning)

---

## 11. Team member interview and human help

Users can book an interview with a real member of the Showcase team (designer or website consultant) who learns what they need, writes a requirements brief, and optionally builds or improves the site.

### 11.1 Entry points
- Onboarding option: "Not sure where to start? Talk to our team."
- "Get help" button in the editor top bar.
- Help page in the dashboard (`/app/help`).
- Pricing page "Done-for-you" section.
- Team page on the marketing site with team member profiles.

### 11.2 Service types (configurable by admin)
| Service | Duration | Default price | What happens |
|---|---|---|---|
| Discovery interview | 20 min | Free for Pro, paid for Free plan | Team member learns requirements, produces brief |
| Design review | 30 min | Paid | Team member reviews the user's site and gives recommendations, on call, with notes |
| Done-for-you build | Interview + delivery in X days | Paid package | Team member builds the site from the brief with collaborator access |

Prices, durations, and which plans get free sessions live in admin settings, not in code.

### 11.3 Booking flow
1. User picks a service.
2. **Intake questionnaire** (prefilled from any AI interview brief): purpose, audience, profession, what they already have (CV, photos, logo, texts), style likes/dislikes, reference websites, languages, must-have features, deadline, budget (for done-for-you).
3. Choose a team member (profile cards: photo, name, specialties, languages spoken, rating) or "first available".
4. Pick a time slot from that member's availability in the user's timezone.
5. Pay if required (Stripe Checkout).
6. Confirmation email with calendar invite and video link (Google Meet via `meetings` service; fallback Jitsi); reminders 24 h and 1 h before; reschedule/cancel up to 12 h before (configurable).
7. Option: "Prefer to chat?" Users can choose an async **message-based interview** instead of a call; the team member asks questions in the message thread.

### 11.4 Requirements Brief
A structured document produced by the AI interview or by the team member after a call:
- Goals, audience, profession and positioning
- Content inventory (what the user has / what is missing)
- Pages and sections needed
- Style direction (template suggestions, palette, fonts, mood keywords, references)
- Features needed (booking, chat, blog, languages, domain)
- Open questions and next steps, deadline

Team members can draft the brief from their call notes with AI help ("turn my notes into a brief"). The user sees the brief in `/app/help`, can comment, and must approve it. An approved brief can generate a site draft directly (same pipeline as §9.3) for the team member to refine.

### 11.5 Collaboration and messaging
- Each help request has a **message thread** between user and team member (realtime, file attachments, email notification on new messages).
- **Collaborator access:** the user grants a team member edit access to a specific site (can be revoked anytime). Team member edits appear in revision history labelled with their name. Team members can never publish without the user's approval unless the user enables "allow team to publish".
- After the session: user rates the session (1–5 + comment).

### 11.6 Team workspace (`/team`, role `team_member`)
- Dashboard: upcoming sessions, new requests queue, my active projects, unread messages.
- Request detail: intake answers, brief, linked site (open in editor if access granted), message thread, private internal notes, status (new → scheduled → interviewed → brief sent → brief approved → building → delivered → closed).
- Availability management: weekly hours, time off, max sessions per day, timezone.
- Profile management: photo, bio, specialties, languages.
- Admin assigns or reassigns requests; team members can claim unassigned ones.

### 11.7 Help center
- Searchable help articles (managed by admin, markdown, en/ar).
- Contextual help links in the editor.
- Support contact form for technical issues (separate from design help).

---

## 12. Plans, limits and monetization

Store all limits in `/src/lib/plans.ts`; all gating uses one helper: `can(user, feature)` and `limit(user, resource)`, checked on the server.

| Feature | Free | Pro | Business |
|---|---|---|---|
| Sites | 1 | 3 | 10 |
| Pages per site | 3 | 25 | 25 |
| Templates | Free templates | All | All |
| Subdomain | ✓ | ✓ | ✓ |
| Custom domain | ✗ | ✓ | ✓ |
| "Made with Showcase" badge | Shown | Removable | Removable |
| Blog | 5 posts | Unlimited | Unlimited |
| Storage | 500 MB | 10 GB | 50 GB |
| Video upload | ✗ | ✓ | ✓ |
| Form submissions / month | 100 | Unlimited | Unlimited |
| Booking | 1 meeting type | Unlimited + Google Calendar | Unlimited |
| Live chat + AI chat assistant | ✗ | ✓ | ✓ |
| Integrations / Apps | Maps, Calendly | All | All |
| AI generations / month | 5 | 100 | 300 |
| Analytics | 7 days | 12 months | 12 months + export |
| Password-protected pages | ✗ | ✓ | ✓ |
| Discovery interview with team | Paid | 1 free / year | 1 free / quarter |
| Collaborators | ✗ | 1 | 5 |
| Price (placeholder) | 0 | $9/mo, $90/yr | $24/mo, $240/yr |

Additional revenue: paid team sessions, done-for-you packages, premium template purchases (one-time) for Free users. Later: template marketplace with outside designers (revenue share), Teams/agency plan.

Downgrade rules: content is never deleted; Pro-only templates/blocks stay in draft but publishing requires choosing a free alternative or upgrading; custom domain disconnects at period end; badge returns.

---

## 13. Database models (Mongoose)

```
User           { email*, name, image, locale, timezone, role: 'user'|'team_member'|'admin',
                 plan: 'free'|'pro'|'business', entitlements: string[] (purchased templates etc.),
                 aiUsage: { month, count }, notificationPrefs, createdAt, deletedAt? }
Site           { ownerId*, name, slug* (unique), templateId, draft: SiteContent, published?: SiteContent,
                 status: 'draft'|'published'|'unpublished'|'disabled', disabledReason?,
                 collaborators: { userId, role: 'editor', allowPublish: boolean, grantedAt }[],
                 integrations: { appId, enabled, settings }[], publishedAt?, updatedAt }
Revision       { siteId*, content: SiteContent, authorId, reason: 'publish'|'auto'|'restore'|'ai', createdAt }
Post           { siteId*, slug, title: Localized, excerpt, body (Tiptap JSON), coverUrl, tags[],
                 status: 'draft'|'scheduled'|'published', publishAt?, seo, authorId, createdAt }
Domain         { siteId*, ownerId*, hostname* (unique), status, lastCheckedAt, error? }
Asset          { ownerId*, siteId?, kind: 'image'|'video'|'file', url, publicId, bytes, width?, height?,
                 alt?: Localized, folder?, attribution?, createdAt }
Form           { siteId*, name, fields[], settings }
Submission     { siteId*, formId*, data, read, starred, archived, createdAt }
MeetingType    { siteId*, name, durationMin, price?, location, bufferMin, minNoticeHours, maxPerDay, intakeFormId? }
Availability   { ownerType: 'site'|'teamMember', ownerId*, timezone, weekly[], overrides[] }
Appointment    { siteId*, meetingTypeId*, visitor: { name, email, phone? }, startAt, endAt,
                 status: 'booked'|'canceled'|'completed', meetingUrl?, intake?, tokens (manage link) }
Conversation   { siteId*, visitor: { name?, email?, visitorId }, status: 'open'|'closed', lastMessageAt }
ChatMessage    { conversationId*, sender: 'visitor'|'owner'|'ai', body, createdAt }
Subscriber     { siteId*, email, status: 'pending'|'confirmed'|'unsubscribed', createdAt }
HelpService    { name: Localized, description, durationMin, price, freeForPlans[], active }
HelpRequest    { userId*, siteId?, serviceId*, intake, assignedTo?, status, brief?: Brief,
                 briefApprovedAt?, session?: { startAt, endAt, meetingUrl }, paymentId?, rating?, createdAt }
Brief          { requestId?, userId*, source: 'ai_interview'|'team', sections (see §11.4), status: 'draft'|'sent'|'approved' }
TeamMessage    { requestId*, senderId, body, attachments[], createdAt }
TeamNote       { requestId*, authorId, body, createdAt }            // internal only
AIInterview    { userId*, messages[], status: 'in_progress'|'completed', briefId? }
Subscription   { userId*, provider, customerId, subscriptionId, plan, interval, status,
                 currentPeriodEnd, cancelAtPeriodEnd }
Purchase       { userId*, type: 'template'|'help_service', itemId, amount, providerPaymentId, createdAt }
AnalyticsEvent { siteId*, pageSlug, type, target?, section?, referrer?, country?, device?, utm?,
                 visitorHash, createdAt }   // TTL 13 months
DailyStats     { siteId*, date*, views, uniques, ctaClicks, formSubmits, bookings, chats }
Report         { siteId*, reason, details?, status, createdAt }
HelpArticle    { slug, title: Localized, body: Localized, category, published }
```

Indexes on every foreign key used for listing, plus unique `Site.slug`, `Domain.hostname`, `Post {siteId, slug}`, `Subscriber {siteId, email}`.

---

## 14. Other features

### 14.1 Publishing and hosting
- Publish copies draft → published, creates a revision, revalidates cache.
- Subdomain `<slug>.<ROOT_DOMAIN>` (3–30 chars, a–z 0–9 hyphen, reserved words list).
- Custom domain (Pro): DNS instructions, verification, automatic HTTPS via Vercel Domains API; `www` redirect handling.
- Scheduled publish (Pro): publish at a set date/time.
- Unpublish; maintenance/"coming soon" page option with email capture.
- 404 page styled with the site theme; redirects manager (old path → new path).
- Password-protected pages (Pro).
- Sitemap.xml, robots.txt, canonical URLs, hreflang for bilingual sites, JSON-LD (Person / ProfessionalService).

### 14.2 Blog
- Posts with Tiptap editor (headings, images, embeds, quotes, code), cover image, tags, excerpt, SEO, draft/scheduled/published, localized title/body.
- Blog index page and post page styled by the template; RSS feed.

### 14.3 Analytics
- First-party, cookie-less tracking on live sites: page views, unique visitors (daily rotating hash, no IP stored), CTA clicks, link clicks, form submits, bookings, chats, section views, scroll depth.
- Dashboard: traffic over time, top pages, referrers, countries, devices, conversion funnel (views → CTA clicks → contacts), per-project click counts.
- Weekly email summary (opt-out).

### 14.4 Multilingual sites
- Site can be English, Arabic or both. With both: language switcher block, URL prefix `/ar`, every Localized field editable per language, "translate missing fields with AI" button, RTL layout automatically for Arabic.

### 14.5 Accessibility checker
- Editor panel listing issues: missing alt text, low contrast, heading order, empty links. One-click fixes where possible.

### 14.6 Notifications
- In-app notification center + email (and optional browser push) for: new form submission, booking, chat, team message, brief ready, session reminders, publish success, payment issues.

### 14.7 Account and privacy
- Account settings, change email, delete account (removes all sites, assets, submissions, conversations).
- Data export (JSON of sites + CSV of submissions/subscribers).
- Cookie banner auto-enabled when the user turns on third-party analytics apps.

### 14.8 Admin
- Users, sites, subscriptions, purchases, reports (disable site with reason), help services and prices, team members (invite, role), help requests overview and assignment, templates (toggle visibility/featured, set tier), help articles, plan limits view, AI usage overview.

---

## 15. Non-functional requirements

- **Security:** auth + ownership/collaborator checks on every API route; Zod validation on all inputs; sanitize rich text and SVG; embed allow-list; custom code only on owner's own site with a warning; rate limits on auth, forms, chat, AI, analytics, booking; CSP headers; webhook signature verification; signed, expiring tokens for visitor appointment links.
- **Privacy:** no third-party scripts on public sites unless the owner enables an App; cookie-less default analytics; GDPR-style deletion and export.
- **Performance:** SSR + caching on public sites; lazy-load heavy blocks and animation libraries; image CDN with responsive sizes and modern formats; editor stays responsive with 40 sections on a page.
- **Accessibility:** WCAG 2.1 AA for dashboard, editor (keyboard operable) and all templates.
- **Reliability:** autosave conflict detection (warn when another tab or collaborator saved newer content); error boundaries per block on public sites (a broken block renders nothing instead of breaking the page).
- **Code quality:** TS strict, ESLint + Prettier, no `any` in schemas/models; unit tests for schemas, migrations, plans/limits, permissions, slug rules, availability/slot calculation, timezone handling; Playwright e2e for the flows in §17.
- **Config:** secrets via env vars (§18); `.env.example` committed; `SERVICES_MODE=mock` for local development; seed script creating demo users (user, team_member, admin), demo sites from 3 templates, and sample submissions.

---

## 16. Build milestones (build in this order)

**M1 — Foundation.** Project setup, MongoDB, Auth.js, roles, i18n en/ar with RTL, design-token theming system, Zod schemas + migrations + tests, plans/permissions helpers, service interfaces with mocks, seed script.

**M2 — Block library.** Block registry and contract; build all MVP blocks and variants from §7.1 (except Freeform, Booking, Chat, Newsletter internals; render placeholders for those); a `/dev/blocks` gallery page showing every block/variant in en and ar, light and dark.

**M3 — Templates.** Template registry; implement every template in `TEMPLATES.md` as JSON with its theme and example content; template gallery and live preview pages; preview images generated by a Playwright screenshot script.

**M4 — Visual editor.** Editor layout, selection, inline text/image/button editing, drag-and-drop sections, variants switcher, theme panel (palettes, fonts, shuffle, switch template), layers, pages manager, undo/redo, autosave, media library with uploads and stock photos, device previews, keyboard shortcuts, onboarding tour.

**M5 — Publishing.** Middleware host routing, publish/unpublish, revisions, private preview links, multi-page navigation, multilingual URLs, SEO (sitemap, OG images, JSON-LD), 404, redirects, badge.

**M6 — Creation flows + AI.** Onboarding, Quick fill, prompt generator with 3 directions, AI editor assistant, Improve menu, AI interview → brief → site, CV import.

**M7 — Communication.** Form builder + inbox, floating contact button, WhatsApp, vCard, QR, CV download, booking system, newsletter + double opt-in, notifications center + emails.

**M8 — Team help.** Help services, intake questionnaire, team member profiles and availability, booking team sessions with meeting links, payments for paid sessions, briefs (AI-assisted drafting, approval), message threads, collaborator access, team workspace, ratings.

**M9 — Billing and gating.** Stripe plans, checkout, portal, webhooks, template purchases, `can()`/`limit()` gating across all features, downgrade behavior.

**M10 — Pro features.** Custom domains, Freeform block, live chat + AI chat assistant, integrations/Apps, password pages, scheduled publishing, video uploads, blog (if not done), analytics dashboard + weekly email.

**M11 — Marketing site, admin, polish.** Home page with live template demos, templates gallery, pricing, team page, help center, legal pages; admin panel; accessibility checker; Lighthouse and a11y passes on all templates; full e2e suite green.

At the end of each milestone: run lint, type-check and tests; update `README.md` with setup steps and a summary of what's done and what's next.

---

## 17. Critical end-to-end flows (must have Playwright tests)

1. Sign up → choose template → Quick fill → edit hero text inline → publish → view live subdomain site.
2. Prompt generator → pick 1 of 3 directions → publish.
3. AI interview → approve brief → generated site.
4. Visitor submits contact form → owner sees it in Inbox and gets email.
5. Visitor books an appointment → both get confirmation; owner sees it in Bookings.
6. User books a team discovery interview → team member sees it in workspace → writes brief → user approves → team member edits site with collaborator access → user publishes.
7. Upgrade to Pro → use Pro template → connect custom domain (mock service) → remove badge.
8. Switch site to Arabic + English → Arabic pages render RTL with Arabic fonts.

---

## 18. Environment variables

```
APP_NAME=Showcase
ROOT_DOMAIN=showcase.local
NEXT_PUBLIC_APP_URL=
SERVICES_MODE=mock                 # mock | live
MONGODB_URI=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
UNSPLASH_ACCESS_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_PRO_YEARLY=
STRIPE_PRICE_BUSINESS_MONTHLY=
STRIPE_PRICE_BUSINESS_YEARLY=
ANTHROPIC_API_KEY=
GOOGLE_CALENDAR_CLIENT_ID=
GOOGLE_CALENDAR_CLIENT_SECRET=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
VERCEL_API_TOKEN=
VERCEL_PROJECT_ID=
TURNSTILE_SECRET_KEY=
ANALYTICS_SALT=
```

Local subdomains: `<slug>.localhost:3000`.

---

## 19. Out of scope for this version (do not build)

- Online store / selling products and taking payments for the user's own services (display prices only)
- Sending email campaigns (collect and sync subscribers only)
- Third-party template marketplace and designer payouts
- Agency/white-label plan
- Native mobile apps
- Real-time multi-cursor co-editing (collaborators edit one at a time, with conflict warnings)
- Regional payment gateways (keep the billing interface ready)

---

## 20. Definition of done

A new user can create a beautiful site in any of four ways (template, prompt, AI interview, or team interview), edit it visually like Canva, manage it like a website (pages, blog, media, SEO, revisions), publish it on a subdomain or custom domain, receive contacts through forms, WhatsApp, booking and chat, see analytics, and pay for Pro or for team help. Everything works in English and Arabic (RTL), on mobile and desktop, and every template in `TEMPLATES.md` is implemented with its example content.
