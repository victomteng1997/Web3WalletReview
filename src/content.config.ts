import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const listItem = z.object({
  position: z.number().int().min(1),
  name: z.string(),
  url: z.string().url().optional(),
  score: z.number().optional(),
  summary: z.string().optional(),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Gelei'),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    productName: z.string().optional(),
    productCategory: z.string(),
    productUrl: z.string().url().optional(),
    rating: z.number().min(0).max(10).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    itemList: z.array(listItem).optional(),
    sourceUrl: z.string().url().optional(),
  }),
});

export const collections = { reviews };
