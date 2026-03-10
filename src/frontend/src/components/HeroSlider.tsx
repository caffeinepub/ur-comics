import { useRouter } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Comic } from "../types";
import { getGenreGradient } from "../types";

interface HeroSliderProps {
  comics: Comic[];
}

export default function HeroSlider({ comics }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const slides = comics.slice(0, 5);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  if (!slides.length) return null;

  return (
    <section
      style={{
        position: "relative",
        height: "clamp(280px, 55vw, 520px)",
        overflow: "hidden",
        borderRadius: "0 0 32px 32px",
      }}
      aria-label="Featured comics slider"
    >
      {slides.map((comic, i) => (
        <div
          key={comic.id.toString()}
          className={`hero-slide ${i === current ? "active" : "inactive"}`}
          style={{
            position: "absolute",
            inset: 0,
            background: getGenreGradient(comic.genre),
            display: "flex",
            alignItems: "flex-end",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
          <div
            className="hero-slide-content"
            style={{
              position: "relative",
              zIndex: 1,
              padding:
                "clamp(20px, 4vw, 48px) clamp(56px, 10vw, 80px) clamp(48px, 6vw, 64px)",
              maxWidth: 640,
              width: "100%",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 50,
                padding: "4px 14px",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "white",
                marginBottom: 8,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {comic.genre}
            </span>
            <h2
              style={{
                color: "white",
                fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                fontWeight: 800,
                margin: "0 0 8px",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {comic.title}
            </h2>
            <p
              className="hero-description"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "clamp(0.78rem, 2vw, 1rem)",
                margin: "0 0 16px",
                lineHeight: 1.5,
                maxWidth: 420,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {comic.description}
            </p>
            <button
              type="button"
              className="btn-nebula"
              onClick={() =>
                router.navigate({
                  to: "/reader/$id",
                  params: { id: comic.id.toString() },
                })
              }
              style={{
                fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                padding: "clamp(7px, 1.5vw, 10px) clamp(16px, 3vw, 28px)",
              }}
            >
              <BookOpen
                size={14}
                style={{
                  display: "inline",
                  marginRight: 6,
                  verticalAlign: "middle",
                }}
              />
              Read Now
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        data-ocid="hero.pagination_prev"
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 50,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        data-ocid="hero.pagination_next"
        onClick={next}
        aria-label="Next slide"
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 50,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Centered dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 2,
        }}
      >
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide.id.toString()}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 50,
              background: i === current ? "white" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
