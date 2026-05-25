// SITE.url is the site ORIGIN only (no path). The base path is configured in
// astro.config.mjs and applied at use time via link()/absoluteUrl() in
// src/lib/path.ts. Keep this in sync with the SITE_URL in astro.config.mjs.
export const SITE = {
  url: import.meta.env.SITE ?? 'https://victomteng1997.github.io',
  title: 'Web3 Wallet Review',
  tagline: 'Crypto wallets reviewed for security, chains, UX, and daily Web3 use.',
  description:
    'Independent Web3 wallet reviews comparing browser wallets, mobile wallets, hardware wallets, smart accounts, seed phrase safety, chain support, and transaction controls.',
  author: {
    name: 'Gelei',
    aboutPath: '/about',
    email: 'gelei@quantstamp.com',
    sameAs: [] as string[],
  },
  locale: 'en_US',
  defaultOgImage: '/og-default.png',
  cloudflareAnalyticsToken: '',
  navLinks: [
    { label: 'Reviews', href: '/reviews' },
    { label: 'About', href: '/about' },
    { label: 'RSS', href: '/rss.xml' },
  ] as const,
} as const;
