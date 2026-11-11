# Atlas Digital Services — website

Static site (no build step), English / French / Arabic (RTL).

## Deploy on Vercel
1. Push this folder to GitHub (or run `npx vercel` inside it).
2. Import the repo in Vercel. Framework preset: **Other**. No build command. Output directory: `public` (already set in `vercel.json`).

## Before going live
- Replace `contact@example.com` with your real email (search all files in `public/`).
- Replace `YOUR-DOMAIN.vercel.app` in `public/sitemap.xml` and `public/robots.txt`.
- The footer "Privacy policy" and "Social media" links point to the contact section; add real pages/URLs.

## Structure
Each route has its own folder under `public/`. Public URLs are unchanged; `vercel.json` rewrites map them to the folders.

| Route | File |
|---|---|
| `/` | `public/main/index.html` (landing page) |
| `/atlas-optic`, `/atlas-installment`, `/atlas-garage`, `/atlas-school`, `/atlas-auto`, `/atlas-travel` | `public/main/atlas-*.html` (own title and description for SEO) |
| `/invoice-maker` | `public/invoice-maker/index.html` + `invoice.js`, `invoice.css`, `vendor/html2pdf.bundle.min.js` (free invoice generator; runs fully in the browser, data in localStorage only) |
| `/help/optiflow` | `public/help/optiflow/index.html` (OptiFlow user manual FR/AR, self-contained) |

Shared by every route, in `public/shared/`: `styles.css`, `i18n.js` (FR/AR translation + RTL switching), `logo.jpg`, `favicon.png`. Always reference them with absolute paths (`/shared/styles.css`).
`robots.txt` and `sitemap.xml` stay at the `public/` root.

Translations live in the `D` dictionary at the top of `shared/i18n.js`, keyed by the English text.

### Adding a new route
- New help page: add `public/help/<name>/index.html` -> served at `/help/<name>` automatically.
- New tool: add `public/<tool>/index.html` -> served at `/<tool>` automatically.
- New product page under main: add `public/main/atlas-xxx.html` and a rewrite in **both** `vercel.json` and `serve.json`.
- Add the URL to `public/sitemap.xml`.

Preview locally: `npm run dev` (uses `serve.json`, which mirrors the rewrites in `vercel.json`).
