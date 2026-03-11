import type { Novel } from "../types";

interface NovelCardProps {
  novel: Novel;
  index: number;
  onClick: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: number) => void;
}

export default function NovelCard({
  novel,
  index,
  onClick,
  isBookmarked,
  onToggleBookmark,
}: NovelCardProps) {
  return (
    <button
      type="button"
      data-ocid={`novel.card.${index}`}
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
        position: "relative",
      }}
    >
      {/* Cover — portrait 3:4 like comic card */}
      <div
        style={{
          background: novel.gradient,
          aspectRatio: "3 / 4",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 0 12px",
        }}
      >
        {/* Book spine decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
          }}
        />
        {/* Novel watermark title */}
        <span
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "clamp(10px, 2.5vw, 12px)",
            fontWeight: 700,
            textAlign: "center",
            padding: "0 10px",
            fontFamily: "'Sora', system-ui, sans-serif",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.3,
          }}
        >
          {novel.title}
        </span>
        {/* Genre badge */}
        <span
          style={{
            marginTop: "6px",
            background: "rgba(0,0,0,0.4)",
            color: "rgba(255,255,255,0.7)",
            fontSize: "10px",
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: "999px",
            letterSpacing: "0.04em",
          }}
        >
          {novel.genre}
        </span>

        {/* Bookmark button */}
        {onToggleBookmark && (
          <button
            type="button"
            data-ocid={`novel.bookmark.${index}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(novel.id);
            }}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              borderRadius: "6px",
              padding: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              transition: "background 0.2s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(106,90,224,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,0,0,0.5)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isBookmarked ? "#9F8BFF" : "none"}
              stroke={isBookmarked ? "#9F8BFF" : "rgba(255,255,255,0.7)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="bookmark"
            >
              <title>bookmark</title>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}
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
          {novel.title}
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
          {novel.author}
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
            {novel.likes}
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
            {novel.views}
          </span>
        </div>
      </div>
    </button>
  );
}
