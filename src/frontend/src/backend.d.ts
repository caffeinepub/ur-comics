import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface backendInterface {
    getAllComics(): Promise<Array<Comic>>;
    getAllGenres(): Promise<Array<string>>;
    getComicById(id: bigint): Promise<Comic | null>;
    getComicsByGenre(genre: string): Promise<Array<Comic>>;
}
