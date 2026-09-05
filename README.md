# Quilty as Charged

Quilty as Charged is a quilting toolkit for designing pixel quilts and doing
fabric, patch, triangle, backing, and binding calculations.

- Promotional site: <https://quiltyascharged.art>
- Installable web app: <https://live.quiltyascharged.art>
- Android application ID: `com.quiltyascharged.app`

## Repository layout

- `quilty-android/` — shared HTML/CSS/JavaScript application, Capacitor Android
  wrapper, PWA assets, store listing, and deployment configuration.
- `quilty-promo-kit/` — promotional website, screenshots, Play Store artwork,
  social graphics, press kit, and deployment configuration.
- `Quilty-promo-media/` — additional promotional source images.
- `quilty-as-charged.jsx` — original application prototype.

## Development

The application source is in `quilty-android/www/`. To prepare the Android
project:

```bash
cd quilty-android
npm install
npm run sync
```

For signed release builds, keep the keystore outside version control and set:

```bash
export QUILTY_STORE_PASSWORD='...'
export QUILTY_KEY_PASSWORD='...'
export QUILTY_KEY_ALIAS='quiltykey'
```

Deployment notes are in `quilty-android/deploy/` and
`quilty-promo-kit/deploy/`.
