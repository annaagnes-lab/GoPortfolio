# AMFI Portfolio Tracker

A lightweight React app that loads AMFI NAV data and estimates portfolio value from selected fund + units.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Railway deployment

This repository is Railway-ready:
- `npm run build` creates the React production build.
- `npm start` serves `build/` on `0.0.0.0:$PORT` using `serve`.

### Railway settings (recommended)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: none required (Railway injects `PORT`).
