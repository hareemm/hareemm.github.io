# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

This repository is a **single-file static GitHub Pages site** (`hareemm.github.io`): a travel destination questionnaire in `index.html` that sends submissions to **Segment** via the browser SDK (`analytics.identify` + `analytics.track('destination submitted', …)`). There is no backend, package manager, build step, or test suite in the repo.

### Running locally

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/index.html`.

Use a tmux session for long-running dev servers (see cloud agent shell guidelines).

### Lint / test / build

| Task | Command | Notes |
|------|---------|--------|
| Lint | N/A | No ESLint/Prettier or other linters configured |
| Test | N/A | No automated tests in the repo |
| Build | N/A | No build step; deploy is static `index.html` to GitHub Pages |

### Hello-world verification

1. Start the static server (above).
2. Load the questionnaire page and confirm the heading **"What is your favorite place to travel?"**.
3. Fill destination, details, name, and email, then click **submit**.

**Submit behavior:** `identify()` calls `analytics.track(..., callback)` and the callback sets `window.location.href = ""` to reload. That callback only runs after Segment’s full library loads from `cdn.segment.com`.

### Segment / network caveat

The Segment write key is **hardcoded** in `index.html`. If `https://cdn.segment.com/analytics.js/v1/<writeKey>/analytics.min.js` returns **404**, the stub `analytics` queue never completes the track callback, so the form may look stuck after submit even though the static app and server are fine. Outbound HTTPS to `cdn.segment.com` is required for full E2E analytics; use a valid write key in Segment (or mock Segment in tests) to verify the full submit flow.

### Services

| Service | Required | How to run |
|---------|----------|------------|
| Static HTTP server | For local dev over `http://` | `python3 -m http.server 8080` |
| Segment CDN | For full submit + analytics E2E | External; no local service |
