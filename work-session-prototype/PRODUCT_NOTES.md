# Product notes — Work Session, /handoff, /pickup

## Product model (fixed)

| Primitive | Role | Driver |
|-----------|------|--------|
| **Work Session** | Canonical, objective record of bounded agent work | System (auto-created around agent task) |
| **/handoff** | Sender packages work for someone else | Sender chooses recipient (PM, Engineer, …) |
| **/pickup** | Receiver rehydrates work for what they need now | Receiver chooses intent (Review, Continue, …) |

Do not collapse these into one “summary” experience. Work Session must not read like an AI essay (no default “key decisions,” “risks,” or “recommended next steps”).

## Where Work Session lives in Cursor

**Decision:** Dedicated **right panel** (activity bar entry ⎘), always tied to the active agent worktree — not buried in chat, not equivalent to a PR or branch view.

**Rationale:**
- Chat is interpretive and conversational; Work Session is factual and live.
- PRs/branches are version-control artifacts; Work Session is task-scoped and updates with agent actions.
- Panel keeps objective context visible while coding or previewing (center), without replacing the editor.

**Transitions:**
- Panel actions **/handoff** and **/pickup** mirror command palette and chat `/` commands.
- **Open in Cursor** is primary; web/recipient view is lightweight (`?view=recipient`).

## Work Session content rules

**In scope (objective):** prompt, worktree/branch, status, files, diff summary, commands/tests, timeline, preview, explicit notes, share link.

**Out of Work Session defaults:** why we chose X, rejected alternatives narrative, risks, next steps → those belong in **/handoff** (sender) or **/pickup** (receiver intent).

## /handoff

Flow: invoke → choose recipient → **generated draft** (4 sections) → edit → share.

Draft sections (exactly):
1. What was the goal?
2. What approach did we take and why?
3. What did we consider but reject?
4. Any additional notes? (open-ended; only section intended as blank-ish)

Sections 1–3 are seeded from Work Session facts in the prototype; recipient mode tweaks emphasis in section 4 placeholder text only (packet stays simple per MVP).

## /pickup

Receiver picks intent; output is **action-oriented** (inspect list, start here, try first, first action) — not a generic summary.

Intents: Review, Continue implementation, Understand decisions, Debug/fix, Future me.

## Demo scenario

Agent task: *“Build the AIM-style chat window and buddy list UI.”* Center preview anchors the fake project; Work Session lists fake files and timeline aligned with that task.

Open product ambiguity (for handoff/pickup drama): **Guest Pieces** — buddies vs folders vs chat windows.

## Key tradeoffs

| Choice | Tradeoff |
|--------|----------|
| Right panel vs tab-only | Panel costs horizontal space; wins persistent visibility for collaboration |
| Live session, no versions | Simpler MVP; history deferred |
| Hardcoded generation vs LLM | Demo reliability; real product would generate from Work Session facts |
| Lightweight web share | Full share page out of scope; query param simulates recipient |
| AIM preview in-shell | Makes “what changed” tangible vs abstract file list |

## Intentionally out of scope

- Backend, auth, persistence, org templates
- Real Cursor / Git / GitHub / Linear / Slack integration
- Real AI calls
- Version history, permissions, comment threads
- Bugbot, PR review UI, generic SaaS dashboard
- Production-ready responsive AIM app

## Prototype fidelity goals

- Feel native to Cursor (chrome, mono, panel patterns)
- Clear differentiation: Work Session ≠ chat ≠ PR
- Credible path for human + agent continuation via /pickup
