export type HandoffRecipient = "pm" | "engineer" | "reviewer" | "agent" | "future-me";

export const HANDOFF_RECIPIENTS: { id: HandoffRecipient; label: string; description: string }[] = [
  { id: "pm", label: "PM", description: "Product direction, requirements, launch readiness" },
  { id: "engineer", label: "Engineer", description: "Implementation context, files, next steps" },
  { id: "reviewer", label: "Reviewer", description: "What to inspect for approval" },
  { id: "agent", label: "Agent", description: "Structured context for another agent run" },
  { id: "future-me", label: "Future me", description: "Past-you packaging for later pickup" },
];

export type HandoffDraft = {
  goal: string;
  approach: string;
  rejected: string;
  notes: string;
};

export function generateHandoffDraft(recipient: HandoffRecipient): HandoffDraft {
  const base = {
    goal: `Ship an AIM-style Buddy List and floating chat/content window UI that simulates nostalgic AOL UX while surfacing "thought leadership" personas as buddies and chat content — per the agent prompt: "Build the AIM-style chat window and buddy list UI."`,
    approach: `We built React components (BuddyList, AimChatWindow, WindowChrome, StatusDot) with a retro blue-grid theme in aim-theme.css. Personas live in thoughtLeaderPersonas.ts with sections Musings, Guest Pieces, Currently Dabbling In, and Let's Chat. page.tsx renders a local static preview; backend is mocked. Lint passed; build passed with warnings; 2 tests skipped.`,
    rejected: `• Real-time messaging backend — out of scope; mocked API instead.\n• Single combined "content pane" — rejected in favor of separate Buddy List + floating windows.\n• Flat buddy list — rejected; kept sectioned groups to match AIM nostalgia and product metaphor.\n• Fully responsive mobile layout — deferred; desktop-first for prototype.`,
    notes: "",
  };

  const emphasis: Record<HandoffRecipient, Partial<HandoffDraft>> = {
    pm: {
      notes: `Open product question: should "Guest Pieces" behave like buddies, folders, or chat windows? Multi-window behavior is rough. Recommend Hareem weigh in before polish sprint.`,
    },
    engineer: {
      notes: `Start in BuddyList.tsx and AimChatWindow.tsx. Multi-window z-index and Guest Pieces behavior are the main gaps. Branch: cursor/aim-buddy-list-ui.`,
    },
    reviewer: {
      approach: base.approach + `\n\nReview focus: visual fidelity to AIM chrome, persona content wiring, and whether mocked backend boundaries are clear in UI.`,
      notes: `Check lint warnings and build chunk-size warnings. No auth or persistence in this slice.`,
    },
    agent: {
      notes: `Worktree agent/aim-ui-matt. Files touched listed in Work Session. Continue from Guest Pieces UX decision.`,
    },
    "future-me": {
      notes: `You stopped after agent task complete. Backend still mocked. Pick up Guest Pieces UX + window stacking.`,
    },
  };

  return { ...base, ...emphasis[recipient] };
}
