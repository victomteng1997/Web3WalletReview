# Web3 Wallet Review

Static review site for Web3 wallets, built with Astro and ready for GitHub Pages.

**Default URL**: `https://victomteng1997.github.io/Web3WalletReview/`

## Local development

```bash
npm install
npm run dev       # http://localhost:4321/Web3WalletReview/
npm run build     # outputs ./dist
npm run preview   # serves ./dist locally
```

## Content focus

This repo is prepared for SEO coverage around Web3 wallets. Starter articles live under `src/content/reviews/` and use review/comparison schema, RSS, JSON feed, sitemap, and base-path-safe internal links.

## Writing a review

Create a new Markdown file under `src/content/reviews/`. Use one of the existing files as a template. The filename without `.md` becomes the URL slug. Required and optional frontmatter fields are defined in `src/content.config.ts`.

## Deployment

Push this project to a GitHub repository named `Web3WalletReview` and enable GitHub Pages from Actions. The workflow at `.github/workflows/deploy.yml` builds and publishes `dist/` automatically.

Default deploy target:

```js
const SITE_URL = 'https://victomteng1997.github.io';
const BASE_PATH = '/Web3WalletReview';
```

If the repository name changes, update `BASE_PATH` in `astro.config.mjs` or set `BASE_PATH` in the Pages workflow. For a custom domain, set `SITE_URL` to the custom origin, set `BASE_PATH` to `/`, and add a `public/CNAME` file with the domain.

## Stack

- Astro 5 static-site generator
- Astro content collections for review articles
- `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`
- Self-hosted Fraunces and Inter via `@fontsource-variable`
