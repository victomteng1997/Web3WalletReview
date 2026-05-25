import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';
import { absoluteUrl } from '../lib/path';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const sorted = reviews.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const lines: string[] = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.title} publishes long-form reviews and comparison roundups of products and platforms. Each review explains the evaluation criteria, includes a clear ranking or recommendation, and discloses methodology.`,
    '',
    '## Reviews',
    '',
  ];

  for (const entry of sorted) {
    const url = absoluteUrl(`/reviews/${entry.id}`, SITE.url);
    lines.push(`- [${entry.data.title}](${url}): ${entry.data.description}`);
  }

  lines.push('');
  lines.push('## About');
  lines.push('');
  lines.push(
    `- [About ${SITE.title}](${absoluteUrl('/about', SITE.url)}): About the site, the author, methodology, and disclosures.`
  );
  lines.push('');
  lines.push('## Feeds');
  lines.push('');
  lines.push(`- [RSS](${absoluteUrl('/rss.xml', SITE.url)})`);
  lines.push(`- [JSON Feed](${absoluteUrl('/feed.json', SITE.url)})`);
  lines.push(`- [Sitemap](${absoluteUrl('/sitemap-index.xml', SITE.url)})`);

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
