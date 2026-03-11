import { useCallback, useEffect, useState } from "react";
import type { Comic } from "../types";

const slides = [
  {
    id: 1,
    title: "Shadow Chronicles",
    genre: "Action",
    description:
      "A lone warrior battles through shadow realms to reclaim his stolen destiny.",
    gradient: "linear-gradient(160deg, #1a0040 0%, #4A0080 50%, #9F8BFF 100%)",
    author: "KJ Arts",
    likes: "12.4K",
    views: "98K",
  },
  {
    id: 2,
    title: "Celestial Bloom",
    genre: "Fantasy",
    description:
      "A young mage discovers her power can reshape the entire universe.",
    gradient: "linear-gradient(160deg, #3d0030 0%, #800060 50%, #FF8BCC 100%)",
    author: "MoonDraw",
    likes: "8.2K",
    views: "67K",
  },
  {
    id: 3,
    title: "Neon Nights",
    genre: "Sci-Fi",
    description:
      "In a cyberpunk city, one hacker uncovers the truth behind the digital veil.",
    gradient: "linear-gradient(160deg, #001040 0%, #003080 50%, #8BB0FF 100%)",
    author: "CyberInk",
    likes: "15K",
    views: "120K",
  },
  {
    id: 4,
    title: "Eternal Bonds",
    genre: "Romance",
    description:
      "Two souls separated by time find their way back across centuries.",
    gradient: "linear-gradient(160deg, #3d0010 0%, #801030 50%, #FF9F8B 100%)",
    author: "RoseArt",
    likes: "9.1K",
    views: "75K",
  },
  {
    id: 5,
    title: "Iron Dynasty",
    genre: "Drama",
    description:
      "A royal family tears itself apart in the pursuit of absolute power.",
    gradient: "linear-gradient(160deg, #0d0d20 0%, #202040 50%, #8B8BCC 100%)",
    author: "SteelPen",
    likes: "6.7K",
    views: "54K",
  },
];

interface HeroSliderProps {
  onReadNow: (comic: Comic) => void;
}

export default function HeroSlider({ onReadNow }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating],
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const comic: Comic = {
    id: slide.id,
    title: slide.title,
    author: slide.author,
    genre: slide.genre,
    likes: slide.likes,
    views: slide.views,
    gradient: slide.gradient,
    description: slide.description,
  };

  /* Arrow button shared style */
  const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    [side]: "12px",
    /* Vertically centered in the upper 60% of the banner to stay clear of
       the text/CTA area and the dot row at the very bottom */
    top: "38%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(26, 22, 48, 0.75)",
    border: "1px solid rgba(168, 85, 247, 0.45)",
    boxShadow: "0 0 10px rgba(123, 92, 255, 0.55)",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    lineHeight: 1,
    transition: "background 0.2s, box-shadow 0.2s",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        /* Extra bottom padding so arrows at 38% never visually bleed
           toward the genre row; the overflow:hidden clips everything. */
        height: "440px",
        overflow: "hidden",
        borderRadius: "0 0 0 0",
      }}
    >
      {/* Background */}
      <div
        key={current}
        style={{
          position: "absolute",
          inset: 0,
          background: slide.gradient,
          animation: "fadeIn 0.4s ease-out",
        }}
      />

      {/* Dark overlay at bottom for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(13,11,26,0.95) 0%, rgba(13,11,26,0.4) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Left arrow — clipped inside overflow:hidden */}
      <button
        type="button"
        data-ocid="hero.prev_button"
        onClick={prev}
        aria-label="Previous slide"
        style={arrowStyle("left")}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(123, 92, 255, 0.35)";
          el.style.boxShadow = "0 0 16px rgba(168, 85, 247, 0.75)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(26, 22, 48, 0.75)";
          el.style.boxShadow = "0 0 10px rgba(123, 92, 255, 0.55)";
        }}
      >
        ‹
      </button>

      {/* Right arrow — clipped inside overflow:hidden */}
      <button
        type="button"
        data-ocid="hero.next_button"
        onClick={next}
        aria-label="Next slide"
        style={arrowStyle("right")}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(123, 92, 255, 0.35)";
          el.style.boxShadow = "0 0 16px rgba(168, 85, 247, 0.75)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(26, 22, 48, 0.75)";
          el.style.boxShadow = "0 0 10px rgba(123, 92, 255, 0.55)";
        }}
      >
        ›
      </button>

      {/* Content — sits at bottom above dots */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 20px 56px",
          zIndex: 5,
        }}
      >
        {/* Genre badge */}
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            background: "rgba(106, 90, 224, 0.8)",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 700,
            color: "white",
            marginBottom: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            backdropFilter: "blur(4px)",
          }}
        >
          {slide.genre}
        </div>

        {/* Title */}
        <h2
          style={{
            color: "white",
            fontSize: "clamp(22px, 6vw, 32px)",
            fontWeight: 800,
            fontFamily: "'Sora', system-ui, sans-serif",
            margin: "0 0 8px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {slide.title}
        </h2>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "13px",
            lineHeight: 1.5,
            margin: "0 0 16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            maxWidth: "420px",
          }}
        >
          {slide.description}
        </p>

        {/* CTA button */}
        <button
          type="button"
          data-ocid="hero.read_now_button"
          onClick={() => onReadNow(comic)}
          className="btn-gradient"
          style={{
            padding: "10px 24px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          Read Now →
        </button>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "6px",
          zIndex: 10,
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            data-ocid={`hero.slide.${i + 1}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background:
                i === current
                  ? "var(--color-primary-light)"
                  : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
