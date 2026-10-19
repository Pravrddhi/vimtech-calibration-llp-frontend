# VIMTECH Calibration LLP — React Native (Android + Web)

This is an Expo React Native project that runs on Android and in a web browser from the same codebase.

## Requirements

- Node.js LTS
- npm
- Expo Go on an Android phone (optional for device testing)

## Run locally

```bash
npm install
npx expo start --clear
```

- Press `a` to launch Android (Android Studio/emulator setup required), or scan the QR code with Expo Go.
- Press `w` to open the web version.
- Alternatively run `npm run android` or `npm run web`.

## Included

- Responsive login page inspired by the supplied VIMTECH reference
- Laboratory image asset
- Role selection: Technical Manager, Calibration Engineer, Administration Executive
- Username and password inputs
- Password visibility toggle
- Remember-me checkbox
- Forgot-password interaction placeholder
- Login validation placeholder
- Responsive layout for web, tablet, and Android/mobile
- Bundled brand typography: League Spartan 900 for VIMTECH, Audiowide for CALIBRATION LLP, and Montserrat 500 for the tagline

## Project structure

```text
App.js                  Expo entry point
src/
  App.js                Page layout and responsive breakpoints
  components/           Brand, role cards, login panel, and feature strip
  constants/            Role/feature data and shared theme colors
  styles/               Component-specific React Native style files
  styles.js             Shared React Native styles for Android and web
assets/                 Images and other static assets
```

This is a shared Expo React Native app, so UI markup uses React Native components and styling uses React Native style objects rather than standalone HTML and CSS files. Expo supplies the HTML shell when running on web; the root `App.js` stays as the Expo entry point.

## Authentication integration

The current login action validates the UI fields and displays a placeholder message. Connect it to your authentication API before production use. Do not store raw passwords locally. For a production app, use HTTPS, server-side role authorization, secure token handling, and proper password reset flows.

## Notes

The brand mark and feature/role icons are recreated with vector icons, not the original VIMTECH logo artwork. The laboratory photo is included in `assets/laboratory-scene.jpg`.
