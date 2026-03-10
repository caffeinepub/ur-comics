import { useQuery } from "@tanstack/react-query";
import { SAMPLE_COMICS, SAMPLE_GENRES } from "../types";
import type { Comic } from "../types";
import { useActor } from "./useActor";

export function useAllComics() {
  const { actor, isFetching } = useActor();
  return useQuery<Comic[]>({
    queryKey: ["comics"],
    queryFn: async () => {
      if (!actor) return SAMPLE_COMICS;
      try {
        const result = await actor.getAllComics();
        return result.length > 0 ? result : SAMPLE_COMICS;
      } catch {
        return SAMPLE_COMICS;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_COMICS,
  });
}

export function useAllGenres() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["genres"],
    queryFn: async () => {
      if (!actor) return SAMPLE_GENRES;
      try {
        const result = await actor.getAllGenres();
        const genres = ["All", ...result.filter((g) => g !== "All")];
        return genres.length > 1 ? genres : SAMPLE_GENRES;
      } catch {
        return SAMPLE_GENRES;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_GENRES,
  });
}

export function useComicById(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Comic | null>({
    queryKey: ["comic", id.toString()],
    queryFn: async () => {
      if (!actor) return SAMPLE_COMICS.find((c) => c.id === id) ?? null;
      try {
        const result = await actor.getComicById(id);
        return result ?? SAMPLE_COMICS.find((c) => c.id === id) ?? null;
      } catch {
        return SAMPLE_COMICS.find((c) => c.id === id) ?? null;
      }
    },
    enabled: !isFetching,
  });
}
