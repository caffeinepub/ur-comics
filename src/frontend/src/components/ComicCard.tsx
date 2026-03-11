import type { Comic } from "../types";

interface ComicCardProps {
  comic: Comic;
  index: number;
  onClick: () => void;
}

export default function ComicCard({ comic, index, onClick }: ComicCardProps) {
  return (
    <button
      type="button"
      data-ocid={`comic.card.${index}`}
      className="comic-card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        padding: 0,
        textAlign: "left",
        width: "100%",
        display: "block",
      }}
    >
      {/* Cover */}
      <div
        style={{
          background: comic.gradient,
          aspectRatio: "3 / 4",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "clamp(11px, 3vw, 13px)",
            fontWeight: 700,
            textAlign: "center",
            padding: "0 8px",
            fontFamily: "'Sora', system-ui, sans-serif",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {comic.title}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px" }}>
        <p
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "13px",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {comic.title}
        </p>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "11px",
            margin: "3px 0 8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {comic.author}
        </p>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            style={{
              color: "var(--color-text-muted)",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="#f87171"
              stroke="none"
              role="img"
              aria-label="likes"
            >
              <title>likes</title>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {comic.likes}
          </span>
          <span
            style={{
              color: "var(--color-text-muted)",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
              aria-label="views"
            >
              <title>views</title>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {comic.views}
          </span>
        </div>
      </div>
    </button>
  );
}
