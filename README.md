# Great White Pressure Washing — great-white-pressure-washing

Rebuild of Dylan's real pressure-washing business site
(`greatwhitepressurewashing.com`) on the rank-and-rent site architecture —
Mobile Bay Area, AL — both shores of the bay, Mobile and Baldwin County. Next.js
(App Router) + Tailwind v4 + MDX, all-SSG, deploys to Vercel.

Unlike the sister rank-and-rent sites, the "renter" here is permanent:
Dylan owns the business and his real number is on the site. The
vendor-neutral lead infrastructure is kept so call tracking or AI phone
answering can be added later without a rebuild.

- **Master brief (adapted):** `rank-and-rent-strategy.md`
- **What's left to launch:** `SETUP-TODO.md` (single source of "what's left")
- **Call-tracking / AI-answering upgrade path:** `LEAD-TRACKING.md`
- **Single source of truth for business details/brand:** `src/config/site.ts`

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages SSG)
```

## Architecture notes

- Every page reads name/phone/brand from `src/config/site.ts` — never
  hardcode NAP or numbers in components.
- Leads: form → `/api/lead` → normalized `LeadRecord` → `forwardLead()`
  (`src/lib/leads.ts`) → `LEAD_WEBHOOK_URL` (Apps Script → Google Sheet).
  Twilio call routes exist but are dormant (Dylan's real line is on the
  site). See `.env.example`.
- Content: services in `src/content/services.ts` (8 services), town pages in
  `src/content/towns.ts` (11 towns, hand-written and genuinely unique — keep
  it that way), blog MDX in `content/blog/` registered in
  `src/content/posts.ts`.
- **Sister-site rule:** "Mobile Bay Pressure Washing" (separate repo) targets
  the same market. The two sites deliberately compete in search — so NEVER
  copy copy, posts, or town content between them. Fresh writing only.
- **Brand is EXTRACTED from Dylan's live site, not invented.** Tokens live in
  `src/config/site.ts` + `src/app/globals.css` (bedrock / spruce / loam /
  limestone / spray / signal): logo navy `#202080`, his hero royal blue
  `#0057FF`, logo sky blue `#89BAE4`, and the logo wand's yellow `#FFC61E`
  as the CTA color — **yellow CTAs always take `text-bedrock`**, never white
  (white on yellow fails contrast). Fonts match his site: Bangers (brand
  voice — wordmark + homepage h1 ONLY), Oswald (all other headings), Inter
  (body).
- **His cartoon shark mascot is the logo.** `public/logo-mascot.png` (mark)
  and `logo-full.png` (full lockup) were derived from his logo by flood-filling
  the flat `#CAE8FF` background to transparency. The lockup's baked-in
  "PRESSURE WASHING" is navy, so it disappears on dark backgrounds — on navy
  use the mascot plus the live-text `<Wordmark>` instead of the full lockup.
- **Photos are real jobs**, pulled from his live site: brick soft wash,
  driveway, and a construction-site washdown. Attach one to a service only
  when the photo actually shows that service (`Service.photo`) — the pages
  read fine without one, so never fill the slot with an unrelated shot.
