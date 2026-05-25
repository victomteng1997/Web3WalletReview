import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';
import { absoluteUrl, link } from '../lib/path';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const sorted = reviews.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const homeUrl = absoluteUrl('/', SITE.url);
  const feedUrl = absoluteUrl('/feed.json', SITE.url);
  const authorUrl = absoluteUrl(SITE.author.aboutPath, SITE.url);

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE.title,
    home_page_url: homeUrl,
    feed_url: feedUrl,
    description: SITE.description,
    language: 'en-US',
    authors: [
      {
        name: SITE.author.name,
        url: authorUrl,
      },
    ],
    items: sorted.map((entry) => {
      const itemUrl = absoluteUrl(`/reviews/${entry.id}`, SITE.url);
      return {
        id: itemUrl,
        url: itemUrl,
        title: entry.data.title,
        summary: entry.data.description,
        content_text: entry.data.description,
        date_published: entry.data.publishDate.toISOString(),
        ...(entry.data.updatedDate
          ? { date_modified: entry.data.updatedDate.toISOString() }
          : {}),
        authors: [{ name: entry.data.author }],
        tags: entry.data.tags,
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
    },
  });
}
