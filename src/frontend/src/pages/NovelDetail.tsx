import type { Novel } from "../types";

interface NovelDetailProps {
  novel: Novel | null;
  onBack: () => void;
  onReadChapter: (chapterId: number) => void;
}

export default function NovelDetail({
  novel,
  onBack,
  onReadChapter,
}: NovelDetailProps) {
  if (!novel) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-text-muted)",
          fontFamily: "'Sora', system-ui, sans-serif",
        }}
      >
        Novel not found.
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      {/* Sticky top bar */}
      <div
        className="glass"
        style={{
          position: "sticky",
          top: "56px",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0 16px",
          height: "52px",
        }}
      >
        <button
          type="button"
          data-ocid="novel_detail.back_button"
          onClick={onBack}
          aria-label="Go back"
          style={{
            background: "rgba(159, 139, 255, 0.1)",
            border: "1px solid rgba(159, 139, 255, 0.2)",
            color: "white",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          ←
        </button>
        <h1
          style={{
            color: "white",
            fontSize: "15px",
            fontWeight: 700,
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "'Sora', system-ui, sans-serif",
          }}
        >
          {novel.title}
        </h1>
      </div>

      {/* Hero cover */}
      <div
        style={{
          background: novel.gradient,
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Book spine effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: "rgba(0,0,0,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(13,11,26,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          {/* Genre badge */}
          <span
            style={{
              display: "inline-block",
              background: "rgba(106, 90, 224, 0.4)",
              border: "1px solid rgba(159, 139, 255, 0.4)",
              color: "#c4b5ff",
              fontSize: "12px",
              fontWeight: 700,
              padding: "3px 12px",
              borderRadius: "999px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {novel.genre}
          </span>
          <h2
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: 800,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: "0 0 6px",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              lineHeight: 1.2,
            }}
          >
            {novel.title}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
              margin: 0,
              fontWeight: 500,
            }}
          >
            by {novel.author}
          </p>
        </div>
      </div>

      {/* Detail content */}
      <div
        style={{ maxWidth: "680px", margin: "0 auto", padding: "0 16px 60px" }}
      >
        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            padding: "20px 0 16px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#f87171"
              stroke="none"
              role="img"
              aria-label="likes"
            >
              <title>likes</title>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {novel.likes}
            </span>
            <span
              style={{ color: "var(--color-text-muted)", fontSize: "13px" }}
            >
              likes
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              role="img"
              aria-label="views"
            >
              <title>views</title>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {novel.views}
            </span>
            <span
              style={{ color: "var(--color-text-muted)", fontSize: "13px" }}
            >
              views
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              role="img"
              aria-label="chapters"
            >
              <title>chapters</title>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {novel.chapters.length}
            </span>
            <span
              style={{ color: "var(--color-text-muted)", fontSize: "13px" }}
            >
              chapters
            </span>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            padding: "16px 0",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h3
            style={{
              color: "var(--color-text-muted)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            About
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {novel.description}
          </p>
        </div>

        {/* Chapter list */}
        <div style={{ paddingTop: "20px" }}>
          <h3
            style={{
              color: "white",
              fontSize: "17px",
              fontWeight: 800,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: "0 0 14px",
            }}
          >
            Chapters
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {novel.chapters.map((chapter, i) => (
              <button
                key={chapter.id}
                type="button"
                data-ocid={`novel_detail.chapter.item.${i + 1}`}
                onClick={() => onReadChapter(chapter.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  background: "var(--color-surface)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  cursor: "pointer",
                  border: "1px solid var(--color-border)",
                  transition: "background 0.2s",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-surface)";
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(106, 90, 224, 0.2)",
                    border: "1px solid rgba(159, 139, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-primary-light)",
                    fontSize: "12px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: "14px",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {chapter.title}
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "12px",
                      margin: "2px 0 0",
                    }}
                  >
                    Chapter {i + 1}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                  aria-label="arrow"
                >
                  <title>arrow</title>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
