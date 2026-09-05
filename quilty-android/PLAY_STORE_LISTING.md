# Google Play Store Listing & Publishing Guide 🧵

This document contains the complete store listing copy, metadata, privacy policy template, and step-by-step instructions for publishing **Quilty as Charged** to the Google Play Store.

---

## 📱 App Store Listing Metadata

### App Name (Title)
`Quilty as Charged` *(or `Quilty as Charged — Quilt Tools`)*

### Short Description (Max 80 characters)
`Pixel quilt designer, fabric math, backing & binding calculators, size charts.`

### Full Description
```text
Quilty as Charged 🧵 — The essential toolkit for quilters, sewists, and fabric lovers!

Whether you are designing a custom pixel quilt, figuring out how much yardage you need, or calculating flying geese sizes, Quilty as Charged makes fabric math fast, fun, and effortless.

Key Features:
🎨 Pixel → Quilt Pattern Designer
- Paint pixel art with interactive symmetry modes (Free stitch, Mirror ↔, Mirror ↕, 4-Way Medallion).
- 🧩 Classic Quilt Block Presets: One-tap generation of Nine Patch, Sawtooth Star, Checkerboard, Pinwheel, Hourglass, Log Cabin, and Diamond Medallion designs!
- 🧪 Color Eyedropper: Sample any color straight off your grid canvas.
- Instantly generates a full cutting chart with square counts, WOF (width of fabric) strips, and total yardages.
- Save your custom quilt designs to your personal Sewing Basket.
- Export printable pattern sheets to your phone or share directly via the Android share sheet.

🎨 Interactive Color Studio
- Explore color harmonies, custom color wheels, and preset palette collections (Autumn Harvest, Berry Patch, Ocean Tide, Vintage Feedsack, Amish Nights).
- Mix and save your own custom fabric palettes.

🧮 Patch Math Calculator
- Enter finished square sizes and quilt top dimensions to instantly get cut sizes, square counts, squares per yard, and total fabric estimates.
- 💵 Fabric Cost & Budget Estimator: Enter your price per yard to calculate estimated total project fabric cost.

📐 Triangle Math Calculator
- Quick reference formulas for Half-Square Triangles (HSTs), Quarter-Square Triangles (QSTs), and Flying Geese (no-waste 4-at-a-time method).

📏 Backing, Border, Sashing & Binding Calculator
- Calculate exact binding strip counts and yardage, optional border & sashing fabric requirements, and backing panel needs with custom overages.

🛏️ Quilt & Batting Size Chart
- Instant reference table for standard sizes (Baby/Crib, Throw/Lap, Twin, Full, Queen, King).

✂️ Pre-cut Fabric Cheat Sheet
- Visual guide to Fat Quarters, Fat Eighths, Jelly Rolls, Charm Packs, Layer Cakes, Mini Charms, and Honey Buns.

🧵 Daily Quilting Tips
- Fun, helpful wisdom for pressing, ¼" seam accuracy, starching, and chain piecing.

🔒 100% Offline & Private
Works completely offline without requiring internet access or user registration.

Download Quilty as Charged today and fuel your fabric passion!
```

---

## 🏷️ Category, Rating & Keywords

- **Application Category**: House & Home (or Tools)
- **Tags / Keywords**: `quilting`, `quilt designer`, `fabric calculator`, `patchwork`, `sewing math`, `half square triangle`, `yardage calculator`, `pattern generator`
- **Content Rating**: Everyone 3+ (Targeting all ages)
- **Contains Ads**: No
- **In-App Purchases**: No

---

## 🔒 Privacy Policy Template

*Google Play Console requires a public URL for your Privacy Policy. You can host this file on GitHub Pages, Notion, or your personal website.*

```markdown
# Privacy Policy for Quilty as Charged

Effective Date: August 8, 2026

Quilty as Charged ("we", "our", or "us") respects your privacy. This Privacy Policy explains how our Android mobile application operates regarding user information.

### 1. Data Collection & Usage
Quilty as Charged is a fully offline, client-side utility application. 
- We do NOT collect, store, transmit, or share any personally identifiable information (PII).
- We do NOT collect location data, device identifiers, or analytics.
- All quilt designs, palettes, and preferences are stored strictly on your device using local storage.

### 2. Permissions
The app requests only standard Android permissions necessary for local file caching and sharing pattern exports via the native Android system share sheet.

### 3. Contact Us
If you have any questions regarding this privacy policy, you may contact the developer at:
Email: support@quiltyascharged.app
```

---

## 🚀 Step-by-Step Google Play Console Submission

### Step 1: Create a Google Play Developer Account
1. Go to [Google Play Console](https://play.google.com/console).
2. Sign in with your Google account and complete the one-time $25 USD developer registration fee.

### Step 2: Create a New App
1. Click **Create app** in the Play Console.
2. Enter App name: `Quilty as Charged`.
3. Set Default language: `English (United States)`.
4. App type: `App`, Free/Paid: `Free`.
5. Accept the Declarations and click **Create app**.

### Step 3: Set Up Your App Listing
1. Go to **Grow users → Store presence → Main store listing**.
2. Paste the **Short Description** and **Full Description** from above.
3. Upload Graphics:
   - **App Icon**: 512 x 512 px PNG (located in `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`).
   - **Feature Graphic**: 1024 x 500 px JPEG or 24-bit PNG.
   - **Phone Screenshots**: Minimum of 2 screenshots (take screenshots of the Pixel Designer, Patch Math, and Color Studio tabs).
4. Save changes.

### Step 4: Complete App Content Declarations
Under **Policy → App content**, complete the required questionnaires:
1. **Privacy Policy**: Provide the URL where you hosted the privacy policy text above.
2. **Ads**: Select "No, my app does not contain ads".
3. **App Access**: Select "All functionality is available without restriction".
4. **Target Audience**: Select age 13+ (or 18+ depending on preference).
5. **Content Rating**: Complete the IARC questionnaire (answers: Utility app, no user interaction, no violent content) to receive an automatic "Everyone" rating.

### Step 5: Upload the Signed Production Release Bundle (`.aab`)
1. Go to **Release → Production** (or **Testing → Internal testing** for a preview first).
2. Click **Create new release**.
3. Drag & drop the signed Android App Bundle file:
   `android/app/build/outputs/bundle/release/app-release.aab`
4. Enter Release Name: `1.0.0`.
5. Enter Release Notes: `Initial release of Quilty as Charged featuring pixel quilt designer, fabric math calculators, and color studio.`
6. Click **Save** and **Review Release**.
7. Click **Start rollout to Production**!

---

## 📦 Generated Release Binary Summary

| Asset | Path | Description |
|---|---|---|
| **Android App Bundle (.aab)** | `android/app/build/outputs/bundle/release/app-release.aab` | Official signed binary for Google Play Console upload |
| **Release APK (.apk)** | `android/app/build/outputs/apk/release/app-release.apk` | Signed APK for testing / direct sideloading |
| **Keystore File (.jks)** | `quilty-release-key.jks` & `android/app/quilty-release-key.jks` | RSA 2048 production signing keystore |

> [!IMPORTANT]
> **Keep your Keystore Safe**: Always back up `quilty-release-key.jks` and store the password securely. All future updates to this app on the Google Play Store must be signed with this exact same key.
