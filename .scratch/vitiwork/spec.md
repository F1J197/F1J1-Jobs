# VitiWork — published spec

**Status:** ready-for-agent

Parent map: [VitiWork wayfinder](./map.md)

## Problem Statement

A person in Fiji looking for work has to fight desktop-table boards, account walls, and FJD 100 posts. MyJobsFiji charges FJD 100 for 28 days and requires an account to apply. Facebook groups are free but unstructured. eJobsFiji is a real Android-first local board; VitiWork does not win by pretending it does not exist. The current prototype in this repo still says FijiJobs, still treats Application as the default, and still lets pages own search and apply rules.

A Seeker in Fiji should find a Listing on a phone and Express Interest on WhatsApp without creating an account. An Employer in Fiji should publish a first Listing for free, then pay SME prices for Standard or Featured — not FJD 100.

## Solution

VitiWork is the job board for people in Fiji looking for work, and for Employers in Fiji who are hiring. Tagline: Find Work in Fiji. Brand is VitiWork; never ship as FijiJobs.

A Seeker browses Listings through ListingCatalog, opens a Listing, and Expresses Interest. That path encodes a WhatsApp URL and does not require a login. An Application through a VitiWork profile remains an optional second intent.

An Employer publishes through ListingPost. The first Listing is a Free First Post (seven days). Later Listings are Standard (FJD 15 / 30 days) or Featured (FJD 25 / 30 days, top of the feed). Verification is a manual Employer check at launch.

This repo (F1J1-Jobs) is the repo of record. Look and feel ports from vitiwork-landing; no new UI prototype. Pages do not own search rules, `wa.me` encoding, or Free First Post / expiry.

## User Stories

1. As a Seeker, I want to open VitiWork on a 360px Android phone, so that I can look for work on the device I already have.
2. As a Seeker, I want to see a feed of live Listings, so that I know what work is available in Fiji today.
3. As a Seeker, I want each Listing in the feed to show title, Employer, Town, Category, type, and pay, so that I can decide whether to open it.
4. As a Seeker, I want Featured Listings at the top of the feed, so that I see the Employers who paid to be seen first.
5. As a Seeker, I want expired Listings hidden from search, so that I do not Express Interest in work that is no longer open.
6. As a Seeker, I want to search Listings by a text query, so that I can find work that matches words I type.
7. As a Seeker, I want to filter Listings by Town, so that I only see work in places I can actually get to (Suva, Nadi, Lautoka, Labasa, and other Fiji Towns).
8. As a Seeker, I want to filter Listings by Category, so that I can stay in Hospitality, Retail, Construction, Agriculture, Drivers, Trades, Professional, or Government.
9. As a Seeker, I want to filter Listings by type, so that I can tell full-time from part-time, contract, or other types the catalog supports.
10. As a Seeker, I want query, Town, Category, and type to combine, so that one search narrows on every axis I set.
11. As a Seeker, I want an honest empty state when nothing matches, so that I am not shown fake or unrelated Listings.
12. As a Seeker, I want to open a Listing by id, so that I can read the full description, requirements, pay, Town, Category, type, and expiry.
13. As a Seeker, I want a missing Listing to fail cleanly, so that a bad or expired id does not look like a live job.
14. As a Seeker, I want to Express Interest without creating an account, so that I can contact the Employer in one tap.
15. As a Seeker, I want Express Interest to open WhatsApp to the Employer with a pre-filled message about that Listing, so that I do not have to type who I am writing about.
16. As a Seeker, I want the option to include my name on Express Interest, so that the Employer sees who is writing.
17. As a Seeker, I want Express Interest to stay a separate intent from Application, so that I am never forced through a cover-letter wall to say I am interested.
18. As a Seeker, I want to use VitiWork without email signup, so that WhatsApp remains my identity on the default path.
19. As a Seeker, I want the optional Application path available if I already have a profile, so that I can submit through VitiWork when I choose to.
20. As a Seeker, I want Application to require a profile and not replace Express Interest, so that the default path stays WhatsApp.
21. As a Seeker looking for hospitality work, I want Hospitality Listings, so that hotel and restaurant work is findable.
22. As a Seeker looking for shop work, I want Retail Listings, so that store work is findable.
23. As a Seeker looking for site work, I want Construction Listings, so that building work is findable.
24. As a Seeker looking for farm work, I want Agriculture Listings, so that field work is findable.
25. As a Seeker who drives, I want Drivers Listings, so that driving work is findable.
26. As a Seeker in a trade, I want Trades Listings, so that skilled trade work is findable.
27. As a Seeker in an office or licensed role, I want Professional Listings, so that VitiWork is not casual-only.
28. As a Seeker interested in public-sector work, I want Government Listings, so that those roles appear in the same catalog.
29. As a Seeker, I want the feed to stay usable on a slow connection, so that a lightweight page still loads on mobile data.
30. As a Seeker, I want the brand to say VitiWork and “Find Work in Fiji”, so that I am not sent to a site that collides with fijijobs.com.
31. As an Employer, I want to publish a Listing with Town, Category, type, pay, and a WhatsApp number, so that Seekers can find it and Express Interest.
32. As an Employer who has never posted, I want my first Listing to be a Free First Post lasting seven days, so that I can try VitiWork without paying FJD 100.
33. As an Employer who has already used Free First Post, I want the next Listing to be Standard (FJD 15 / 30 days) or Featured (FJD 25 / 30 days), so that pricing matches an SME, not MyJobsFiji.
34. As an Employer who chooses Featured, I want that Listing at the top of the feed for thirty days, so that I pay for placement I can see.
35. As an Employer, I want a Listing to expire automatically when its duration ends, so that I do not keep receiving Express Interest on closed work.
36. As an Employer, I want a dashboard of my Listings with remaining days and tier (Free First Post, Standard, Featured), so that I know what is live.
37. As an Employer, I want Verification as a manual check at launch, so that Seekers have some signal I am a real hiring actor.
38. As an Employer, I want inbound Express Interest on WhatsApp, so that I can reply on the app I already use.
39. As an Employer, I want optional Applications on a Listing without making them the only path, so that Seekers who have a profile can still submit one.
40. As an Employer, I want to edit a draft before publish, so that ListingPost only goes live when I confirm.
41. As an Employer, I want publish to reject a second Free First Post, so that the free tier is exactly one Listing per Employer.
42. As a Seeker, I want search and detail to use the same Listing shape, so that a card and a detail page do not disagree.
43. As a developer, I want pages to call ListingCatalog, ExpressInterest, and ListingPost instead of embedding those rules, so that tests and adapters stay honest.
44. As a developer, I want an InMemory ListingCatalog first, so that search UI can ship before Postgres is wired.
45. As a developer, I want a Prisma adapter behind the same ListingCatalog, ExpressInterest, and ListingPost seams, so that persistence does not change callers.
46. As a developer, I want demo session to stay for Employer dashboard work, so that NextAuth can wait for a later wizard.
47. As a developer, I want the home and brand to port from vitiwork-landing, so that teal/ink tokens and the WhatsApp applicant path match first-party HTML.
48. As a maintainer, I want this repo’s README to say VitiWork and point at the copied product docs, so that F1J1-Jobs is clearly the repo of record.
49. As a maintainer, I want a retirement wizard that archives fiji-jobs then vitiwork-landing only after copies are on `main`, so that nothing is retired before the record is here.
50. As a maintainer, I want the wizard to refuse to touch SynapseX-vault, so that the second brain stays read-only.

## Implementation Decisions

- **Repo of record.** This repository is the only working app. Brand, README, and product copies present as VitiWork. Sibling HTML in vitiwork-landing is a prototype primary source, not the production app.
- **Audience.** Seekers are all people in Fiji looking for work in any Category. The vault’s casual/gig-only audience is overridden here; the labelled vault copies stay as written.
- **Two contact intents.** Express Interest is the default (WhatsApp, no account). Application is the optional profile path. UI copy must not say “apply” for Express Interest.
- **ListingCatalog module.** Public interface: `search({ query, town, category, type }) → Listing[]` and `getById(id) → Listing | not-found`. A Listing carries Town, Category, type, pay, expiry, Employer contact, and whether it is Featured. Search returns only unexpired Listings. Featured Listings sort first. Adapters: InMemory, then Prisma. Callers never query a store for those rules.
- **ExpressInterest module.** Public interface: `open({ listing, seekerName? }) → WhatsAppUrl`. Encodes the `wa.me` URL and message. Pages do not build WhatsApp URLs. WhatsApp Business API is out of this spec; the first path is a deep link.
- **ListingPost module.** Public interface: `publish({ employer, draft }) → Listing`. First successful publish per Employer is Free First Post (seven-day expiry). Later publishes are Standard (thirty days) or Featured (thirty days, Featured flag). Duration and tier live in this module, not in a page form.
- **Verification module.** Manual Employer check at launch. Not KYC. A Listing may show that the Employer is verified; the check itself is a human process.
- **Session module.** Demo auth stays for Employer dashboard and optional Application. A later wizard introduces NextAuth. Session is a seam so dashboard work does not bake in a final auth vendor.
- **Brand / home module.** Port tagline, colour tokens, and WhatsApp-as-applicant-path language from vitiwork-landing. Do not iframe. Do not rebuild vault HTML v1–v4 unless a sharp look/feel question remains.
- **Category list.** Hospitality, Retail, Construction, Agriculture, Drivers, Trades, Professional, Government. Vault copy lists a shorter set; CONTEXT.md is the glossary in force.
- **Town list.** Fiji place names on a Listing (Suva, Nadi, Lautoka, Labasa, and others as data). Town is not a travel guide.
- **Persistence.** InMemory adapters ship first so UI can be honest. Prisma implements the same three seams later. Schema changes follow the Listing / Employer / Free First Post / Standard / Featured vocabulary, not the prototype’s Job / BASIC / PREMIUM names.
- **Retirement.** A wizard script is written now. A human runs it after labelled copies and the VitiWork README are on `main`. Order: archive fiji-jobs, then vitiwork-landing. Never the vault.

## Testing Decisions

A good test checks external behaviour through a public interface. It does not open page internals, recompute the module’s own rules, or assert on private helpers. Expected values come from this spec (durations, sort order, no-account Express Interest), not from copying the implementation.

**Only these three seams are tested.** No other module is an agreed test seam for this spec.

1. **ListingCatalog** — `search` and `getById`. Assert filter combination, Featured-first order, expiry hiding, and not-found. Run the same cases against InMemory and, once it exists, Prisma.
2. **ExpressInterest** — `open` returns a WhatsAppUrl for a Listing. Assert the URL targets the Employer’s number and names the Listing. Assert it does not require a session.
3. **ListingPost** — `publish` applies Free First Post (seven days) on the Employer’s first Listing, then Standard or Featured (thirty days). Assert a second Free First Post is refused. Assert Featured is marked for feed placement.

Prior art in this repo is mock data and UI, not seam tests. New tests start at these interfaces. Pages are exercised only as far as they call the seams; they are not a fourth seam.

## Out of Scope

- Payments settlement (Stripe, prepaid, failed charge, invoices).
- WhatsApp Business API (templates, delivery receipts, inbound webhooks).
- Facebook login details and NextAuth production wiring (later wizard).
- M-PAiSA / MyCash as a payment rail.
- Living-in-Fiji content (guides, visa, cost of living).
- VitiBiz, VitiRent, VitiLearn, and eco-resort work.
- Editing or retiring SynapseX-vault.
- Shipping under the name FijiJobs.
- Making Application the default Seeker path.
- Skills matching, diaspora talent pools, and SMS broadcast alerts (vault wishes; not this destination).
- Unlimited monthly subscription (vault mentioned FJD 49; not in the glossary and not in this spec).

## Further Notes

- Decision tickets 01–09 are resolved on the [map](./map.md). Implementation tickets start at [10 — Repo of record](./issues/10-repo-of-record.md).
- Labelled vault copies live under `docs/product/`. They are source excerpts, not this spec. Where they conflict (casual-only audience, “free first 10”, FijiJobs naming), this spec and `CONTEXT.md` win.
- Design for 360px, Android-first. Facebook is the public internet; WhatsApp is identity on the default path. Those implications come from the digital-landscape copy; they do not add stats.
- eJobsFiji is a real 2022 Android-first competitor. HRmonise is corporate HCM, not a model. MyJobsFiji remains the pricing and account-wall contrast.
