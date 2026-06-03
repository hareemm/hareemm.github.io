# Cursor Work Session Prototype

Clickable product prototype for **Work Session**, **/handoff**, and **/pickup** — a Cursor-native collaboration layer for agentic, async team work.

## Quick start

**You must be in this folder** (not the repo root):

```bash
cd work-session-prototype
npm install
npm run dev
```

Open **http://localhost:5173** (terminal prints the exact URL).

### Not working?

| Problem | Fix |
|--------|-----|
| `work-session-prototype` folder missing | `git checkout cursor/work-session-collab-prototype-b5ca` |
| `npm run dev` fails at repo root | `cd work-session-prototype` first |
| Port in use | `npm run dev -- --port 5174` |
| Blank page | Use a modern browser; check terminal for errors |
| Expected GitHub Pages | This is a local Vite app — run `npm run dev` (not `index.html` at repo root) |

## Demo shortcuts

| Action | How |
|--------|-----|
| Command palette | `⌘K` / `Ctrl+K` |
| Work Session panel | Activity bar ⎘ or tab **Work Session** |
| `/handoff` | Work Session → **/handoff**, chat input, or palette |
| `/pickup` | Work Session → **/pickup**, chat input, or palette |
| Recipient view | Open `?view=recipient` or use **Copy share link** after handoff |
| AIM preview | Center tab **Preview — AIM UI** |

## What this is

- **Not production** — hardcoded data, no backend, auth, Git, or real Cursor APIs.
- **Cursor-native shell** — dark IDE layout, explorer, preview, Work Session panel, agent chat strip, command palette.
- **Demo scenario** — AIM-style “thought leadership” UI built by an agent; team Hareem (PM), Roshan (backend), Matt Shwery (frontend).

## Docs

- [PRODUCT_NOTES.md](./PRODUCT_NOTES.md) — product model, decisions, out of scope
- [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) — 3-minute walkthrough

## Build

```bash
npm run build
npm run preview
```
