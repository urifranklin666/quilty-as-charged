# Quilty as Charged 🧵 — Android App

A fun and quirky quilting toolkit:

- 🎨 **Pixel → Quilt** — paint pixel art (with mirror and medallion symmetry modes), get a cutting chart with per-fabric yardage, save designs to your Sewing Basket, and export printable pattern sheets via the Android share sheet
- 🧮 **Patch Math** — squares needed, squares per yard, total yardage
- 📏 **Backing & Binding** — strip counts, panels, and yardage
- 🛏️ **Size Chart** — standard quilt and batting sizes
- ✂️ **Pre-cut Cheat Sheet** — fat quarters to honey buns

The app is a plain HTML/CSS/JS web app (in `www/`) wrapped in a native Android shell with [Capacitor](https://capacitorjs.com).

## Prerequisites

1. **Node.js** (v18+) — https://nodejs.org
2. **Android Studio** — https://developer.android.com/studio
   - During setup, install the Android SDK and at least one emulator or connect a real device with USB debugging enabled.

## Build steps

From this folder:

```bash
# 1. Install dependencies
npm install

# 2. Add the Android platform (first time only)
npx cap add android

# 3. Generate launcher icons from icon-512.png (optional but nice)
npx capacitor-assets generate --android --iconBackgroundColor '#FAF3E3'

# 4. Sync the web app into the Android project and open Android Studio
npm run android
```

In Android Studio:

- Press **Run ▶** to install on your emulator or connected phone.
- To make an installable APK: **Build → Build Bundle(s)/APK(s) → Build APK(s)**.
  The APK lands in `android/app/build/outputs/apk/debug/`.

## Publishing to Google Play (optional)

1. Create a signed release: **Build → Generate Signed Bundle/APK → Android App Bundle**.
2. Create a developer account at https://play.google.com/console (one-time $25 fee).
3. Upload the `.aab`, fill in the store listing, and submit for review.

## Making changes

Edit `www/index.html` (everything — markup, styles, and logic — lives in that one file), then re-run:

```bash
npx cap sync android
```

and rebuild in Android Studio.

## Bonus: it's also a PWA

The `www/` folder includes a `manifest.json`, so if you host it anywhere
(GitHub Pages, Netlify, etc.), Android users can also "Add to Home Screen"
straight from Chrome — no Play Store needed.
