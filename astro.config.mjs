// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// TODO(commit 9): set `site` to the real origin once hosting is chosen.
// It is required for canonical URLs, Open Graph tags and the sitemap.

export default defineConfig({
	// Fonts are downloaded, subsetted and self-hosted at build time by Astro.
	// Nothing is requested from Google at runtime — the built site makes no
	// third-party network calls at all.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Archivo',
			cssVariable: '--font-sans',
			// Variable range: one file covers every weight we use.
			weights: ['400 700'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-mono',
			// Plex Mono ships as static weights, so they are listed discretely.
			weights: [400, 500, 600],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
		},
	],
});
