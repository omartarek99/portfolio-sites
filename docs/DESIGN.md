# Platform design system

The visual language of the **platform** — marketing site, auth, dashboard, editor chrome, team workspace, admin — is taken from the Figma reference the product owner provided: *Positivus Landing Page Design* (`figma.com/design/zb0oja8TMU5MgGn9RCHf3C`, frame "Home", 1440 × 8356).

This document records what was measured from that file, and how it is adapted for Showcase. It does **not** apply to the sites users build: those are themed per site (see `src/styles/site.css`).

> **Not reused from the Figma file:** its illustrations (third-party licensed: Icons8 "Tokyo" by Igor Kapustin, Freepik/vectorjuice), its team photos, and the real company logos in the hero strip. Showcase uses original artwork drawn in the same style (see "Illustration style").

---

## 1. Tokens

All of these exist as Tailwind utilities (defined in `src/app/globals.css`).

| Token | Value | Utility |
|---|---|---|
| Green | `#B9FF66` | `bg-lime` `text-lime` `border-lime` |
| Dark | `#191A23` | `bg-ink` `text-ink` `border-ink` |
| Grey | `#F3F3F3` | `bg-fog` |
| White / Black | `#FFFFFF` / `#000000` | `bg-white` / `text-black` |
| Dark soft (footer inset box) | `#292A32` | `bg-ink-soft` |
| Muted text on white (added, AA) | `#595A66` | `text-ink-muted` |
| Card radius | 45px | `rounded-card` |
| Button / input radius | 14px | `rounded-btn` |
| Label radius | 7px | `rounded-label` |
| App panel radius (added) | 24px | `rounded-panel` |
| Hard shadow | `0 5px 0 0 #191A23` | `shadow-hard` (`shadow-hard-sm` = 3px) |

Extra functional colors (added, not in the reference): `danger`, `warning`, `success`, `info`, each with a `-soft` background.

### Typography — Space Grotesk

| Style | Desktop | Mobile | Utility |
|---|---|---|---|
| h1 | 60px Medium | 43px | `text-display-m md:text-display font-medium` |
| h2 | 40px Medium | 36px | `text-h2-m md:text-h2 font-medium` |
| h3 | 30px Medium | 26px | `text-h3-m md:text-h3 font-medium` |
| h4 | 20px Medium | 18px | `text-[18px] md:text-h4 font-medium` |
| p | 18px Regular | 16px / 24px | `text-base md:text-body` |
| Nav links, buttons, hero paragraph | 20px / 28px Regular | 16–18px | `text-lead` |

Headings are **Medium (500)**, never bold. Arabic falls back to Readex Pro automatically (it is in the `font-sans` stack); never apply negative letter-spacing to Arabic.

### Layout

- Canvas 1440px, side padding 100px → **content width 1240px**. Use `mx-auto w-full max-w-[1240px] px-5 md:px-10 xl:px-0` (a `Container` component exists in the UI kit).
- Vertical rhythm on the landing page: ~140px between sections on desktop (~70px mobile); 80px between a section's heading row and its content (40px mobile).

---

## 2. Signature elements

### Highlighted heading label
Text sitting on a rounded color block: `background #B9FF66; border-radius 7px; padding 0 7px`. Utilities: `label-lime`, `label-white`, `label-fog`. Multi-line headings stack one label per line.

**Section heading row:** an h2 label on the left and a paragraph (18px, max-width 580px) to its right, 40px gap, top-aligned. On mobile they stack and center.

### Card
`border: 1px solid #191A23; border-radius: 45px; box-shadow: 0 5px 0 0 #191A23; padding: 50px` (mobile: radius 45px, padding 30px). Background is one of grey / green / dark / white. On dark cards text is white and labels are white or green.

### Buttons — padding `20px 35px`, radius 14px, text 20px/28px Regular

| Variant | Look |
|---|---|
| Primary | `bg #191A23`, white text |
| Secondary | transparent, `1px solid #191A23`, black text |
| Tertiary | `bg #B9FF66`, black text (used on dark surfaces) |

Hover (added): primary → green bg with dark text; secondary → dark bg with white text; tertiary → white bg. Pressed: translate down 2px.

### Circle-arrow link
A 41px circle with an up-right arrow (↗) followed by "Learn more" (20px/28px), 15px gap. On light cards: dark circle, green arrow, black text. On dark cards: white circle, dark arrow, white text. Text-only variant on dark blocks: green text + green arrow. In RTL the arrow mirrors (↖).

---

## 3. Reference sections (measured)

**Navigation bar** — logo left (36px tall); links 20px/28px with 40px gaps; outlined "Request a quote" button at the end. 60px from the top of the page.

**Hero** — two columns. Left (max 531px): h1, paragraph 20px/28px (max 498px), primary button; 35px gaps. Right: illustration ≈ 600 × 515. Below, 70px gap: a full-width row of six greyscale wordmarks, 48px tall, `justify-between`.

**Services** — 2 columns × 3 rows, 40px gaps. Cards 600 × 310, padding 50px. Backgrounds cycle **grey, green, dark, grey, green, dark**. Left: two-line h3 heading as stacked labels (green labels on grey cards; white labels on green cards; white or green labels on dark cards) and, 93px below, a circle-arrow link. Right: a 210px-wide illustration.

**CTA block** — one grey card, radius 45px, 347px tall, padding-inline 60px. h3 + paragraph (max 500px) + primary button, 26px gaps. An illustration (≈ 494 × 394) overflows the card's top and bottom on the right side.

**Case studies** — one dark card, radius 45px, padding 70px 60px. Three columns divided by 1px white vertical rules (64px gaps). Each: white paragraph 18px (max 286px) and a green "Learn more ↗" text link 20px below.

**Process (accordion)** — stacked cards, 30px gap. Each: radius 45px, border, hard shadow, padding 41px 60px. Row: number (60px Medium) + title (30px Medium), 25px gap; at the end a 58px circle button (grey fill, 1px dark border) showing **+** when closed and **−** when open. Closed = grey background. Open = **green** background, then a 1px black rule and an 18px paragraph, 30px gaps.

**Team** — 3 columns, 40px gaps. Cards white, radius 45px, border, hard shadow, padding 40px 35px. Top row: avatar (~100px) clipped to a four-petal blob with a black copy of the blob offset behind it, photo tinted green (multiply); beside it, bottom-aligned, name (20px Medium) and role (18px); a 34px dark circle LinkedIn icon in the top-end corner. Then a 1px rule and an 18px description. 28px gaps. Below the grid, a primary button aligned to the end.

**Testimonials** — one dark container, radius 45px, 625px tall. A horizontally scrolling row of 606px cards (50px gap), the active one centered. Card = speech bubble (1px **green** border, radius 45px, white 18px text, padding ≈ 48px 52px) with a small triangular tail on the bottom-start side; below it, name in green (20px Medium) and role in white (18px). Controls centered at the bottom: previous arrow, five four-point-star dots (active green, others white), next arrow.

**Contact** — one grey card, radius 45px, padding 60px 100px. Form column 556px wide: a radio group (28px circles; selected shows a green dot), then fields 25px apart — label 16px/28px above an input (59px tall, padding 18px 30px, radius 14px, 1px black border, white, placeholder `#898989`) — a 190px textarea, and a full-width primary button. 40px between groups. An illustration is clipped by the card's end edge.

**Footer** — one dark block with only the **top** corners rounded (45px), padding 55px 60px 50px. Row 1: white logo · white underlined links (18px, 40px gaps) · three white 30px circular social icons. Row 2 (66px below): start — a green label "Contact us:" (20px Medium) over white 18px contact lines; end — an inset box (`#292A32`, radius 14px, padding 58px 40px) holding an email input (transparent, 1px white border, radius 14px, padding 22px 35px) and a tertiary (green) button. Row 3: 1px white rule, then copyright and an underlined "Privacy Policy", 18px/28px.

---

## 4. Illustration style (original artwork)

Draw illustrations as inline SVG React components (`src/components/illustrations/*`). Rules:

- **Flat and geometric.** Three fills only: ink `#191A23`, white, lime `#B9FF66`. White shapes get a 1–1.5px ink outline. No gradients, blurs or soft shadows.
- **Motifs:** four-point sparkle stars (ink or lime); multi-point starbursts as outlines; thin concentric ellipses/rings tilted ≈ 29°; solid circles carrying a simple glyph; browser windows with three dots in the title bar; cursor arrows; simple smiling faces.
- **Subject matter for Showcase:** browser windows showing tiny portfolio layouts, a cursor dragging a block, a color-swatch fan, type specimens ("Aa" and "أب"), speech bubbles, a calendar tile, a paper plane, a QR tile.
- Decorative only: `aria-hidden="true"`. Mirror direction-dependent artwork in RTL.
- Motion: a slow float (`animate-float`) or slow spin (`animate-spin-slow`) on one or two small elements at most; none under `prefers-reduced-motion`.

---

## 5. Adapting it to the app (dashboard, editor, team, admin)

The landing-page sizes are too large for dense tools. Inside the app keep the *language* and shrink the *scale*:

| | Marketing | App |
|---|---|---|
| Page title | `text-display` | 30px Medium, often with one `label-lime` word |
| Section title | `text-h2` | 20px Medium |
| Body | 18px | 15–16px |
| Card | radius 45px, padding 50px, `shadow-hard` | `rounded-panel` (24px), padding 20–24px, 1px ink border, `shadow-hard-sm` on primary cards only |
| Button | 20px text, padding 20px 35px | 15px text, padding 10px 18px, radius 12px (`size="sm"`/`"md"` in the kit) |
| Inputs | 59px tall | 44px tall, radius 12px, 1px ink border |

- Backgrounds: white for work surfaces, `bg-fog` for app chrome and empty areas, `bg-ink` for the primary sidebar and for emphasis blocks.
- Lime is the **only** accent: active nav item, selection, focus highlights, primary badges, progress. Never use lime for body text on white (contrast).
- Status colors come from the functional tokens with their `-soft` backgrounds.
- Every interactive element has a visible `:focus-visible` outline (2px ink; 2px lime on dark surfaces — add the `on-dark` class to dark containers).
- Motion is quick and small: 150–220ms, `ease-out-expo`; popovers use `animate-pop-in`.

## 6. Accessibility notes specific to this palette

- Lime on white fails contrast: lime is a **background**, with ink text on top (15.4:1). On ink, lime text is fine (13.9:1).
- `text-ink-muted` (`#595A66`) on white = 6.8:1; on `bg-fog` = 6.1:1. Do not go lighter for text.
- Hard shadows and 1px borders are decorative; never rely on them alone to show state.
