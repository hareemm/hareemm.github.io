import { useState } from "react";
import { WORK_SESSION } from "../data/workSession";

type Tab = "overview" | "files" | "diff" | "commands" | "timeline" | "notes";

export function WorkSessionPanel({
  onHandoff,
  onPickup,
  onOpenInCursor,
  onShare,
  recipientMode,
}: {
  onHandoff: () => void;
  onPickup: () => void;
  onOpenInCursor: () => void;
  onShare: () => void;
  recipientMode?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const ws = WORK_SESSION;

  return (
    <div className="ws-panel">
      {recipientMode && (
        <div className="share-banner">
          Viewing shared Work Session
          <button type="button" onClick={onOpenInCursor}>
            Open in Cursor
          </button>
        </div>
      )}
      <header className="ws-header">
        <h2>Work Session</h2>
        <div className="ws-status">{ws.status}</div>
        <div className="ws-meta-row" style={{ marginTop: 8 }}>
          <span className="ws-chip">{ws.worktree}</span>
          <span className="ws-chip">{ws.branch}</span>
        </div>
      </header>

      <nav className="ws-tabs">
        {(
          [
            ["overview", "Overview"],
            ["files", "Files"],
            ["diff", "Diff"],
            ["commands", "Commands"],
            ["timeline", "Timeline"],
            ["notes", "Notes"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="ws-body">
        {tab === "overview" && (
          <>
            <section className="ws-section">
              <h3>Original agent prompt</h3>
              <div className="ws-prompt">{ws.originalPrompt}</div>
            </section>
            <section className="ws-section">
              <h3>Agent task / worktree</h3>
              <p className="ws-fact">
                {ws.agentTask}
                <br />
                <span className="ws-chip">{ws.worktree}</span>
              </p>
            </section>
            <section className="ws-section">
              <h3>Preview / artifacts</h3>
              <p className="ws-fact">{ws.artifacts.join(" · ")}</p>
            </section>
            <section className="ws-section">
              <h3>Share</h3>
              <p className="ws-fact" style={{ fontFamily: "var(--ide-mono)", fontSize: 11 }}>
                {ws.shareLink}
              </p>
            </section>
          </>
        )}

        {tab === "files" && (
          <section className="ws-section">
            <h3>Files touched ({ws.files.length})</h3>
            {ws.files.map((f) => (
              <div key={f.path} className="ws-file">
                <span>{f.path}</span>
                <span className="delta">
                  +{f.additions} −{f.deletions}
                </span>
              </div>
            ))}
          </section>
        )}

        {tab === "diff" && (
          <section className="ws-section">
            <h3>Changed-file summary</h3>
            <pre className="ws-prompt" style={{ whiteSpace: "pre-wrap" }}>
              {ws.diffSummary}
            </pre>
          </section>
        )}

        {tab === "commands" && (
          <section className="ws-section">
            <h3>Commands / tests run</h3>
            {ws.commands.map((c) => (
              <div key={c.command} className="ws-cmd">
                <span className={`status-${c.status}`}>●</span>
                <span>{c.command}</span>
                <span style={{ color: "var(--ide-muted)" }}>{c.output}</span>
              </div>
            ))}
          </section>
        )}

        {tab === "timeline" && (
          <section className="ws-section">
            <h3>Timeline (objective actions)</h3>
            <ul className="ws-timeline">
              {ws.timeline.map((e) => (
                <li key={e.id}>
                  <time>{e.time}</time>
                  <strong>{e.action}</strong>
                  {e.detail && <div style={{ color: "var(--ide-muted)" }}>{e.detail}</div>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "notes" && (
          <section className="ws-section">
            <h3>Explicit notes</h3>
            {ws.notes.map((n, i) => (
              <p key={i} className="ws-fact">
                <strong>{n.author}:</strong> {n.text}
              </p>
            ))}
            <h3 style={{ marginTop: 16 }}>Open issues (factual)</h3>
            <ul style={{ paddingLeft: 18, fontSize: "var(--ide-ui)" }}>
              {ws.openIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="ws-actions">
        <button type="button" className="primary" onClick={onOpenInCursor}>
          Open in Cursor
        </button>
        <button type="button" onClick={onShare}>
          Copy share link
        </button>
        <button type="button" className="handoff" onClick={onHandoff}>
          /handoff
        </button>
        <button type="button" className="pickup" onClick={onPickup}>
          /pickup
        </button>
      </div>
    </div>
  );
}
