# AMFI Portfolio Tracker

A lightweight React app that loads AMFI NAV data and estimates portfolio value from selected fund + units.

## Local development

```bash
npm install
npm run dev
```

## Production build (local)

```bash
npm run build
npm start
```

## Railway deployment

This repository now deploys with a Dockerfile to avoid builder auto-detection issues.

- `Dockerfile` builds the React app and serves the compiled `build/` output.
- `railway.toml` pins Railway to the Dockerfile builder.
- Runtime binds to `0.0.0.0:$PORT` as required by Railway.

If your project was already deployed, trigger a **Redeploy** after pulling this commit.
