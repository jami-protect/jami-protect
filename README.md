# JaMi Protect Website V6.9.1

Production multilingual GitHub Pages build.

Languages:
- English: https://jami-protect.github.io/jami-protect/
- Nederlands: https://jami-protect.github.io/jami-protect/nl/
- Deutsch: https://jami-protect.github.io/jami-protect/de/
- Français: https://jami-protect.github.io/jami-protect/fr/

Build: V6.9.1 GAME INTELLIGENCE FOUNDATION

## V6.9.1 highlights

- Central `assets/data/games.json` registry for exact game identity, Steam AppID and pinned SteamGridDB game ID.
- 48 localized game profiles generated from one registry instead of hand-maintained copies.
- Searchable/filterable Games hub in all four languages.
- Portrait-only Steam cover resolver with local portrait fallback; landscape `header.jpg` fallback removed.
- Mobile language switch, keyboard focus states, ARIA nav/mode state and reduced-motion handling.
- Progressive reveal enhancement: content remains visible when JavaScript fails.
- Localized/noindex 404 pages with validated internal links.
- WebSite / SoftwareApplication / VideoGame / Breadcrumb structured data.
- Web manifest integration, theme color and touch icon.
- Review publication consent plus copy-to-clipboard fallback when `mailto:` is unavailable.
- Expanded privacy information for GitHub Pages hosting and review/contact flows.
- Legacy V6.6–V6.8 production CSS/JS removed from the release bundle.
- `tools/validate_site_v6_9.py` validates internal links, game registry integrity, accessibility-critical pages, cover fallback policy and JavaScript syntax.

## Validation

See `V6_9_0_VALIDATION_REPORT.json`. A passing release currently validates 88 HTML pages, 2,846 internal asset/navigation references, all 48 localized game profiles and all 12 pinned SteamGridDB game IDs.


## V6.9.1 language expansion
Public locales: EN, NL, DE, FR, ES, PT-BR, PL, JA, TR. All 22 routes are generated for every locale with reciprocal hreflang links.
