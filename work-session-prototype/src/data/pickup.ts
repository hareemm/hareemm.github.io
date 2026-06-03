export type PickupIntent =
  | "review"
  | "continue"
  | "decisions"
  | "debug"
  | "future-me";

export const PICKUP_INTENTS: { id: PickupIntent; label: string; example: string }[] = [
  { id: "review", label: "Review", example: "/pickup to review" },
  { id: "continue", label: "Continue implementation", example: "/pickup to continue implementation" },
  { id: "decisions", label: "Understand decisions", example: "/pickup to understand decisions" },
  { id: "debug", label: "Debug / fix", example: "/pickup to debug/fix" },
  { id: "future-me", label: "Future me", example: "/pickup as future me" },
];

export type PickupBrief = {
  title: string;
  summary: string;
  inspect?: string[];
  startHere?: string[];
  tryFirst?: string[];
  evidence?: string[];
  firstAction: string;
};

export function generatePickupBrief(intent: PickupIntent): PickupBrief {
  const briefs: Record<PickupIntent, PickupBrief> = {
    review: {
      title: "Review brief",
      summary: "Objective UI slice is complete for demo; backend is mocked. Approve nostalgia/visual system; flag Guest Pieces UX as blocking polish.",
      inspect: [
        "src/components/BuddyList.tsx — section collapse, buddy rows",
        "src/components/AimChatWindow.tsx — window chrome, message area",
        "src/styles/aim-theme.css — grid background, gradients",
        "Center preview — Buddy List + floating windows",
      ],
      firstAction: "Open BuddyList.tsx and verify Guest Pieces section matches product intent.",
    },
    continue: {
      title: "Continue implementation",
      summary: "Agent finished scaffold + static preview. Not done: Guest Pieces behavior, multi-window stacking, responsive layout.",
      startHere: [
        "1. src/components/BuddyList.tsx — clarify Guest Pieces (buddy vs folder vs window)",
        "2. src/components/AimChatWindow.tsx — z-index / focus when multiple windows open",
        "3. src/styles/aim-theme.css — responsive breakpoints (marked unfinished)",
      ],
      firstAction: "Resolve Guest Pieces UX with Hareem (PM), then implement in BuddyList.tsx.",
    },
    decisions: {
      title: "Understand decisions",
      summary: "Choices inferred from Work Session timeline and files — validate with /handoff if sender left one.",
      evidence: [
        "Sectioned buddy list → thoughtLeaderPersonas.ts groups (Musings, Guest Pieces, etc.)",
        "Mocked backend → no API routes in diff; status text says API mocked",
        "Desktop-first → agent note: responsive unfinished",
        "Rejected real-time backend → handoff section 3 if shared",
      ],
      firstAction: "Read thoughtLeaderPersonas.ts then compare Guest Pieces rows vs Musings rows in preview.",
    },
    debug: {
      title: "Debug / fix",
      summary: "Likely pain: multi-window focus, Guest Pieces click targets, rough responsive. Tests mostly skipped.",
      tryFirst: [
        "Reproduce: open two chat windows — check z-index in AimChatWindow.tsx",
        "Click Guest Pieces entries — confirm expected window type",
        "npm run lint — 2 warnings (unused vars)",
        "npm run dev — confirm preview matches worktree",
      ],
      firstAction: "Run preview, open two windows, trace handlers in AimChatWindow.tsx.",
    },
    "future-me": {
      title: "Future me",
      summary: "You were building AIM nostalgia UI for the thought-leadership product. Agent marked task complete; polish and Guest Pieces remain.",
      startHere: [
        "Status: Live · Agent complete · Backend mocked",
        "What mattered: persona content + retro chrome for demo",
        "Loose end: Guest Pieces UX ambiguity",
      ],
      firstAction: "Skim Work Session timeline, then open BuddyList.tsx and pick one Guest Pieces behavior to implement.",
    },
  };
  return briefs[intent];
}
