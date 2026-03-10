export interface Comic {
  id: bigint;
  title: string;
  episodes: bigint;
  description: string;
  author: string;
  likes: bigint;
  coverImage: string;
  genre: string;
}

export const SAMPLE_COMICS: Comic[] = [
  {
    id: 1n,
    title: "Stellar Void",
    author: "Aria Kwan",
    genre: "Sci-Fi",
    episodes: 48n,
    likes: 12400n,
    coverImage: "",
    description:
      "A lone astronaut drifts through a collapsing universe, seeking the last habitable world.",
  },
  {
    id: 2n,
    title: "Shadow Bloom",
    author: "Jeon Minho",
    genre: "Fantasy",
    episodes: 32n,
    likes: 9800n,
    coverImage: "",
    description:
      "An ancient spirit reawakens in a modern city, bound to a teenage girl with a dark destiny.",
  },
  {
    id: 3n,
    title: "Neon Circuit",
    author: "Lena Park",
    genre: "Action",
    episodes: 61n,
    likes: 21000n,
    coverImage: "",
    description:
      "Hackers battle mega-corporations in a cyberpunk dystopia where data is the ultimate weapon.",
  },
  {
    id: 4n,
    title: "Crimson Petal",
    author: "Yuki Sato",
    genre: "Romance",
    episodes: 25n,
    likes: 7300n,
    coverImage: "",
    description:
      "Two rival florists discover love growing between them one impossible arrangement at a time.",
  },
  {
    id: 5n,
    title: "Iron Hymn",
    author: "Dev Rajan",
    genre: "Action",
    episodes: 54n,
    likes: 18700n,
    coverImage: "",
    description:
      "A disgraced knight armed with forbidden runes wages a one-man war against a corrupt empire.",
  },
  {
    id: 6n,
    title: "Pale Mirror",
    author: "Chloe Xu",
    genre: "Horror",
    episodes: 19n,
    likes: 5100n,
    coverImage: "",
    description:
      "Every reflection shows a world where you made the worst possible choice — and it is coming for you.",
  },
  {
    id: 7n,
    title: "Orbit & Ash",
    author: "Finn O'Brien",
    genre: "Sci-Fi",
    episodes: 37n,
    likes: 14200n,
    coverImage: "",
    description:
      "Two rival space salvagers discover a derelict ship carrying the secret that ended the last civilization.",
  },
  {
    id: 8n,
    title: "Lotus War",
    author: "Mei Tanaka",
    genre: "Fantasy",
    episodes: 70n,
    likes: 30500n,
    coverImage: "",
    description:
      "In a war between gods, one mortal girl holds the power to tip the balance — or destroy everything.",
  },
];

export const SAMPLE_GENRES = [
  "All",
  "Sci-Fi",
  "Fantasy",
  "Action",
  "Romance",
  "Horror",
];

export const genreGradients: Record<string, string> = {
  "Sci-Fi": "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  Fantasy: "linear-gradient(135deg, #4a0e8f, #7b2d8b, #c2185b)",
  Action: "linear-gradient(135deg, #b71c1c, #e53935, #ff7043)",
  Romance: "linear-gradient(135deg, #880e4f, #e91e63, #f48fb1)",
  Horror: "linear-gradient(135deg, #1b1b1b, #311b92, #4a148c)",
  default: "linear-gradient(135deg, #6A5AE0, #8B7CFF)",
};

export function getGenreGradient(genre: string): string {
  return genreGradients[genre] ?? genreGradients.default;
}

export function formatLikes(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}
