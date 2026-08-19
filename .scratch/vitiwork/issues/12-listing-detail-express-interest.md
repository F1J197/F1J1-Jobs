# 12 — Listing detail + Express Interest

**What to build:** A Seeker opens a Listing and Expresses Interest on WhatsApp with no account. Detail loads through ListingCatalog.getById. The WhatsApp URL is produced only by ExpressInterest.open.

**Blocked by:** 11 — ListingCatalog InMemory + honest search UI

**Status:** resolved

- [x] Opening a Listing shows title, Employer, Town, Category, type, pay, description, and expiry
- [x] A missing or expired id is a clean not-found, not a blank live Listing
- [x] Express Interest is the primary action and does not require a session
- [x] `ExpressInterest.open({ listing, seekerName? })` returns a WhatsAppUrl; the page does not build `wa.me` itself
- [x] The pre-filled message names the Listing so the Employer knows what the Seeker is writing about
- [x] Application is not the default control; if shown, it is clearly the optional profile path
- [x] Tests cover ExpressInterest.open only through that seam (URL targets the Employer and names the Listing; no session required)
