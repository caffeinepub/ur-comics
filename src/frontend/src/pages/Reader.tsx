import { useEffect, useRef, useState } from "react";
import type { Comic } from "../types";

interface ReaderProps {
  comic: Comic | null;
  onBack: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  initialChapter?: number;
  initialScrollPosition?: number;
  onUpdateProgress?: (
    chapterNumber: number,
    scrollPosition: number,
    progressPercentage: number,
  ) => void;
}

const TOTAL_CHAPTERS = 5;

const pageGradients = [
  "linear-gradient(180deg, #1a0040 0%, #4A0080 100%)",
  "linear-gradient(180deg, #0d0030 0%, #3A0060 100%)",
  "linear-gradient(180deg, #200050 0%, #5A10A0 100%)",
  "linear-gradient(180deg, #100040 0%, #4010A0 100%)",
  "linear-gradient(180deg, #0a0030 0%, #350080 100%)",
  "linear-gradient(180deg, #1a0050 0%, #4A20B0 100%)",
  "linear-gradient(180deg, #0d0040 0%, #3A0090 100%)",
  "linear-gradient(180deg, #200060 0%, #5A10B0 100%)",
];

export default function Reader({
  comic,
  onBack,
  isBookmarked,
  onToggleBookmark,
  initialChapter = 1,
  initialScrollPosition = 0,
  onUpdateProgress,
}: ReaderProps) {
  const [chapter, setChapter] = useState(initialChapter);
  const scrollRestoredRef = useRef(false);
  const title = comic?.title || "Comic";
  const gradient =
    comic?.gradient || "linear-gradient(135deg, #4A0080, #9F8BFF)";

  // Auto-scroll to saved position on mount (only once)
  useEffect(() => {
    if (initialScrollPosition > 0 && !scrollRestoredRef.current) {
      scrollRestoredRef.current = true;
      // Small delay to let the page render fully
      const timer = setTimeout(() => {
        window.scrollTo({ top: initialScrollPosition, behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [initialScrollPosition]);

  // When chapter changes (prev/next), scroll to top and reset restoration flag
  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRestoredRef is intentionally excluded
  useEffect(() => {
    scrollRestoredRef.current = true;
    window.scrollTo({ top: 0 });
  }, [chapter]);

  // Continuous scroll tracking
  useEffect(() => {
    if (!comic) return;
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        // Save to localStorage
        const key = `reading_progress_comic_${comic.id}`;
        const data = {
          comicId: comic.id,
          chapterNumber: chapter,
          scrollPosition: scrollTop,
          progressPercentage: pct,
        };
        localStorage.setItem(key, JSON.stringify(data));

        onUpdateProgress?.(chapter, scrollTop, pct);
      }, 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [comic, chapter, onUpdateProgress]);

  return (
    <div style={{ minHeight: "100vh", background: "#080610" }}>
      {/* Top bar */}
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
          data-ocid="reader.back_button"
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
        <div style={{ flex: 1, minWidth: 0 }}>
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
            {title}
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "11px",
              margin: 0,
            }}
          >
            Chapter {chapter} of {TOTAL_CHAPTERS}
          </p>
        </div>
        {onToggleBookmark && (
          <button
            type="button"
            data-ocid="reader.bookmark_button"
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
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
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            <svg
              width="18"
              height="18"
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

      {/* Comic pages — vertical scroll */}
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Chapter cover */}
        <div
          style={{
            background: gradient,
            width: "100%",
            height: "240px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
              margin: 0,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Chapter {chapter}
          </p>
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Pages */}
        {pageGradients.map((grad, i) => (
          <div
            key={`ch${chapter}-pg${i + 1}`}
            style={{
              background: grad,
              width: "100%",
              height: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              borderBottom: "2px solid #080610",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "16px",
                background: "rgba(0,0,0,0.4)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "11px",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "999px",
              }}
            >
              {i + 1} / {pageGradients.length}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Page {i + 1}
            </p>
          </div>
        ))}
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
          borderBottom: "none",
          gap: "12px",
        }}
      >
        <button
          type="button"
          data-ocid="reader.prev_chapter_button"
          onClick={() => setChapter((c) => Math.max(1, c - 1))}
          disabled={chapter <= 1}
          style={{
            background:
              chapter <= 1
                ? "rgba(26, 22, 48, 0.5)"
                : "var(--gradient-primary)",
            border: "none",
            color: chapter <= 1 ? "var(--color-text-muted)" : "white",
            padding: "10px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: chapter <= 1 ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: chapter <= 1 ? 0.5 : 1,
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
          Chapter {chapter} / {TOTAL_CHAPTERS}
        </span>

        <button
          type="button"
          data-ocid="reader.next_chapter_button"
          onClick={() => setChapter((c) => Math.min(TOTAL_CHAPTERS, c + 1))}
          disabled={chapter >= TOTAL_CHAPTERS}
          style={{
            background:
              chapter >= TOTAL_CHAPTERS
                ? "rgba(26, 22, 48, 0.5)"
                : "var(--gradient-primary)",
            border: "none",
            color:
              chapter >= TOTAL_CHAPTERS ? "var(--color-text-muted)" : "white",
            padding: "10px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: chapter >= TOTAL_CHAPTERS ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: chapter >= TOTAL_CHAPTERS ? 0.5 : 1,
            transition: "all 0.2s",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
