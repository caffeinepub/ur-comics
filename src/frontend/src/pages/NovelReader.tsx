import type { Novel } from "../types";

interface NovelReaderProps {
  novel: Novel | null;
  chapterIndex: number;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function NovelReader({
  novel,
  chapterIndex,
  onBack,
  onPrev,
  onNext,
}: NovelReaderProps) {
  if (!novel) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-text-muted)",
        }}
      >
        Chapter not found.
      </div>
    );
  }

  const chapterIdx = novel.chapters.findIndex((c) => c.id === chapterIndex);
  const chapter =
    chapterIdx >= 0 ? novel.chapters[chapterIdx] : novel.chapters[0];
  const currentNum = chapterIdx >= 0 ? chapterIdx + 1 : 1;
  const total = novel.chapters.length;
  const isFirst = currentNum <= 1;
  const isLast = currentNum >= total;

  return (
    <div style={{ minHeight: "100vh", background: "#080610" }}>
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
          data-ocid="novel_reader.back_button"
          onClick={onBack}
          aria-label="Back to novel"
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
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}
          >
            {chapter?.title}
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "11px",
              margin: 0,
            }}
          >
            Chapter {currentNum} of {total}
          </p>
        </div>
      </div>

      {/* Story content */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "32px 24px 100px",
        }}
      >
        {/* Chapter header */}
        <div
          style={{
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "24px",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Chapter {currentNum} · {novel.title}
          </p>
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {chapter?.title}
          </h2>
        </div>

        {/* Story text */}
        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "16px",
            lineHeight: 1.9,
            fontFamily: "'Sora', system-ui, sans-serif",
            whiteSpace: "pre-wrap",
          }}
        >
          {chapter?.content}
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="glass"
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderTop: "1px solid var(--color-border)",
          gap: "12px",
        }}
      >
        <button
          type="button"
          data-ocid="novel_reader.prev_chapter_button"
          onClick={onPrev}
          disabled={isFirst}
          style={{
            background: isFirst
              ? "rgba(26, 22, 48, 0.5)"
              : "var(--gradient-primary)",
            border: "none",
            color: isFirst ? "var(--color-text-muted)" : "white",
            padding: "10px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: isFirst ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: isFirst ? 0.5 : 1,
            transition: "all 0.2s",
          }}
        >
          ← Prev
        </button>

        <span
          style={{
            color: "var(--color-text-muted)",
            fontSize: "13px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Chapter {currentNum} / {total}
        </span>

        <button
          type="button"
          data-ocid="novel_reader.next_chapter_button"
          onClick={onNext}
          disabled={isLast}
          style={{
            background: isLast
              ? "rgba(26, 22, 48, 0.5)"
              : "var(--gradient-primary)",
            border: "none",
            color: isLast ? "var(--color-text-muted)" : "white",
            padding: "10px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: isLast ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: isLast ? 0.5 : 1,
            transition: "all 0.2s",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
