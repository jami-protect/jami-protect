#!/usr/bin/env python3
"""JaMi Protect V6.9.4 SEO sitemap/lastmod builder.

Keeps <lastmod> stable unless SEO-significant page content changes.
Run from the website repository root:
    python tools/build_seo_v6_9_4.py
"""
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import date
import hashlib, json
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
STATE=ROOT/'assets/data/seo-lastmod.json'
SITEMAP=ROOT/'sitemap.xml'
TODAY=date.today().isoformat()
NS='http://www.sitemaps.org/schemas/sitemap/0.9'
X='http://www.w3.org/1999/xhtml'


def canonical(s):
    t=s.find('link',rel='canonical')
    return t.get('href','').strip() if t else ''

def indexable(s):
    t=s.find('meta',attrs={'name':'robots'})
    return not (t and 'noindex' in t.get('content','').lower())

def fingerprint(s):
    chunks=[s.title.get_text(' ',strip=True) if s.title else '']
    d=s.find('meta',attrs={'name':'description'}); chunks.append(d.get('content','') if d else '')
    chunks.append(canonical(s))
    chunks.extend(str(x) for x in s.find_all('link',rel='alternate'))
    chunks.extend((x.string or x.get_text()) for x in s.find_all('script',attrs={'type':'application/ld+json'}))
    main=s.find('main'); chunks.append(main.get_text(' ',strip=True) if main else '')
    return hashlib.sha256('\n'.join(chunks).encode('utf-8')).hexdigest()

old={'pages':{}}
if STATE.exists():
    try: old=json.loads(STATE.read_text(encoding='utf-8'))
    except Exception: pass

pages=[]; new={'schema':'jami.seo.lastmod.v1','generated_at':TODAY,'pages':{}}
for p in sorted(ROOT.rglob('*.html')):
    # Ignore generated/vendor areas if they ever appear.
    if any(part.startswith('.') for part in p.relative_to(ROOT).parts): continue
    s=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')
    if not indexable(s): continue
    url=canonical(s)
    if not url: continue
    fp=fingerprint(s)
    prev=old.get('pages',{}).get(url,{})
    lm=prev.get('lastmod') if prev.get('sha256')==fp and prev.get('lastmod') else TODAY
    new['pages'][url]={'lastmod':lm,'sha256':fp}
    pages.append((url,lm,s))

ET.register_namespace('',NS); ET.register_namespace('xhtml',X)
root=ET.Element('{%s}urlset'%NS)
for url,lm,s in sorted(pages,key=lambda x:x[0]):
    u=ET.SubElement(root,'{%s}url'%NS)
    ET.SubElement(u,'{%s}loc'%NS).text=url
    ET.SubElement(u,'{%s}lastmod'%NS).text=lm
    for a in s.find_all('link',rel='alternate'):
        if a.get('hreflang') and a.get('href'):
            ET.SubElement(u,'{%s}link'%X,{'rel':'alternate','hreflang':a['hreflang'],'href':a['href']})
ET.indent(root,space='  ')
SITEMAP.write_bytes(ET.tostring(root,encoding='utf-8',xml_declaration=True)+b'\n')
STATE.write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'SEO sitemap rebuilt: {len(pages)} canonical/indexable URLs')
