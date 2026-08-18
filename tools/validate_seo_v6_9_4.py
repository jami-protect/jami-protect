#!/usr/bin/env python3
from pathlib import Path
from bs4 import BeautifulSoup
import json, sys, xml.etree.ElementTree as ET
from collections import Counter
ROOT=Path(__file__).resolve().parents[1]
EXPECTED_LANGS={'en','nl','de','fr','es','pt-BR','pl','ja','tr','x-default'}
errors=[]; indexable=[]; canon=[]; game_pages=0
for p in sorted(ROOT.rglob('*.html')):
    if any(part.startswith('.') for part in p.relative_to(ROOT).parts): continue
    s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
    rel=p.relative_to(ROOT).as_posix()
    r=s.find('meta',attrs={'name':'robots'}); noindex=bool(r and 'noindex' in r.get('content','').lower())
    c=s.find('link',rel='canonical')
    if not c: errors.append(f'{rel}: missing canonical'); continue
    if noindex: continue
    indexable.append(rel); canon.append(c.get('href'))
    if not s.title or not s.title.get_text(strip=True): errors.append(f'{rel}: missing title')
    d=s.find('meta',attrs={'name':'description'})
    if not d or not d.get('content','').strip(): errors.append(f'{rel}: missing description')
    langs={x.get('hreflang') for x in s.find_all('link',rel='alternate') if x.get('hreflang')}
    if langs!=EXPECTED_LANGS: errors.append(f'{rel}: hreflang set {sorted(langs)}')
    for k in ('twitter:title','twitter:description','twitter:image'):
        if not s.find('meta',attrs={'name':k}): errors.append(f'{rel}: missing {k}')
    jl=s.find('script',attrs={'type':'application/ld+json'})
    if not jl: errors.append(f'{rel}: missing JSON-LD')
    else:
        try: obj=json.loads(jl.string or jl.get_text())
        except Exception as e: errors.append(f'{rel}: invalid JSON-LD {e}'); obj={}
        # Locale URL leakage check for localized game/library pages.
        parts=rel.split('/')
        locale=parts[0] if parts[0] in {'nl','de','fr','es','pt-br','pl','ja','tr'} else None
        if locale and '/games/' in '/'+rel:
            expected=f'/jami-protect/{locale}/games/'
            txt=json.dumps(obj,ensure_ascii=False)
            if f'https://jami-protect.github.io/jami-protect/games/' in txt:
                errors.append(f'{rel}: English game URL leaked into localized JSON-LD')
            if expected not in txt: errors.append(f'{rel}: localized game path missing from JSON-LD')
    if '/games/' in '/'+rel and rel.endswith('/index.html') and not rel.endswith('games/index.html'):
        game_pages+=1
        if not s.select_one('.seo-research-summary'): errors.append(f'{rel}: missing research summary')

for u,n in Counter(canon).items():
    if n>1: errors.append(f'duplicate canonical: {u} x{n}')

sm=ROOT/'sitemap.xml'
try:
    tree=ET.parse(sm); ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls=[x.text for x in tree.findall('.//s:loc',ns)]
    if set(urls)!=set(canon): errors.append(f'sitemap mismatch: sitemap={len(urls)} canonical={len(canon)}')
    if len(urls)!=len(set(urls)): errors.append('sitemap has duplicate URLs')
    for u in tree.findall('.//s:url',ns):
        if u.find('s:lastmod',ns) is None: errors.append('sitemap URL missing lastmod')
except Exception as e: errors.append(f'sitemap parse failed: {e}')

print('JaMi Protect V6.9.4 SEO VALIDATION')
print('HTML indexable :',len(indexable))
print('Game profiles  :',game_pages)
print('Canonical URLs :',len(canon))
print('Errors         :',len(errors))
for e in errors[:100]: print(' -',e)
print('FINAL          :','PASS' if not errors else 'FAIL')
sys.exit(0 if not errors else 1)
