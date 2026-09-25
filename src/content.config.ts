import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections.
 *
 * Every job, project and credential on this site is one markdown file in
 * src/content/. Adding a new one means writing a file — no layout, no page
 * and no component has to change. The schemas below are enforced at build
 * time, so a typo or a missing field fails the build rather than silently
 * rendering an empty section.
 *
 * Dates are "YYYY-MM" strings. A null `end` means "still going" and renders
 * as "Present". Sort order is always derived from the dates, never hand-set,
 * so entries cannot drift out of sequence.
 */

/** Matches "2026-05". Kept strict so ordering stays reliable. */
const yearMonth = z
	.string()
	.regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected a YYYY-MM date, e.g. "2026-05"');

const experience = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
	schema: z.object({
		org: z.string(),
		role: z.string(),
		location: z.string(),
		start: yearMonth,
		/** null = ongoing. */
		end: yearMonth.nullable(),
		/** Tools and methods, shown as a mono tag row. */
		tags: z.array(z.string()).default([]),
		/** Achievement bullets. Lead with the outcome, not the task. */
		highlights: z.array(z.string()).min(1),
	}),
});

/**
 * Project status.
 *   active   — being worked on right now, and the only state that is labelled
 *   complete — finished and not being extended
 *
 * Complete is the resting state of almost everything here, so it is left
 * unmarked: a label repeated on five of six entries carries no information
 * and only competes with the titles it sits beside.
 */
const projectStatus = z.enum(['active', 'complete']);

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		/** One sentence. Shown under the title and in the chronology. */
		blurb: z.string(),
		status: projectStatus,
		start: yearMonth,
		end: yearMonth.nullable(),
		stack: z.array(z.string()).min(1),
		repo: z.string().url().optional(),
		demo: z.string().url().optional(),
		highlights: z.array(z.string()).min(1),
		/**
		 * Measured results only. Every value here must be traceable to
		 * something real — a README table, a benchmark, a placement.
		 * An honest null result is worth more than a flattering guess.
		 */
		metrics: z
			.array(
				z.object({
					label: z.string(),
					value: z.string(),
					note: z.string().optional(),
				}),
			)
			.default([]),
		/** Featured projects lead the section. */
		featured: z.boolean().default(false),
	}),
});

const education = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
	schema: z.object({
		institution: z.string(),
		credential: z.string(),
		location: z.string(),
		start: yearMonth,
		end: yearMonth.nullable(),
		detail: z.array(z.string()).default([]),
	}),
});

export const collections = { experience, projects, education };
