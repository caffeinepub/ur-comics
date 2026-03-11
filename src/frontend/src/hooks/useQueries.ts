// UI Demo -- no backend queries needed. Placeholder exports for compatibility.
export function useAllComics() {
  return { data: [], isLoading: false, error: null };
}

export function useAllGenres() {
  return {
    data: [
      "All",
      "Action",
      "Romance",
      "Drama",
      "Fantasy",
      "Comedy",
      "Sci-Fi",
      "Horror",
    ],
    isLoading: false,
    error: null,
  };
}

export function useComicById(_id: number) {
  return { data: null, isLoading: false, error: null };
}
