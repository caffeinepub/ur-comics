export interface Comic {
  id: number;
  title: string;
  author: string;
  genre: string;
  likes: string;
  views: string;
  gradient: string;
  description?: string;
}

export interface NovelChapter {
  id: number;
  title: string;
  content: string;
}

export interface Novel {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  likes: string;
  views: string;
  gradient: string;
  chapters: NovelChapter[];
}

export interface ReadingHistoryItem {
  id: number;
  title: string;
  chapter: string;
  progress: number;
  gradient: string;
  type: "comic" | "novel";
}

export type Page =
  | "home"
  | "reader"
  | "upload"
  | "novel_detail"
  | "novel_reader"
  | "bookmarks";

// Legacy exports for useQueries compatibility
export const SAMPLE_COMICS: Comic[] = [
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
];

export const SAMPLE_GENRES = [
  "All",
  "Action",
  "Romance",
  "Drama",
  "Fantasy",
  "Comedy",
  "Sci-Fi",
  "Horror",
];
