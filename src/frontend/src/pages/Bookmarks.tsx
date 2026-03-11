import { useState } from "react";
import ComicCard from "../components/ComicCard";
import Footer from "../components/Footer";
import NovelCard from "../components/NovelCard";
import type { Comic, Novel } from "../types";

interface BookmarksProps {
  allComics: Comic[];
  allNovels: Novel[];
  bookmarkedIds: Set<number>;
  onToggleBookmark: (id: number) => void;
  onReadComic: (comic: Comic) => void;
  onReadNovel: (novel: Novel) => void;
  onBack: () => void;
}

type FilterTab = "all" | "comics" | "novels";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{
          color: "white",
          fontSize: "22px",
          fontWeight: 800,
          fontFamily: "'Sora', system-ui, sans-serif",
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
          textShadow:
            "0 0 20px rgba(159, 139, 255, 0.6), 0 0 40px rgba(106, 90, 224, 0.3)",
        }}
      >
        {children}
      </h2>
      <div
        style={{
          width: "40px",
          height: "3px",
          borderRadius: "999px",
          background: "linear-gradient(90deg, #6A5AE0, #9F8BFF)",
          boxShadow: "0 0 8px rgba(106, 90, 224, 0.6)",
        }}
      />
    </div>
  );
}

export default function Bookmarks({
  allComics,
  allNovels,
  bookmarkedIds,
  onToggleBookmark,
  onReadComic,
  onReadNovel,
  onBack,
}: BookmarksProps) {
  const [filter, setFilter] = useState<FilterTab>("all");

  const bookmarkedComics = allComics.filter((c) => bookmarkedIds.has(c.id));
  const bookmarkedNovels = allNovels.filter((n) => bookmarkedIds.has(n.id));

  const showComics = filter === "all" || filter === "comics";
  const showNovels = filter === "all" || filter === "novels";

  const hasAny = bookmarkedComics.length > 0 || bookmarkedNovels.length > 0;
  const hasFiltered =
    (showComics && bookmarkedComics.length > 0) ||
    (showNovels && bookmarkedNovels.length > 0);

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "comics", label: "Comics" },
    { key: "novels", label: "Novels" },
  ];

  const ocidMap: Record<FilterTab, string> = {
    all: "bookmarks.filter.all.tab",
    comics: "bookmarks.filter.comics.tab",
    novels: "bookmarks.filter.novels.tab",
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "40px" }}>
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
          data-ocid="bookmarks.back_button"
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
        <h1
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: 700,
            margin: 0,
            fontFamily: "'Sora', system-ui, sans-serif",
          }}
        >
          My Bookmarks
        </h1>
      </div>

      <div style={{ padding: "24px 16px 0" }}>
        <SectionTitle>My Bookmarks</SectionTitle>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              data-ocid={ocidMap[tab.key]}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "6px 18px",
                borderRadius: "999px",
                border: "none",
                background:
                  filter === tab.key
                    ? "linear-gradient(135deg, #6A5AE0, #9F8BFF)"
                    : "rgba(255,255,255,0.07)",
                color: filter === tab.key ? "white" : "var(--color-text-muted)",
                fontSize: "13px",
                fontWeight: filter === tab.key ? 700 : 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
                boxShadow:
                  filter === tab.key
                    ? "0 2px 10px rgba(106,90,224,0.4)"
                    : "none",
              }}
            >
              {tab.label}
              {tab.key === "all" && hasAny ? (
                <span
                  style={{
                    marginLeft: "6px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "999px",
                    padding: "1px 6px",
                    fontSize: "11px",
                  }}
                >
                  {bookmarkedComics.length + bookmarkedNovels.length}
                </span>
              ) : null}
              {tab.key === "comics" && bookmarkedComics.length > 0 ? (
                <span
                  style={{
                    marginLeft: "6px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "999px",
                    padding: "1px 6px",
                    fontSize: "11px",
                  }}
                >
                  {bookmarkedComics.length}
                </span>
              ) : null}
              {tab.key === "novels" && bookmarkedNovels.length > 0 ? (
                <span
                  style={{
                    marginLeft: "6px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "999px",
                    padding: "1px 6px",
                    fontSize: "11px",
                  }}
                >
                  {bookmarkedNovels.length}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {!hasFiltered ? (
          <div
            data-ocid="bookmarks.empty_state"
            style={{
              textAlign: "center",
              padding: "60px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(159,139,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="No bookmarks"
            >
              <title>No bookmarks</title>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <p
              style={{
                color: "rgba(159, 139, 255, 0.6)",
                fontSize: "15px",
                fontFamily: "'Sora', system-ui, sans-serif",
                margin: 0,
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              No bookmarks yet. Tap the bookmark icon on any comic or novel to
              save it here.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Comics */}
            {showComics && bookmarkedComics.length > 0 && (
              <div>
                {filter === "all" && (
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Comics
                  </p>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                  className="sm:grid-cols-4"
                >
                  {bookmarkedComics.map((comic, i) => (
                    <ComicCard
                      key={comic.id}
                      comic={comic}
                      index={i + 1}
                      onClick={() => onReadComic(comic)}
                      isBookmarked={true}
                      onToggleBookmark={onToggleBookmark}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Novels */}
            {showNovels && bookmarkedNovels.length > 0 && (
              <div>
                {filter === "all" && (
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Novels
                  </p>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                  className="sm:grid-cols-4"
                >
                  {bookmarkedNovels.map((novel, i) => (
                    <NovelCard
                      key={novel.id}
                      novel={novel}
                      index={i + 1}
                      onClick={() => onReadNovel(novel)}
                      isBookmarked={true}
                      onToggleBookmark={onToggleBookmark}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
