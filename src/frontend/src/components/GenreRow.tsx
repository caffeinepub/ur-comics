import { useState } from "react";

const genres = [
  "All",
  "Action",
  "Romance",
  "Drama",
  "Fantasy",
  "Comedy",
  "Sci-Fi",
  "Horror",
];

/** Maps each genre to a gradient + glow color */
const genreStyles: Record<
  string,
  { gradient: string; glow: string; border: string }
> = {
  All: {
    gradient: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
    glow: "rgba(106, 90, 224, 0.55)",
    border: "rgba(159, 139, 255, 0.5)",
  },
  Action: {
    gradient: "linear-gradient(135deg, #c0392b, #ff6b6b)",
    glow: "rgba(192, 57, 43, 0.55)",
    border: "rgba(255, 107, 107, 0.5)",
  },
  Romance: {
    gradient: "linear-gradient(135deg, #c2185b, #f06292)",
    glow: "rgba(194, 24, 91, 0.55)",
    border: "rgba(240, 98, 146, 0.5)",
  },
  Drama: {
    gradient: "linear-gradient(135deg, #5e35b1, #9c27b0)",
    glow: "rgba(94, 53, 177, 0.55)",
    border: "rgba(156, 39, 176, 0.5)",
  },
  Fantasy: {
    gradient: "linear-gradient(135deg, #1565c0, #42a5f5)",
    glow: "rgba(21, 101, 192, 0.55)",
    border: "rgba(66, 165, 245, 0.5)",
  },
  Comedy: {
    gradient: "linear-gradient(135deg, #e65100, #ffb300)",
    glow: "rgba(230, 81, 0, 0.55)",
    border: "rgba(255, 179, 0, 0.5)",
  },
  "Sci-Fi": {
    gradient: "linear-gradient(135deg, #006064, #00bcd4)",
    glow: "rgba(0, 96, 100, 0.55)",
    border: "rgba(0, 188, 212, 0.5)",
  },
  Horror: {
    gradient: "linear-gradient(135deg, #1a0000, #7b0000)",
    glow: "rgba(123, 0, 0, 0.6)",
    border: "rgba(180, 0, 0, 0.4)",
  },
  "Slice of Life": {
    gradient: "linear-gradient(135deg, #1b5e20, #66bb6a)",
    glow: "rgba(27, 94, 32, 0.55)",
    border: "rgba(102, 187, 106, 0.5)",
  },
};

interface GenreRowProps {
  onGenreChange?: (genre: string) => void;
}

export default function GenreRow({ onGenreChange }: GenreRowProps) {
  const [active, setActive] = useState("All");

  const handleClick = (genre: string) => {
    setActive(genre);
    onGenreChange?.(genre);
  };

  return (
    <div
      className="hide-scrollbar"
      style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        padding: "0 16px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {genres.map((genre) => {
        const isActive = genre === active;
        const style = genreStyles[genre] ?? genreStyles.All;
        return (
          <button
            key={genre}
            type="button"
            data-ocid={`genre.${genre.toLowerCase().replace(/[^a-z0-9]/g, "")}_tab`}
            onClick={() => handleClick(genre)}
            style={{
              flexShrink: 0,
              padding: "8px 18px",
              borderRadius: "999px",
              border: `1px solid ${style.border}`,
              background: isActive ? style.gradient : "rgba(26, 22, 48, 0.85)",
              color: "white",
              fontSize: "13px",
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
              boxShadow: isActive
                ? `0 0 10px ${style.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                : `0 0 6px ${style.glow.replace("0.55", "0.25").replace("0.6", "0.25")}`,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = style.gradient;
                el.style.boxShadow = `0 0 12px ${style.glow}`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(26, 22, 48, 0.85)";
                el.style.boxShadow = `0 0 6px ${style.glow.replace("0.55", "0.25").replace("0.6", "0.25")}`;
              }
            }}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
