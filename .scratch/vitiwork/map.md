# VitiWork wayfinder

**Status:** resolved-decisions; spec published

## Destination

A published VitiWork spec plus a ticketed path so a Fijian Seeker can find a Listing and Express Interest on WhatsApp.

## Notes

- Domain glossary lives in `CONTEXT.md`. Use Seeker, Employer, Listing, Express Interest, Application, Free First Post, Standard, Featured, Verification, Town, Category.
- Skills every session should consult: `wayfinder`, `research`, `domain-modeling`, `to-spec`, `to-tickets`, `tdd`.
- Tracker is local markdown under `.scratch/vitiwork/` (`docs/agents/issue-tracker.md`). `gh` is read-only.
- [SynapseX-vault](https://github.com/F1J197/SynapseX-vault) is read-only. Copy into `docs/product/`; never edit the vault.
- Published spec: [spec.md](./spec.md) (`Status: ready-for-agent`). Implementation tickets are `10`–`17` under `issues/`.

## Decisions so far

- [Where issues live](./issues/01-where-issues-live.md) — local markdown under `.scratch/` because `gh` is read-only.
- [Express Interest vs Application](./issues/02-express-interest-vs-application.md) — two intents; Express Interest (WhatsApp, no account) is the default; Application is the optional profile path.
- [Listing catalog seam](./issues/03-listing-catalog-seam.md) — `ListingCatalog.search({query,town,category,type}) → Listing[]`; adapters InMemory then Prisma.
- [New UI prototype](./issues/04-new-ui-prototype.md) — no new prototype; pointer is `docs/product/prototype/vitiwork-brand.md` plus vitiwork-landing.
- [MyJobsFiji facts](./issues/05-myjobsfiji-facts.md) — FJD 100 / 28 days, account to apply, Fiji residents with right to work, since 2018, 80k+ candidates.
- [eJobsFiji facts](./issues/06-ejobsfiji-facts.md) — 2022 Android-first local board; a real competitor.
- [HRmonise facts](./issues/07-hrmonise-facts.md) — corporate HCM, not a consumer Seek.
- [Vault notes](./issues/08-vault-notes.md) — product copies live under `docs/product/`; audience widened to all Seekers (override vault casual-only).
- [Repo retirement](./issues/09-repo-retirement.md) — wizard later; archive fiji-jobs then vitiwork-landing only after copies on `main`; never the vault.

## Not yet specified

- How payments for Standard and Featured actually settle (provider, prepaid vs invoice, failed charge).
- WhatsApp Business API vs `wa.me` deep-link for production Express Interest.
- Facebook login details (app review, which fields, fallback when Facebook is down).
- M-PAiSA / MyCash as an Employer payment rail.
- Living-in-Fiji content (guides, visa, cost of living) on or off the Seeker path.

## Out of scope

- VitiBiz — a later vertical, not this destination.
- VitiRent — a later vertical, not this destination.
- VitiLearn — a later vertical, not this destination.
- Eco-resort work — not a VitiWork Listing or Employer path.
- Editing SynapseX-vault — read-only; copies only.
