# Linkly

Offline-first React Native app that turns your profile into an encrypted QR code — share exactly the contact details you choose, no manual typing.

## Why

Sharing contact info in person usually means typing it out, dictating it, or exchanging a business card you'll lose. Linkly generates a QR code from your profile — pick which fields to include, then let the other person scan and get exactly that, encrypted, and without needing an internet connection.

## Tech Stack

- **React Native** (Expo)
- **Zustand** for state management
- **MMKV** for local storage
- **NativeWind** for styling
- **crypto-js** for QR data encryption

## Links

- **Website**: [linkly-website.vercel.app](https://linkly-website.vercel.app)
- **Website repo**: [github.com/sahiltiwaridev/linkly-website](https://github.com/sahiltiwaridev/linkly-website)

## More from me

- **Portfolio**: [portfolio-six-chi-kmc4bfrxcz.vercel.app](https://portfolio-six-chi-kmc4bfrxcz.vercel.app)
- **Blog**: [sahiltiwari.hashnode.dev](https://sahiltiwari.hashnode.dev)

## Getting Started

```bash
git clone https://github.com/sahiltiwaridev/linkly.git
cd linkly
npm install
npx expo start
```

To run a native build:

```bash
npx expo run:android
```

## Status

Actively maintained. Currently working on biometric/fingerprint lock as the next feature.

## Feedback

Bug reports and feedback welcome — open an issue here, or reach out through my [portfolio's contact form](https://portfolio-six-chi-kmc4bfrxcz.vercel.app/contact).
