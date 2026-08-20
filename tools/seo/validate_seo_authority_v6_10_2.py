from pathlib import Path
import json,re,sys,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2]
LOCALES={'en':'','nl':'nl/','de':'de/','fr':'fr/','es':'es/','pt-BR':'pt-br/','pl':'pl/','ja':'ja/','tr':'tr/'}
SLUGS=['game-optimization','gaming-pc-optimizer','windows-11-gaming-optimizer','gaming-pc-diagnostic-tool','game-performance-analyzer','game-stutter-fix','gaming-crash-diagnostics','bsod-while-gaming','frametime-analyzer','improve-1-percent-lows','driver-health-checker','safe-pc-optimizer']
expected=set(LOCALES)|{'x-default'}
errors=[]; authority=[]
for prefix in LOCALES.values():
    hub=ROOT/f'{prefix}guides/index.html'
    if not hub.exists(): errors.append(f'missing hub: {hub.relative_to(ROOT)}')
    for slug in SLUGS:
        p=ROOT/f'{prefix}{slug}/index.html'; authority.append(p)
        if not p.exists(): errors.append(f'missing authority page: {p.relative_to(ROOT)}'); continue
        text=p.read_text(encoding='utf-8')
        hs=set(re.findall(r'hreflang=["\']([^"\']+)',text,re.I))
        if hs!=expected: errors.append(f'hreflang mismatch: {p.relative_to(ROOT)} -> {sorted(hs)}')
        if '<h1' not in text.lower(): errors.append(f'missing h1: {p.relative_to(ROOT)}')
        if 'rel="canonical"' not in text and "rel='canonical'" not in text: errors.append(f'missing canonical: {p.relative_to(ROOT)}')
        for body in re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',text,re.I|re.S):
            try: json.loads(body)
            except Exception as exc: errors.append(f'json-ld parse: {p.relative_to(ROOT)}: {exc}')
# game backlinks
registry=json.loads((ROOT/'assets/data/games.json').read_text(encoding='utf-8'))['games']
for prefix in LOCALES.values():
    for g in registry:
        p=ROOT/f'{prefix}games/{g["slug"]}/index.html'
        if p.exists() and 'game-authority-links' not in p.read_text(encoding='utf-8'):
            errors.append(f'game profile missing guide links: {p.relative_to(ROOT)}')
# sitemap count vs indexable canonicals
indexable=0
for p in ROOT.rglob('*.html'):
    t=p.read_text(encoding='utf-8')
    rm=re.search(r'<meta[^>]+name=["\']robots["\'][^>]*>',t,re.I)
    if not (rm and 'noindex' in rm.group(0).lower()): indexable+=1
ns='{http://www.sitemaps.org/schemas/sitemap/0.9}'
sitemap_count=len(ET.parse(ROOT/'sitemap.xml').getroot().findall(ns+'url'))
if sitemap_count!=indexable: errors.append(f'sitemap/indexable mismatch: {sitemap_count} != {indexable}')
print(f'authority pages: {len(authority)}')
print(f'indexable html: {indexable}')
print(f'sitemap urls: {sitemap_count}')
if errors:
    print(f'FINAL: FAIL ({len(errors)} issue(s))')
    for e in errors[:50]: print(' -',e)
    sys.exit(1)
print('FINAL: PASS')
