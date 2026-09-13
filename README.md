# Aditya.io

Personal site — experience, projects and a merged chronology. Built with
[Astro](https://astro.build), output as static HTML.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321, hot reload
```

## Sharing it publicly

The site is **not deployed**. It is served from this machine, and Cloudflare
forwards a public hostname to it through an outbound tunnel:

```bash
npm run share
```

This builds the site, serves it on `localhost:4321`, opens the tunnel, and
prints three addresses:

| | |
|---|---|
| `PUBLIC` | a `*.trycloudflare.com` URL that works for anyone, anywhere |
| `LOCAL` | this machine only |
| `NETWORK` | other devices on the same Wi-Fi |

**The public URL only lives as long as the command runs.** It dies on Ctrl-C,
on closing the terminal, when the Mac sleeps, or when the network drops. Each
run is issued a different URL, so the link is not durable — send it when
someone is ready to look, not on a resume. For a permanent address the site
needs real hosting; the build output in `dist/` is plain static files and will
work on any static host.

Requires `cloudflared`:

```bash
brew install cloudflared
```

## Adding content

Every entry is one markdown file. Nothing else has to change — the page,
section counts, ordering and chronology all derive from these.

| Add a… | Create a file in |
|---|---|
| job | `src/content/experience/` |
| project | `src/content/projects/` |
| credential | `src/content/education/` |

Fields are enforced by the schemas in `src/content.config.ts`; a typo or a
missing field fails the build rather than rendering an empty section. Dates are
`YYYY-MM` strings, and a `null` end date means "ongoing" and renders as
*Present*.

Identity, the professional summary, contact channels and skills live in
`src/data/site.ts`.

## Structure

```
src/
  content.config.ts   collection schemas
  content/            the actual content, as markdown
  data/site.ts        summary, contact, skills
  lib/                date formatting, inline-code rendering
  styles/
    tokens.css        colour, type, space, grid — values only
    base.css          reset, element defaults, utilities
    print.css         prints as a CV, not a screenshot of a website
  components/
  layouts/
  pages/index.astro
```

## Design

Hierarchy comes from type size, weight, space and hairline rules — no
gradients, shadows, rounded corners or entrance animation. Two typefaces:
Archivo carries content, IBM Plex Mono carries the metadata layer (dates, tags,
indices, status). One accent colour, used sparingly. Fonts are downloaded,
subsetted and self-hosted at build time, so the page makes no third-party
requests at runtime.

Dark mode follows the system preference and can be overridden with the toggle
in the masthead.
