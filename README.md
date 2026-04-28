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
- `railway.toml` explicitly sets build and start commands.
- `npm start` includes a `prestart` build to avoid serving an empty app when no previous build exists.
- The app binds to `0.0.0.0:$PORT` for Railway networking.

### Railway settings (if configured manually)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: none required (Railway injects `PORT`).
