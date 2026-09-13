/**
 * Date helpers.
 *
 * Content stores dates as "YYYY-MM" strings so they sort lexicographically
 * without parsing, and so a timezone can never shift an entry into the wrong
 * month. These functions are the only place that format is interpreted.
 */

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
] as const;

/** "2026-05" -> { year: 2026, month: 5 } */
function parts(ym: string): { year: number; month: number } {
	const [year, month] = ym.split('-').map(Number);
	return { year: year!, month: month! };
}

/** "2026-05" -> "May 2026". Used in prose and the print stylesheet. */
export function formatMonth(ym: string): string {
	const { year, month } = parts(ym);
	return `${MONTHS[month - 1]} ${year}`;
}

/**
 * "2026-05" -> "2026.05". The numeric form used in the mono metadata column,
 * where a fixed width keeps every date in the page aligned to one column.
 */
export function formatNumeric(ym: string): string {
	return ym.replace('-', '.');
}

/**
 * "2026-09" -> "Sep". Used in the chronology, where the year is already a
 * heading and a bare "09" reads as an index rather than a date.
 */
export function formatMonthAbbr(ym: string): string {
	const { month } = parts(ym);
	return MONTHS[month - 1]!.slice(0, 3);
}

/** "2026-05" -> "2026" */
export function yearOf(ym: string): string {
	return ym.slice(0, 4);
}

/**
 * A date range for the metadata column. A null end renders as "Present",
 * which is how ongoing work is marked everywhere on the site.
 */
export function formatRange(start: string, end: string | null): string {
	return `${formatNumeric(start)} — ${end ? formatNumeric(end) : 'Present'}`;
}

/** Prose form of a range, for the print stylesheet and screen readers. */
export function formatRangeLong(start: string, end: string | null): string {
	return `${formatMonth(start)} to ${end ? formatMonth(end) : 'present'}`;
}

/**
 * Sort key. Ongoing entries (null end) sort above everything finished, since
 * current work should lead; otherwise entries sort by start date descending.
 */
export function sortKey(entry: { start: string; end: string | null }): string {
	return `${entry.end === null ? '9999-99' : entry.start}|${entry.start}`;
}

/** Newest first. The single ordering used by every list on the site. */
export function byNewest<T extends { start: string; end: string | null }>(a: T, b: T): number {
	return sortKey(b).localeCompare(sortKey(a));
}
