import { getCollection } from 'astro:content';

/**
 * Resolves each listed skill against the work on the page.
 *
 * A bare list of tool names is the least believable thing on a portfolio: it
 * claims everything and evidences nothing. Every project already declares its
 * stack and every role its tools, so the evidence is on the page — it was just
 * never connected to the claim.
 *
 * This matches the two up, so a skill can say where it was actually used. The
 * matching is derived, not hand-maintained: adding a project with a new stack
 * entry updates the skills section with no edit here.
 */

export interface SkillUsage {
	/** Entry the skill was used in. */
	title: string;
	/** In-page anchor for that entry. */
	href: string;
}

export interface ResolvedSkill {
	name: string;
	usages: SkillUsage[];
}

export interface ResolvedSkillGroup {
	group: string;
	items: ResolvedSkill[];
}

/**
 * Skills whose display name differs from how the tool is written in a stack
 * or tag. Kept here rather than flattening the display names, because
 * "TypeScript/JavaScript" is how it belongs on a resume even though a project
 * declares plain "JavaScript".
 */
const ALIASES: Record<string, string[]> = {
	'TypeScript/JavaScript': ['JavaScript', 'TypeScript'],
	'HTML/CSS': ['HTML', 'CSS'],
	'React (DOM)': ['React'],
	'Power BI/Service': ['Power BI'],
	'Tableau Desktop/Server': ['Tableau Server', 'Tableau Desktop', 'Tableau'],
	'git/GitHub': ['git', 'GitHub'],
};

/** Compare on letters and digits only, so "scikit-learn" meets "Scikit-learn". */
function key(value: string): string {
	return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Builds an index of every tool named anywhere in the work, pointing at the
 * entries that named it.
 */
async function buildUsageIndex(): Promise<Map<string, SkillUsage[]>> {
	const [projects, experience] = await Promise.all([
		getCollection('projects'),
		getCollection('experience'),
	]);

	const index = new Map<string, SkillUsage[]>();

	const record = (tool: string, usage: SkillUsage) => {
		const k = key(tool);
		const existing = index.get(k);
		if (existing) {
			// A tool can appear twice in one entry's stack; count the entry once.
			if (!existing.some((u) => u.href === usage.href)) existing.push(usage);
		} else {
			index.set(k, [usage]);
		}
	};

	for (const project of projects) {
		const usage = { title: project.data.title, href: `#proj-${project.id}` };
		for (const tool of project.data.stack) record(tool, usage);
	}

	for (const role of experience) {
		const usage = { title: role.data.org, href: `#exp-${role.id}` };
		for (const tool of role.data.tags) record(tool, usage);
	}

	return index;
}

/**
 * Resolves the declared skill groups against that index.
 *
 * @param groups The groups from src/data/site.ts.
 */
export async function resolveSkills(
	groups: readonly { group: string; items: readonly string[] }[],
): Promise<ResolvedSkillGroup[]> {
	const index = await buildUsageIndex();

	return groups.map(({ group, items }) => ({
		group,
		items: items.map((name) => {
			// A skill matches under its own name or any of its aliases.
			const names = [name, ...(ALIASES[name] ?? [])];
			const usages: SkillUsage[] = [];

			for (const candidate of names) {
				for (const usage of index.get(key(candidate)) ?? []) {
					if (!usages.some((u) => u.href === usage.href)) usages.push(usage);
				}
			}

			return { name, usages };
		}),
	}));
}
