# Akrostech Consulting — Website

The new akrosstech.com: a Next.js website with a dark, editorial design system — near-black canvas,
deep forest-green surfaces, a Fraunces display serif, Space Grotesk body copy, and one electric-lime
accent. See **Design system** below.

**You do not need to be a developer to follow the setup steps below.** Every step is written
click-by-click. Steps you do once are marked **[one-time]**.

---

## What is in this repo

- Next.js 16 + React 19 + TypeScript (strict) app, styled with Tailwind CSS v4
- Design tokens (colors, fonts, radii, motion) as CSS theme tokens in `src/app/globals.css`
- Security headers (CSP, HSTS, etc.) and `noindex` on previews
- Environment validation with Zod — the build fails fast on a bad `.env`
- CI pipeline: lint → typecheck → unit tests → build → Playwright E2E → Lighthouse
- `.env.example` with every variable the site will ever need
- `DECISIONS.md` — every judgment call we made, and the running `{{CONFIRM}}` list

---

## Part 1 — Run it on your own computer **[one-time]**

### 1. Install the prerequisites

1. Install **Node.js 24** (the "LTS" version) from https://nodejs.org — accept all defaults. Check
   it worked: open a terminal and run `node -v`. You should see `v24.x.x`.
2. Install **pnpm** (the package manager this project uses). In the terminal, run:
   `npm install -g pnpm` Check it: `pnpm -v`.

### 2. Get the code onto your computer

- **Option A (simplest):** download the `akrostech-web.zip` file, unzip it, and open the
  `akrostech-web` folder in your terminal.
- **Option B:** if the repo is on GitHub already, run:
  `git clone https://github.com/YOUR-ORG/akrostech-web.git` then `cd akrostech-web`.

### 3. Install dependencies

In the project folder, run:

```
pnpm install
```

This downloads every library the site needs. It takes a few minutes the first time.

### 4. Set up your environment file **[one-time]**

```
cp .env.example .env.local
```

`.env.local` is your private copy — it is never uploaded anywhere. For M0 the defaults work as-is.
(Later milestones will ask you to fill in keys for email, forms, and analytics.)

### 5. Start the site

```
pnpm dev
```

Open http://localhost:3000 in your browser. You should see the M0 scaffold page.

### Useful commands

| Command          | What it does                                                      |
| ---------------- | ----------------------------------------------------------------- |
| `pnpm dev`       | Run the site locally with live reload                             |
| `pnpm build`     | Build the production version (what Vercel will deploy)            |
| `pnpm start`     | Serve the production build locally                                |
| `pnpm lint`      | Check code style and common mistakes                              |
| `pnpm typecheck` | Check TypeScript types                                            |
| `pnpm test`      | Run unit tests                                                    |
| `pnpm test:e2e`  | Run end-to-end tests in a real browser (needs `pnpm build` first) |

---

## Part 2 — Put it on GitHub **[one-time]**

### 6. Create the repository

1. Go to https://github.com/new and sign in.
2. **Repository name:** `akrostech-web`. **Visibility:** Private.
3. Do **not** tick "Add a README" — this project already has one.
4. Click **Create repository**.
5. On the next page, GitHub shows commands. In your project folder's terminal, run:

```
git init
git add .
git commit -m "feat: milestone M0 foundations"
git branch -M main
git remote add origin https://github.com/YOUR-ORG/akrostech-web.git
git push -u origin main
```

(Replace `YOUR-ORG` with your GitHub username or organization.)

### 7. Protect the `main` branch

1. On the repo page, go to **Settings → Branches → Add classic branch protection rule**.
2. **Branch name pattern:** `main`.
3. Tick **Require a pull request before merging** and **Require status checks to pass before
   merging**, then select the CI checks (lint, typecheck, unit, build, e2e, lighthouse) once they
   have run at least once.
4. Tick **Require approvals** and set it to **1**.
5. Click **Create**. From now on, changes only reach the live site through reviewed pull requests
   with passing checks.

---

## Part 3 — Deploy on Vercel **[one-time]**

### 8. Import the project

1. Go to https://vercel.com/new and sign in (use "Continue with GitHub").
2. Click **Import** next to `akrostech-web`.
3. Vercel detects Next.js automatically — leave the Framework Preset as **Next.js**. The install
   command is `pnpm install` (Vercel detects pnpm from the lockfile).
4. **Before clicking Deploy**, open **Environment Variables** and add the variables from
   `.env.example` for each scope:
   - **Development:** `NEXT_PUBLIC_SITE_URL=http://localhost:3000`,
     `NEXT_PUBLIC_ALLOW_INDEXING=false`, flags `false`.
   - **Preview:** `NEXT_PUBLIC_SITE_URL` can be left unset — the build falls back to the
     deployment's own `*.vercel.app` URL. Set `NEXT_PUBLIC_ALLOW_INDEXING=false`, flags `false`. Use
     **test** keys for any integrations.
   - **Production:** `NEXT_PUBLIC_SITE_URL=https://www.akrosstech.com`,
     `NEXT_PUBLIC_ALLOW_INDEXING=true` (only after the domain cutover — see step 12), flags stay
     `false` until the client approves real proof content. Use **live** keys.
5. Click **Deploy**. Your first deployment gets a `*.vercel.app` URL.

### 9. Lock down previews

1. In the Vercel project, go to **Settings → Deployment Protection**.
2. Turn on **Vercel Authentication** for **Preview** deployments. Now only people you invite can
   open preview links — and every preview also sends `X-Robots-Tag: noindex` automatically (see
   `middleware.ts`), so Google will never index them.

### 10. The normal workflow from here

1. Work happens on a branch → open a **pull request**.
2. Vercel posts a **preview URL** on the PR — review the site there.
3. CI must be green and one person must approve.
4. **Merge to `main`** → Vercel deploys **production** automatically.

### 11. Point the real domain at it (launch day only)

1. In Vercel: **Settings → Domains → Add** `akrosstech.com` and `www.akrosstech.com`.
2. At your domain registrar, update DNS as Vercel instructs (an `A` record for the root, `CNAME` for
   `www`).
3. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` for **Production** and redeploy.
4. Submit the sitemap in Google Search Console and Bing Webmaster Tools (the sitemap itself ships in
   M6).

---

## Design system

| Token         | Value     | Used for                               |
| ------------- | --------- | -------------------------------------- |
| `ink`         | `#0A0B0A` | Page canvas                            |
| `ink-2/3`     | `#111312` | Raised sections and cards              |
| `forest-deep` | `#112C23` | Hero, handoff, CTA band, menu          |
| `forest`      | `#1B4537` | The rising-arcs motif, footer wordmark |
| `cream`       | `#F2EDE3` | Primary text                           |
| `fog`         | `#A9AFA9` | Secondary text                         |
| `sage`        | `#9CC0AD` | Labels, italic accent words            |
| `lime`        | `#C8F169` | Actions and highlights only            |

- **Type:** Fraunces (display serif; italic for accent words via `.accent`) and Space Grotesk.
- **Signature pieces** (`src/components/brand/`): the rising **Arcs** horizon, the spinning
  **RoundCta**, the **Marquee** bands, and the lowercase **Wordmark**.
- **Chrome:** a fixed left rail on desktop (wordmark, menu, phone), a floating top bar, and a
  full-screen forest-green menu.
- **Motion:** CSS only for page content — hero entrances and scroll reveals via scroll-driven
  animations — so text is never hidden waiting for JavaScript. Everything stops under
  `prefers-reduced-motion`.

## Project structure

```
├── middleware.ts              # CSP, legacy-URL 410/301, preview noindex
├── next.config.ts             # security headers, build-time site URL
├── content/                   # MDX: services, industries, insights, careers, legal
├── src/
│   ├── app/                   # routes (home, services, insights, legal, 404, APIs)
│   ├── components/
│   │   ├── brand/             # arcs, round CTA, marquee, wordmark
│   │   ├── home/              # home page sections
│   │   ├── layout/            # rail + top bar + menu, footer, breadcrumbs
│   │   ├── sections/          # page hero, CTA band, FAQ, quiz, comparison
│   │   └── ui/                # button, card, layout, typography, form fields
│   ├── config/site.ts         # canonical business facts + service order
│   └── lib/                   # env validation, content gateway, helpers
├── tests/
│   ├── components/            # Vitest + Testing Library + axe
│   ├── unit/                  # env, API routes, rate limit, redirects
│   └── e2e/                   # Playwright: routes, chrome, forms, a11y scans
├── .env.example               # every variable, documented
└── DECISIONS.md               # decisions + running {{CONFIRM}} list
```

## Troubleshooting

- **`pnpm: command not found`** → run `npm install -g pnpm` again, then restart the terminal.
- **Build fails with "Invalid environment configuration"** → compare your `.env.local` against
  `.env.example`; the error message names the exact variable.
- **Playwright browsers missing** → run `pnpm exec playwright install chromium`.
- **Port 3000 busy** → run `pnpm dev -- -p 3001` and open http://localhost:3001.
