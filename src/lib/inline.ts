/**
 * Minimal inline-markdown rendering for short strings.
 *
 * Collection frontmatter holds plain strings, not markdown documents, so
 * nothing renders them. This converts the one bit of inline syntax the
 * content actually uses — `backtick code` — and escapes everything else, so
 * content files stay plain and no raw HTML is ever written into frontmatter.
 */

const ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};

function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (char) => ESCAPES[char]!);
}

/**
 * Escape first, then promote `code` spans. Doing it in that order means a
 * string containing markup is shown literally rather than being rendered,
 * so this stays safe even if content is ever sourced from somewhere else.
 */
export function inlineCode(value: string): string {
	return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>');
}
