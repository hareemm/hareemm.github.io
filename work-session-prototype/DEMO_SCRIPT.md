# 3-minute demo script — Work Session prototype

**Setup:** `npm run dev` → full screen browser.

---

## 0:00 — Hook (15s)

“This is Cursor with an agent-built AIM-style UI. As work gets more async, teams lose visibility into what changed and whether it’s safe to ship. Work Session is the objective record; /handoff and /pickup are how you package and rehydrate it.”

Show: IDE shell, **Preview — AIM UI** (buddy list, floating windows, thought-leadership personas).

---

## 0:15 — Work Session is automatic (45s)

“The user didn’t start this — Cursor created a Work Session when the agent ran: *Build the AIM-style chat window and buddy list UI.*”

1. Click activity **⎘** or **Work Session** tab.
2. Point at live status: `Live · Agent task complete · Backend mocked · Needs frontend polish`.
3. **Overview:** original prompt, worktree `agent/aim-ui-matt`, branch chip.
4. **Files** → 7 touched files.
5. **Timeline** → objective actions only (scaffolded components, ran lint — no ‘we recommend’ fluff).
6. **Commands** → dev running, lint passed, tests skipped.

“Notice there’s no ‘key decisions’ or ‘risks’ here — that’s intentional.”

---

## 1:00 — /handoff sender packaging (60s)

“Matt finished the agent slice and needs to hand off to Hareem or another engineer.”

1. Click **/handoff** (or `⌘K` → `/handoff`, or type `/handoff` in agent chat).
2. Choose **Engineer** (or **PM**).
3. Show generated draft — four sections filled from facts; section 4 editable.
4. Add a note: e.g. “Guest Pieces UX still ambiguous — need PM call.”
5. **Copy & share link** → toast.

Optional: open `?view=recipient` in new tab — “Recipient sees shared Work Session banner + Open in Cursor.”

---

## 2:00 — Recipient /pickup (45s)

“Pickup is receiver-driven — different from handoff.”

1. On recipient view (or same session), click **/pickup**.
2. Choose **Continue implementation** (or **Review**).
3. Walk through **Start here** + **First action** (e.g. BuddyList.tsx, Guest Pieces decision).

Contrast: “Handoff told the story Matt wanted to tell; pickup tells the *receiver* what to do *now*.”

---

## 2:45 — Close (15s)

“Work Session = trust the facts. /handoff = sender interpretation. /pickup = receiver interpretation. Open in Cursor is the real workspace; this panel is how teams understand work before they collaborate.”

Press **Open in Cursor** (toast) — end.

---

## Backup beats if time

- Toggle to **BuddyList.tsx** editor tab.
- `⌘K` palette discovery.
- **Review** pickup intent for reviewer persona.
