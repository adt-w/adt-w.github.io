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
	'I am a Management Engineering student at the University of Waterloo, working where data systems meet the decisions they are supposed to support.',
	'Most of what I build is in service of making something legible — employment equity dashboards that let federal directors see representation gaps without an analyst in the room, a classifier that sorts exoplanet candidates out of 50GB of Kepler and TESS observations, a model that tries to predict NHL games and mostly does not, which turned out to be the more useful result.',
	'The part I care about is the one most projects skip: whether the number you are looking at is one you should actually trust.',
] as const;

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
 * Skills, grouped. Order within a group is roughly by depth, not alphabetical
 * — the first few in each row are the ones worth asking about.
 */
export const skills = [
	{
		group: 'Languages',
		items: ['Python', 'SQL', 'JavaScript', 'HTML/CSS', 'Ruby', 'VBA'],
	},
	{
		group: 'Data & ML',
		items: [
			'pandas',
			'NumPy',
			'scikit-learn',
			'Matplotlib',
			'BeautifulSoup',
			'yahooquery',
		],
	},
	{
		group: 'Frameworks',
		items: ['Flask', 'React', 'Ruby on Rails', 'Three.js', 'tkinter'],
	},
	{
		group: 'Analytics',
		items: ['Power BI', 'Tableau', 'Power Query', 'Excel / Macros'],
	},
	{
		group: 'Tooling',
		items: ['git', 'GitHub', 'Docker', 'Kubernetes', 'VS Code', 'PyCharm'],
	},
] as const;
