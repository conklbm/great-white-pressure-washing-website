# SETUP-TODO — Great White Pressure Washing

The single source of "what's left" to take this rebuild live on
`greatwhitepressurewashing.com`. Everything maps to one config file:
**`src/config/site.ts`** unless noted.

Unlike the other rank-and-rent sites, this one has a REAL business behind it
(Dylan's). That unlocks things the phantom-brand sites can't do yet: a
legitimate Google Business Profile, real reviews, and real job photos. Those
are the highest-impact items on this list.

---

## Before launch

- [ ] **Deploy to Vercel** (new project from the GitHub repo). Verify the
      preview URL end-to-end before touching DNS — the current one-pager
      stays live until cutover.
- [ ] **Lead webhook (where the estimate form goes).** Ready-to-paste script:
      `scripts/leads-apps-script.gs` — logs each lead to a Google Sheet AND
      emails a notification.
      1. New Google Sheet → Extensions → Apps Script → paste the script.
      2. `CONFIG.NOTIFY_EMAIL` is already set to
         `dylan@greatwhitepressurewashing.com`. **That mailbox has to
         actually exist and be monitored before launch** — if the domain has
         no email hosting yet, point it at a Gmail address instead, or leads
         will bounce into nowhere.
      3. Deploy → Web app (Execute as: Me, Access: Anyone) → copy the URL.
      4. Set it as the `LEAD_WEBHOOK_URL` env var in Vercel (Production) → redeploy.
      Then test END-TO-END: submit the form on the LIVE deploy and confirm the
      row lands in the Sheet AND the email arrives. A `200` from `/api/lead`
      alone does NOT prove delivery.
- [ ] **GA4.** Create the property, set `siteConfig.ga4Id`. Events already
      wired: `phone_click` (with placement) and `form_submit`. Mark both as
      key events in GA4.
- [ ] **Search Console.** Add the property, put the verification token in
      `siteConfig.searchConsoleVerification`, deploy, verify, then
      **submit `/sitemap.xml`**.
- [ ] **Point the domain at Vercel.** `greatwhitepressurewashing.com` already
      exists and serves the old one-pager — find where it's registered/hosted,
      add the domain to the Vercel project, and update DNS. The site is built
      for the apex (no www) as canonical, matching the current live host.
      After cutover run: `bash ~/.claude/scripts/check-domain.sh greatwhitepressurewashing.com /services/house-soft-washing`
- [ ] **After the domain is attached, confirm the real host is indexable.**
      `src/proxy.ts` sends `X-Robots-Tag: noindex, nofollow` on every host
      that isn't `greatwhitepressurewashing.com`, which is what keeps the
      `.vercel.app` alias from being indexed as a duplicate site. It switches
      over automatically — but verify, because a live site stuck on noindex
      is invisible:
      ```bash
      curl -sI https://greatwhitepressurewashing.com/ | grep -i x-robots-tag   # want NO output
      curl -sI https://great-white-pressure-washing-websit.vercel.app/ | grep -i x-robots-tag   # want noindex
      ```
- [ ] **Business email (optional but recommended).** `siteConfig.email` is
      empty right now and the site cleanly omits it everywhere. Once Dylan
      has an inbox he wants public (even a Gmail), set it and it appears in
      the footer, contact page, legal pages, and schema.
- [ ] **Confirm the pricing envelope with Dylan.** Exactly ONE place on the
      site quotes numbers: the homepage FAQ, which says most jobs start
      around $200 and run to $1,000+ depending on size and complexity
      (`src/app/page.tsx`). Every service-page FAQ deliberately avoids hard
      figures and instead explains what drives that service's price, so
      Dylan is never boxed into a number and nothing goes stale. Keep it
      that way — if you add a figure anywhere, make sure it sits inside the
      $200–$1,000+ envelope, or the pages will contradict each other.

## High-impact now (real business = real levers)

- [x] **Google Business Profile — it exists.**
      <https://maps.app.goo.gl/dRNk4c31rrZh5mxB6>. It's linked from the site's
      `LocalBusiness` JSON-LD via `sameAs` (`src/config/site.ts` → `social`),
      which is how Google ties this domain to that listing. Remaining work
      inside the GBP dashboard:
      - [ ] **Confirm the phone is exactly (251) 454-6704** — it must match
            the site and schema character for character. (I could not read it
            programmatically; Maps doesn't serve it in HTML.) Same for the
            business name, which already matches.
      - [ ] Confirm it's set up as a **service-area business** with the
            address hidden — the listing looks like one, and the site's
            schema deliberately emits no `streetAddress` to match. If a
            street address is ever shown there, add it to `siteConfig.address`
            so the two don't disagree.
      - [ ] Primary category **Pressure Washing Service**; add Cleaning
            Service as secondary.
      - [ ] Set the service area to the 11 towns this site covers
            (Mobile → Orange Beach).
      - [ ] Upload the job photos and set hours.
      - [ ] Grab the **review request link** from the dashboard ("Ask for
            reviews") — it's a `g.page/r/…` URL. Save it here; it's what
            Dylan texts customers, and it's what the future reviews section
            will link to.
- [ ] **More job photos from Dylan.** Four real before/afters are already in
      (pulled off his live site): brick soft wash — used in the hero and on
      house washing — plus a driveway and a construction-site washdown.
      Still unphotographed, so those service pages run text-only: **roof
      cleaning, deck/fence, brick & masonry, gutters, and rust removal.**
      Ask Dylan to shoot before/afters on those jobs, then add each to
      `Service.photo` in `src/content/services.ts` (only where the photo
      genuinely shows that service). Upload them to the GBP too.
- [ ] **A working photo of Dylan.** The current one (`/dylan-douglas.jpg`,
      on the homepage and About page) is a hunting photo — authentically
      local, but not him working. A shot of him with the equipment or
      mid-job would convert better; keep the hunting one for social.
- [ ] **Real reviews.** No review section ships (nothing fabricated). Start a
      review-request routine with every finished job (GBP review link by
      text). Once a handful of genuine reviews exist, add a reviews section to
      the homepage + service pages quoting them.
- [ ] **Trust specifics.** If/when Dylan is insured, add "Insured" to the hero
      trust list and About page — commercial clients ask for a certificate.
      Never ship it unverified.

## To strengthen ranking

- [ ] **Deepen town pages** with anything Dylan learns on the ground (specific
      subdivisions served, real job stories). Uniqueness is the moat —
      content lives in `src/content/towns.ts`.
- [ ] **Publish from the blog runway** (~1–2/month, all fresh writing —
      NEVER reuse posts from the sister Mobile Bay site):
      1. Pressure washing cost guide for the Mobile Bay Area (what drives price)
      2. Soft washing vs pressure washing: which does your house need?
      3. How often should you wash your house on the Gulf Coast?
      4. Roof black streaks explained — and why you never pressure wash shingles
      5. Getting ready for hurricane season: exterior cleaning checklist
      6. Vacation rental curb appeal: what beach-house owners should clean between seasons
      7. Spring pollen in Mobile: when to schedule your wash
      8. HOA mildew notice? Here's how to handle it fast
      9. Paver patios: cleaning without blowing out the joint sand
      10. Oxidized vinyl siding: what cleaning can and can't fix
      11. Gutter brightening vs gutter cleaning — the difference
      12. Pressure washing before painting: why prep matters here
      13. Driveway oil stains: what lifts and what won't
      14. Post-construction washdowns: what builders leave behind
      15. Commercial storefronts: how often to clean, and what it costs
- [ ] Consider 1–2 more area pages ONLY with genuinely unique content
      (candidates: Grand Bay, Bay Minette, Loxley, Robertsdale, Dauphin Island).

## Later / structural

- [ ] **AI phone answering (the Twilio path).** The vendor-neutral lead
      kernel and Twilio call routes are built and dormant. If Dylan wants an
      AI agent answering/qualifying calls later: buy a Twilio number, front
      it with the AI service, forward to Dylan's line, and point the number
      in `siteConfig.phone` at it — calls then log to the same Sheet as form
      leads. Playbook: `LEAD-TRACKING.md`.
- [ ] **Rank-and-rent optionality.** The infrastructure keeps the standard
      properties: phone/webhook/forwarding are each one config change, so if
      the arrangement ever changes (e.g., Dylan sells the business or
      graduates and the lead flow gets rented to someone else), it's a
      config swap, not a rebuild.
- [ ] **Legal review.** Skim `/privacy` and `/terms` — update the processor
      list when adding tools (Twilio/AI answering, automation).
