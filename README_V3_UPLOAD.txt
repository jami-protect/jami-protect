JAMI PROTECT WEBSITE V3 - BRANDED + CACHE FIX
==============================================

TARGET
https://github.com/jami-protect/jami-protect
https://jami-protect.github.io/jami-protect/

WHY V2 LOOKED BROKEN
The live HTML had V2 elements, while the browser/GitHub Pages was still serving
older CSS/JS for some assets. That made the app mockup, game marquee, cards and
console appear as plain text.

V3 FIX
V3 uses NEW filenames:
  assets/css/jami-v3.css
  assets/js/config-v3.js
  assets/js/jami-v3.js
So the browser cannot reuse the old V1/V2 files.

V3 ALSO USES THE REAL JAMI BRAND FILES:
  assets/branding/jami-logo.svg
  assets/branding/jami-mark.svg
  assets/branding/jami-logo.png
  assets/branding/jami-mark.png
  assets/branding/jami-splash.png

UPLOAD
1. Extract this ZIP.
2. GitHub -> jami-protect/jami-protect
3. Add file -> Upload files.
4. Upload ALL files/folders.
5. Replace/overwrite the existing files when GitHub shows them as changes.
6. Commit changes.
7. Wait for GitHub Pages to redeploy.
8. Open:
   https://jami-protect.github.io/jami-protect/?v=3
9. Press Ctrl+F5 once.

IMPORTANT
Keep releaseReady:false in assets/js/config-v3.js until a real
JaMiProtect_Setup.exe exists in GitHub Releases.
