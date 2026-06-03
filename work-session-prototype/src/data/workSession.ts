export type WorkSessionFile = {
  path: string;
  status: "modified" | "added" | "unchanged";
  additions: number;
  deletions: number;
};

export type TimelineEvent = {
  id: string;
  time: string;
  action: string;
  detail?: string;
};

export type CommandRun = {
  command: string;
  status: "running" | "passed" | "failed" | "skipped" | "warning";
  output?: string;
};

export const WORK_SESSION = {
  id: "ws-aim-ui-matt-042",
  title: "AIM-style chat window & buddy list UI",
  status: "Live · Agent task complete · Backend mocked · Needs frontend polish",
  createdAt: "2026-06-03T14:22:00Z",
  worktree: "agent/aim-ui-matt",
  branch: "cursor/aim-buddy-list-ui",
  shareLink: "https://cursor.com/work-session/ws-aim-ui-matt-042",
  originalPrompt: `Build the AIM-style chat window and buddy list UI.

Requirements:
- Retro blue grid desktop background
- Buddy List with sections: Musings, Guest Pieces, Currently Dabbling In, Let's Chat
- Floating AIM-style content/chat windows
- Nostalgic menu bar (File, Edit, People, Help)
- Status icons and screen names
- Away-message-style product/status text
- Thought-leadership personas disguised as buddies/chat items
- Local static preview (backend can be mocked)`,
  agentTask: "Build AIM-style chat window and buddy list UI",
  builder: "Matt Shwery",
  team: [
    { name: "Hareem", role: "PM" },
    { name: "Roshan", role: "Backend" },
    { name: "Matt Shwery", role: "Frontend" },
  ],
  files: [
    { path: "src/components/BuddyList.tsx", status: "added", additions: 186, deletions: 0 },
    { path: "src/components/AimChatWindow.tsx", status: "added", additions: 142, deletions: 0 },
    { path: "src/components/WindowChrome.tsx", status: "added", additions: 78, deletions: 0 },
    { path: "src/components/StatusDot.tsx", status: "added", additions: 34, deletions: 0 },
    { path: "src/data/thoughtLeaderPersonas.ts", status: "added", additions: 96, deletions: 0 },
    { path: "src/styles/aim-theme.css", status: "modified", additions: 124, deletions: 12 },
    { path: "src/app/page.tsx", status: "modified", additions: 48, deletions: 8 },
  ] as WorkSessionFile[],
  diffSummary: `+708 −20 across 7 files

BuddyList.tsx — collapsible sections, status dots, screen names
AimChatWindow.tsx — draggable chrome, message area, persona header
WindowChrome.tsx — title bar gradient, minimize/max/close affordances
thoughtLeaderPersonas.ts — fake buddies & away-message copy`,
  commands: [
    { command: "npm run dev", status: "running", output: "Preview server on :5173" },
    { command: "npm run lint", status: "passed", output: "0 errors, 2 warnings (unused vars)" },
    { command: "npm run test", status: "skipped", output: "2 skipped — no component tests yet" },
    { command: "npm run build", status: "warning", output: "Passed with warnings (chunk size)" },
  ] as CommandRun[],
  timeline: [
    { id: "1", time: "14:22", action: "Work Session created", detail: "Agent task started on worktree agent/aim-ui-matt" },
    { id: "2", time: "14:24", action: "Scaffolded components", detail: "BuddyList, AimChatWindow, WindowChrome" },
    { id: "3", time: "14:31", action: "Added aim-theme.css", detail: "Blue grid background, Win98 chrome" },
    { id: "4", time: "14:38", action: "Seeded personas", detail: "thoughtLeaderPersonas.ts with 8 fake buddies" },
    { id: "5", time: "14:45", action: "Wired page preview", detail: "src/app/page.tsx renders static preview" },
    { id: "6", time: "14:52", action: "Ran lint & build", detail: "lint passed; build warnings only" },
    { id: "7", time: "14:55", action: "Agent task marked complete", detail: "Backend API mocked; multi-window rough" },
  ] as TimelineEvent[],
  notes: [
    { author: "Agent", text: "Backend API is mocked. Multi-window z-index behavior is rough." },
    { author: "Agent", text: "Responsive breakpoints unfinished — desktop-first for demo." },
  ],
  artifacts: ["Local preview (center panel)", "Static persona data"],
  openIssues: [
    "Guest Pieces UX ambiguous — buddies vs folders vs chat windows",
    "Multi-window focus/stacking needs polish",
    "Responsive layout unfinished",
  ],
};

export const FILE_TREE = [
  { name: "src", children: [
    { name: "app", children: [{ name: "page.tsx" }] },
    { name: "components", children: [
      { name: "BuddyList.tsx" },
      { name: "AimChatWindow.tsx" },
      { name: "WindowChrome.tsx" },
      { name: "StatusDot.tsx" },
    ]},
    { name: "data", children: [{ name: "thoughtLeaderPersonas.ts" }] },
    { name: "styles", children: [{ name: "aim-theme.css" }] },
  ]},
  { name: "package.json" },
  { name: "README.md" },
];
