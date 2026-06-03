import { useState, useCallback, useEffect } from "react";
import { AimPreview } from "./components/AimPreview";
import { FileTree } from "./components/FileTree";
import { WorkSessionPanel } from "./components/WorkSessionPanel";
import { HandoffModal } from "./components/HandoffModal";
import { PickupModal } from "./components/PickupModal";
import { CommandPalette, type PaletteAction } from "./components/CommandPalette";
import { FILE_TREE, WORK_SESSION } from "./data/workSession";
import "./styles/ide.css";

const SAMPLE_CODE = `// BuddyList.tsx (excerpt)
export function BuddyList({ personas }: Props) {
  return (
    <WindowChrome title="Buddy List">
      <MenuBar items={["File", "Edit", "People", "Help"]} />
      {SECTIONS.map((section) => (
        <BuddySection key={section} title={section}>
          {personas.filter((p) => p.section === section).map(renderBuddy)}
        </BuddySection>
      ))}
      <AwayMessageCard text={statusText} />
    </WindowChrome>
  );
}
// TODO: Guest Pieces — buddy vs folder vs window (PM input needed)
`;

function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const show = useCallback((text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 2800);
  }, []);
  return { msg, show };
}

export default function App() {
  const [centerTab, setCenterTab] = useState<"preview" | "editor">("preview");
  const [selectedFile, setSelectedFile] = useState<string | null>("src/components/BuddyList.tsx");
  const [wsOpen, setWsOpen] = useState(true);
  const [recipientView, setRecipientView] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const { msg: toast, show: showToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "recipient") {
      setRecipientView(true);
      setWsOpen(true);
      showToast("Shared Work Session opened — try /pickup");
    }
  }, [showToast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "W") {
        e.preventDefault();
        setWsOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePalette = (action: PaletteAction) => {
    switch (action) {
      case "handoff":
        setHandoffOpen(true);
        break;
      case "pickup":
        setPickupOpen(true);
        break;
      case "work-session":
        setWsOpen(true);
        showToast("Work Session panel focused");
        break;
      case "open-preview":
        setCenterTab("preview");
        break;
      case "share":
        void navigator.clipboard?.writeText(WORK_SESSION.shareLink);
        showToast("Work Session link copied");
        break;
    }
  };

  const handleChatSubmit = () => {
    const t = chatInput.trim().toLowerCase();
    if (t.startsWith("/handoff")) setHandoffOpen(true);
    else if (t.startsWith("/pickup")) setPickupOpen(true);
    else if (t) showToast(`Agent: "${chatInput}" — use /handoff or /pickup for demo`);
    setChatInput("");
    setChatCollapsed(false);
  };

  const share = () => {
    const url = `${window.location.origin}${window.location.pathname}?view=recipient`;
    void navigator.clipboard?.writeText(url);
    showToast("Share link copied (recipient view)");
  };

  return (
    <div className="ide-shell">
      <header className="ide-titlebar">
        <span>Cursor</span>
        <strong>thought-leadership-aim</strong>
        <span>—</span>
        <span>{WORK_SESSION.worktree}</span>
      </header>

      <aside className="ide-activity" aria-label="Activity bar">
        <button type="button" className="active" title="Explorer">
          📁
        </button>
        <button type="button" title="Agent">
          ◆
        </button>
        <button
          type="button"
          className={wsOpen ? "active" : ""}
          title="Work Session"
          onClick={() => setWsOpen(true)}
        >
          ⎘
        </button>
      </aside>

      <aside className="ide-sidebar">
        <div className="sidebar-header">Explorer</div>
        <div className="worktree-badge">⎇ {WORK_SESSION.branch}</div>
        <FileTree
          tree={FILE_TREE}
          selected={selectedFile}
          onSelect={(p) => {
            setSelectedFile(p);
            setCenterTab("editor");
          }}
        />
      </aside>

      <nav className="ide-tabs">
        <button
          type="button"
          className={`ide-tab ${centerTab === "preview" ? "active" : ""}`}
          onClick={() => setCenterTab("preview")}
        >
          Preview — AIM UI
        </button>
        <button
          type="button"
          className={`ide-tab ${centerTab === "editor" ? "active" : ""}`}
          onClick={() => setCenterTab("editor")}
        >
          {selectedFile ?? "BuddyList.tsx"}
        </button>
        <button
          type="button"
          className={`ide-tab ${wsOpen ? "" : ""}`}
          onClick={() => setWsOpen(true)}
          style={{ marginLeft: "auto", borderLeft: "1px solid var(--ide-border)" }}
        >
          Work Session
        </button>
      </nav>

      <main className="ide-center">
        {centerTab === "preview" ? (
          <div className="ide-preview-wrap">
            <AimPreview />
          </div>
        ) : (
          <div className="ide-editor">
            <pre>{SAMPLE_CODE}</pre>
          </div>
        )}
      </main>

      {wsOpen && (
        <aside className="ide-worksession">
          <WorkSessionPanel
            recipientMode={recipientView}
            onHandoff={() => setHandoffOpen(true)}
            onPickup={() => setPickupOpen(true)}
            onOpenInCursor={() => showToast("Open in Cursor — would deep-link to worktree in product")}
            onShare={share}
          />
        </aside>
      )}

      <footer className="ide-statusbar">
        <span className="live-dot" />
        <span>{WORK_SESSION.status}</span>
        <span style={{ marginLeft: "auto", opacity: 0.9 }}>⌘K command palette</span>
      </footer>

      <div className={`ide-chat ${chatCollapsed ? "collapsed" : ""}`}>
        <div className="ide-chat-header" onClick={() => setChatCollapsed(!chatCollapsed)}>
          <span>Agent chat</span>
          <span>{chatCollapsed ? "▴" : "▾"}</span>
        </div>
        {!chatCollapsed && (
          <>
            <div className="ide-chat-messages">
              <div>Agent: AIM UI scaffold complete. Work Session auto-created.</div>
              <div style={{ color: "var(--ide-muted)" }}>Try /handoff or /pickup</div>
            </div>
            <div className="ide-chat-input">
              <input
                placeholder="/handoff  /pickup  ..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              />
              <button type="button" onClick={handleChatSubmit}>
                Send
              </button>
            </div>
          </>
        )}
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onAction={handlePalette} />
      {handoffOpen && (
        <HandoffModal
          onClose={() => setHandoffOpen(false)}
          onShared={() => {
            void navigator.clipboard?.writeText(
              `${window.location.origin}${window.location.pathname}?view=recipient&handoff=1`
            );
            showToast("Handoff link copied");
          }}
        />
      )}
      {pickupOpen && <PickupModal onClose={() => setPickupOpen(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
