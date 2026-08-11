JAMI PROTECT WEBSITE V1
=======================

TARGET REPOSITORY
Owner: timmiejtwitch-sketch
Repository: Jamiprotect

QUICKEST UPLOAD ROUTE
1. Create the public GitHub repository: Jamiprotect
2. Open the repository.
3. Choose Add file -> Upload files.
4. Drag ALL files and folders from this package into the repository.
   IMPORTANT: index.html must be in the repository ROOT.
5. Commit the files.
6. Go to Settings -> Pages.
7. Source: Deploy from a branch
8. Branch: main
9. Folder: /(root)
10. Save.

EXPECTED WEBSITE
https://timmiejtwitch-sketch.github.io/Jamiprotect/

DOWNLOAD SYSTEM
The website is deliberately shipped with:
releaseReady: false

That prevents a dead EXE download before you have published the installer.

When JaMiProtect_Setup.exe is ready:
1. GitHub repo -> Releases -> Draft a new release.
2. Upload exactly: JaMiProtect_Setup.exe
3. Publish the release.
4. Edit assets/js/config.js:
   releaseReady: false
   becomes:
   releaseReady: true
5. Commit.

CENTRAL SETTINGS
assets/js/config.js

If you use a different repository name, change githubRepo there
AND update the hard-coded sitemap/robots URLs before publishing.

NO OWN DOMAIN IS REQUIRED.
A custom domain can be added later.
