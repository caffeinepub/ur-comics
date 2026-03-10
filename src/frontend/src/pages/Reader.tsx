import { getRouteApi, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useComicById } from "../hooks/useQueries";
import { SAMPLE_COMICS, getGenreGradient } from "../types";

const routeApi = getRouteApi("/reader/$id");

const PANELS_PER_CHAPTER = 8;

const panelDescriptions = [
  "The story begins in darkness — a single light cuts through the void.",
  "Our hero stands at the crossroads, shadows stretching long behind them.",
  "A figure emerges from the mist. Their eyes hold centuries of secrets.",
  "The world shifts. Reality bends. Nothing will ever be the same again.",
  "A moment of stillness before the storm — silence, but loaded with meaning.",
  "The revelation lands like a thunderclap. Everything was a lie.",
  "Through fire and resolve, our hero pushes forward into the unknown.",
  "The chapter ends — but the journey is far from over.",
];

const panelKeys = Array.from(
  { length: PANELS_PER_CHAPTER },
  (_, i) => `panel-${i}`,
);

export default function Reader() {
  const { id } = routeApi.useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showEOC, setShowEOC] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const comicId = id ? BigInt(id) : 1n;
  const { data: comic } = useComicById(comicId);
  const displayComic =
    comic ?? SAMPLE_COMICS.find((c) => c.id === comicId) ?? SAMPLE_COMICS[0];

  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
    setProgress(pct);
    if (pct >= 90) setShowEOC(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setters are stable
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowEOC(false);
    setProgress(0);
  }, [chapter]);

  const maxChapter = Number(displayComic.episodes);

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "white" }}>
      <div
        data-ocid="reader.progress_bar"
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
        aria-label={`Reading progress: ${progress}%`}
      />

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(13, 13, 13, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: 56,
        }}
      >
        <button
          type="button"
          onClick={() => router.navigate({ to: "/" })}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.8)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.875rem",
            fontFamily: "inherit",
            fontWeight: 500,
            padding: 8,
            borderRadius: 8,
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "white" }}>
            {displayComic.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
            Chapter {chapter}
          </div>
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 500,
          }}
        >
          {progress}%
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0 100px" }}>
        {Array.from({ length: PANELS_PER_CHAPTER }).map((_, i) => {
          const palette = getGenreGradient(displayComic.genre);
          const panelGradients = [
            palette,
            "linear-gradient(180deg, #0d0d0d, #1a1a2e)",
            palette,
            "linear-gradient(180deg, #111, #1a0a2e)",
            "linear-gradient(180deg, #0d0d0d, #1a1a1a)",
            palette,
            "linear-gradient(180deg, #0a0a1a, #111)",
            "linear-gradient(180deg, #0d0d0d, #1a0020)",
          ];
          return (
            <div
              key={panelKeys[i]}
              style={{
                width: "100%",
                height: "clamp(320px, 60vw, 520px)",
                background: panelGradients[i % panelGradients.length],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                borderBottom: "2px solid #000",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "15%",
                  right: "10%",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: "8%",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.02)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Panel {i + 1} / {PANELS_PER_CHAPTER}
              </div>
              <div
                style={{
                  maxWidth: 440,
                  textAlign: "center",
                  padding: "0 32px",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.7,
                  }}
                >
                  "{panelDescriptions[i % panelDescriptions.length]}"
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
                }}
              />
            </div>
          );
        })}

        {showEOC && (
          <div
            style={{
              padding: "40px 24px",
              background: "linear-gradient(135deg, #1a1040, #2d1b6b)",
            }}
          >
            <div
              className="eoc-card"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(139, 124, 255, 0.3)",
                borderRadius: 24,
                padding: 28,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>🎉</div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "white",
                  marginBottom: 8,
                }}
              >
                Chapter {chapter} Complete!
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.875rem",
                  marginBottom: 20,
                }}
              >
                Rate this chapter:
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  marginBottom: 24,
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star-btn ${star <= (hoveredStar || rating) ? "active" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {chapter < maxChapter ? (
                <button
                  type="button"
                  data-ocid="reader.pagination_next"
                  className="btn-nebula"
                  onClick={() => setChapter((c) => c + 1)}
                  style={{ marginRight: 12 }}
                >
                  Next Chapter →
                </button>
              ) : (
                <p
                  style={{
                    color: "rgba(139, 124, 255, 0.9)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  🌟 You've reached the latest chapter!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(13, 13, 13, 0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          zIndex: 50,
        }}
      >
        <button
          type="button"
          data-ocid="reader.pagination_prev"
          onClick={() => chapter > 1 && setChapter((c) => c - 1)}
          disabled={chapter <= 1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 50,
            border: "1.5px solid rgba(255,255,255,0.15)",
            background: chapter <= 1 ? "transparent" : "rgba(255,255,255,0.07)",
            color: chapter <= 1 ? "rgba(255,255,255,0.2)" : "white",
            cursor: chapter <= 1 ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <span
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          Ch {chapter} / {maxChapter}
        </span>
        <button
          type="button"
          data-ocid="reader.pagination_next"
          onClick={() => chapter < maxChapter && setChapter((c) => c + 1)}
          disabled={chapter >= maxChapter}
          className={chapter < maxChapter ? "btn-nebula" : ""}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 50,
            ...(chapter >= maxChapter
              ? {
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.2)",
                  cursor: "not-allowed",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }
              : {}),
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
