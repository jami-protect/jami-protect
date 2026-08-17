#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import urlparse, unquote
from bs4 import BeautifulSoup
import json, subprocess, hashlib, sys
ROOT=Path(__file__).resolve().parents[1]
checks={}
htmls=list(ROOT.rglob('*.html'))
checks['html_pages']=len(htmls)
missing=[]; refs=0
for html in htmls:
    soup=BeautifulSoup(html.read_text('utf-8',errors='ignore'),'html.parser')
    for tag,attr in [('a','href'),('link','href'),('script','src'),('img','src')]:
        for el in soup.find_all(tag):
            val=el.get(attr)
            if not val or val.startswith(('#','mailto:','tel:','javascript:','data:')): continue
            u=urlparse(val)
            if u.scheme in ('http','https'): continue
            path=unquote(u.path)
            if not path: continue
            refs+=1
            if path.startswith('/jami-protect/'):
                target=ROOT/path[len('/jami-protect/'):]
            elif path.startswith('/'):
                target=ROOT/path.lstrip('/')
            else:
                target=(html.parent/path).resolve()
            if target.is_dir(): target=target/'index.html'
            if not target.exists(): missing.append({'page':str(html.relative_to(ROOT)),'ref':val})
checks['internal_refs_checked']=refs
checks['missing_internal_refs']=missing
checks['old_asset_refs']=[]
for html in htmls:
    t=html.read_text('utf-8',errors='ignore')
    if any(x in t for x in ('jami-v6-6','jami-v6-7','jami-v6-8','site-v6-8','covers-v6-8','config-v6-8','review-form-v6-8')):
        checks['old_asset_refs'].append(str(html.relative_to(ROOT)))
reg=json.loads((ROOT/'assets/data/games.json').read_text())
games=reg['games']; ids=[g.get('steamgriddb_id') for g in games]
checks['games']=len(games)
checks['steamgriddb_ids_present']=sum(x is not None for x in ids)
checks['steamgriddb_ids_unique']=len(set(ids))==len(ids)
checks['game_detail_pages']=sum(1 for p in htmls if '/games/' in ('/'+str(p.relative_to(ROOT)).replace('\\','/')) and p.name=='index.html' and p.parent.name!='games')
checks['game_details_with_performance_map']=sum(1 for p in htmls if 'performance-map' in p.read_text('utf-8',errors='ignore'))
checks['game_hubs_with_search']=sum(1 for p in [ROOT/'games/index.html',ROOT/'nl/games/index.html',ROOT/'de/games/index.html',ROOT/'fr/games/index.html'] if p.exists() and 'data-game-search' in p.read_text('utf-8'))
checks['localized_404_noindex']=sum(1 for p in [ROOT/'404.html',ROOT/'nl/404.html',ROOT/'de/404.html',ROOT/'fr/404.html'] if p.exists() and 'noindex,follow' in p.read_text('utf-8'))
checks['review_consent_pages']=sum(1 for p in [ROOT/'leave-review.html',ROOT/'nl/leave-review.html',ROOT/'de/leave-review.html',ROOT/'fr/leave-review.html'] if p.exists() and 'publish_consent' in p.read_text('utf-8'))
checks['privacy_policy_pages']=sum(1 for p in [ROOT/'privacy.html',ROOT/'nl/privacy.html',ROOT/'de/privacy.html',ROOT/'fr/privacy.html'] if p.exists() and 'policy-card' in p.read_text('utf-8'))
checks['cover_header_fallback_removed']='header.jpg' not in (ROOT/'assets/js/covers-v6-9.js').read_text('utf-8')
js_files=sorted((ROOT/'assets/js').glob('*.js')); js_fail=[]
for js in js_files:
    r=subprocess.run(['node','--check',str(js)],capture_output=True,text=True)
    if r.returncode: js_fail.append({'file':str(js.relative_to(ROOT)),'error':r.stderr.strip()})
checks['javascript_syntax_failures']=js_fail
checks['pass']=(len(missing)==0 and len(checks['old_asset_refs'])==0 and len(js_fail)==0 and checks['html_pages']==88 and checks['games']==12 and checks['steamgriddb_ids_present']==12 and checks['steamgriddb_ids_unique'] and checks['game_detail_pages']==48 and checks['game_details_with_performance_map']==48 and checks['game_hubs_with_search']==4 and checks['localized_404_noindex']==4 and checks['review_consent_pages']==4 and checks['privacy_policy_pages']==4 and checks['cover_header_fallback_removed'])
print(json.dumps(checks,indent=2))
sys.exit(0 if checks['pass'] else 1)
