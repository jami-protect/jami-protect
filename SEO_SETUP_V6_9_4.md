# JaMi Protect V6.9.4 — Search setup

The website itself is crawl-ready. Search-engine ownership tokens cannot be fabricated and must be issued by the search engine for this GitHub Pages property.

## Google Search Console
1. Add `https://jami-protect.github.io/jami-protect/` as a URL-prefix property.
2. Complete Google's verification using a verification method offered by Search Console.
3. Submit `https://jami-protect.github.io/jami-protect/sitemap.xml`.
4. Use URL Inspection for the homepage, `/games/`, and several game profiles after deployment.

Do not add a fake `google-site-verification` meta value. Add only the exact token Google issues.

## Bing Webmaster Tools
1. Add/import the site in Bing Webmaster Tools.
2. Submit `/jami-protect/sitemap.xml` if it was not imported automatically.
3. Inspect the homepage and game-library URLs after deployment.

## Optional IndexNow
The repo includes `tools/indexnow_submit.py` and a manual GitHub Action. It is intentionally inactive until a real key is configured.

1. Generate your IndexNow key (8–128 permitted characters).
2. Add a UTF-8 file named `<KEY>.txt` to the website root whose content is exactly `<KEY>`.
   For this project it must become live at:
   `https://jami-protect.github.io/jami-protect/<KEY>.txt`
3. Add the same key as GitHub Actions secret `INDEXNOW_KEY`.
4. Deploy the key file first.
5. Run the **IndexNow (manual)** workflow.

The script verifies the live key file before submitting URLs and otherwise exits without sending anything.

## Future sitemap updates
Run:

```bash
python tools/build_seo_v6_9_4.py
python tools/validate_seo_v6_9_4.py
```

The builder fingerprints SEO-significant page content and preserves an existing `lastmod` unless that page actually changed.
