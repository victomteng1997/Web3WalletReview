import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';
import rehypeExternalLinks from 'rehype-external-links';

// Deploy target. Defaults to GitHub Pages project-page hosting.
// Override SITE_URL and BASE_PATH at build time if this repository is renamed
// or moved to a custom domain.
const SITE_URL = process.env.SITE_URL ?? 'https://victomteng1997.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/Web3WalletReview';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
    }),
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: 'contents', maxDepth: 3 }]],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'nofollow', 'ugc'],
        },
      ],
    ],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
