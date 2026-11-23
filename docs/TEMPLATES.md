# Showcase — Template Catalog

> Companion to `SPEC.md`. Implement every template below as `/src/templates/<id>/template.json` (a full `SiteContent` with theme + example content) plus preview images.
> All people, companies and numbers below are **fictional example content**. Images: use Unsplash stock photos (store attribution) or bundled placeholder art. Never use photos of real public figures.
> Every template must ship with **English and Arabic example content** and be checked in RTL.

---

## 0. Rules for all templates

- Built only from blocks/variants in `SPEC.md §7`. If a template needs a new variant, add it to the block library so other templates can reuse it.
- Each template defines: id, name, category, tier, best-for tags, style tags, theme (palette hex, fonts incl. Arabic, radius, spacing, button style, background, motion), navigation style, pages, sections (block + variant + animation), and a "signature detail" — the one design idea that makes it memorable.
- Example content must be realistic and complete (no lorem ipsum), so the template looks finished in the gallery.
- Each template must look good with **the user's own content** too: test with short and long names, 0 / 3 / 12 projects, no photo, and Arabic.
- Contrast AA for all text on all palettes.
- Each template gets 3 alternative palettes in addition to its default.

### Template summary

| # | Template | Best for | Style | Tier |
|---|---|---|---|---|
| 1 | Aurora | Creative generalist, job seeker | Cinematic dark, story scroll | Free |
| 2 | Editorial | Writer, journalist, marketer | Magazine, serif, print-like | Free |
| 3 | Launch | Freelancer, consultant | Product-reveal landing page | Pro |
| 4 | Minimal CV | Job seeker, any profession | Clean, recruiter-friendly | Free |
| 5 | Noir Lens | Photographer | Dark, full-bleed imagery | Pro |
| 6 | Grid Pop | Graphic / UI designer | Bold brutalist colors | Free |
| 7 | Terminal | Developer | Code / command line | Free |
| 8 | Atelier | Artist, illustrator | Gallery wall, warm paper | Pro |
| 9 | Bloom Coach | Coach, tutor, therapist-style services | Warm, soft, booking-first | Free |
| 10 | Majlis | Professional, Arabic-first | Elegant, geometric patterns | Pro |
| 11 | Creator Hub | Content creator | Link-in-bio + media kit, playful | Free |
| 12 | Blueprint | Architect, interior designer | Grid lines, large imagery | Pro |
| 13 | Scholar | Teacher, academic, researcher | Calm, structured | Free |
| 14 | Motion Reel | Videographer, animator, editor | Video-first, cinematic | Pro |
| 15 | Bento | Anyone, modern personal page | Bento-grid cards | Free |
| 16 | Founder | Startup founder, small business | One-page pitch | Pro |

---

## 1. Aurora

- **Category:** Creative / personal · **Tier:** Free · **Best for:** creative generalist, job seeker, marketer
- **Style tags:** dark, cinematic, gradient, story
- **Signature detail:** a slow-moving aurora gradient (blurred animated blobs in primary/accent) behind the hero; each section reveals like a film scene as you scroll.
- **Theme**
  - Mode: dark · Palette: background `#0B0D17`, surface `#141729`, text `#F4F5FB`, mutedText `#9AA0BC`, primary `#7C5CFF`, secondary `#22D3EE`, accent `#F472B6`, border `#262A45`
  - Fonts: heading **Space Grotesk** / body **Inter** · Arabic: **Readex Pro** / **IBM Plex Sans Arabic**
  - Radius lg · Spacing airy · Buttons glass · Motion cinematic
- **Navigation:** floating pill, one-page anchors
- **Home page sections**
  1. Hero — variant *animated text* (word rotate: "designer / storyteller / problem solver") — entrance blur
  2. About — *two-column story* — slide-up
  3. Stats — *counters* — stagger
  4. Experience — *vertical timeline* with glowing line that fills on scroll
  5. Projects — *alternating rows* with parallax images
  6. Testimonials — *single big quote* carousel
  7. CTA band — *gradient*
  8. Contact — *form + details*
- **Example content (EN)**
  - Name: **Layla Haddad** · Headline: "Brand designer turning ideas into stories people remember." · Location: Doha · Availability: open to work
  - About: "I've spent 7 years helping startups and cultural institutions find their visual voice — from first logo to full campaigns."
  - Stats: 7 years · 40+ brands · 3 design awards
  - Experience: Senior Brand Designer, Nova Studio (2021–now) · Designer, Pixel & Pine (2018–2021) · Junior Designer, Freelance (2017–2018)
  - Projects: "Sahra Coffee rebrand" · "Museum night campaign" · "Wavelength fintech app identity"
  - Testimonial: "Layla gave our brand a personality we didn't know we had." — Omar K., founder, Sahra Coffee
  - CTA: "Have a story to tell? Let's talk." → Contact
- **Example content (AR)**
  - الاسم: **ليلى حداد** · العنوان: "مصممة هوية بصرية أحوّل الأفكار إلى قصص لا تُنسى." · الدوحة · متاحة للعمل
  - نبذة: "أمضيت سبع سنوات أساعد الشركات الناشئة والمؤسسات الثقافية في إيجاد صوتها البصري، من أول شعار حتى الحملات الكاملة."

---

## 2. Editorial

- **Category:** Writing / marketing · **Tier:** Free · **Best for:** writer, journalist, copywriter, marketer
- **Style tags:** magazine, serif, light, print
- **Signature detail:** the hero is a magazine cover — the person's name as a huge masthead, headline as the cover line, issue number and date in the corner; sections are styled like articles with drop caps and pull quotes.
- **Theme**
  - Mode: light · Palette: background `#F7F3EC`, surface `#FFFFFF`, text `#1A1A1A`, mutedText `#6B645A`, primary `#B3261E`, secondary `#1A1A1A`, accent `#E8B931`, border `#DDD5C7`
  - Fonts: heading **Playfair Display** / body **Source Serif 4** · Arabic: **Amiri** / **Noto Naskh Arabic**
  - Radius none · Spacing comfortable · Buttons outline · Motion subtle
- **Navigation:** centered logo (name) top bar; pages: Home, Articles (blog), About, Contact
- **Home page sections**
  1. Hero — *magazine cover* (full-bleed portrait, masthead, cover lines)
  2. About — *big quote*
  3. Projects — *hover-reveal list* titled "Featured stories"
  4. Clients — *grid* titled "As seen in"
  5. Blog list — *featured + list*
  6. Newsletter — *inline* "Get my weekly letter"
  7. Contact — *minimal*
- **Example content (EN)**
  - Name: **Yousef Al-Amin** · Headline: "Writer covering technology, culture and the Gulf's creative economy." · Cover line: "Issue 07 — Stories that travel"
  - Featured stories: "The quiet rise of Doha's indie game studios" · "Why Arabic UX writing needs its own rules" · "Inside a 48-hour startup weekend"
  - As seen in: The Gulf Review, Desert Tech Weekly, Majaz Magazine (fictional)
  - Blog posts (3 example posts with cover images and excerpts)
- **Example content (AR)**
  - **يوسف الأمين** · "كاتب يغطي التقنية والثقافة والاقتصاد الإبداعي في الخليج." · "العدد ٠٧ — قصص تسافر"

---

## 3. Launch

- **Category:** Services / business · **Tier:** Pro · **Best for:** freelancer, consultant, agency of one
- **Style tags:** bold, product, gradient, conversion
- **Signature detail:** presents the person like a product launch — a hero with a glowing 3D-tilt card of the person's photo, "features" grid for skills, pricing table for services, and a sticky "Book a call" bar.
- **Theme**
  - Mode: light · Palette: background `#FFFFFF`, surface `#F5F7FF`, text `#0E1222`, mutedText `#5B6280`, primary `#2F5BFF`, secondary `#00C2A8`, accent `#FFB020`, border `#E3E7F5`
  - Fonts: heading **Sora** / body **Inter** · Arabic: **Tajawal** / **IBM Plex Sans Arabic**
  - Radius lg · Spacing comfortable · Buttons pill · Motion expressive
- **Navigation:** top bar with CTA button; pages: Home, Case studies, Contact
- **Home page sections**
  1. Hero — *3D-tilt card* with two CTAs (Book a call / See work)
  2. Clients — *marquee*
  3. Services — *cards* titled "What I do"
  4. Process — *numbered steps* (Discover → Design → Launch → Grow)
  5. Projects — *bento* titled "Results"
  6. Testimonials — *wall*
  7. Pricing — *3 tiers*
  8. FAQ — *accordion*
  9. Booking — *inline calendar* ("Free 20-min intro call")
- **Example content (EN)**
  - Name: **Sara Mansour** · Headline: "I help small businesses launch websites that actually bring in customers."
  - Services: Website strategy · Landing page design · Conversion audits
  - Process: 4 steps with one-line descriptions
  - Results: "Bayt Bakery — online orders up 3×" · "LinguaKids — 1,200 sign-ups in launch month" · "Falcon Fitness — booking rate doubled"
  - Pricing: Starter $900 · Growth $2,400 · Partner from $4,000/month
  - FAQ: timeline, revisions, payment, Arabic sites
- **Example content (AR)**
  - **سارة منصور** · "أساعد الشركات الصغيرة على إطلاق مواقع تجلب العملاء فعلًا."

---

## 4. Minimal CV

- **Category:** Career · **Tier:** Free · **Best for:** job seekers in any field, graduates, teachers, engineers
- **Style tags:** minimal, clean, professional, light
- **Signature detail:** a page that reads like a beautifully typeset CV, with a sticky side column (photo, contact, download CV button) and a print stylesheet that produces a clean one-page PDF.
- **Theme**
  - Mode: light · Palette: background `#FFFFFF`, surface `#F8F9FA`, text `#111827`, mutedText `#6B7280`, primary `#0F766E`, secondary `#111827`, accent `#14B8A6`, border `#E5E7EB`
  - Fonts: heading **Inter** / body **Inter** · Arabic: **IBM Plex Sans Arabic** / **IBM Plex Sans Arabic**
  - Radius sm · Spacing compact · Buttons solid · Motion subtle
- **Navigation:** minimal (side column on desktop, top on mobile)
- **Home page sections**
  1. Hero — *minimal name-only* + availability badge + Download CV
  2. About — *text + portrait*
  3. Experience — *compact CV list*
  4. Education — *list*
  5. Skills — *tags*
  6. Projects — *grid* (small)
  7. Contact — *minimal* with email, phone, LinkedIn
- **Example content (EN)**
  - Name: **Ahmed Saleh** · Headline: "Mechanical engineer · Energy efficiency · Open to roles in Qatar"
  - Experience: Project Engineer, GulfBuild Co. (2022–now) · Graduate Engineer, Arabian Utilities (2020–2022)
  - Education: B.Sc. Mechanical Engineering, 2020
  - Skills: AutoCAD, HVAC design, energy audits, project planning, Arabic & English
- **Example content (AR)**
  - **أحمد صالح** · "مهندس ميكانيكي · كفاءة الطاقة · متاح لفرص العمل في قطر"

---

## 5. Noir Lens

- **Category:** Photography · **Tier:** Pro · **Best for:** photographer (weddings, portraits, events, products)
- **Style tags:** dark, elegant, image-first
- **Signature detail:** full-screen hero slideshow with slow Ken Burns zoom; gallery opens into an immersive lightbox; category filter (Weddings, Portraits, Events) with smooth re-layout animation.
- **Theme**
  - Mode: dark · Palette: background `#0A0A0A`, surface `#151515`, text `#F2F2F2`, mutedText `#9C9C9C`, primary `#C9A96E`, secondary `#F2F2F2`, accent `#C9A96E`, border `#2A2A2A`
  - Fonts: heading **Cormorant Garamond** / body **Inter** · Arabic: **El Messiri** / **Noto Kufi Arabic**
  - Radius none · Spacing airy · Buttons outline · Motion cinematic
- **Navigation:** minimal transparent top bar; pages: Home, Portfolio, Packages, Contact
- **Home page sections**
  1. Hero — *full-bleed image* slideshow
  2. Gallery — *masonry* with category filter
  3. About — *text + portrait*
  4. Services — *pricing table* titled "Packages"
  5. Testimonials — *carousel*
  6. Booking — *button opening modal* ("Check my availability")
  7. Contact — *split with map*
- **Example content (EN)**
  - Name: **Noor Studio — Mariam Al-Khatib** · Headline: "Wedding & portrait photography in Doha. Quiet moments, captured honestly."
  - Packages: Portrait session QAR 1,200 · Engagement QAR 2,500 · Full wedding from QAR 9,000
  - Testimonial: "We cried looking at our photos. Every moment was there." — Huda & Faisal
- **Example content (AR)**
  - **نور ستوديو — مريم الخطيب** · "تصوير أعراس وبورتريه في الدوحة. لحظات هادئة بصدق."

---

## 6. Grid Pop

- **Category:** Design · **Tier:** Free · **Best for:** graphic designer, UI/UX designer, design student
- **Style tags:** bold, brutalist, colorful, playful
- **Signature detail:** thick black borders, hard offset shadows, bright color blocks, and project cards that tilt and shift their shadow on hover; a sticker-style "Available!" badge that wobbles.
- **Theme**
  - Mode: light · Palette: background `#FFF8E7`, surface `#FFFFFF`, text `#111111`, mutedText `#444444`, primary `#FF5C39`, secondary `#3D5AFE`, accent `#FFD600`, border `#111111`
  - Fonts: heading **Archivo Black** / body **Space Grotesk** · Arabic: **Lalezar** / **Cairo**
  - Radius md · Spacing comfortable · Buttons brutal · Motion expressive
- **Navigation:** top bar with brutal buttons; pages: Home, Case study pages, About
- **Home page sections**
  1. Hero — *collage* (Freeform-like arrangement using stickers and shapes; on Free plan uses the fixed collage variant)
  2. Projects — *grid* with colored cards
  3. Skills — *icon grid*
  4. Clients — *marquee*
  5. About — *text + portrait*
  6. CTA band — *simple* "Let's make something loud"
  7. Contact — *form + details*
- **Example content (EN)**
  - Name: **Khalid Rahman** · Headline: "UI/UX designer who makes apps people actually enjoy using."
  - Projects: "Qareeb delivery app" (case study page with problem/process/result) · "Souq dashboard redesign" · "Plantly — habit tracker"
  - Skills: Figma, user research, prototyping, design systems, motion
- **Example content (AR)**
  - **خالد رحمن** · "مصمم واجهات وتجربة مستخدم أصنع تطبيقات يستمتع بها الناس."

---

## 7. Terminal

- **Category:** Tech · **Tier:** Free · **Best for:** developer, data scientist, security engineer
- **Style tags:** dark, monospace, technical
- **Signature detail:** the hero is a terminal window that "types" commands (`whoami`, `ls projects`, `cat skills.txt`) and prints the answers; visitors can type a few commands themselves (`help`, `projects`, `contact`).
- **Theme**
  - Mode: dark · Palette: background `#0D1117`, surface `#161B22`, text `#E6EDF3`, mutedText `#8B949E`, primary `#3FB950`, secondary `#58A6FF`, accent `#F778BA`, border `#30363D`
  - Fonts: heading **JetBrains Mono** / body **Inter** · Arabic: **IBM Plex Sans Arabic** / **IBM Plex Sans Arabic**
  - Radius sm · Spacing comfortable · Buttons outline · Motion subtle
- **Navigation:** top bar styled as tabs (`home.tsx`, `projects.md`, `blog/`, `contact.sh`)
- **Home page sections**
  1. Hero — *animated text* terminal variant
  2. Projects — *cards* with GitHub stars/language tags
  3. Skills — *bars*
  4. Experience — *compact CV list*
  5. Blog list — *list* ("Notes")
  6. Contact — *minimal* with GitHub, LinkedIn, email
- **Example content (EN)**
  - Name: **Omar Farouk** · Headline: "Full-stack developer · React, Node, MongoDB · building tools for education"
  - Projects: "ReelLearn — short-video learning platform" · "QuizForge — exam generator API" · "Arabic text utils (open source)"
  - Skills: TypeScript, React, Node.js, MongoDB, Docker, AWS
- **Example content (AR)**
  - **عمر فاروق** · "مطور ويب متكامل · React وNode وMongoDB · أبني أدوات للتعليم"

---

## 8. Atelier

- **Category:** Art · **Tier:** Pro · **Best for:** artist, illustrator, calligrapher, crafts maker
- **Style tags:** warm, textured, gallery, elegant
- **Signature detail:** a paper-texture background; artworks hang in a "gallery wall" layout with subtle frames and shadows; clicking opens a detail view with title, medium, size and "Enquire" button.
- **Theme**
  - Mode: light · Palette: background `#F3EDE4`, surface `#FBF8F3`, text `#2B2420`, mutedText `#7A6E64`, primary `#8C4A2F`, secondary `#3F5B4C`, accent `#D9A441`, border `#E0D5C6`
  - Fonts: heading **Fraunces** / body **Lora** · Arabic: **Aref Ruqaa** (display) / **Noto Naskh Arabic**
  - Radius none · Spacing airy · Buttons outline · Motion subtle · Background: paper noise
- **Navigation:** centered logo; pages: Home, Works, Exhibitions, Commissions, Contact
- **Home page sections**
  1. Hero — *centered big type* with signature-style name
  2. Gallery — *justified lightbox* (gallery wall)
  3. About — *big quote*
  4. Rich text — "Exhibitions" list
  5. Services — *list with icons* ("Commissions")
  6. Newsletter — *card* ("Studio notes, once a month")
  7. Contact — *form + details* with artwork enquiry dropdown
- **Example content (EN)**
  - Name: **Rania Youssef** · Headline: "Contemporary Arabic calligraphy and ink paintings."
  - Works: 8 artworks with title, medium ("Ink on paper"), size ("50 × 70 cm"), year
  - Exhibitions: "Lines of Light", group show, 2025 · "Breath", solo show, 2024
- **Example content (AR)**
  - **رانيا يوسف** · "خط عربي معاصر ولوحات بالحبر."

---

## 9. Bloom Coach

- **Category:** Services · **Tier:** Free · **Best for:** life/career coach, tutor, trainer, nutrition or fitness coach, private teacher
- **Style tags:** warm, soft, friendly, light
- **Signature detail:** soft organic blob shapes behind photos, gentle floating animation; booking is everywhere — hero button, sticky mobile "Book a session" bar, and an inline calendar.
- **Theme**
  - Mode: light · Palette: background `#FFFBF7`, surface `#FFFFFF`, text `#2D2A32`, mutedText `#6E6A75`, primary `#E07A5F`, secondary `#81B29A`, accent `#F2CC8F`, border `#F0E6DD`
  - Fonts: heading **DM Serif Display** / body **DM Sans** · Arabic: **Almarai** / **Almarai**
  - Radius full · Spacing airy · Buttons pill · Motion subtle
- **Navigation:** top bar with "Book a session" CTA; pages: Home, Programs, Blog, Contact
- **Home page sections**
  1. Hero — *split image* with blob shape
  2. About — *text + portrait* ("Hi, I'm…")
  3. Services — *cards* ("Ways to work with me")
  4. Process — *horizontal flow*
  5. Testimonials — *carousel* with photos and star ratings
  6. Booking — *inline calendar*
  7. FAQ — *accordion*
  8. Newsletter — *inline* (free guide download)
- **Example content (EN)**
  - Name: **Hana Ibrahim** · Headline: "Career coaching for teachers and graduates ready for their next step."
  - Programs: "1:1 career clarity session (60 min)" · "CV & interview prep (3 sessions)" · "Group workshop: market yourself"
  - Testimonial: "After two sessions I finally knew how to present myself in interviews." — Dana, teacher
  - Free guide: "10 ways to stand out in your next interview"
- **Example content (AR)**
  - **هناء إبراهيم** · "إرشاد مهني للمعلمين والخريجين المستعدين لخطوتهم التالية."

---

## 10. Majlis

- **Category:** Professional · **Tier:** Pro · **Best for:** lawyer, consultant, executive, academic, government professional; **Arabic-first** (default locale `ar`, RTL)
- **Style tags:** elegant, luxury, geometric, bilingual
- **Signature detail:** subtle Islamic geometric line pattern (SVG, generated, theme-colored) in section backgrounds and dividers; gold hairline frames; bilingual name lockup (Arabic above English).
- **Theme**
  - Mode: light (dark alternative) · Palette: background `#FBFAF7`, surface `#FFFFFF`, text `#1F2A2E`, mutedText `#667075`, primary `#7A1E3A` (maroon), secondary `#1F4E5A`, accent `#B8964F` (gold), border `#E6DFD1`
  - Fonts: Arabic heading **El Messiri** / Arabic body **Noto Kufi Arabic** · heading **Cormorant Garamond** / body **Inter**
  - Radius sm · Spacing airy · Buttons outline · Motion subtle · Background: pattern
- **Navigation:** top bar with language switch prominent; pages: الرئيسية، الخبرات، المقالات، تواصل
- **Home page sections**
  1. Hero — *centered big type* with pattern frame
  2. About — *two-column story*
  3. Stats — *big numbers*
  4. Experience — *cards*
  5. Services — *list with icons* (areas of expertise)
  6. Blog list — *grid* (articles)
  7. Contact — *split with map*
- **Example content (AR)**
  - **د. عبدالله الكواري** · "مستشار في السياسات التعليمية والتطوير المؤسسي"
  - الأرقام: ٢٠ عامًا من الخبرة · ٣٥ مشروعًا وطنيًا · ١٢ ورقة بحثية
  - مجالات الخبرة: تطوير المناهج · تقييم الأداء المؤسسي · قيادة التغيير
- **Example content (EN)**
  - **Dr. Abdullah Al-Kuwari** · "Advisor in education policy and institutional development"

---

## 11. Creator Hub

- **Category:** Creator · **Tier:** Free · **Best for:** content creator, influencer, podcaster, streamer
- **Style tags:** playful, gradient, mobile-first, link-in-bio
- **Signature detail:** a phone-first link hub (big rounded buttons with icons and thumbnails, animated gradient background) that expands on desktop into a full media kit with audience stats and brand-deal rates.
- **Theme**
  - Mode: light · Palette: background `#FDF2FF`, surface `#FFFFFF`, text `#1E1033`, mutedText `#6B5B85`, primary `#A855F7`, secondary `#EC4899`, accent `#22D3EE`, border `#EFD9FF`
  - Fonts: heading **Poppins** / body **Poppins** · Arabic: **Cairo** / **Cairo**
  - Radius full · Spacing comfortable · Buttons pill · Motion expressive · Background: gradient
- **Navigation:** minimal; pages: Home (links), Media kit, Contact
- **Home page sections**
  1. Hero — *centered* avatar, name, one-line bio, social icons
  2. Link hub — *stacked buttons* (latest video, podcast, shop, newsletter)
  3. Video — *video grid* (latest 3)
  4. Media kit — audience stats, platforms, rates
  5. Clients — *marquee* ("Brands I've worked with")
  6. Contact — *minimal* ("Business enquiries")
- **Example content (EN)**
  - Name: **@reemcooks — Reem Al-Saadi** · Bio: "Easy Gulf recipes in under 30 minutes 🍲"
  - Links: "New video: 15-min machboos" · "My recipe e-book" · "Podcast: Kitchen Talks"
  - Media kit: Instagram 185K · TikTok 320K · YouTube 64K · Audience 68% women, 25–34 · Rates: Reel from $600
- **Example content (AR)**
  - **ريم تطبخ — ريم السعدي** · "وصفات خليجية سهلة في أقل من ٣٠ دقيقة 🍲"

---

## 12. Blueprint

- **Category:** Architecture / interiors · **Tier:** Pro · **Best for:** architect, interior designer, landscape designer, engineer
- **Style tags:** minimal, grid, monochrome, spacious
- **Signature detail:** visible thin grid lines and coordinate labels across the page like technical drawings; project images reveal with a mask wipe; project pages show plans + photos side by side with a before/after slider.
- **Theme**
  - Mode: light · Palette: background `#F4F4F2`, surface `#FFFFFF`, text `#151515`, mutedText `#707070`, primary `#151515`, secondary `#3A6EA5`, accent `#D94F30`, border `#D6D6D2`
  - Fonts: heading **Manrope** / body **Manrope** · Arabic: **Readex Pro** / **Readex Pro**
  - Radius none · Spacing airy · Buttons outline · Motion subtle
- **Navigation:** side nav; pages: Home, Projects, Studio, Contact
- **Home page sections**
  1. Hero — *full-bleed image* with coordinate overlay
  2. Projects — *alternating rows*
  3. Gallery — *before/after slider*
  4. Process — *numbered steps*
  5. About — *two-column story*
  6. Clients — *grid*
  7. Contact — *split with map*
- **Example content (EN)**
  - Name: **Studio Faris — Faris Nasser** · Headline: "Architecture and interiors shaped by light, climate and culture."
  - Projects: "Courtyard House, Al Wakra" · "Lusail co-working floor" · "Desert retreat pavilion"
- **Example content (AR)**
  - **استوديو فارس — فارس ناصر** · "عمارة وتصميم داخلي يشكّلهما الضوء والمناخ والثقافة."

---

## 13. Scholar

- **Category:** Education / academia · **Tier:** Free · **Best for:** teacher, lecturer, researcher, trainer
- **Style tags:** calm, structured, light, readable
- **Signature detail:** a clean two-column layout with a sticky table of contents; publications filterable by year and type; a "Teaching" section with course cards and downloadable resources.
- **Theme**
  - Mode: light · Palette: background `#FFFFFF`, surface `#F4F7FB`, text `#14213D`, mutedText `#5C6B84`, primary `#1D4ED8`, secondary `#0E7490`, accent `#F59E0B`, border `#DCE3EE`
  - Fonts: heading **Merriweather** / body **Source Sans 3** · Arabic: **Noto Naskh Arabic** / **Noto Sans Arabic**
  - Radius md · Spacing comfortable · Buttons solid · Motion subtle
- **Navigation:** top bar; pages: Home, Teaching, Publications, Talks, Blog, Contact
- **Home page sections**
  1. Hero — *text + portrait* variant of split image
  2. About — *text + portrait*
  3. Services — *cards* titled "Courses & workshops"
  4. Publications — *list with citation*
  5. Video — *embed* ("Recent talk")
  6. Testimonials — *wall* ("What students say")
  7. Contact — *form + details*
- **Example content (EN)**
  - Name: **Ms. Fatima Al-Hajri** · Headline: "English teacher and teacher trainer · Making learning active and joyful."
  - Courses: "Active learning strategies (workshop)" · "Classroom management for new teachers" · "Self-marketing for educators"
  - Publications/resources: 3 articles + 2 downloadable lesson-plan PDFs
  - Testimonial: "Her workshop changed how I run my classroom." — new teacher
- **Example content (AR)**
  - **أ. فاطمة الهاجري** · "معلمة لغة إنجليزية ومدربة معلمين · أجعل التعلم نشطًا وممتعًا."

---

## 14. Motion Reel

- **Category:** Video · **Tier:** Pro · **Best for:** videographer, motion designer, editor, filmmaker
- **Style tags:** dark, cinematic, video-first
- **Signature detail:** autoplaying muted showreel as the hero background with a "Play with sound" button; project tiles play video previews on hover; cursor becomes a "Play" circle over videos.
- **Theme**
  - Mode: dark · Palette: background `#050505`, surface `#111111`, text `#FFFFFF`, mutedText `#A3A3A3`, primary `#FF3B3B`, secondary `#FFFFFF`, accent `#FFC53D`, border `#262626`
  - Fonts: heading **Bebas Neue** / body **Inter** · Arabic: **Lalezar** / **Noto Kufi Arabic**
  - Radius none · Spacing comfortable · Buttons solid · Motion cinematic
- **Navigation:** minimal transparent; pages: Home, Work, About, Contact
- **Home page sections**
  1. Hero — *video background* showreel
  2. Projects — *grid* with hover video previews
  3. Clients — *marquee*
  4. Services — *list with icons* (Commercials, Event films, Motion graphics)
  5. About — *text + portrait*
  6. CTA band — *with image* "Let's make your next film"
  7. Contact — *minimal*
- **Example content (EN)**
  - Name: **Tariq Films — Tariq Hamdan** · Headline: "Commercials and event films with a cinematic eye."
  - Work: "Corniche Run — sports brand spot" · "Gala night highlights" · "Explainer: SmartGrid" (stock video placeholders)
- **Example content (AR)**
  - **طارق فيلمز — طارق حمدان** · "إعلانات وأفلام مناسبات بعين سينمائية."

---

## 15. Bento

- **Category:** Personal · **Tier:** Free · **Best for:** anyone — students, product managers, generalists, makers
- **Style tags:** modern, cards, friendly, light/dark
- **Signature detail:** the whole home page is one bento grid of cards of different sizes (intro, photo, current role, map with city, latest project, Spotify-style "now learning", social cards, contact card); cards lift and glow on hover; on mobile the grid stacks smartly.
- **Theme**
  - Mode: light (dark alternative) · Palette: background `#F2F2F7`, surface `#FFFFFF`, text `#111114`, mutedText `#6E6E78`, primary `#007AFF`, secondary `#34C759`, accent `#FF9F0A`, border `#E2E2E8`
  - Fonts: heading **Plus Jakarta Sans** / body **Plus Jakarta Sans** · Arabic: **Rubik** / **Rubik**
  - Radius lg · Spacing compact · Buttons solid · Motion subtle
- **Navigation:** none on home (single page); optional pages added later
- **Home page sections**
  1. Projects — *bento* variant used as the full home layout (cards configured as items: intro, photo, role, location, project, learning, socials, contact)
  2. Blog list — *list* (optional, hidden by default)
  3. Footer — *big name*
- **Example content (EN)**
  - Name: **Mona Al-Sayed** · Intro: "Product manager. I turn messy problems into simple products."
  - Cards: "Currently: PM at Rahal Travel" · "Based in Doha" · "Latest: launched trip-planner v2" · "Now learning: data analytics" · LinkedIn / X / GitHub cards · "Say hi" email card
- **Example content (AR)**
  - **منى السيد** · "مديرة منتجات. أحوّل المشكلات المعقّدة إلى منتجات بسيطة."

---

## 16. Founder

- **Category:** Business · **Tier:** Pro · **Best for:** startup founder, small business owner, NGO/project lead
- **Style tags:** confident, clean, gradient accents, pitch
- **Signature detail:** reads like a pitch deck turned into a website — problem → solution → traction → team → contact, with big animated numbers and a progress bar at the top showing scroll position through "the pitch".
- **Theme**
  - Mode: light · Palette: background `#FFFFFF`, surface `#F6F5FF`, text `#0F0D1A`, mutedText `#5E5A73`, primary `#5B21B6`, secondary `#0EA5E9`, accent `#22C55E`, border `#E7E4F5`
  - Fonts: heading **Outfit** / body **Inter** · Arabic: **Tajawal** / **Tajawal**
  - Radius lg · Spacing airy · Buttons pill · Motion expressive
- **Navigation:** top bar with "Contact us" CTA; pages: Home, Team, News (blog), Contact
- **Home page sections**
  1. Hero — *centered big type* with gradient text
  2. Rich text — *two column* "The problem"
  3. Services — *cards* "Our solution"
  4. Stats — *counters* "Traction"
  5. Projects — *cards* "Team" (team members as items)
  6. Clients — *grid* "Partners"
  7. Blog list — *grid* "News"
  8. Contact — *form + details* with dropdown (Investor / Partner / Customer / Press)
- **Example content (EN)**
  - Name: **Tutorly** (founder: Ali Mahmoud) · Headline: "Helping tutoring centers in the Gulf run classes, payments and parent updates in one place."
  - Problem: "Most centers still run on WhatsApp groups and spreadsheets."
  - Traction: 40 centers · 2,300 students · 96% monthly retention
  - Team: Ali Mahmoud (CEO) · Noura Saeed (CTO) · Hamad Jaber (Growth)
- **Example content (AR)**
  - **توتورلي** (المؤسس: علي محمود) · "نساعد مراكز الدروس الخصوصية في الخليج على إدارة الحصص والمدفوعات وتواصل أولياء الأمور في مكان واحد."

---

## 17. Pre-designed sections (from these templates)

Extract at least **60 pre-designed sections** for the editor's Add tab (SPEC.md §7.2), for example:
- Heroes (12): one from each of Aurora, Editorial, Launch, Minimal CV, Noir Lens, Grid Pop, Terminal, Atelier, Bloom Coach, Majlis, Motion Reel, Founder
- About (6), Experience/timeline (4), Projects (8), Testimonials (5), Services/pricing (6), Stats (3), Gallery (4), Contact (5), Booking (2), CTA bands (5)
- Each with a thumbnail, category, tier, and example content in en and ar.

---

## 18. Curated palettes and font pairs (shared)

- **30 palettes** grouped: Light neutrals (6), Dark (6), Vibrant (6), Earthy/warm (6), Gulf-inspired (6 — e.g. *Pearl* `#F7F4EF/#1E2B33/#0F6E7A/#C8A464`, *Desert dusk* `#2A1E26/#F3E9DC/#E07A5F/#F2CC8F`, *Maroon & gold* `#FBFAF7/#1F2A2E/#7A1E3A/#B8964F`, *Sea & sand* `#F5EFE6/#14323D/#2A9D8F/#E9C46A`, *Night souq* `#121212/#F5F5F5/#E76F51/#F4A261`, *Palm* `#F4F7F2/#1C2B22/#2D6A4F/#D4A373`).
- **20+ font pairs**, each with Latin + Arabic heading and body fonts (all from Google Fonts, self-hosted via `next/font`).
- All palettes pass AA contrast for text on background and button text on primary; validate automatically in a unit test.
