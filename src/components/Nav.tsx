type Page = "home" | "about";

interface NavProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export default function Nav({ current, onNavigate }: NavProps) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.4rem 2.5rem",
        background: "#fdf6f1",
        borderBottom: "1px solid rgba(190,155,155,0.18)",
      }}
    >
      <button
        onClick={() => onNavigate("home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1.5px solid rgba(185,145,145,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "11px",
              color: "#b08080",
              lineHeight: 1,
            }}
          >
            aw
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#3a2020",
          }}
        >
          ANGELA WON
        </span>
      </button>

      <div style={{ display: "flex", gap: "2.5rem" }}>
        {(["BOARD", "ABOUT ME"] as const).map((label) => {
          const target: Page = label === "ABOUT ME" ? "about" : "home";
          const active = current === target;
          return (
            <button
              key={label}
              onClick={() => onNavigate(target)}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: active ? "#b08080" : "#3a2020",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                borderBottom: active
                  ? "1px solid rgba(180,130,130,0.5)"
                  : "1px solid transparent",
                paddingBottom: "2px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#b08080")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = active
                  ? "#b08080"
                  : "#3a2020")
              }
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
