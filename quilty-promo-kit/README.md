# Quilty as Charged — Promotional Kit

Everything needed to list the app on Google Play and talk about it elsewhere.
Generated 5 September 2026 against app version **1.0.1** (`versionCode 2`).

Every screenshot in this kit is a **real capture of the actual app** — `www/index.html`
rendered at a phone viewport and driven through each screen. Nothing is a mockup.

---

## What's here

```
promo/
├── README.md                     ← you are here
├── COPY.md                       ← store descriptions, taglines, social posts, ASO keywords
├── play-store/
│   ├── app-icon-512.png                       512 × 512   Play "App icon"
│   ├── feature-graphic-1024x500.png           1024 × 500  Play "Feature graphic"  ← use this one
│   ├── feature-graphic-artwork-1024x500.jpg   1024 × 500  the old artwork, no title on it
│   ├── phone/          01–10, 1080 × 1920, captioned + device-framed  ← upload these
│   ├── phone-raw/      01–10, 1080 × 1920, plain app captures, no caption
│   └── tablet/         2 × 1280 × 800, real emulator captures
├── social/
│   ├── instagram-square-1080x1080.png
│   ├── instagram-story-1080x1920.png
│   ├── pinterest-1000x1500.png
│   ├── x-header-1500x500.png
│   ├── facebook-cover-1640x856.png
│   └── artwork-*.png                          the two square illustrations, kept as-is
├── web/                ready-to-host landing page + privacy policy
└── press/              press kit as HTML and PDF, plus the screenshots it embeds
```

A zipped copy of all of this is at `../quilty-promo-kit.zip`.

---

## Three things to fix before you publish

### 1. The old phone screenshots misrepresent the app — don't upload them

`store_assets/screenshot_1.png` and `screenshot_2.png` are AI-generated mockups, not captures.
They show a hamburger menu, a bottom navigation bar (Home / Designer / Gallery / Library / Profile)
and a pencil/eraser/fill toolbar — **none of which exist in the app**. The real UI is a patchwork
header with tilted fabric-scrap tabs.

Google Play's Deceptive Behaviour policy prohibits store imagery that misrepresents an app, so
uploading those risks rejection or suspension. Use `play-store/phone/` instead. I've left the old
files where they were rather than deleting them, but they should not go to the Console.

The two **tablet** screenshots in `store_assets/` are genuine emulator captures and are fine —
they're copied into `play-store/tablet/`.

### 2. "Works completely offline" isn't quite true yet

`www/index.html:9` loads Fredoka and Nunito from `fonts.googleapis.com` on every launch. Every
*feature* works offline — the app just falls back to system fonts — but it does make a third-party
request that hands your users' IP addresses to Google.

Two consequences:

- The Data Safety questionnaire and privacy policy have to acknowledge it. `web/privacy.html`
  does this honestly, and `COPY.md` phrases the offline claim as *"Everything except the display
  fonts works with no connection at all."*
- **Better fix:** self-host the fonts. Download the two families, drop the `.woff2` files into
  `www/`, replace the `<link>` with a local `@font-face` block, and re-run `npx cap sync android`.
  Then the app is genuinely offline, the claim gets simpler, the first paint gets faster, and
  the privacy section shrinks to one sentence.

### 3. Placeholders to replace

Search the kit for these and fill them in:

| Placeholder | Where | What it needs |
|---|---|---|
| `REPLACE_WITH_YOUR_EMAIL` | `web/privacy.html`, `press/press-kit.html` | a real contact address — Play requires one |
| `REPLACE_WITH_PLAY_URL` | `press/press-kit.html` | your listing URL once it's live |

After editing `press/press-kit.html`, regenerate the PDF:

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="D:\quilty\quilty-android\promo\press\press-kit.pdf" "D:\quilty\quilty-android\promo\press\press-kit.html"
```

---

## Play Console field map

| Console field | File | Requirement |
|---|---|---|
| App icon | `play-store/app-icon-512.png` | 512 × 512 PNG ✅ |
| Feature graphic | `play-store/feature-graphic-1024x500.png` | 1024 × 500 ✅ |
| Phone screenshots | `play-store/phone/01` … `08` | 2–8 allowed; these are 1080 × 1920, 9:16 ✅ |
| 7-inch tablet | `play-store/tablet/*` | 1280 × 800 ✅ |
| 10-inch tablet | `play-store/tablet/*` | same files work ✅ |
| App name | `COPY.md` §1 | ≤ 30 chars ✅ 17 |
| Short description | `COPY.md` §1 | ≤ 80 chars ✅ 73 |
| Full description | `COPY.md` §1 | ≤ 4000 chars ✅ ~2150 |
| What's new | `COPY.md` §1 | ≤ 500 chars ✅ |
| Privacy policy URL | host `web/privacy.html` | must be a public URL |
| Category / tags / rating | `COPY.md` §2 | — |

`phone/09-size-chart.png` and `10-sewing-basket.png` are spares — Play caps you at eight, so swap
them in for whichever of 01–08 you like least.

**Screenshot order matters** — the first two are most of what people see. The current order leads
with the designer and the cutting chart, which is the app's actual pitch.

### Hosting the privacy policy

`web/` is a plain static folder — no build step. Any of these work:

- **GitHub Pages** — push `web/` to a repo, enable Pages, and the policy lands at
  `https://<user>.github.io/<repo>/privacy.html`
- **Netlify Drop** — drag the `web/` folder onto <https://app.netlify.com/drop>
- Any web host you already have

The landing page (`web/index.html`) links to the policy, so hosting the folder gives you both.

---

## Social asset notes

| File | Use | Watch out for |
|---|---|---|
| `instagram-square-1080x1080.png` | IG/FB feed post | — |
| `instagram-story-1080x1920.png` | IG/FB story, Reels cover | keep UI overlays off the top and bottom ~250 px |
| `pinterest-1000x1500.png` | Pinterest pin (2:3, their preferred ratio) | quilting is huge on Pinterest — this is probably your best channel |
| `x-header-1500x500.png` | X / Twitter header | your avatar overlaps the lower-left; the feature chips sit there, so expect them partly covered |
| `facebook-cover-1640x856.png` | Facebook page cover | FB crops the sides on mobile — the title is centred, so it survives |

Post copy for each of these is in `COPY.md` §5.

**Don't add a "Get it on Google Play" badge until the app is actually live**, and when you do, use
the official badge from Google's brand pages rather than a redrawn one — it's a trademark with
specific usage rules. Nothing in this kit claims the app is already on the store.

---

## Regenerating any of this

The screenshots were produced by serving a copy of `www/` over `http://127.0.0.1:8765` and driving
it with a small injected script that seeds a design and shifts the page to the region of interest,
then capturing with headless Chrome at `--window-size=540,960 --force-device-scale-factor=2`
(= 1080 × 1920). The framing, captions and all the brand graphics are HTML templates rendered the
same way.

Those generator files live in this session's scratchpad rather than the repo, since they're
throwaway tooling. If you want to re-shoot after a UI change, the approach is: copy `www/`
somewhere, append a driver script before `</body>`, `python -m http.server`, then screenshot each
state with Chrome. Ask and I'll rebuild them.

---

## Brand quick reference

| | |
|---|---|
| Name | **Quilty as Charged** — capital Q and C, lower-case "as". Never "Quilty As Charged". |
| Tagline | *guilty of buying more fabric* — lower case, letter-spaced, in Cherry |
| Headings | Fredoka 600/700 |
| Body | Nunito 400/600/700 |
| Muslin `#FAF3E3` | every background |
| Thread `#4A3B32` | text, 3px borders, and the signature `6px 6px 0` offset shadow |
| Cherry `#C94F4F` · Butter `#F6C453` · Rose `#E8879B` · Sage `#8FAE8B` · Denim `#5B7B9A` | the fabrics |

The look is: cream ground with a dot grid, 3px dark-brown borders, hard offset shadows (no blur),
rounded corners, dashed inner rules, and everything slightly tilted like a pinned scrap.
