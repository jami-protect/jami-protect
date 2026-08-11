# JaMi Protect

Research-backed Windows gaming optimization.

This repository is prepared to host the public JaMi Protect landing page with GitHub Pages and public release downloads with GitHub Releases.

## Website files

- `index.html` — landing page
- `download.html` — installer/release page
- `faq.html` — FAQ
- `changelog.html` — public release notes
- `privacy.html` — website privacy placeholder
- `assets/js/config.js` — central repository/download configuration

## Publishing with GitHub Pages

1. Upload/commit all files in this package to the repository root.
2. In GitHub open **Settings → Pages**.
3. Set the source to **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Save.
6. GitHub will publish the site at the repository's Pages URL.

Expected URL for this package:
`https://timmiejtwitch-sketch.github.io/Jamiprotect/`

## Enabling the installer

The site starts with `releaseReady: false` so visitors do not hit a broken installer URL.

When you have a real release:
1. Create a GitHub Release.
2. Upload the installer with the exact filename `JaMiProtect_Setup.exe`.
3. Open `assets/js/config.js`.
4. Change `releaseReady: false` to `releaseReady: true`.
5. Commit.

The direct latest-download pattern is then:
`https://github.com/timmiejtwitch-sketch/Jamiprotect/releases/latest/download/JaMiProtect_Setup.exe`

## Important before public software release

Before shipping an installer publicly, complete your code-signing/security/release validation and publish release notes plus a SHA-256 checksum.
