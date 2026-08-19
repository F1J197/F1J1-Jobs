# 11 — ListingCatalog InMemory + honest search UI

**What to build:** A Seeker can search live Listings by query, Town, Category, and type, and see an honest feed. Search rules live in ListingCatalog, not in the page. The first adapter is InMemory so the UI can ship without Postgres.

**Blocked by:** 10 — Repo of record + VitiWork README + copied docs

**Status:** resolved

- [x] `ListingCatalog.search({ query, town, category, type })` returns `Listing[]` and is the only place those filters are applied
- [x] `ListingCatalog.getById` exists on the same module (detail may land in the next ticket; the seam is here)
- [x] InMemory adapter holds enough Fiji Listings to exercise Town and Category
- [x] Expired Listings do not appear in search
- [x] Featured Listings sort first
- [x] Combined filters narrow the feed; an empty result is an honest empty state, not filler Listings
- [x] Search UI calls ListingCatalog; the page does not filter arrays itself
- [x] Tests cover search behaviour only through the ListingCatalog seam
