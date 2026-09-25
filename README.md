# Aditya.io

Personal site — experience, projects and a merged chronology. Built with
[Astro](https://astro.build), output as static HTML.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321, hot reload
```

## Publishing it permanently (GitHub Pages)

Free, always on, and independent of whether this Mac is awake. Do these once.

**1. Rename the repository.** On GitHub: *Settings → General → Repository name*,
change `Aditya.io` to **`adt-w.github.io`**, then rename your local remote:

```bash
git remote set-url origin https://github.com/adt-w/adt-w.github.io.git
```

GitHub serves a repo named `<user>.github.io` at the domain root, so the site
lands on **https://adt-w.github.io** rather than a `/Aditya.io/` subpath.

> Prefer to keep the name `Aditya.io`? Skip the rename and set
> `base: '/Aditya.io'` in `astro.config.mjs`. Everything still works — all
> internal links resolve through `src/lib/url.ts` — but the URL becomes
> `https://adt-w.github.io/Aditya.io/`.

**2. Commit the lockfile.** The build runs `npm ci`, which requires it:

```bash
git add package-lock.json && git commit -m "Add lockfile"
```

**3. Push everything, including the workflow** in `.github/workflows/deploy.yml`.

**4. Turn Pages on.** GitHub: *Settings → Pages → Build and deployment →
Source*, choose **GitHub Actions**. Not "Deploy from a branch".

**5. Push to `main`.** The workflow builds and publishes; watch it in the
*Actions* tab. First run takes about a minute. After that every push to `main`
republishes automatically.

### Using a real domain later

`aditya.io` is **not free** — `.io` runs roughly $35-70/year. A `.dev` or
`.com` is about $12-15/year. Once you own one:

1. Add a `public/CNAME` file containing just the domain, e.g. `aditya.dev`
2. Point the domain's DNS at GitHub — four `A` records for the apex
   (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), or a `CNAME` to
   `adt-w.github.io` for a `www` subdomain
3. Set it under *Settings → Pages → Custom domain* and tick **Enforce HTTPS**
4. Update `site:` in `astro.config.mjs` to the new origin

A free alternative that looks like a real domain: **is-a.dev** grants
developers a subdomain such as `aditya.is-a.dev` by pull request to their
public registry, at no cost.

## Sharing it from this machine (temporary)

Useful before the site is published, or to show work in progress:

```bash
npm run share
```

This builds, serves on `localhost:4321`, opens a Cloudflare tunnel, and prints
a public `*.trycloudflare.com` URL alongside the local and LAN addresses.

**That URL is disposable.** It dies on Ctrl-C, on closing the terminal, when
the Mac sleeps, and when the network drops — and each run is issued a different
one. Send it when someone is ready to look; never put it on a resume. Requires
`cloudflared` (`brew install cloudflared`).

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

Hierarchy comes from type size, weight, space and hairline rules. No
gradients, shadows or rounded corners. Two typefaces: Archivo carries content,
IBM Plex Mono carries the metadata layer (dates, tags, indices, status). One
accent colour, used sparingly. Fonts are downloaded, subsetted and self-hosted
at build time, so the page makes no third-party requests at runtime.

Layout is modular: every job, project and credential renders through one
entry module (`Entry.astro`) inside one ledger row, aligned to the same
two-column grid, so equivalent parts always sit at equivalent distances.

Spacing carries the grouping. The scale in `tokens.css` is named for the
relationship each step expresses (`--space-bound`, `--space-related`,
`--space-group`, `--space-module`, `--space-section`) rather than for its size,
and the rule it enforces is that the distance inside a thing is always smaller
than the distance around it: at most 24px within an entry against 64px between
entries.

The only entrance effect is a scroll reveal: anything marked `data-reveal`
fades up the first time it enters the viewport (`ScrollReveal.astro`). It is
skipped entirely for readers who prefer reduced motion, and content is only
ever hidden once a script has confirmed it can show it again, so the page
never renders blank if JavaScript fails.

Dark mode follows the system preference and can be overridden with the toggle
in the masthead.
