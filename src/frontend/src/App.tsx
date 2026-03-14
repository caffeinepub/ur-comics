import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AdminFAQ from "./pages/AdminFAQ";
import Bookmarks from "./pages/Bookmarks";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import NovelDetail from "./pages/NovelDetail";
import NovelReader from "./pages/NovelReader";
import Reader from "./pages/Reader";
import Upload from "./pages/Upload";
import type { Comic, Novel, Page, ReadingHistoryItem } from "./types";

const BLACK_CIRCLE_COMIC: Comic = {
  id: 99,
  title: "BLACK CIRCLE",
  author: "UR Comics Creator",
  genre: "Action / Slice of Life",
  likes: "0",
  views: "0",
  gradient: "linear-gradient(160deg, #0d0020 0%, #2a0060 50%, #6A5AE0 100%)",
};

const ALL_COMICS: Comic[] = [
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

export const ALL_NOVELS: Novel[] = [
  {
    id: 101,
    title: "Whispers of Eternity",
    author: "Luna Write",
    genre: "Fantasy",
    description:
      "A young mage discovers an ancient prophecy written in a language only she can read, setting her on a journey across fractured kingdoms to prevent the return of a god long thought dead.",
    likes: "5.2K",
    views: "43K",
    gradient: "linear-gradient(135deg, #3D0050, #C96EFF)",
    chapters: [
      {
        id: 1,
        title: "The Unmarked Scroll",
        content: "The library was silent at the hour of the wolf...",
      },
      {
        id: 2,
        title: "Fractured Kingdoms",
        content: "Three days ride from the capital...",
      },
      {
        id: 3,
        title: "The God's Name",
        content: "She spoke the name only once...",
      },
    ],
  },
  {
    id: 102,
    title: "Iron & Ink",
    author: "Marcus Vane",
    genre: "Action",
    description:
      "An ex-soldier turned underground cartoonist documents the truth about a corrupt city one panel at a time — until his art starts getting people killed.",
    likes: "7.8K",
    views: "61K",
    gradient: "linear-gradient(135deg, #700020, #FF5577)",
    chapters: [
      {
        id: 1,
        title: "The First Panel",
        content: "They burned the print shop on a Tuesday...",
      },
      {
        id: 2,
        title: "Red Ink",
        content: "The envelope arrived without a return address...",
      },
      {
        id: 3,
        title: "The Last Page",
        content: "He drew the final panel by candlelight...",
      },
    ],
  },
  {
    id: 103,
    title: "Starlight Protocol",
    author: "Cipher Nova",
    genre: "Sci-Fi",
    description:
      "In a future where memories are stored in clouds, a data archaeologist uncovers a memory that shouldn't exist — and the corporation that erased it will do anything to keep it buried.",
    likes: "9.1K",
    views: "78K",
    gradient: "linear-gradient(135deg, #003080, #5BDFFF)",
    chapters: [
      {
        id: 1,
        title: "Ghost Data",
        content: "Memory 77-Theta had no owner...",
      },
      {
        id: 2,
        title: "The Erased",
        content: "Mira pulled the memory thread...",
      },
      {
        id: 3,
        title: "Upload Complete",
        content: "She jacked in for the last time...",
      },
    ],
  },
  {
    id: 104,
    title: "Paper Cranes",
    author: "Hana Mori",
    genre: "Romance",
    description:
      "Two strangers exchange handwritten letters placed inside library books, never knowing each other's names — until the day the library announces its permanent closure.",
    likes: "11.3K",
    views: "94K",
    gradient: "linear-gradient(135deg, #600030, #FF6BAA)",
    chapters: [
      {
        id: 1,
        title: "The First Letter",
        content: "She found the note tucked inside Chapter Four...",
      },
      {
        id: 2,
        title: "Dog-eared Pages",
        content: "He left the reply folded into a paper crane...",
      },
      {
        id: 3,
        title: "Last Day",
        content: "The closing notice was taped to the front door...",
      },
    ],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [selectedNovelChapter, setSelectedNovelChapter] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  // initialChapter/scrollPosition used when navigating to reader from Continue Reading
  const initialChapterRef = useRef(1);
  const initialScrollRef = useRef(0);

  // Load reading history from localStorage on mount
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(
    () => {
      try {
        const stored = localStorage.getItem("ur_comics_reading_history");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    },
  );

  // Persist history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "ur_comics_reading_history",
        JSON.stringify(readingHistory),
      );
    } catch {
      // Storage unavailable
    }
  }, [readingHistory]);

  const addToHistory = useCallback((item: ReadingHistoryItem) => {
    setReadingHistory((prev) => {
      const filtered = prev.filter(
        (h) => !(h.id === item.id && h.type === item.type),
      );
      return [item, ...filtered].slice(0, 10);
    });
  }, []);

  // Update progress for an existing history item (called continuously from readers)
  const updateProgress = useCallback(
    (
      id: number,
      type: "comic" | "novel",
      chapterNumber: number,
      scrollPosition: number,
      progressPercentage: number,
    ) => {
      setReadingHistory((prev) =>
        prev.map((h) =>
          h.id === id && h.type === type
            ? {
                ...h,
                chapter: `Ch. ${chapterNumber}`,
                chapterNumber,
                scrollPosition,
                progress: progressPercentage,
              }
            : h,
        ),
      );
    },
    [],
  );

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const navigate = (page: Page, comic?: Comic) => {
    if (comic) setSelectedComic(comic);
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) setSearchQuery("");
  };

  const handleReadComic = (comic: Comic) => {
    // Check for existing progress
    const existing = readingHistory.find(
      (h) => h.id === comic.id && h.type === "comic",
    );
    if (!existing) {
      addToHistory({
        id: comic.id,
        title: comic.title,
        chapter: "Ch. 1",
        chapterNumber: 1,
        scrollPosition: 0,
        progress: 0,
        gradient: comic.gradient,
        type: "comic",
      });
    }
    initialChapterRef.current = existing?.chapterNumber ?? 1;
    initialScrollRef.current = existing?.scrollPosition ?? 0;
    navigate("reader", comic);
  };

  // Handle Continue Reading click — open at exact chapter and scroll position
  const handleContinueReading = useCallback((item: ReadingHistoryItem) => {
    if (item.type === "comic") {
      const comic = ALL_COMICS.find((c) => c.id === item.id) ?? ALL_COMICS[0];
      initialChapterRef.current = item.chapterNumber;
      initialScrollRef.current = item.scrollPosition;
      setSelectedComic(comic);
      setCurrentPage("reader");
      window.scrollTo({ top: 0 });
    } else {
      const novel = ALL_NOVELS.find((n) => n.id === item.id);
      if (!novel) return;
      setSelectedNovel(novel);
      // Find the chapter by number (index)
      const chapterIdx = Math.max(0, item.chapterNumber - 1);
      const chapterId =
        novel.chapters[chapterIdx]?.id ?? novel.chapters[0]?.id ?? 1;
      initialScrollRef.current = item.scrollPosition;
      setSelectedNovelChapter(chapterId);
      setCurrentPage("novel_reader");
      window.scrollTo({ top: 0 });
    }
  }, []);

  const handleReadNovel = (novel: Novel) => {
    const existing = readingHistory.find(
      (h) => h.id === novel.id && h.type === "novel",
    );
    if (!existing) {
      addToHistory({
        id: novel.id,
        title: novel.title,
        chapter: "Ch. 1",
        chapterNumber: 1,
        scrollPosition: 0,
        progress: 0,
        gradient: novel.gradient,
        type: "novel",
      });
    }
    setSelectedNovel(novel);
    setCurrentPage("novel_detail");
    window.scrollTo({ top: 0 });
  };

  const handleReadNovelChapter = (chapterId: number) => {
    initialScrollRef.current = 0;
    setSelectedNovelChapter(chapterId);
    setCurrentPage("novel_reader");
    window.scrollTo({ top: 0 });
  };

  const handleNovelPrev = () => {
    if (!selectedNovel) return;
    const idx = selectedNovel.chapters.findIndex(
      (c) => c.id === selectedNovelChapter,
    );
    if (idx > 0) {
      setSelectedNovelChapter(selectedNovel.chapters[idx - 1].id);
      window.scrollTo({ top: 0 });
    }
  };

  const handleNovelNext = () => {
    if (!selectedNovel) return;
    const idx = selectedNovel.chapters.findIndex(
      (c) => c.id === selectedNovelChapter,
    );
    if (idx < selectedNovel.chapters.length - 1) {
      setSelectedNovelChapter(selectedNovel.chapters[idx + 1].id);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Header
        onMenuOpen={() => setSidebarOpen(true)}
        onLogoClick={() => navigate("home")}
        searchOpen={searchOpen}
        onSearchToggle={handleSearchToggle}
        onSearchChange={setSearchQuery}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={navigate}
      />
      <main className="pt-14">
        {currentPage === "home" && (
          <div className="page-enter">
            <Home
              onReadComic={handleReadComic}
              onReadNovel={handleReadNovel}
              onNavigate={navigate}
              onReadFeatured={() => navigate("reader", BLACK_CIRCLE_COMIC)}
              searchQuery={searchQuery}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
              readingHistory={readingHistory}
              allNovels={ALL_NOVELS}
              onContinueReading={handleContinueReading}
            />
          </div>
        )}
        {currentPage === "reader" && (
          <div className="page-enter">
            <Reader
              comic={selectedComic}
              onBack={() => navigate("home")}
              isBookmarked={
                selectedComic ? bookmarkedIds.has(selectedComic.id) : false
              }
              onToggleBookmark={
                selectedComic
                  ? () => toggleBookmark(selectedComic.id)
                  : undefined
              }
              initialChapter={initialChapterRef.current}
              initialScrollPosition={initialScrollRef.current}
              onUpdateProgress={(ch, scroll, pct) => {
                if (selectedComic)
                  updateProgress(selectedComic.id, "comic", ch, scroll, pct);
              }}
            />
          </div>
        )}
        {currentPage === "upload" && (
          <div className="page-enter">
            <Upload onBack={() => navigate("home")} />
          </div>
        )}
        {currentPage === "novel_detail" && (
          <div className="page-enter">
            <NovelDetail
              novel={selectedNovel}
              onBack={() => setCurrentPage("home")}
              onReadChapter={handleReadNovelChapter}
            />
          </div>
        )}
        {currentPage === "novel_reader" && (
          <div className="page-enter">
            <NovelReader
              novel={selectedNovel}
              chapterIndex={selectedNovelChapter}
              onBack={() => setCurrentPage("novel_detail")}
              onPrev={handleNovelPrev}
              onNext={handleNovelNext}
              initialScrollPosition={initialScrollRef.current}
              onUpdateProgress={(ch, scroll, pct) => {
                if (selectedNovel)
                  updateProgress(selectedNovel.id, "novel", ch, scroll, pct);
              }}
            />
          </div>
        )}
        {currentPage === "bookmarks" && (
          <div className="page-enter">
            <Bookmarks
              allComics={ALL_COMICS}
              allNovels={ALL_NOVELS}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
              onReadComic={handleReadComic}
              onReadNovel={handleReadNovel}
              onBack={() => navigate("home")}
            />
          </div>
        )}
        {currentPage === "faq" && (
          <div className="page-enter">
            <FAQ onBack={() => navigate("home")} onNavigate={navigate} />
          </div>
        )}
        {currentPage === "admin" && (
          <div className="page-enter">
            <AdminFAQ onNavigate={navigate} />
          </div>
        )}
      </main>
    </div>
  );
}
