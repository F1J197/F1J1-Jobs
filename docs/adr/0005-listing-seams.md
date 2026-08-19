# ListingCatalog, ExpressInterest, and ListingPost are the test seams

Pages must not own search rules, `wa.me` encoding, or Free First Post / expiry. Callers and tests cross three deep modules:

- **ListingCatalog** — `search({ query, town, category, type }) → Listing[]`. Adapters: InMemory, then Prisma.
- **ExpressInterest** — `open({ listing, seekerName? }) → WhatsAppUrl`.
- **ListingPost** — `publish({ employer, draft }) → Listing`.

One adapter is a hypothetical seam. Two adapters make ListingCatalog a real seam. TDD tests only these interfaces, not page internals.
