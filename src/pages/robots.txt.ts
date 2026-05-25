import { SITE } from '../lib/site';
import { absoluteUrl } from '../lib/path';
import type { APIContext } from 'astro';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'cohere-ai',
  'Bytespider',
  'Amazonbot',
  'Applebot-Extended',
  'CCBot',
];

export async function GET(_context: APIContext) {
  const sitemapUrl = absoluteUrl('/sitemap-index.xml', SITE.url);

  const lines: string[] = ['User-agent: *', 'Allow: /', ''];
  for (const bot of AI_CRAWLERS) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }
  lines.push(`Sitemap: ${sitemapUrl}`);

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
