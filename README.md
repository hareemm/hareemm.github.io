# hareemm.github.io

Travel destination questionnaire — a static GitHub Pages site that collects favorite destinations and sends them to Segment.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

On `localhost`, Segment is mocked so the form submit flow completes without a valid write key. Production (GitHub Pages) still loads the real Segment snippet.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start static dev server on port 8080 |
| `npm start` | Alias for `npm run dev` |
| `npm run validate` | Validate `index.html` markup |

## Deploy

Push to `master`; GitHub Pages serves `index.html` from the repo root.
