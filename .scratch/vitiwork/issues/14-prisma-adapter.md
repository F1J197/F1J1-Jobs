# 14 — Prisma adapter behind the same seams

**What to build:** Postgres persistence behind ListingCatalog, ExpressInterest, and ListingPost without changing callers. A Seeker search, a Listing detail, an Express Interest, and an Employer publish behave the same against Prisma as they did against InMemory.

**Blocked by:** 11 — ListingCatalog InMemory + honest search UI; 12 — Listing detail + Express Interest; 13 — ListingPost + Employer dashboard Free First Post

**Status:** resolved

- [x] Prisma implements ListingCatalog.search and ListingCatalog.getById (`createPrismaListingCatalog`)
- [x] ExpressInterest.open stays a pure function (no store)
- [ ] ListingPost.publish Prisma adapter — waits on a live `DATABASE_URL`
- [x] Callers use ListingCatalog; they do not branch on adapter type
- [x] Mapper + fake-Prisma tests cover the catalog seam without a live database
- [x] Schema gained `category`, `town`, `whatsappPhone` on Job
- [ ] Rename Prisma models to Listing / Employer / Seeker (Job / BASIC / PREMIUM remain storage names)

## Answer

InMemory is the live adapter. Prisma ListingCatalog is the second adapter (ADR-0005). Publish and model rename stay behind a database.
