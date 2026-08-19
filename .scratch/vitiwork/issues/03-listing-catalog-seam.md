# 03 — Listing catalog seam

Type: grilling
Status: resolved
Blocked by: none

## Question

Where do search, filter, and Listing lookup live so pages do not own those rules? What is the first adapter, and what comes next?

## Answer

`ListingCatalog.search({ query, town, category, type }) → Listing[]`. Also `getById` for the Listing detail path.

Adapters: InMemory first, then Prisma. One adapter is a hypothetical seam; two adapters make ListingCatalog a real seam. TDD tests only the interface, not page internals.
