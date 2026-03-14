import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubmittedQuestion {
    id: bigint;
    status: string;
    question: string;
    name?: string;
    submittedAt: bigint;
    answer: string;
    email?: string;
}
export interface FaqItem {
    id: bigint;
    question: string;
    createdAt: bigint;
    answer: string;
    viewCount: bigint;
    approved: boolean;
    notHelpfulCount: bigint;
    category: string;
    helpfulCount: bigint;
}
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
    answerQuestion(password: string, questionId: bigint, answer: string): Promise<boolean>;
    approveQuestion(password: string, questionId: bigint, answer: string): Promise<boolean>;
    getAllApprovedFaqs(): Promise<Array<FaqItem>>;
    getAllComics(): Promise<Array<Comic>>;
    getAllGenres(): Promise<Array<string>>;
    getAllSubmittedQuestions(): Promise<Array<SubmittedQuestion>>;
    getComicById(id: bigint): Promise<Comic | null>;
    getComicsByGenre(genre: string): Promise<Array<Comic>>;
    getFaqsByCategory(category: string): Promise<Array<FaqItem>>;
    getPopularFaqs(): Promise<Array<FaqItem>>;
    recordFaqView(id: bigint): Promise<boolean>;
    rejectQuestion(password: string, questionId: bigint): Promise<boolean>;
    submitQuestion(name: string | null, email: string | null, question: string): Promise<bigint>;
    verifyAdminPassword(password: string): Promise<boolean>;
    voteHelpful(id: bigint, helpful: boolean): Promise<boolean>;
}
