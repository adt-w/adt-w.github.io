/**
 * Site-level constants: identity, contact, summary and skills.
 *
 * These are the things that are not a collection — there is only ever one of
 * each — so they live in a typed module rather than in markdown.
 */

export const site = {
	name: 'Aditya Wadhwa',
	/** Shown under the masthead. */
	role: 'Management Engineering · University of Waterloo',
	/** <title> and Open Graph title. */
	title: 'Aditya Wadhwa',
	/** Meta description. One sentence, written for a human. */
	description:
		'Management Engineering student at the University of Waterloo building data pipelines, machine learning models and dashboards that make decisions legible.',
} as const;

/**
 * Professional summary.
 *
 * DRAFT — written from the facts in your resume and repos. Edit freely; this
 * is the one piece of copy on the site that should sound like you rather than
 * like a summary of you. Each paragraph is rendered as its own block.
 */
export const summary: readonly string[] = [
	"I'm a Management Engineering student at the University of Waterloo. I build data systems, and the tools that make them readable.",
	'So far that has meant employment equity dashboards that let federal directors find representation gaps without booking an analyst, a classifier that pulls exoplanet candidates out of 50GB of Kepler and TESS observations, and a model that tries to predict NHL games and mostly fails. The last one taught me the most.',
	"I care about the question most projects skip: should you trust the number you're looking at?",
] as const;

/**
 * What the degree actually is. Most readers have not met the discipline, and
 * the role line above the summary names it without explaining it.
 *
 * Split into term and remainder only so the term can be marked up as a
 * <dfn>; joined, the two read exactly as supplied.
 */
export const discipline = {
	term: 'Management engineering',
	definition:
		' is a discipline that integrates knowledge from the areas of software and information systems, advanced data analytics and operations research, and organization science.',
} as const;

/**
 * Contact channels.
 *
 * `phone` from the resume is deliberately omitted. This site is reachable by
 * anyone with the link, and a personal number on a public page gets scraped.
 * Recruiters reach you by email or LinkedIn. Add it back here if you disagree.
 */
export const contact = [
	{
		label: 'Email',
		value: 'a36wadhw@uwaterloo.ca',
		href: 'mailto:a36wadhw@uwaterloo.ca',
	},
	{
		label: 'GitHub',
		value: 'github.com/adt-w',
		href: 'https://github.com/adt-w',
	},
	{
		label: 'LinkedIn',
		value: 'in/aditya-wadhwa',
		href: 'https://www.linkedin.com/in/aditya-wadhwa-7602b7351',
	},
] as const;

/**
 * Skills, grouped the same way as the resume so the two never disagree.
 * Order within a group is roughly by depth, not alphabetical.
 */
export const skills = [
	{
		group: 'Languages',
		items: ['Python', 'TypeScript/JavaScript', 'HTML/CSS', 'SQL', 'R', 'Ruby', 'VBA'],
	},
	{
		group: 'Frameworks & AI',
		items: [
			'React (DOM)',
			'Vite',
			'Flask',
			'Ruby on Rails',
			'Llama API',
			'LangChain',
			'RAG',
			'MCP',
			'RandomForest',
		],
	},
	{
		group: 'Libraries',
		items: [
			'pandas',
			'NumPy',
			'scikit-learn',
			'Matplotlib',
			'OpenLayers',
			'Three.js',
			'millify',
			'tkinter',
			'yahooquery',
		],
	},
	{
		group: 'Developer tools',
		items: [
			'git/GitHub',
			'Docker',
			'Kubernetes',
			'Power BI/Service',
			'Tableau Desktop/Server',
			'Claude Code',
		],
	},
] as const;
