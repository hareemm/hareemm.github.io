import { PERSONAS, SECTION_LABELS } from "../data/thoughtLeaderPersonas";
import "../styles/aim-preview.css";

const sections = ["musings", "guest", "dabbling", "chat"] as const;

export function AimPreview() {
  const chatPersona = PERSONAS.find((p) => p.screenName.startsWith("Chief")) ?? PERSONAS[0];
  const guestPersona = PERSONAS.find((p) => p.section === "guest") ?? PERSONAS[2];

  return (
    <div className="aim-desktop" aria-label="AIM app preview">
      <section className="aim-window aim-buddy-list">
        <header className="aim-title-bar">
          <span>◆ Buddy List</span>
          <div className="aim-window-controls">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </header>
        <nav className="aim-menu-bar">
          <span>File</span>
          <span>Edit</span>
          <span>People</span>
          <span>Help</span>
        </nav>
        <div className="aim-buddy-body">
          <div className="aim-user-strip">
            <div className="aim-avatar" />
            <div>
              <div>
                <strong>hareem</strong> <span style={{ color: "#666" }}>xxbballshawty02xx</span>
              </div>
              <div className="aim-buddy-row">
                <span className="aim-status-dot online" />
                online
              </div>
            </div>
          </div>
          {sections.map((sec) => (
            <div key={sec}>
              <div className="aim-section-title">{SECTION_LABELS[sec]}</div>
              {PERSONAS.filter((p) => p.section === sec).map((p) => (
                <div key={p.handle} className="aim-buddy-row">
                  <span className={`aim-status-dot ${p.status}`} />
                  <span>
                    {p.screenName}
                    {p.awayMessage && (
                      <span style={{ display: "block", fontSize: 10, opacity: 0.85 }}>
                        {p.awayMessage}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          ))}
          <aside className="aim-away-card">
            <strong>Away Message</strong>
            <br />
            currently: product &amp; design — thought leadership AIM rebuild
          </aside>
        </div>
      </section>

      <section className="aim-window aim-floating">
        <header className="aim-title-bar">
          <span>IM — {chatPersona.screenName}</span>
          <div className="aim-window-controls">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </header>
        <div className="aim-chat-body">
          <p>
            <strong>{chatPersona.screenName}:</strong> {chatPersona.snippet}
          </p>
          <p>
            <strong>hareem:</strong> should guest pieces open as buddies or folders?
          </p>
          <p style={{ color: "#666", fontStyle: "italic" }}>
            — backend mocked; messages static for preview —
          </p>
        </div>
        <div className="aim-chat-input-row">
          <input placeholder="Type your thought leadership..." readOnly />
          <button type="button">Send</button>
        </div>
      </section>

      <section className="aim-window aim-floating second">
        <header className="aim-title-bar">
          <span>{guestPersona.screenName}</span>
          <div className="aim-window-controls">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </header>
        <div className="aim-chat-body">
          <p>{guestPersona.snippet ?? "Guest piece content window."}</p>
          <p>When UI becomes the product, nostalgia becomes distribution.</p>
        </div>
      </section>
    </div>
  );
}
