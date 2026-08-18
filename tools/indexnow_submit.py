#!/usr/bin/env python3
"""Optional manual IndexNow submitter for JaMi Protect.
Requires INDEXNOW_KEY and the matching key file to already be live under /jami-protect/.
No submission occurs without the key.
"""
from pathlib import Path
import json, os, sys, urllib.request, xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
key=os.environ.get('INDEXNOW_KEY','').strip()
if not key:
    print('INDEXNOW_KEY is not set; nothing submitted.')
    sys.exit(0)
if not (8 <= len(key) <= 128) or not all(c.isalnum() or c=='-' for c in key):
    raise SystemExit('Invalid INDEXNOW_KEY format.')
base='https://jami-protect.github.io/jami-protect/'
key_location=base+key+'.txt'
# Verify live key before sending. This prevents a workflow from submitting an unverifiable key.
try:
    with urllib.request.urlopen(key_location,timeout=15) as r:
        body=r.read().decode('utf-8').strip()
    if body != key: raise RuntimeError('live key file content mismatch')
except Exception as e:
    print(f'IndexNow skipped: key file is not live/valid at {key_location}: {e}')
    sys.exit(0)
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
tree=ET.parse(ROOT/'sitemap.xml')
urls=[x.text for x in tree.findall('.//s:loc',ns) if x.text]
payload=json.dumps({'host':'jami-protect.github.io','key':key,'keyLocation':key_location,'urlList':urls}).encode('utf-8')
req=urllib.request.Request('https://api.indexnow.org/indexnow',data=payload,headers={'Content-Type':'application/json; charset=utf-8'},method='POST')
with urllib.request.urlopen(req,timeout=30) as r:
    print('IndexNow response:',r.status,'URLs:',len(urls))
