JAMI PROTECT V6.2 — ROOT INDEX COVER + CACHE FIX
=================================================

PROBLEM FOUND
/games/ was serving the new V6 cover system, but the browser could still display
an older cached root homepage/carousel.

V6.2 FIX
- Brand-new CSS filename: assets/css/jami-v6-2.css
- Brand-new JS filenames:
  assets/js/config-v6-2.js
  assets/js/covers-v6-2.js
  assets/js/site-v6-2.js
- Homepage old cover-band replaced by a fixed 12-card real-cover grid
- Homepage games use the same official artwork sources as /games/
- Contact added to the homepage navigation
- Cache-busting query build: 6.2.8120018

AUDIT
Homepage cover cards: 12/12
Contact in home nav: True
Old cover-band remaining: False
Status: PASS

UPLOAD ALL FILES TO
https://github.com/jami-protect/jami-protect

AFTER DEPLOYMENT OPEN A COMPLETELY NEW URL:
https://jami-protect.github.io/jami-protect/index.html?build=6208120018

If Chrome still shows the old carousel:
Ctrl+Shift+R
or open the URL once in Incognito.
