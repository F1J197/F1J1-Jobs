# 13 — ListingPost + Employer dashboard Free First Post

**What to build:** An Employer publishes a Listing from a dashboard. The first publish is a Free First Post lasting seven days. Later publishes are Standard (thirty days) or Featured (thirty days, top of the feed). Duration and tier live in ListingPost, not in the form.

**Blocked by:** 11 — ListingCatalog InMemory + honest search UI

**Status:** resolved

- [x] `ListingPost.publish({ employer, draft })` returns a Listing with Town, Category, type, pay, expiry, and WhatsApp contact
- [x] An Employer’s first successful publish is Free First Post with a seven-day expiry
- [x] A second attempt to take Free First Post is refused; the Employer must choose Standard or Featured
- [x] Standard lasts thirty days; Featured lasts thirty days and is marked Featured
- [x] Dashboard lists the Employer’s Listings with remaining days and tier
- [x] Pages do not compute expiry or tier
- [x] Tests cover publish rules only through the ListingPost seam
