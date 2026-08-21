# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build multi-page marketing website for a B2B IT services company ("[Company Name]" — a bracketed placeholder, see below). Plain HTML/CSS/vanilla JS only — no framework, no bundler, no package manager, and no test suite. Pages open directly from the filesystem (`file://`) or any static file server.

## Commands

There is no build, lint, or test tooling in this repo. To preview changes, open an HTML file directly in a browser, or serve the folder locally, e.g.:

```
python -m http.server 8000
```

then visit `http://localhost:8000/index.html`. Opening files directly via `file://` also works since there is no server-side logic and no `fetch()` of local partials.

## Architecture

### Page structure
- Root-level pages: `index.html`, `industries.html`, `resources.html`, `about.html`, `careers.html`, `contact.html`.
- `services/` — `index.html` (hub) plus one detail page per service: `cloud-solutions.html`, `cloud-migration.html`, `cybersecurity.html`, `managed-it.html`, `it-infrastructure.html`, `digital-solutions.html`.
- `legal/` — `privacy.html`, `terms.html`, `cookies.html`, `accessibility.html`.
- `assets/css/style.css` — the single stylesheet for the entire site (design tokens + all components).
- `assets/js/main.js` — the single shared script for the entire site.

### Header/footer are injected, not duplicated
Every page contains only placeholder markup — `<header class="site-header" id="site-header"></header>` and `<footer class="site-footer" id="site-footer"></footer>` — inside `<body>`. `assets/js/main.js` builds the actual nav and footer HTML at runtime from a single `NAV` config array and injects it into those elements. **To change navigation, edit the `NAV` array in `main.js` once — do not hand-edit header/footer markup per page.**

### The `data-root` / `data-page` contract
`<body>` on every page must carry two attributes that `main.js` reads:
- `data-root` — `"./"` for root-level pages, `"../"` for pages one level deep (`services/*.html`, `legal/*.html`). `main.js` prepends this to every generated nav/footer link, so it must match the page's actual folder depth or all injected links will 404.
- `data-page` — a key (`home`, `services`, `industries`, `resources`, `about`, `careers`, `contact`, or `legal`) used only to mark the matching nav link `aria-current="page"`.

Any new page must set both attributes correctly and include the two placeholder elements plus `<script src="{root}assets/js/main.js"></script>` before `</body>`.

### CSS design system (`assets/css/style.css`)
Dark, glassmorphic theme. All values are driven by CSS custom properties defined once in `:root`:
- Current tokens: `--void`/`--panel`/`--panel-2`/`--panel-3` (surface depths), `--cyan`/`--violet` (the two-hue gradient accent, `--gradient-brand`), `--text-hi`/`--text-body`/`--text-mute`, `--glass`/`--glass-strong`/`--border`.
- A block of **legacy aliases** (`--ink`, `--navy`, `--blue`, `--white`, `--mist`, `--hairline`, `--slate`, `--ink-text`, etc.) remaps the original light-theme token names onto the new dark tokens. These aliases exist because early HTML/inline styles reference them directly (e.g. `style="background:var(--ink)"` on a couple of hero panels, `style="color:var(--blue)"` on inline SVG icons). When retheming, update the alias block rather than hunting down every inline `var(--ink)`/`var(--blue)` usage in the HTML.
- Component classes are shared globally and reused verbatim across all pages: `.hero`, `.page-hero`, `.card`, `.service-grid`, `.grid-2/3/4`, `.tier-card`, `.faq-item`, `.industry-item`, `.process-rail` (numbered step sequences only — see below), `.cta-band`, `.tech-group`, `.empty-state`, `.badge`, `.reveal`. Reuse these instead of writing new one-off page CSS.
- Numbered step markers (`.process-rail` / `.process-num`) are reserved for genuine sequences (the 5-step migration process, the 6-step engagement process). Don't apply them to unordered content like service or industry cards.

### The network-diagram signature element
`main.js` contains `netDiagramSVG()`, which generates the site's signature glowing node/edge SVG (used in hero panels and as low-opacity `.net-watermark` backgrounds). Any container with a `data-net-diagram` attribute gets this SVG mounted into it on `DOMContentLoaded` via `mountNetDiagrams()`; add `data-labels="false"` for the unlabeled watermark variant. All diagram styling (colors, glow, animation) lives in CSS (`.net-diagram`, `.net-watermark` rules) — the JS only emits structural SVG with class names, so recoloring the diagram is a CSS-only change.

`.hero-visual` doubles as a "console panel" frame: its `::before`/`::after` pseudo-elements generate the `NETWORK OVERVIEW` / `● LIVE` chrome labels purely in CSS. Any element with class `hero-visual` gets this treatment automatically, including the smaller diagram panels reused on Cloud Solutions, Digital Solutions, and About.

### Other JS behavior in `main.js`
- `setupReveal()` — IntersectionObserver-driven fade/slide-in for any element with class `.reveal`; degrades to instantly-visible if `IntersectionObserver` is unsupported.
- `setupHeroSpotlight()` — cursor-tracking radial glow on `.hero`, skipped entirely when `prefers-reduced-motion: reduce` is set.
- Mobile nav toggle and the desktop dropdown are built in `buildHeader()`.

### Fonts
Every page's `<head>` includes an identical Google Fonts `<link>` (Space Grotesk / Manrope / JetBrains Mono). It is duplicated per-file rather than centralized, so a font change requires a find-and-replace across all HTML files, not an edit in one place.

### Contact form
`contact.html` has no backend. Submission is intercepted client-side (`e.preventDefault()`), validated with native HTML5 constraints, and on success simply swaps the form for a static confirmation message — nothing is actually sent anywhere. It also includes a hidden honeypot field (`company-website`) for basic spam trapping. Don't assume this form delivers email without wiring it to a real endpoint.

### Content placeholder conventions — preserve these
The site is a template pending real company details, and this is intentional, not an oversight:
- Bracketed placeholders (`[Company Name]`, `[Business Email]`, `[Business Phone]`, `[Office Location]`, `[Business Hours]`, `[Effective Date]`) stand in for real values throughout, including inside `main.js`'s generated header/footer.
- `.empty-state` blocks are used wherever real content doesn't exist yet (case studies, guides, whitepapers, team bios, open job listings) instead of inventing fake testimonials, statistics, certifications, employees, or case-study results.

When adding content, keep following these two conventions rather than fabricating specifics.
