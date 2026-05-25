// Prefix an internal path with the configured BASE_URL.
// Works for both root deploys (BASE_URL = '/') and project-subpath deploys
// (BASE_URL = '/Web3WalletReview/'). Always returns a path beginning with '/'.
export function link(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const tail = path.startsWith('/') ? path : `/${path}`;
  return `${base}${tail}` || '/';
}

// Build an absolute URL from an internal path, using the configured site origin
// and BASE_URL. Use for canonical URLs, RSS/JSON-feed item links, JSON-LD URLs.
export function absoluteUrl(path: string, siteOrigin: string): string {
  return new URL(link(path), siteOrigin).toString();
}
