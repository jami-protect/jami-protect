# JaMi Protect Website V6.9.4

Production multilingual GitHub Pages build.

Languages: EN · NL · DE · FR · ES · PT-BR · PL · JA · TR

Build: **V6.9.4 SEO HARDENING**

## V6.9.4 highlights

- 198 HTML pages total, with 189 canonical/indexable pages and 9 localized `noindex` 404 pages.
- 108 localized Game Intelligence profiles (12 games × 9 languages).
- Exact reciprocal hreflang matrix: EN / NL / DE / FR / ES / PT-BR / PL / JA / TR + x-default.
- Localized JSON-LD URLs and BreadcrumbList paths; no English URL leakage in localized game/library structured data.
- Search-oriented but evidence-safe game titles such as `PC Performance & Settings Guide`; no unvalidated “best settings” or FPS promises.
- Game meta descriptions include exact engine/renderer and research scope.
- Each game profile includes an additional visible research summary derived only from the central game registry.
- WebSite, Organization, SoftwareApplication, WebPage, CollectionPage, VideoGame and BreadcrumbList structured data where appropriate.
- Complete Open Graph plus Twitter Card title/description/image metadata.
- `robots.txt` allows crawling and advertises the canonical XML sitemap.
- XML sitemap lists only canonical/indexable URLs and includes reciprocal hreflang alternates.
- `assets/data/seo-lastmod.json` plus `tools/build_seo_v6_9_4.py` preserve `lastmod` until SEO-significant page content actually changes.
- `tools/validate_seo_v6_9_4.py` validates canonical URLs, hreflang, Twitter metadata, JSON-LD locale integrity, 108 research summaries and sitemap parity.
- Google Search Console and Bing setup instructions included; no fabricated verification tokens.
- Optional manual IndexNow workflow included, but it sends nothing until a real key file is deployed and `INDEXNOW_KEY` is configured.
- V6.9.2 compact 9-language selector and V6.9.3 low-height hero/fold fix are preserved.

## SEO validation

Run from the website root:

```bash
python tools/build_seo_v6_9_4.py
python tools/validate_seo_v6_9_4.py
```

See `V6_9_4_SEO_VALIDATION_REPORT.json` in the patch/release for the validated build counts.
