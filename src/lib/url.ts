/**
 * Base-aware internal links.
 *
 * GitHub Pages serves a repository named `<user>.github.io` at the domain
 * root, and every other repository under a subpath like `/Aditya.io/`. Astro
 * exposes whichever applies as import.meta.env.BASE_URL, but it does not
 * rewrite hrefs — a hard-coded "/resume" silently 404s on a project site.
 *
 * Routing every internal link through this means the site is correct under
 * either layout, and switching between them is a one-line config change
 * rather than a hunt through every component.
 */

/** Astro guarantees a trailing slash: "/" or "/Aditya.io/". */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * @param path Root-relative path beginning with "/", e.g. "/resume".
 */
export function url(path: string): string {
	const joined = `${BASE}${path}`;
	// At the domain root, url('/') would otherwise collapse to an empty string.
	return joined === '' ? '/' : joined;
}

/**
 * True when `path` is the page currently being rendered, comparing on the
 * pathname Astro reports rather than on the base-prefixed href.
 */
export function isCurrent(pathname: string, path: string): boolean {
	const strip = (value: string) => value.replace(/\/+$/, '') || '/';
	return strip(pathname) === strip(url(path));
}
