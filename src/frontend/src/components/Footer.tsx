export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a1440, #2d1b6b)",
        color: "rgba(255,255,255,0.7)",
        padding: "48px 24px 32px",
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                background: "linear-gradient(135deg, #8B7CFF, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 12,
              }}
            >
              UR Comics
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
              A premium webtoon platform where stories come alive. Discover,
              read, and create.
            </p>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 12,
                fontSize: "0.9rem",
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Trending", "New Releases", "All Genres", "Top Creators"].map(
                (item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "color 0.2s",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 12,
                fontSize: "0.9rem",
              }}
            >
              Create
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Upload Comics", "Creator Guide", "Community", "Support"].map(
                (item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: "0.85rem", cursor: "pointer" }}>
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            textAlign: "center",
            fontSize: "0.82rem",
          }}
        >
          © {year}.{" "}
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(139, 124, 255, 0.9)",
              textDecoration: "none",
            }}
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
