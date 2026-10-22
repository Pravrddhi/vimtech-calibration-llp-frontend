<<<<<<< Updated upstream
# vimtech-calibration-llp
=======
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
- Login via `POST /api/login/`
- Web session storage and secure mobile session storage, cleared on logout
- Responsive four-tile dashboard with role and Profile screens
- Profile display from the saved session without exposing authentication tokens
- Responsive layout for web, tablet, and Android/mobile
- Bundled brand typography: League Spartan 900 for VIMTECH, Audiowide for CALIBRATION LLP, and Montserrat 500 for the tagline

## Project structure

```text
App.js                  Expo entry point
src/
  App.js                Page layout and responsive breakpoints
  components/           Brand, role cards, login panel, and feature strip
                        Dashboard, role, and Profile screens
  constants/            Role/feature data and shared theme colors
  styles/               Component-specific React Native style files
  styles.js             Shared React Native styles for Android and web
assets/                 Images and other static assets
```

This is a shared Expo React Native app, so UI markup uses React Native components and styling uses React Native style objects rather than standalone HTML and CSS files. Expo supplies the HTML shell when running on web; the root `App.js` stays as the Expo entry point.

## Authentication

The login form posts the username and password to `${EXPO_PUBLIC_API_BASE_URL}/api/login/`. Configure the API base URL in a local `.env` file using `.env.example` as a starting point, then restart Expo. The default is `http://127.0.0.1:8000`, which works for web on the same computer. For an Android emulator or physical device, use a backend address reachable from that device (for example, the emulator host address or development computer's LAN IP), and configure the backend to allow the app's origin.

The returned user and access/refresh tokens are kept in browser `sessionStorage` on web and Expo SecureStore on native. Logout removes the stored session. Passwords are never persisted. The sample API response has empty access and refresh values; the app stores the returned values as provided, but protected API requests require the backend to issue usable tokens. Use HTTPS and server-side role authorization outside local development.

## Notes

The brand mark and feature/role icons are recreated with vector icons, not the original VIMTECH logo artwork. The laboratory photo is included in `assets/laboratory-scene.jpg`.
>>>>>>> Stashed changes
