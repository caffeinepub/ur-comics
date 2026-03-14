import { useEffect, useRef, useState } from "react";
import ComicCard from "../components/ComicCard";
import FeaturedCreator from "../components/FeaturedCreator";
import Footer from "../components/Footer";
import NovelCard from "../components/NovelCard";
import type { Comic, Novel, Page, ReadingHistoryItem } from "../types";

const comics: Comic[] = [
  {
    id: 1,
    title: "Shadow Chronicles",
    author: "KJ Arts",
    genre: "Action",
    likes: "12.4K",
    views: "98K",
    gradient: "linear-gradient(135deg, #4A0080, #9F8BFF)",
  },
  {
    id: 2,
    title: "Celestial Bloom",
    author: "MoonDraw",
    genre: "Fantasy",
    likes: "8.2K",
    views: "67K",
    gradient: "linear-gradient(135deg, #800040, #FF8BCC)",
  },
  {
    id: 3,
    title: "Neon Nights",
    author: "CyberInk",
    genre: "Sci-Fi",
    likes: "15K",
    views: "120K",
    gradient: "linear-gradient(135deg, #003080, #8BB0FF)",
  },
  {
    id: 4,
    title: "Eternal Bonds",
    author: "RoseArt",
    genre: "Romance",
    likes: "9.1K",
    views: "75K",
    gradient: "linear-gradient(135deg, #801000, #FF9F8B)",
  },
  {
    id: 5,
    title: "Iron Dynasty",
    author: "SteelPen",
    genre: "Drama",
    likes: "6.7K",
    views: "54K",
    gradient: "linear-gradient(135deg, #202040, #8B8BCC)",
  },
  {
    id: 6,
    title: "Starfall",
    author: "GalaxyDraw",
    genre: "Fantasy",
    likes: "11K",
    views: "89K",
    gradient: "linear-gradient(135deg, #004040, #8BFFEE)",
  },
  {
    id: 7,
    title: "Crimson Veil",
    author: "DarkInk",
    genre: "Mystery",
    likes: "7.3K",
    views: "61K",
    gradient: "linear-gradient(135deg, #600000, #FF6B6B)",
  },
  {
    id: 8,
    title: "Azure Dreams",
    author: "SkyArt",
    genre: "Sci-Fi",
    likes: "5.9K",
    views: "48K",
    gradient: "linear-gradient(135deg, #001060, #6B9FFF)",
  },
];

const latestUpdates = [
  {
    id: 1,
    title: "Shadow Chronicles",
    chapter: "Ch. 47",
    time: "2h ago",
    gradient: "linear-gradient(135deg, #4A0080, #9F8BFF)",
  },
  {
    id: 2,
    title: "Neon Nights",
    chapter: "Ch. 62",
    time: "5h ago",
    gradient: "linear-gradient(135deg, #003080, #8BB0FF)",
  },
  {
    id: 3,
    title: "Starfall",
    chapter: "Ch. 28",
    time: "8h ago",
    gradient: "linear-gradient(135deg, #004040, #8BFFEE)",
  },
  {
    id: 4,
    title: "Celestial Bloom",
    chapter: "Ch. 33",
    time: "1d ago",
    gradient: "linear-gradient(135deg, #800040, #FF8BCC)",
  },
  {
    id: 5,
    title: "Iron Dynasty",
    chapter: "Ch. 55",
    time: "1d ago",
    gradient: "linear-gradient(135deg, #202040, #8B8BCC)",
  },
];

const creatorComics: Comic[] = [
  {
    id: 9,
    title: "Void Walker",
    author: "CreatorArt",
    genre: "Action",
    likes: "3.1K",
    views: "22K",
    gradient: "linear-gradient(135deg, #2A0060, #7B5FF8)",
  },
  {
    id: 10,
    title: "Moon Goddess",
    author: "LunaInk",
    genre: "Fantasy",
    likes: "4.5K",
    views: "35K",
    gradient: "linear-gradient(135deg, #3D0050, #C96EFF)",
  },
  {
    id: 11,
    title: "Digital Phantom",
    author: "NetDraw",
    genre: "Sci-Fi",
    likes: "2.8K",
    views: "19K",
    gradient: "linear-gradient(135deg, #003040, #5BDFFF)",
  },
  {
    id: 12,
    title: "Scarlet Storm",
    author: "RedPen",
    genre: "Action",
    likes: "5.2K",
    views: "41K",
    gradient: "linear-gradient(135deg, #700020, #FF5577)",
  },
];

const recommendedComics: Comic[] = [
  {
    id: 13,
    title: "Phantom Code",
    author: "ByteArt",
    genre: "Sci-Fi",
    likes: "6.3K",
    views: "52K",
    gradient: "linear-gradient(135deg, #001840, #4B8BFF)",
  },
  {
    id: 14,
    title: "Wild Hearts",
    author: "SavanaInk",
    genre: "Romance",
    likes: "7.8K",
    views: "63K",
    gradient: "linear-gradient(135deg, #600030, #FF6BAA)",
  },
  {
    id: 15,
    title: "Dragon's Oath",
    author: "FlameArt",
    genre: "Fantasy",
    likes: "10.1K",
    views: "85K",
    gradient: "linear-gradient(135deg, #3A1000, #FF8B3B)",
  },
  {
    id: 16,
    title: "Silent City",
    author: "UrbanDraw",
    genre: "Drama",
    likes: "4.4K",
    views: "37K",
    gradient: "linear-gradient(135deg, #101030, #7B7BCC)",
  },
];

const popularThisWeek: Comic[] = [comics[2], comics[0], comics[5], comics[6]];
const mostPopular: Comic[] = [comics[2], comics[0], comics[5], comics[3]];
const trendingComics: Comic[] = [
  comics[0],
  comics[2],
  comics[4],
  comics[6],
  comics[1],
  comics[7],
  comics[3],
  comics[5],
];

// Top 10 data — pad to 10 by cycling through available items
const ALL_COMICS_PADDED: Comic[] = [...comics, ...comics.slice(0, 2)];
const TOP10_COMICS = ALL_COMICS_PADDED.slice(0, 10);

const GENRE_STYLES: Record<
  string,
  { background: string; boxShadow: string; activeBorder: string }
> = {
  All: {
    background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
    boxShadow:
      "0 0 16px rgba(106,90,224,0.45), 0 2px 12px rgba(106,90,224,0.3)",
    activeBorder: "2px solid rgba(159,139,255,0.5)",
  },
  Action: {
    background: "linear-gradient(135deg, #8B0000, #DC143C)",
    boxShadow: "0 2px 10px rgba(220,20,60,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Fantasy: {
    background: "linear-gradient(135deg, #003080, #4B8BFF)",
    boxShadow: "0 2px 10px rgba(75,139,255,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Romance: {
    background: "linear-gradient(135deg, #8B0057, #FF69B4)",
    boxShadow: "0 2px 10px rgba(255,105,180,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Horror: {
    background: "linear-gradient(135deg, #1a0000, #8B0000)",
    boxShadow: "0 2px 10px rgba(139,0,0,0.5)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Comedy: {
    background: "linear-gradient(135deg, #8B6000, #FFB800)",
    boxShadow: "0 2px 10px rgba(255,184,0,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Adventure: {
    background: "linear-gradient(135deg, #1B4332, #52B788)",
    boxShadow: "0 2px 10px rgba(82,183,136,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  "Sci-Fi": {
    background: "linear-gradient(135deg, #005080, #00CED1)",
    boxShadow: "0 2px 10px rgba(0,206,209,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Mystery: {
    background: "linear-gradient(135deg, #2E0854, #7B3FA0)",
    boxShadow: "0 2px 10px rgba(123,63,160,0.5)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
  Drama: {
    background: "linear-gradient(135deg, #4A0080, #9F8BFF)",
    boxShadow: "0 2px 10px rgba(159,139,255,0.4)",
    activeBorder: "2px solid rgba(255,255,255,0.4)",
  },
};

const GENRE_LIST = [
  "All",
  "Action",
  "Fantasy",
  "Romance",
  "Horror",
  "Comedy",
  "Adventure",
  "Sci-Fi",
  "Mystery",
  "Drama",
];

const PLACEHOLDER_HISTORY: ReadingHistoryItem[] = [
  {
    id: 1,
    title: "Shadow Chronicles",
    chapter: "Ch. 3",
    chapterNumber: 3,
    scrollPosition: 0,
    progress: 60,
    gradient: "linear-gradient(135deg, #4A0080, #9F8BFF)",
    type: "comic",
    isPlaceholder: true,
  },
  {
    id: 3,
    title: "Neon Nights",
    chapter: "Ch. 8",
    chapterNumber: 8,
    scrollPosition: 0,
    progress: 45,
    gradient: "linear-gradient(135deg, #003080, #8BB0FF)",
    type: "comic",
    isPlaceholder: true,
  },
  {
    id: 104,
    title: "Paper Cranes",
    chapter: "Ch. 2",
    chapterNumber: 2,
    scrollPosition: 0,
    progress: 80,
    gradient: "linear-gradient(135deg, #600030, #FF6BAA)",
    type: "novel",
    isPlaceholder: true,
  },
];

interface HomeProps {
  onReadComic: (comic: Comic) => void;
  onReadNovel: (novel: Novel) => void;
  onNavigate: (page: Page) => void;
  onReadFeatured: () => void;
  searchQuery: string;
  bookmarkedIds: Set<number>;
  onToggleBookmark: (id: number) => void;
  readingHistory: ReadingHistoryItem[];
  allNovels: Novel[];
  onContinueReading?: (item: ReadingHistoryItem) => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: "16px", marginBottom: "16px" }}>
      <h2
        style={{
          background: "linear-gradient(90deg, #6A5AE0, #9F8BFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          fontSize: "20px",
          fontWeight: 800,
          fontFamily: "'Sora', system-ui, sans-serif",
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
          display: "inline-block",
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

function EmptyState({ dataOcid }: { dataOcid: string }) {
  return (
    <p
      data-ocid={dataOcid}
      style={{
        color: "rgba(159, 139, 255, 0.6)",
        fontSize: "14px",
        textAlign: "center",
        padding: "24px 16px",
        fontFamily: "'Sora', system-ui, sans-serif",
      }}
    >
      No content found
    </p>
  );
}

// Lightweight scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("section-revealed");
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Rank badge colors
const RANK_COLORS: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};
const RANK_ANIM: Record<number, string> = {
  1: "rankGoldPulse 2s ease-in-out infinite",
  2: "rankSilverPulse 2.4s ease-in-out infinite",
  3: "rankBronzePulse 2.8s ease-in-out infinite",
};

function RankItem({
  rank,
  title,
  author,
  views,
  likes,
  gradient,
}: {
  rank: number;
  title: string;
  author: string;
  views: string;
  likes: string;
  gradient: string;
}) {
  const isTop3 = rank <= 3;
  const rankColor = RANK_COLORS[rank] || "rgba(255,255,255,0.5)";
  const anim = RANK_ANIM[rank];

  return (
    <div
      data-ocid={`home.top10.item.${rank}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 16px",
        borderBottom: "1px solid rgba(159,139,255,0.08)",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(159,139,255,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      {/* Rank number */}
      <div
        style={{
          width: "32px",
          flexShrink: 0,
          textAlign: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: isTop3 ? "22px" : "17px",
            fontWeight: 900,
            fontFamily: "'Sora', system-ui, sans-serif",
            color: rankColor,
            display: "inline-block",
            animation: anim,
            textShadow: isTop3
              ? `0 0 12px ${rankColor}88, 0 0 24px ${rankColor}44`
              : "none",
          }}
        >
          {rank}
        </span>
      </div>

      {/* Cover thumbnail */}
      <div
        style={{
          width: "48px",
          height: "64px",
          borderRadius: "6px",
          background: gradient,
          flexShrink: 0,
          border: isTop3
            ? `1px solid ${rankColor}55`
            : "1px solid rgba(255,255,255,0.1)",
          boxShadow: isTop3 ? `0 0 10px ${rankColor}33` : "none",
        }}
      />

      {/* Title + Author */}
      <div style={{ flex: 1, minWidth: 0 }}>
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
          {title}
        </p>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "11px",
            margin: "2px 0 0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {author}
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          flexShrink: 0,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <span
          style={{
            color: "var(--color-text-muted)",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "3px",
          }}
        >
          <svg
            width="10"
            height="10"
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
          {views}
        </span>
        <span
          style={{
            color: "var(--color-text-muted)",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "3px",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="#f87171"
            stroke="none"
            role="img"
            aria-label="likes"
          >
            <title>likes</title>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {likes}
        </span>
      </div>
    </div>
  );
}

export default function Home({
  onReadComic,
  onReadNovel,
  onNavigate,
  onReadFeatured,
  searchQuery,
  bookmarkedIds,
  onToggleBookmark,
  readingHistory,
  allNovels,
  onContinueReading,
}: HomeProps) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [top10Tab, setTop10Tab] = useState<"comics" | "novels">("comics");
  const q = searchQuery.toLowerCase().trim();

  const displayHistory =
    readingHistory.length === 0 ? PLACEHOLDER_HISTORY : readingHistory;

  const filteredComics = q
    ? comics.filter((c) => c.title.toLowerCase().includes(q))
    : trendingComics;
  const filteredUpdates = q
    ? latestUpdates.filter((u) => u.title.toLowerCase().includes(q))
    : latestUpdates;
  const filteredCreator = q
    ? creatorComics.filter((c) => c.title.toLowerCase().includes(q))
    : creatorComics;
  const filteredRecommended = q
    ? recommendedComics.filter((c) => c.title.toLowerCase().includes(q))
    : recommendedComics;

  // Genre Explorer: filter both comics and novels
  const genreFilteredComics =
    activeGenre === "All"
      ? comics
      : comics.filter((c) => c.genre === activeGenre);

  const genreFilteredNovels =
    activeGenre === "All"
      ? allNovels
      : allNovels.filter((n) => n.genre === activeGenre);

  // Top 10 novels list (pad to 10)
  const top10Novels = [...allNovels, ...allNovels, ...allNovels].slice(0, 10);

  // Refs for scroll reveal
  const refGenre = useScrollReveal();
  const refContinue = useScrollReveal();
  const refUpdates = useScrollReveal();
  const refTrending = useScrollReveal();
  const refPopularWeek = useScrollReveal();
  const refMostPopular = useScrollReveal();
  const refTop10 = useScrollReveal();
  const refRecommended = useScrollReveal();
  const refCreator = useScrollReveal();
  const refNovels = useScrollReveal();

  const comicGrid = (list: Comic[], ocidPrefix: string) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        padding: "0 16px",
      }}
      className="sm:grid-cols-4"
    >
      {list.map((comic, i) => (
        <ComicCard
          key={`${ocidPrefix}-${comic.id}`}
          comic={comic}
          index={i + 1}
          onClick={() => onReadComic(comic)}
          isBookmarked={bookmarkedIds.has(comic.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* ── Section 1: Featured Story ── */}
      <FeaturedCreator onReadNow={onReadFeatured} />

      {/* ── Section 2: Genre Explorer ── */}
      <section
        ref={refGenre}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Genre Explorer</SectionTitle>
        {/* Genre chips */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            padding: "0 16px 16px",
            scrollbarWidth: "none",
          }}
        >
          {GENRE_LIST.map((genre) => {
            const style = GENRE_STYLES[genre] || GENRE_STYLES.All;
            const isActive = activeGenre === genre;
            return (
              <button
                key={genre}
                type="button"
                data-ocid="genre.tab"
                onClick={() => setActiveGenre(genre)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  borderRadius: "999px",
                  border: isActive ? style.activeBorder : "2px solid #D0D0DC",
                  background: isActive ? style.background : "#E8E8EE",
                  color: isActive ? "white" : "#3A3A4A",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: isActive
                    ? style.boxShadow
                    : "0 1px 4px rgba(0,0,0,0.08)",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  opacity: 1,
                }}
              >
                {genre}
              </button>
            );
          })}
        </div>
        {/* Filtered grid: comics + novels combined */}
        {genreFilteredComics.length === 0 &&
        genreFilteredNovels.length === 0 ? (
          <EmptyState dataOcid="home.genre.empty_state" />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              padding: "0 16px",
            }}
            className="sm:grid-cols-4"
          >
            {genreFilteredComics.map((comic, i) => (
              <ComicCard
                key={`genre-comic-${comic.id}`}
                comic={comic}
                index={i + 1}
                onClick={() => onReadComic(comic)}
                isBookmarked={bookmarkedIds.has(comic.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
            {genreFilteredNovels.map((novel, i) => (
              <NovelCard
                key={`genre-novel-${novel.id}`}
                novel={novel}
                index={genreFilteredComics.length + i + 1}
                onClick={() => onReadNovel(novel)}
                isBookmarked={bookmarkedIds.has(novel.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Section 3: Continue Reading ── */}
      <section
        ref={refContinue}
        data-ocid="home.continue_reading.section"
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Continue Reading</SectionTitle>
        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            padding: "0 16px 8px",
            scrollbarWidth: "none",
          }}
        >
          {displayHistory.map((item, i) => {
            const isPlaceholder = readingHistory.length === 0;
            const Tag = isPlaceholder ? "div" : "button";
            return (
              <Tag
                key={`${item.type}-${item.id}`}
                data-ocid={`home.continue_reading.item.${i + 1}`}
                {...(!isPlaceholder && {
                  type: "button" as const,
                  onClick: () => onContinueReading?.(item),
                })}
                style={{
                  flexShrink: 0,
                  width: "140px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  cursor: isPlaceholder ? "default" : "pointer",
                  textAlign: "left" as const,
                  padding: 0,
                  opacity: isPlaceholder ? 0.6 : 1,
                  pointerEvents: isPlaceholder
                    ? ("none" as const)
                    : ("auto" as const),
                }}
              >
                {/* Cover */}
                <div
                  style={{
                    background: item.gradient,
                    height: "100px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: "10px",
                      fontWeight: 700,
                      textAlign: "center",
                      padding: "0 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      fontFamily: "'Sora', system-ui, sans-serif",
                    }}
                  >
                    {item.title}
                  </span>
                  {/* Type badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "6px",
                      left: "6px",
                      background:
                        item.type === "novel"
                          ? "rgba(255, 200, 100, 0.8)"
                          : "rgba(106, 90, 224, 0.8)",
                      color: "white",
                      fontSize: "9px",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.type === "novel" ? "Novel" : "Comic"}
                  </span>
                </div>
                {/* Info */}
                <div style={{ padding: "8px 10px 10px" }}>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "12px",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </p>
                  {/* Progress bar */}
                  <div
                    style={{
                      marginTop: "6px",
                      height: "3px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${item.progress}%`,
                        borderRadius: "999px",
                        background: "linear-gradient(90deg, #6A5AE0, #9F8BFF)",
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "10px",
                      margin: "5px 0 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.chapter} • {item.progress}% completed
                  </p>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* ── Section 4: Recently Updated Chapters ── */}
      <section
        ref={refUpdates}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Recently Updated Chapters</SectionTitle>
        {filteredUpdates.length === 0 ? (
          <EmptyState dataOcid="home.updates.empty_state" />
        ) : (
          <div
            style={{
              padding: "0 16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filteredUpdates.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onReadComic(
                    comics.find((c) => c.title === item.title) || comics[0],
                  )
                }
                data-ocid={`updates.item.${i + 1}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "var(--color-surface)",
                  borderRadius: "12px",
                  padding: "12px",
                  cursor: "pointer",
                  border: "1px solid var(--color-border)",
                  transition: "background 0.2s",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--color-surface)";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "64px",
                    borderRadius: "8px",
                    background: item.gradient,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "14px",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "12px",
                      margin: "3px 0 0",
                    }}
                  >
                    {item.chapter} • {item.time}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 5: Trending Now ── */}
      <section
        ref={refTrending}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Trending Now</SectionTitle>
        {filteredComics.length === 0 ? (
          <EmptyState dataOcid="home.trending.empty_state" />
        ) : (
          comicGrid(filteredComics, "trending")
        )}
      </section>

      {/* ── Section 6: Popular This Week ── */}
      <section
        ref={refPopularWeek}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Popular This Week</SectionTitle>
        {comicGrid(popularThisWeek, "ptw")}
      </section>

      {/* ── Section 7: Most Popular ── */}
      <section
        ref={refMostPopular}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Most Popular</SectionTitle>
        {comicGrid(mostPopular, "mp")}
      </section>

      {/* ── Section 8: Top 10 Ranking ── */}
      <section
        ref={refTop10}
        data-ocid="home.top10.section"
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Top 10 Ranking</SectionTitle>
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: "0",
            padding: "0 16px 0",
            marginBottom: "0",
          }}
        >
          {(["comics", "novels"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`home.top10.${tab}.tab`}
              onClick={() => setTop10Tab(tab)}
              style={{
                flex: 1,
                padding: "10px 0",
                background:
                  top10Tab === tab
                    ? "rgba(106, 90, 224, 0.15)"
                    : "rgba(255,255,255,0.03)",
                border: "none",
                borderBottom:
                  top10Tab === tab
                    ? "2px solid #9F8BFF"
                    : "2px solid rgba(255,255,255,0.08)",
                color: top10Tab === tab ? "white" : "var(--color-text-muted)",
                fontWeight: top10Tab === tab ? 700 : 500,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
                textTransform: "capitalize",
                transition: "all 0.2s",
                backdropFilter: "blur(8px)",
              }}
            >
              {tab === "comics" ? "Comics" : "Novels"}
            </button>
          ))}
        </div>

        {/* Ranking list */}
        <div
          style={{
            background: "var(--color-surface)",
            margin: "0 16px",
            borderRadius: "0 0 12px 12px",
            border: "1px solid var(--color-border)",
            borderTop: "none",
            overflow: "hidden",
          }}
        >
          {top10Tab === "comics"
            ? TOP10_COMICS.map((comic, i) => (
                <RankItem
                  key={`rank-comic-${comic.id}-${i}`}
                  rank={i + 1}
                  title={comic.title}
                  author={comic.author}
                  views={comic.views}
                  likes={comic.likes}
                  gradient={comic.gradient}
                />
              ))
            : top10Novels.map((novel, i) => (
                <RankItem
                  key={`rank-novel-${novel.id}-${i}`}
                  rank={i + 1}
                  title={novel.title}
                  author={novel.author}
                  views={novel.views}
                  likes={novel.likes}
                  gradient={novel.gradient}
                />
              ))}
        </div>
      </section>

      {/* ── Section 9: Recommended For You ── */}
      <section
        ref={refRecommended}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Recommended For You</SectionTitle>
        {filteredRecommended.length === 0 ? (
          <EmptyState dataOcid="home.recommended.empty_state" />
        ) : (
          comicGrid(filteredRecommended, "rec")
        )}
      </section>

      {/* ── Section 10: Creator Spotlight ── */}
      <section
        ref={refCreator}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingRight: "16px",
          }}
        >
          <SectionTitle>Creator Spotlight</SectionTitle>
          <button
            type="button"
            onClick={() => onNavigate("upload")}
            style={{
              background: "none",
              border: "1px solid rgba(159, 139, 255, 0.3)",
              color: "var(--color-primary-light)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "6px 14px",
              borderRadius: "999px",
              fontFamily: "inherit",
              transition: "all 0.2s",
              marginTop: "2px",
            }}
          >
            Upload +
          </button>
        </div>
        {filteredCreator.length === 0 ? (
          <EmptyState dataOcid="home.creator.empty_state" />
        ) : (
          comicGrid(filteredCreator, "creator")
        )}
      </section>

      {/* ── Section 11: Original Novels ── */}
      <section
        ref={refNovels}
        className="scroll-section"
        style={{ marginTop: "40px" }}
      >
        <SectionTitle>Original Novels</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            padding: "0 16px",
          }}
          className="sm:grid-cols-4"
        >
          {allNovels.map((novel, i) => (
            <NovelCard
              key={novel.id}
              novel={novel}
              index={i + 1}
              onClick={() => onReadNovel(novel)}
              isBookmarked={bookmarkedIds.has(novel.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
