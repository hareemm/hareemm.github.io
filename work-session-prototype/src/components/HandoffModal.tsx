import { useState, useEffect } from "react";
import {
  HANDOFF_RECIPIENTS,
  generateHandoffDraft,
  type HandoffRecipient,
  type HandoffDraft,
} from "../data/handoff";

type Step = "recipient" | "draft" | "share";

export function HandoffModal({
  onClose,
  onShared,
}: {
  onClose: () => void;
  onShared: () => void;
}) {
  const [step, setStep] = useState<Step>("recipient");
  const [recipient, setRecipient] = useState<HandoffRecipient | null>(null);
  const [draft, setDraft] = useState<HandoffDraft | null>(null);

  useEffect(() => {
    if (recipient && step === "draft" && !draft) {
      setDraft(generateHandoffDraft(recipient));
    }
  }, [recipient, step, draft]);

  const update = (key: keyof HandoffDraft, value: string) => {
    if (draft) setDraft({ ...draft, [key]: value });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={`modal ${step === "draft" ? "wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="handoff-title"
      >
        <header className="modal-header">
          <h2 id="handoff-title">/handoff</h2>
          <p>
            {step === "recipient" && "Who is this handoff for?"}
            {step === "draft" && "Edit the generated handoff packet before sharing."}
            {step === "share" && "Handoff ready — share with your recipient."}
          </p>
        </header>

        <div className="modal-body">
          {step === "recipient" && (
            <div className="recipient-grid">
              {HANDOFF_RECIPIENTS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`recipient-card ${recipient === r.id ? "selected" : ""}`}
                  onClick={() => setRecipient(r.id)}
                >
                  <strong>{r.label}</strong>
                  <span>{r.description}</span>
                </button>
              ))}
            </div>
          )}

          {step === "draft" && draft && (
            <>
              <p style={{ fontSize: 12, color: "var(--ide-muted)", marginTop: 0 }}>
                Recipient: <strong>{HANDOFF_RECIPIENTS.find((r) => r.id === recipient)?.label}</strong>
                {" — "}sections 1–3 generated from Work Session facts; section 4 is yours to edit.
              </p>
              <div className="handoff-field">
                <label>1. What was the goal?</label>
                <textarea value={draft.goal} onChange={(e) => update("goal", e.target.value)} />
              </div>
              <div className="handoff-field">
                <label>2. What approach did we take and why?</label>
                <textarea value={draft.approach} onChange={(e) => update("approach", e.target.value)} />
              </div>
              <div className="handoff-field">
                <label>3. What did we consider but reject?</label>
                <textarea value={draft.rejected} onChange={(e) => update("rejected", e.target.value)} />
              </div>
              <div className="handoff-field">
                <label>4. Any additional notes?</label>
                <textarea
                  value={draft.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Add context for the recipient..."
                />
              </div>
            </>
          )}

          {step === "share" && (
            <p className="ws-fact">
              Link copied. Recipient can open the Work Session + handoff context, then run{" "}
              <code>/pickup</code> with their intent.
            </p>
          )}
        </div>

        <footer className="modal-footer">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          {step === "recipient" && (
            <button
              type="button"
              className="primary"
              disabled={!recipient}
              onClick={() => {
                setDraft(generateHandoffDraft(recipient!));
                setStep("draft");
              }}
              style={{ background: "var(--ide-accent)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 4 }}
            >
              Generate draft
            </button>
          )}
          {step === "draft" && (
            <button
              type="button"
              className="primary"
              onClick={() => {
                void navigator.clipboard?.writeText(
                  `${window.location.origin}${window.location.pathname}?view=recipient&handoff=1`
                );
                setStep("share");
              }}
              style={{ background: "var(--ide-accent)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 4 }}
            >
              Copy & share link
            </button>
          )}
          {step === "share" && (
            <button
              type="button"
              className="primary"
              onClick={() => {
                onShared();
                onClose();
              }}
              style={{ background: "var(--ide-accent)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 4 }}
            >
              Done
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
