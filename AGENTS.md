# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

This repository is a **single-file static GitHub Pages site** (`hareemm.github.io`): a travel destination questionnaire in `index.html` that sends submissions to **Segment** via the browser SDK (`analytics.identify` + `analytics.track('destination submitted', …)`). There is no backend or build step.

### Running locally

Preferred (includes HTML validation tooling):

```bash
npm install
npm run dev
```

Open `http://localhost:8080` (serves repo root; no `/index.html` path required).

Use a tmux session for long-running dev servers (see cloud agent shell guidelines).

Fallback without npm: `python3 -m http.server 8080` → `http://localhost:8080/index.html`.

### Lint / test / build

| Task | Command | Notes |
|------|---------|--------|
| Validate HTML | `npm run validate` | Uses `html-validate` on `index.html` |
| Test | N/A | No automated tests in the repo |
| Build | N/A | No build step; deploy is static `index.html` to GitHub Pages |

### Local dev analytics mock

When the hostname is `localhost` or `127.0.0.1`, `index.html` installs a console-logging analytics mock instead of loading Segment from the CDN. The mock invokes `track` callbacks immediately, so form submit reload works in dev even when the embedded Segment write key is invalid (404 from CDN).

Production traffic on `*.github.io` is unchanged and still loads the real Segment snippet.

### Hello-world verification

1. `npm run dev`
2. Open `http://localhost:8080` and confirm **"What is your favorite place to travel?"**
3. Fill destination, details, name, and email; click **submit**
4. Page should reload after submit; browser console shows `[dev analytics] track destination submitted`

### Production Segment caveat

On GitHub Pages, if `https://cdn.segment.com/analytics.js/v1/<writeKey>/analytics.min.js` returns **404**, the stub queue never completes the track callback and submit appears stuck. Fix by updating the write key in `index.html` to a valid Segment source key.

### Services

| Service | Required | How to run |
|---------|----------|------------|
| Static dev server | For local dev | `npm run dev` (port 8080) |
| Segment CDN | Production E2E only | External; mocked on localhost |
