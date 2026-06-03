import { useState, useEffect } from "react";

export type PaletteAction =
  | "handoff"
  | "pickup"
  | "work-session"
  | "open-preview"
  | "share";

const COMMANDS: { id: PaletteAction; label: string; cmd: string }[] = [
  { id: "handoff", label: "Create handoff from Work Session", cmd: "/handoff" },
  { id: "pickup", label: "Pickup Work Session with intent", cmd: "/pickup" },
  { id: "work-session", label: "Focus Work Session panel", cmd: "Work Session: Open" },
  { id: "open-preview", label: "Show AIM app preview", cmd: "Preview: AIM UI" },
  { id: "share", label: "Copy Work Session share link", cmd: "Share link" },
];

export function CommandPalette({
  open,
  onClose,
  onAction,
}: {
  open: boolean;
  onClose: () => void;
  onAction: (action: PaletteAction) => void;
}) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery("");
      setFocus(0);
    }
  }, [open]);

  if (!open) return null;

  const q = query.toLowerCase().replace(/^\//, "");
  const filtered = COMMANDS.filter(
    (c) =>
      c.cmd.toLowerCase().includes(q) ||
      c.label.toLowerCase().includes(q) ||
      (q === "handoff" && c.id === "handoff") ||
      (q === "pickup" && c.id === "pickup")
  );

  return (
    <div className="overlay" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          placeholder="Type /handoff, /pickup, or search commands..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setFocus(0);
          }}
        />
        <div className="palette-list">
          {filtered.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={i === focus ? "focused" : ""}
              onClick={() => {
                onAction(c.id);
                onClose();
              }}
            >
              <span className="cmd">{c.cmd}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
