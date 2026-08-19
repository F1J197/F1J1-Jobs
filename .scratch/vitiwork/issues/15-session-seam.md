# 15 — Session seam (demo auth stays; NextAuth later via wizard)

**What to build:** Employer dashboard and the optional Application path go through a Session seam. Demo auth stays so an Employer can publish in this slice. NextAuth is not wired here; a later wizard introduces it.

**Blocked by:** 13 — ListingPost + Employer dashboard Free First Post

**Status:** resolved

- [x] Dashboard and optional Application ask Session who the actor is; they do not read a vendor-specific session object
- [x] Demo Employer and demo Seeker still sign in for dashboard and Application
- [x] Express Interest still works with no session
- [x] No NextAuth production wiring, Facebook app, or Google app in this ticket
- [x] A short note on the Session module records that NextAuth arrives via a later wizard
