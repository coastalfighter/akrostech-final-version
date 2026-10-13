# DECISIONS.md

Every judgment call made while building the Akrostech Consulting website, newest first. Where the
brief is silent, we picked what a top-tier studio would ship and wrote down why.

---

## M6 — Launch readiness (2026-10-12)

### Security re-audit

- **Found and fixed: the M0 middleware existed at the repo root** (`middleware.ts`); a duplicate
  `src/middleware.ts` created mid-M6 was removed before it could conflict. The root middleware is
  the live one.
- **M5/M0 integration bug fixed:** the M0 CSP blocked Turnstile (`challenges.cloudflare.com` missing
  from `script-src`/`frame-src`), which would have silently broken both forms. CSP now allows
  Turnstile, GA4, Meta Pixel, LinkedIn Insight, and Calendly.
- **Re-audit of `'unsafe-inline'`:** the finding stands — Next.js App Router boots hydration through
  inline flight-data scripts with no nonce support. Removing it kills hydration (Playwright asserts
  `__next_f` + zero errors). Documented in the middleware header.
- Verified live: per-request nonce CSP, `X-Robots-Tag: noindex` on non-prod, HSTS, nosniff,
  referrer-policy, permissions-policy, DENY framing.

### Legacy URLs

- **410** for casino/pharma spam-injection patterns from the compromised legacy site
  (`src/config/redirects.ts`, pattern-matched). Verified: 410 live.
- **301** for known legacy paths (`/contact-us` → `/contact`, etc.), with `:slug` pattern support.
  Marked best-effort — the client should extend from their redirect map. Verified: 301 live.
- Unknown paths still render the branded 404 (a blanket 410 would make the specified 404
  unreachable). Playwright covers 410/301/404.

### SEO / GEO

- **Dynamic OG images** (`next/og`): home, per-service (accent-tinted), per-article. Verified PNG
  200s.
- **JSON-LD:** Organization + WebSite on every page; Service + FAQPage + BreadcrumbList on service
  pages; Article + BreadcrumbList on articles; FAQPage on `/faq`. Verified in rendered HTML.
- **sitemap.xml** (CMS-driven) and **robots.txt** (indexing + AI-crawler flags follow env).
  **llms.txt** serves. All verified live.

### Performance

- three.js stays lazy (900K chunk absent from initial HTML); initial chunks are framework + app
  code. Lighthouse budgets (95+ all categories, LCP ≤2s, CLS ≤0.05) run in CI against the deployed
  URL.

### Launch checklist

- `docs/launch-checklist.md`: {{CONFIRM}} items, env var table, deploy steps, DNS, post-deploy
  verification, rollback (Vercel promote), post-launch tasks.

### Testing

- **97 tests passing** (24 files): new suites for redirect/410 logic.
- Playwright: legacy-URL behavior (410/301/404) added to the route suite.

---

## M5 — Content wiring (2026-10-12)

### CMS reads

- **Single source of truth:** `content/*.mdx` via Velite. The 5 service files and 6 industry files
  gained structured frontmatter (problems, capabilities, FAQs, pains, …) migrated from the M4 data
  modules; Velite validates it (8 FAQs per service enforced by schema).
- **Adapter:** `src/lib/content.ts` is the only gateway to `.velite`; `src/data/services.ts` /
  `src/data/site.ts` are thin adapters. Templates unchanged.
- **Build chain:** `pnpm content` now runs before dev/build/typecheck/lint/test (pre-scripts), so
  `.velite` always exists and content edits are picked up.
- **Articles:** 5 insights render from CMS with a server-side MDX renderer — Velite's compiled MDX
  is evaluated during prerendering, so the browser never runs eval and the CSP needs no
  `unsafe-eval`. `{{CONFIRM}}` markers in MDX bodies are escaped as code spans (MDX parses `{x}` as
  JS).
- Insights index, article pages (with author byline, related, CTA), and the home preview all read
  from the CMS.

### Forms

- **Contact** (`/api/contact`): Zod validation, per-IP rate limiting (5/10min), Cloudflare
  Turnstile, honeypot, Resend send, structured logging. Returns 503 with a "call us" message when
  email isn't configured — never a silent drop.
- **Careers** (`/api/careers`): multipart applications, CV validation (PDF/DOC/DOCX, ≤4MB), CV
  attached to the notification email.
- Both forms: client-side Zod, inline errors with role=alert, success states, consent checkbox
  (never pre-checked).

### Booking, consent, analytics

- **Calendly** embed on `/book`; graceful fallback (call/message) when the URL is unset (still a
  {{CONFIRM}} item).
- **Consent:** granular banner (necessary/analytics/marketing), localStorage, re-openable from the
  footer. GA4 loads only on analytics consent; Meta Pixel and LinkedIn Insight only on marketing
  consent. Nothing fires before a choice.

### Testing

- **91 tests passing** (23 files): rate limiter, both API routes (validation, honeypot, rate limits,
  file rules, 503 path), contact form, consent banner, MDX renderer. Playwright adds article routes,
  form presence, and the book fallback. Axe scans on the new components.

### Integrations the client must provide (all on the {{CONFIRM}} list)

- Resend API key + verified sender domain + inbox address
- Cloudflare Turnstile site/secret keys
- Calendly scheduling URL
- GA / Meta Pixel / LinkedIn IDs (optional)

---

## M4 — Sections and templates (2026-10-12)

### Chrome

- **SiteHeader:** floating frosted pill, shrinks on scroll, hides on scroll-down / shows on
  scroll-up, active-link `aria-current`, `next/link` prefetch throughout.
- **MobileMenu:** full-screen overlay, staggered links, Escape to close, focus moved to the close
  button on open, body scroll locked. `IconButton` now takes a `ref` (React 19 style).
- **SiteFooter:** NAP (legal name, address, phone, LinkedIn), services in the required order,
  company + legal links.
- **AnnouncementBar:** env-gated (`NEXT_PUBLIC_ANNOUNCEMENT`), dismissible, lives inside the fixed
  header stack so it never overlaps content.
- **Breadcrumbs:** on every interior hero.

### Section library

- **PageHero:** 9 variants, each a distinct CSS/SVG visual — prism (services), dial (pricing),
  sunrise (about), open-line (contact), bridge (how-it-works), constellation (industries), collage
  (careers), waveform (insights), default. Service pages tint via the service accent.
- **FaqAccordion:** Radix-based, single-expand default, plus-icon rotates on open, `id` anchors for
  deep-linking, accordion keyframes in globals.css.
- **CtaBand:** the Meridian band, generalized (replaces the home-only ClosingCta).
- **Stats / TestimonialCard / LogoWall / CaseStudyCard:** built but **flagged** — nothing renders
  them until the client supplies real, confirmed figures and proof. No placeholder quotes, no lorem
  ipsum.
- **ComparisonTable:** desktop table + mobile cards, services in the required order.
- **ServiceFinderQuiz:** 3 questions → weighted recommendation; back button, retake, AnimatePresence
  transitions (tests use async queries for the exit animation).

### Templates & data

- **11 page templates** rendering the approved copy: services index, 5 service pages
  (`/services/[slug]`, static params), how-it-works, pricing, industries, about, careers, insights,
  faq, contact, book. All 16 routes prerender static, 200 OK.
- **Data layer:** `src/data/services.ts` (5 services, full M1 copy — 40 FAQs, problems,
  capabilities, process, models, tools) + `src/data/site.ts` (industries, global FAQs). Shape
  mirrors the Velite schemas 1:1 so **M5 swaps the source mechanically**; templates stay untouched.
- Careers roles and about-page company details marked as samples pending client confirmation
  (already on the {{CONFIRM}} list).
- Full article bodies and the booking embed ship in M5; insights/book pages say so honestly instead
  of faking them.

### Testing

- **66 tests passing** (17 files): new suites for the accordion, quiz, and all 9 hero variants (each
  axe-scanned).
- Playwright: 16 route checks (every page renders its hero), chrome test (nav, footer NAP, mobile
  menu open/Escape), accordion expand, quiz end-to-end, service cross-linking. Moved the orphaned
  `e2e/a11y-styleguide.spec.ts` into `tests/e2e/` so CI actually runs it.
- `@testing-library/user-event` added as a dev dependency.

---

## M3 — Signature motion & 3D (2026-10-12)

### Living Globe

- **Hand-rolled three.js, no drei.** Dotted Fibonacci sphere (1900/1000 pts), fresnel shader glow,
  slerp-based flight arcs (a quadratic bezier clipped _through_ the globe on long hauls — caught by
  a unit test, fixed with great-circle slerp + sinusoidal altitude), staggered launches with
  travelling pulses, amber India / teal US markers, projected HTML labels that hide when facing
  away.
- **Scroll:** hero is 200vh with a sticky stage; a framer-motion `MotionValue` (not a mutable box —
  satisfies react-hooks/immutability) drives globe scale (1→0.55) and arc retrace imperatively at
  60fps with zero React re-renders.
- **Fallbacks:** reduced-motion → static SVG; no WebGL → SVG with CSS-animated arcs; SSR/prerender →
  SVG (SEO/no-JS friendly). WebGL detected in a state initializer — the globe is
  `next/dynamic ssr:false`, so no hydration mismatch.
- **Performance:** three.js + R3F isolated in their own ~900KB chunk (under the 1.5MB scene budget),
  absent from initial HTML; DPR capped at 1.75; rendering pauses offscreen via IntersectionObserver.
  GSAP (~25KB gz) stays in the main bundle — small enough to keep; Lenis is global by design.
- **R3F v9 note:** the `<line>` JSX intrinsic collides with SVG's `<line>` — arcs are built
  imperatively with `<primitive object={line} />`.

### Handoff, scroll, transitions

- **24-hour handoff:** GSAP ScrollTrigger, pinned 300vh, scrubbed timeline (progress bar, travelling
  Meridian dot, crossfading panels, counters, city-light toggles). Reduced motion → static 3-card
  stack. Counters: 12 candidates + 8h overnight, captioned "Illustration — your real numbers depend
  on your scope" (matches the M1 copy deck).
- **Lenis** (lerp 0.1) wired into GSAP's ticker; disabled on touch and reduced-motion.
- **Page transition:** decorative Meridian-gradient wipe (400ms in from bottom, 600ms out to top) on
  route change — content swaps natively, so scroll restoration and history are untouched. Skipped
  under reduced-motion.
- **Home page assembled** from the M1 copy deck (hero, services bento, handoff, savings teaser,
  how-it-works, why-akrostech, industries marquee, insights, FAQ, closing CTA). Copy is hardcoded
  from the deck; **M5 wires it to Velite**. No numeric savings claims invented — the teaser shows
  quote structure, not figures.

### Testing

- **60 tests passing** (14 files): globe math (incl. the arc-altitude regression test),
  hero/handoff/reduced-motion behavior, axe per component.
- jsdom can't do ScrollTrigger pinning (no layout) — gsap is stubbed in the handoff test; the pin
  behavior is covered by the Playwright suite in CI.
- Verified on the production build: `/` → 200 with full SSR copy, three.js absent from initial HTML,
  `/styleguide` → 404, security headers intact.

---

## M2 — Design system (2026-10-12)

### Components (shadcn-style: Radix primitives + cva + Meridian tokens)

- **Button** (`ui/button.tsx`): primary (indigo pill, magnetic pull max 8px, label slide-up, arrow
  shift), secondary (Meridian conic border sweep via `@property --sweep-angle`), ghost (underline
  draw + arrow nudge). Press scales 0.97; 44px min touch targets; `asChild` via Radix Slot. All
  motion off under reduced-motion or coarse pointers.
- **Typography** (`ui/typography.tsx`): Eyebrow, Heading (word-mask reveal, once in view,
  `aria-label` preserves the full string for AT since words split into spans), Lead (68ch).
- **Layout** (`ui/layout.tsx`): Container (1440px, 24/16 gutters), Section (dark/light + padding
  presets), MeridianDivider (decorative, `aria-hidden`, scroll draw-in).
- **Cards** (`ui/card.tsx`): Card base, ServiceCard (cursor spotlight + 6° tilt on fine pointers
  only), FeatureCard. Five accent colors in service order.
- **Forms** (`ui/field.tsx`, `ui/select.tsx`, `ui/checkbox.tsx`): labelled Field with hint/error
  (`role=alert`), Radix Select/Checkbox restyled, ConsentCheckbox (never pre-checked).
- **FeatureFlag** (`ui/feature-flag.tsx`): env-gated render for proof components.
- **Motion** (`lib/motion.ts` + `MotionProvider`): tokens as code (expo/quart easings, spring-soft,
  150/400/900ms, 60ms stagger); `MotionConfig reducedMotion="user"` globally.
  `stripNativeDragHandlers` (in `lib/utils.ts`) resolves framer-motion's onDrag/onAnimation
  prop-type conflicts — native drag/CSS-animation events on animated components are unsupported by
  design.

### Fonts & tokens

- **next/font/google**: Bricolage Grotesque (display), Instrument Serif Italic (accent), Geist Sans
  (body), Geist Mono (tabular numerals) — self-hosted woff2, `display: swap`, wired as CSS
  variables. Verified 4 font files in the production build.
- **globals.css**: motion tokens as utilities, `.meridian-line`, `.film-grain`, `.glass`,
  `.display-fluid` (clamp(2.75rem, 6vw+1rem, 7.5rem)), `.accent-serif`, `.tnum`, global
  `:focus-visible` (2px ring + 2px offset; amber on dark, indigo on light), reduced-motion
  kill-switch.

### Styleguide & testing

- **`/styleguide`**: every component in light + dark; `robots: noindex`; `notFound()` in production
  (verified: 404 on prod build, 200 in dev); never linked from the site.
- **46 tests passing** (10 files): unit behavior + vitest-axe per component. vitest-axe 0.1.0 ships
  an **empty `extend-expect.js`** — worked around by asserting `violations` directly
  (`toEqual([])`); documented in `tests/a11y.ts`.
- color-contrast disabled in jsdom axe runs (no layout engine); real contrast checking happens in
  the new Playwright axe spec (`e2e/a11y-styleguide.spec.ts`, `@axe-core/playwright`, WCAG 2.2 AA
  tags) which runs in CI.
- RTL auto-cleanup registered manually in `tests/setup.ts` (vitest without globals).
- jsdom mocks: matchMedia, IntersectionObserver, scrollTo.

---

## M1 — Content & Strategy (2026-10-12)

### Content infrastructure

- **Velite 0.4.0** per the brief, verified working with Next 16. It bundles its own zod; no conflict
  with the app's Zod 4 since `velite.config.ts` is build-time only. Collections: pages, services,
  insights, authors, industries, careers, legal → 35 entries, all validated by `pnpm content`.
- **MDX bodies are the copy deck.** M1 copy is structured with H2 sections matching each page's
  spec; M3+ may restructure approved words into typed frontmatter/component props without changing
  the copy itself.
- **MDX comments use `{/* */}`, not `<!-- -->`.** HTML comments break MDX parsing (16 build errors
  caught and fixed). Hero/visual notes live in these comments for M3.
- **Quote frontmatter values containing colons.** Unquoted `description: ...: ...` breaks YAML
  parsing (caught and fixed).

### Copy decisions

- **Authors:** Gaurang Shukla (Founder) and Jennifer (Sales Lead) — the two real names in the brief.
  Bios, photos, and credentials are {{CONFIRM}}.
- **Careers roles are sample structures** (2 files) showing the JobPosting shape; clearly marked
  {{CONFIRM}}, replaced by real postings before launch.
- **Legal pages drafted fresh** (privacy, terms, cookies, SMS) but flagged for client legal review —
  they are not legal advice and the SMS wording must be carried over verbatim from current
  operations.
- **Keyword map:** assignments follow the brief's keyword list and buyer intent; search
  volume/difficulty validation is marked {{CONFIRM}} research for the client's SEO tooling.
- **Tagline recommendation:** #1 "Your team, across every hour." (master), #9 "While you sleep, we
  ship." (campaign runner-up). Client picks one.
- **Banned-word sweep:** "leverage" appeared 5× in drafts — all replaced. No instances of
  synergy/world-class/cutting-edge/seamless remain.
- **Voice check:** second person, short sentences, concrete outcomes, answer-first blocks (40–60
  words) on every service page and article, question-shaped H2s, 8 FAQs per service page (brief
  requires 6–8).
- **llms.txt** follows the llms.txt convention (H1 + summary blockquote + H2 sections).

---

## M0 — Foundations (2026-10-12)

### Toolchain

- **Next.js 16.4.0 / React 19.3.0, pinned exactly.** "Latest stable" per the brief, pinned in
  `package.json` + `pnpm-lock.yaml` so every environment builds the identical site.
- **TypeScript 5.9.3, not 7.x.** TS 7 is the new native port; the lint/type toolchain
  (eslint-config-next, editor integrations) is battle-tested on 5.x. Strict mode is on, plus
  `noUncheckedIndexedAccess` and `noFallthroughCasesInSwitch`.
- **ESLint 9.39.5 (flat config), not 10.x.** `eslint-config-next@16.4.0` + FlatCompat are verified
  on ESLint 9; 10 is too new for the Next.js config chain.
- **Tailwind CSS v4.3.3, CSS-first.** The brief lists `tailwind.config.ts`, but Tailwind v4 (the
  "latest" the brief asks for) configures the theme in CSS. Meridian tokens live in `@theme` in
  `src/app/globals.css`, which generates the same utilities (`bg-ink-950`, `text-mist-400`,
  `font-display`, …) a config file would have. CSS variables (`--meridian-gradient`, …) sit
  alongside for non-utility use.
- **pnpm 12.11.2 + Node 24 (active LTS).** `packageManager` field pins pnpm; `.nvmrc` pins Node 24.
- **Zod 4.6.7** for env validation.

### Environment validation

- The brief says the build fails if a required variable is missing. We made only
  `NEXT_PUBLIC_SITE_URL` strictly required at build time. Service credentials (Resend, Turnstile,
  Upstash, Blob, analytics) are validated **lazily at runtime** by the code that uses them (M5), so
  Preview builds and local dev work before every integration is wired up. A missing service key
  disables its feature with a clear error, never a silent failure.
- Boolean env vars are parsed with an explicit `"true"/"false"/"1"/"0"` coercion — naive
  `Boolean("false")` would turn the string `"false"` into `true` and could accidentally enable
  feature flags or indexing.

### Security headers

- **CSP with per-request nonces lives in `middleware.ts`, not `next.config.ts`.** Next.js config
  headers are static; nonces must be generated per request, so the middleware builds the policy and
  exposes the nonce to the app as `x-nonce`. `next.config.ts` carries the static headers (HSTS,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP).
- **`script-src` includes `'unsafe-inline'` alongside the nonce.** Verified empirically against the
  production build: Next.js App Router boots hydration through inline flight-data scripts
  (`<script id="_R_">` and inline bootstraps) that the framework exposes no nonce for, so a
  nonce-only policy silently kills hydration. The Playwright suite asserts hydration works
  (`__next_f` populated, zero page errors). M6 re-audits this once the interactive surface is final.
- `frame-src` allows only `https://calendly.com` (needed for the `/book` embed in M5); everything
  else framing the site is denied (`frame-ancestors 'none'`).
- **Preview noindex** is enforced in middleware via `X-Robots-Tag: noindex, nofollow` whenever
  `VERCEL_ENV=preview` or `NEXT_PUBLIC_ALLOW_INDEXING` is not `"true"`, independent of the
  `<meta name="robots">` tag — belt and suspenders.

### Repository

- **Proprietary LICENSE** (all rights reserved, Akrostech Consulting LLC). Revisit if the client
  wants an OSS license.
- `middleware.ts` kept (not the newer `proxy.ts` convention): `middleware.ts` is the documented,
  stable convention; `proxy.ts` support is still rolling out across tooling.
- `.lighthouserc.json` budgets encode the brief's gates: 95+ in all four Lighthouse categories on
  mobile, LCP ≤ 2.0s, CLS ≤ 0.05.
- The M0 home page is an honest scaffold placeholder (labelled as such), not fake content — it
  exists so the repo deploys and CI has a route to exercise from day one. The real Home page ships
  in M3.

### Deferred to later milestones (not forgotten)

- 301 redirects + the 410 legacy-spam allowlist → **M6** (`config/redirects.ts` + middleware).
  Proposal: middleware 410s only legacy spam URL _patterns_; genuinely unknown paths still render
  the branded 404 page (a blanket 410-for-everything would make the specified 404 page unreachable).
- Dynamic OG images (`next/og`), `sitemap.xml`, `robots.txt`, `llms.txt` → **M6** (copy-dependent
  pieces) / **M1** (copy).
- Velite content collections → **M1**.
- Fonts via `next/font` (Bricolage Grotesque, Instrument Serif, Geist) → **M2**; system stacks until
  then.
- Tagline options (10) → **M1**, with the copy deck.

### Local verification notes (2026-10-12)

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (10 unit tests), `pnpm build`, and `prettier --check`
  all pass locally. The production build was served and its headers, HTML, and CSP behavior verified
  with curl.
- The two browser-driven Playwright tests could not run in this sandbox: the Playwright CDN binary
  download stalls, and the available system Chromium (152) hard-blocks loopback navigation
  (`ERR_BLOCKED_BY_LOCAL_NETWORK_ACCESS_CHECKS`) regardless of flags — an environment limitation,
  not a site defect. The API-driven Playwright tests (health, security headers) pass locally; the
  full suite, including the browser tests and Lighthouse CI, runs in GitHub Actions where neither
  limitation applies. `playwright.config.ts` carries a `PLAYWRIGHT_EXECUTABLE_PATH` escape hatch for
  environments with a system browser.

---

## Running {{CONFIRM}} list

Every unconfirmed fact in the build. Resolve all before launch.

- [ ] `{{CONFIRM}}` Canonical contact email — the old site mixes `contact@akrosstech.info`,
      `contact@akrostech.info`, and `jennifer@akrosstech.com`. (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] `{{CONFIRM}}` Cost-savings percentage/range vs. a comparable U.S. hire.
- [ ] `{{CONFIRM}}` Onboarding time (days from signature to start).
- [ ] `{{CONFIRM}}` Reply-time promise for the contact page ("reply within one business day").
- [ ] `{{CONFIRM}}` Professionals on the bench, active client count, retention rate.
- [ ] `{{CONFIRM}}` Year founded, founder names/bios, India office city.
- [ ] `{{CONFIRM}}` Certifications (e.g. ISO 27001, SOC 2).
- [ ] `{{CONFIRM}}` Benefits list for the Careers page.
- [ ] `{{CONFIRM}}` Website Development package names/prices (Launch / Growth / Product / Care).
- [ ] `{{CONFIRM}}` Lighthouse "100" animation on the Website Development hero — show only as a
      labelled aspiration in the demo, never as a measured claim.
- [ ] `{{CONFIRM}}` Calendly URL for `/book` and the contact page embed.
      (`NEXT_PUBLIC_CALENDLY_URL`)
- [ ] `{{CONFIRM}}` Resend sender domain + from-address; inbox that receives form mail.
      (`RESEND_FROM_EMAIL`, `CONTACT_INBOX_EMAIL`)
- [ ] `{{CONFIRM}}` Approved testimonials, client logos, case studies (gated by feature flags until
      supplied).
- [ ] `{{CONFIRM}}` (M1) Keyword map research validation — search volume/difficulty per page in the
      client's SEO tooling.
- [ ] `{{CONFIRM}}` (M1) Tagline pick — one of the 10 options in `docs/m1/TAGLINES.md`.
- [ ] `{{CONFIRM}}` (M1) Vetting process details for How-it-works page.
- [ ] `{{CONFIRM}}` (M1) Author bios, photos, credentials (Gaurang Shukla, Jennifer).
- [ ] `{{CONFIRM}}` (M1) Real career postings to replace the 2 sample role structures.
- [ ] `{{CONFIRM}}` (M1) Legal review of Privacy, Terms, Cookie, and SMS pages; verbatim SMS opt-in
      wording from current operations.
- [ ] `{{CONFIRM}}` (M1) HIPAA/handling compliance details for healthcare industry copy.
- [ ] `{{CONFIRM}}` (M1) Careers application reply commitment and CV file-handling details.
