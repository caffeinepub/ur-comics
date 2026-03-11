import ComicCard from "../components/ComicCard";
import FeaturedCreator from "../components/FeaturedCreator";
import Footer from "../components/Footer";
import GenreRow from "../components/GenreRow";
import HeroSlider from "../components/HeroSlider";
import type { Comic, Page } from "../types";

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
    genre: "Horror",
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

interface HomeProps {
  onReadComic: (comic: Comic) => void;
  onNavigate: (page: Page) => void;
  onReadFeatured: () => void;
  searchQuery: string;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: "16px", marginBottom: "16px" }}>
      <h2
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: 800,
          fontFamily: "'Sora', system-ui, sans-serif",
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
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
      No comics found
    </p>
  );
}

export default function Home({
  onReadComic,
  onNavigate,
  onReadFeatured,
  searchQuery,
}: HomeProps) {
  const q = searchQuery.toLowerCase().trim();

  const filteredComics = q
    ? comics.filter((c) => c.title.toLowerCase().includes(q))
    : comics;
  const filteredUpdates = q
    ? latestUpdates.filter((u) => u.title.toLowerCase().includes(q))
    : latestUpdates;
  const filteredCreator = q
    ? creatorComics.filter((c) => c.title.toLowerCase().includes(q))
    : creatorComics;
  const filteredRecommended = q
    ? recommendedComics.filter((c) => c.title.toLowerCase().includes(q))
    : recommendedComics;

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* 0. Featured Creator — always first */}
      <FeaturedCreator onReadNow={onReadFeatured} />

      {/* 1. Hero Slider — only when not searching */}
      {!q && (
        <section style={{ marginTop: "20px" }}>
          <HeroSlider onReadNow={onReadComic} />
        </section>
      )}

      {/* 2. Genre Row */}
      {!q && (
        <section style={{ marginTop: "24px" }}>
          <GenreRow />
        </section>
      )}

      {/* 3. Trending Comics */}
      <section style={{ marginTop: "40px" }}>
        <SectionTitle>Trending Comics</SectionTitle>
        {filteredComics.length === 0 ? (
          <EmptyState dataOcid="home.popular.empty_state" />
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
            {filteredComics.map((comic, i) => (
              <ComicCard
                key={comic.id}
                comic={comic}
                index={i + 1}
                onClick={() => onReadComic(comic)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Featured Creators */}
      <section style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingRight: "16px",
          }}
        >
          <SectionTitle>Featured Creators</SectionTitle>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              padding: "0 16px",
            }}
          >
            {filteredCreator.map((comic, i) => (
              <ComicCard
                key={comic.id}
                comic={comic}
                index={i + 1}
                onClick={() => onReadComic(comic)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Latest Uploaded Chapters */}
      <section style={{ marginTop: "40px" }}>
        <SectionTitle>Latest Uploaded Chapters</SectionTitle>
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
                    {item.chapter}
                  </p>
                </div>
                <span
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "12px",
                    flexShrink: 0,
                  }}
                >
                  {item.time}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 6. Recommended For You */}
      <section style={{ marginTop: "40px" }}>
        <SectionTitle>Recommended For You</SectionTitle>
        {filteredRecommended.length === 0 ? (
          <EmptyState dataOcid="home.recommended.empty_state" />
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
            {filteredRecommended.map((comic, i) => (
              <ComicCard
                key={comic.id}
                comic={comic}
                index={i + 1}
                onClick={() => onReadComic(comic)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
