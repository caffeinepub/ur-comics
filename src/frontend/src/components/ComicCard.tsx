import { useRouter } from "@tanstack/react-router";
import { BookOpen, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Comic } from "../types";
import { formatLikes, getGenreGradient } from "../types";

interface ComicCardProps {
  comic: Comic;
  index: number;
  ocid: string;
}

export default function ComicCard({ comic, index, ocid }: ComicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              el.classList.add("visible");
            },
            (index % 4) * 80,
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} data-ocid={ocid} className="comic-card comic-card-reveal">
      <button
        type="button"
        onClick={() =>
          router.navigate({
            to: "/reader/$id",
            params: { id: comic.id.toString() },
          })
        }
        aria-label={`Read ${comic.title} by ${comic.author}`}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          width: "100%",
          cursor: "pointer",
          textAlign: "left",
          display: "block",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{
            height: 220,
            background: getGenreGradient(comic.genre),
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(4px)",
              borderRadius: 50,
              padding: "3px 10px",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {comic.genre}
          </span>
        </div>
        <div style={{ padding: "12px 14px 14px" }}>
          <h3
            style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              margin: "0 0 4px",
              color: "var(--nebula-text)",
              lineHeight: 1.3,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {comic.title}
          </h3>
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--nebula-text-muted)",
              margin: "0 0 10px",
              fontWeight: 500,
            }}
          >
            {comic.author}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--nebula-text-muted)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <BookOpen size={12} />
              {comic.episodes.toString()} eps
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#e91e63",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontWeight: 600,
              }}
            >
              <Heart size={12} fill="#e91e63" />
              {formatLikes(comic.likes)}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
