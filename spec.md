# UR Comics

## Current State
- Homepage has: FeaturedCreator banner, Recently Updated Chapters, Popular This Week, Trending Now, Most Popular, Genre Explorer, Recommended For You, Creator Spotlight, Original Novels
- ComicCard has bookmark toggle, NovelCard does NOT have bookmark support
- Bookmarks page shows only comics, no novels, no filter tabs
- App.tsx tracks bookmarkedIds as Set<number> for comics only
- No "Continue Reading" or "Top 10 Ranking" sections exist
- Reading history is not tracked

## Requested Changes (Diff)

### Add
- **Continue Reading section** (position 2 on homepage): tracks items opened during the current session using React state in App.tsx. Stores `{ id, title, chapter, progress, gradient, type }`. Shows placeholder cards if history is empty. Each card shows cover, title, chapter number, and a progress bar with label e.g. "Chapter 3 • 60% completed".
- **Top 10 Ranking section** (position 7): tab system with "Comics" and "Novels" tabs. Each item shows rank number (1-10), cover image, title, author, views, likes. Top 3 positions get animated gold/silver/bronze badge. All 10 items shown for both comics and novels.
- **Bookmark support on NovelCard**: add bookmark icon (top-right of cover) that calls onToggleBookmark. Accept isBookmarked and onToggleBookmark props.
- **Bookmarks page upgrades**: accept allNovels prop, show both comics and novels together. Add filter tabs: "All", "Comics", "Novels". Empty state updated.
- **Reading history tracking in App.tsx**: `readingHistory` state, `addToHistory(item)` called when any comic or novel is opened.

### Modify
- **Home.tsx**: Reorganize sections in exact order: 1. FeaturedCreator, 2. Continue Reading, 3. Recently Updated Chapters, 4. Trending Now, 5. Popular This Week, 6. Most Popular, 7. Top 10 Ranking, 8. Genre Explorer, 9. Recommended For You, 10. Creator Spotlight, 11. Original Novels. Accept `readingHistory` and `onOpenItem` props.
- **Home props**: add `readingHistory`, `allNovels` for novels section to pass down.
- **NovelCard**: add `isBookmarked` and `onToggleBookmark` props.
- **App.tsx**: pass novels data to Bookmarks page; add readingHistory state and addToHistory; pass to Home; wire novel bookmark IDs into same bookmarkedIds Set (novels use ids 101+, comics 1-99, no collision).
- **SectionTitle**: upgrade to glowing style with text-shadow/glow effect on the title text.
- **Bookmarks page**: add filter tabs (All / Comics / Novels), show novel cards alongside comic cards.

### Remove
- Nothing removed; sections reordered only.

## Implementation Plan
1. Update types if needed (ReadingHistoryItem type).
2. Update App.tsx: add readingHistory state, addToHistory function, wire to onReadComic/onReadNovel, pass to Home and Bookmarks.
3. Update NovelCard: add isBookmarked, onToggleBookmark props and bookmark button.
4. Update Bookmarks page: accept allNovels, show combined list, add filter tabs.
5. Rewrite Home.tsx: implement all 12 sections in correct order, add ContinueReading section (placeholder cards + session tracking), add Top10Ranking section with tab switcher and animated badges for top 3, pass bookmark props to NovelCard, apply glowing SectionTitle style.
6. Validate and deploy.
