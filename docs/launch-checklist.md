# Akrostech Website — Launch Checklist

**Goal:** akrosstech.com serves the new site, verified end to end. **Status:** M6 — all code gates
pass. Remaining items need the client or the deployer.

---

## 1. Client confirmations ({{CONFIRM}} list)

Resolve these with Gaurang before or right after launch. The site is built to launch without them
(placeholders are honest, proof components stay hidden), but each unlocks the real thing.

- [ ] Canonical contact email (currently: phone + LinkedIn only)
- [ ] Savings range for the pricing page ("up to X%")
- [ ] Onboarding time ("first week" is live; confirm the exact shape)
- [ ] Reply-time promise for the contact page
- [ ] Bench / client / retention figures (stats stay hidden until confirmed)
- [ ] Founding year, founder bio + photo, author bios + photos
- [ ] India office city
- [ ] Certifications (if any)
- [ ] Careers: benefits, compensation bands, real openings
- [ ] Website package names + prices
- [ ] Calendly scheduling URL → set `NEXT_PUBLIC_CALENDLY_URL`
- [ ] Resend: API key + verified sender domain + inbox → `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
      `CONTACT_INBOX_EMAIL`
- [ ] Turnstile site + secret keys
- [ ] Testimonials, client logos, case studies (all gated behind feature flags)
- [ ] Keyword research validation for the M1 keyword map
- [ ] Final tagline selection ("Your team, across every hour." is the recommendation)
- [ ] Legal pages reviewed by counsel; exact SMS wording
- [ ] HIPAA details for healthcare content
- [ ] Does this rebuild supersede the October 11 concept/zip?

## 2. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable                                                        | Required      | Notes                                      |
| --------------------------------------------------------------- | ------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                                          | Yes           | `https://akrosstech.com` in Production     |
| `NEXT_PUBLIC_ALLOW_INDEXING`                                    | Yes           | `true` in Production only                  |
| `NEXT_PUBLIC_CALENDLY_URL`                                      | After confirm | Booking embed; graceful fallback until set |
| `CONTACT_INBOX_EMAIL`                                           | After confirm | Where form submissions go                  |
| `RESEND_API_KEY`                                                | After confirm | Contact + careers forms                    |
| `RESEND_FROM_EMAIL`                                             | After confirm | Verified sender domain                     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`       | After confirm | Bot protection                             |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`                                 | Optional      | Loads only after consent                   |
| `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | Optional      | Loads only after marketing consent         |

Preview deployments keep `NEXT_PUBLIC_ALLOW_INDEXING=false` (middleware also sends
`X-Robots-Tag: noindex`).

## 3. Deploy

The README has click-by-click GitHub + Vercel instructions (written for a non-developer). Summary:

1. Push the repo to GitHub (or upload the release zip).
2. Import into Vercel; set the env vars above.
3. Deploy → preview URL. Verify §5 below on the preview URL.
4. Add the custom domain `akrosstech.com` in Vercel (Project → Settings → Domains); point DNS at
   Vercel (A `76.76.21.21` or CNAME `cname.vercel-dns.com`).
5. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` and `NEXT_PUBLIC_SITE_URL=https://akrosstech.com` on
   Production; redeploy.

## 4. DNS & domain

- [ ] `akrosstech.com` + `www.akrosstech.com` resolve to Vercel
- [ ] HTTPS certificate issued (automatic)
- [ ] Old host DNS removed after cutover

## 5. Post-deploy verification (on the live domain)

- [ ] Home page loads; Living Globe animates (or static SVG with reduced motion)
- [ ] All 16 routes return 200 (spot-check `/services/*`, `/insights/*`)
- [ ] Spam URL returns 410: `curl -I https://akrosstech.com/casino-test`
- [ ] Legacy URL 301s: `/contact-us` → `/contact`
- [ ] Security headers present: `curl -I` shows CSP, HSTS, noindex absent
- [ ] `https://akrosstech.com/sitemap.xml` lists all routes
- [ ] `https://akrosstech.com/robots.txt` allows indexing
- [ ] OG image renders: `https://akrosstech.com/opengraph-image`
- [ ] Contact form submits (test with a real address once Resend is set)
- [ ] Consent banner appears; GA fires only after "Accept"
- [ ] Lighthouse CI passes on the production URL (95+ all categories)
- [ ] Google Search Console: submit sitemap, request indexing
- [ ] Bing Webmaster Tools: submit sitemap

## 6. Rollback

Vercel keeps every deployment. If anything breaks: Vercel dashboard → Deployments → previous
production deployment → **Promote to Production**. DNS does not need to change.

## 7. After launch

- [ ] Monitor Resend deliverability (first 10 form submissions)
- [ ] Watch Search Console for 404s from legacy URLs; extend `src/config/redirects.ts`
- [ ] Confirm the {{CONFIRM}} items and flip the proof feature flags
- [ ] Schedule the first content review (insights cadence)
