# VitiWork

Find work in Fiji. This repository (`F1J197/F1J1-Jobs`) is the **one repo of record** for the Next.js app. Brand is **VitiWork**. Landing copy and colour come from [vitiwork-landing](https://github.com/F1J197/vitiwork-landing); that HTML is a prototype source, not the production app.

## Demo logins

| Role | Email | Password |
| --- | --- | --- |
| Seeker | `seeker@example.com` | any |
| Employer | `employer@example.com` | any |

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
```

## What seekers and employers do

- Seekers search listings (`/jobs?query=&town=`), then **Express Interest on WhatsApp**. No account required.
- An optional **Apply with profile** path still needs sign-in (`/signin`, `/signup` — never `/auth/signin`).
- Employers publish from `/employer/post-job`. A first listing is a **Free First Post** (seven days).

## Seams

Pages do not own search rules, `wa.me` encoding, or Free First Post / expiry. Callers cross:

- `ListingCatalog` — `search({ query, town, category, type })`
- `ExpressInterest` — `open({ listing, seekerName? })`
- `ListingPost` — `createListingPost().publish({ employer, draft })`

## Local tracker and vault

- Tickets and maps live under `.scratch/vitiwork`.
- Labelled vault copies: `docs/product/Fiji-Jobs-Market-Research.md`, `Fiji-Digital-Landscape.md`, `VitiWork-Product-Spec.md`, `competitor-fijijobs.md`.
- `SynapseX-vault` is **read-only**. Copy notes into `docs/product/`; do not edit the vault.
- Extra repos retire with `scripts/retire-extra-repos.sh` after copies are on `main`. Never archive the vault.

## Stack

Next.js (App Router), TypeScript, Tailwind, Prisma schema, mock demo until the catalog adapter is Prisma.
