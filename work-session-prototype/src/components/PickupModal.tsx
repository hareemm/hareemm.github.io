import { useState } from "react";
import {
  PICKUP_INTENTS,
  generatePickupBrief,
  type PickupIntent,
} from "../data/pickup";

export function PickupModal({ onClose }: { onClose: () => void }) {
  const [intent, setIntent] = useState<PickupIntent | null>(null);
  const brief = intent ? generatePickupBrief(intent) : null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal wide" onClick={(e) => e.stopPropagation()} role="dialog">
        <header className="modal-header">
          <h2>/pickup</h2>
          <p>Receiver-driven — what are you trying to do with this Work Session now?</p>
        </header>

        <div className="modal-body">
          {!intent && (
            <div className="recipient-grid">
              {PICKUP_INTENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="recipient-card"
                  onClick={() => setIntent(p.id)}
                >
                  <strong>{p.label}</strong>
                  <span>{p.example}</span>
                </button>
              ))}
            </div>
          )}

          {brief && (
            <div className="pickup-brief">
              <h3>{brief.title}</h3>
              <p>{brief.summary}</p>
              {brief.inspect && (
                <>
                  <strong style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ide-muted)" }}>
                    Inspect
                  </strong>
                  <ul>
                    {brief.inspect.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {brief.startHere && (
                <>
                  <strong style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ide-muted)" }}>
                    Start here
                  </strong>
                  <ul>
                    {brief.startHere.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {brief.tryFirst && (
                <>
                  <strong style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ide-muted)" }}>
                    Try first
                  </strong>
                  <ul>
                    {brief.tryFirst.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {brief.evidence && (
                <>
                  <strong style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ide-muted)" }}>
                    Evidence
                  </strong>
                  <ul>
                    {brief.evidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="pickup-first">
                <strong>First action → </strong>
                {brief.firstAction}
              </div>
              <button
                type="button"
                style={{ marginTop: 12, fontSize: 11, color: "var(--ide-muted)", background: "none", border: "none" }}
                onClick={() => setIntent(null)}
              >
                ← Choose different intent
              </button>
            </div>
          )}
        </div>

        <footer className="modal-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
          {brief && (
            <button
              type="button"
              className="primary"
              onClick={onClose}
              style={{ background: "var(--ide-accent)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 4 }}
            >
              Open in Cursor & continue
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
