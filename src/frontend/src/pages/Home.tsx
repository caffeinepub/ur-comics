import { useState } from "react";
import ComicCard from "../components/ComicCard";
import HeroSlider from "../components/HeroSlider";
import SkeletonCard from "../components/SkeletonCard";
import { useAllComics, useAllGenres } from "../hooks/useQueries";
import { SAMPLE_COMICS } from "../types";

export default function Home() {
  const [activeGenre, setActiveGenre] = useState("All");
  const { data: comics, isLoading: comicsLoading } = useAllComics();
  const { data: genres, isLoading: genresLoading } = useAllGenres();

  const displayComics = comics ?? SAMPLE_COMICS;
  const displayGenres = genres ?? [
    "All",
    "Sci-Fi",
    "Fantasy",
    "Action",
    "Romance",
    "Horror",
  ];

  const filteredComics =
    activeGenre === "All"
      ? displayComics
      : displayComics.filter((c) => c.genre === activeGenre);

  const isLoading = comicsLoading && !comics;

  return (
    <main>
      <HeroSlider comics={displayComics} />

      {/* Genre Filters */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 0" }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 8,
            scrollbarWidth: "none",
          }}
          role="tablist"
          aria-label="Filter by genre"
        >
          {(genresLoading ? ["All"] : displayGenres).map((genre) => (
            <button
              type="button"
              key={genre}
              data-ocid="genre.tab"
              role="tab"
              aria-selected={activeGenre === genre}
              className={`genre-pill ${activeGenre === genre ? "active" : ""}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Comics Grid */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px 60px" }}
        aria-label="Comics"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "var(--nebula-text)",
              letterSpacing: "-0.02em",
            }}
          >
            {activeGenre === "All" ? "All Comics" : activeGenre}
          </h2>
          <span
            style={{ fontSize: "0.85rem", color: "var(--nebula-text-muted)" }}
          >
            {filteredComics.length} series
          </span>
        </div>

        {isLoading ? (
          <div
            data-ocid="comics.loading_state"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 14,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton loaders have no identity
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        ) : filteredComics.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--nebula-text-muted)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📚</div>
            <p style={{ fontWeight: 600 }}>No comics in this genre yet.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 14,
            }}
          >
            {filteredComics.map((comic, i) => (
              <ComicCard
                key={comic.id.toString()}
                comic={comic}
                index={i}
                ocid={`comics.item.${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
