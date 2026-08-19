# VitiWork launch roadmap — top 10 to a real product

**Written:** 2026-08-19  
**Audience:** Andrew (product owner) and the next agent session  
**Parent research:** [Fiji job market and Seek gap](../research/fiji-job-market-and-seek-gap.md)  
**Tickets:** `.scratch/vitiwork/issues/18`–`27`

This is the sequence that turns the prototype into a **fully functional product** without buying SaaS we do not need. Rank is **bang for buck toward a Seeker in Fiji getting a real job conversation**, not toward looking like Seek.

**Execution (2026-08-19):** tickets 20–23 and the product-facing parts of 24–27 are in the app (Town clusters, honest pay, Interest log, Report, share, Watch, metrics, trust). Tickets 18–19 (Neon + NextAuth) and concierge Employers still need Andrew.

---

## What “fully functional” means

The product is real when all of these are true. Until they are, it is still a demo.

| Test | Pass |
| --- | --- |
| Seeker on a ~360px Android, no login | Opens `vitiwork.com`, finds a **live** Listing, taps Express Interest, lands in WhatsApp |
| Employer with no card | Publishes a Free First Post and later sees that someone Expressed Interest |
| Towns besides Suva | A Lautoka or Labasa search returns Town-relevant work, not only Suva offices |
| Informal-friendly Listing | Pay (with unit), start date, WhatsApp — no CV required |
| Trust | Report path is live **before** we ask Facebook groups to send traffic |
| Liquidity | ≥ 30 live Listings from ≥ 10 real Employers — or we still call it a demo |

Fully functional is **not** payments, a Play Store app, an ATS, company reviews, or WhatsApp Business API.

---

## What we already have (do not rebuild)

- Brand, 360px feed, search (query + Town + Category + type), Express Interest via `wa.me`, Free First Post **rules**, three test seams (`ListingCatalog`, `ExpressInterest`, `ListingPost`).
- A Prisma `Job` mapper behind ListingCatalog — **unused by the live app**. The live app is InMemory + `localStorage`.
- Demo “auth” that writes a user object into `localStorage` (`vitiwork_user`). That is **not** a session. Anyone with DevTools is any Employer.

The remaining work is persistence, identity, trust, measurement, and getting real Employers onto a public URL.

---

## The free stack (and what we refuse to pay for)

Stay on free tiers until an Employer actually pays us. `.env.example` already lists Stripe, Cloudinary, SendGrid, and WhatsApp Business — **leave those blank**.

| Need | Free choice | Do not buy yet |
| --- | --- | --- |
| Public URL + HTTPS | Vercel Hobby + the domain we already have | A second host “just in case” |
| Postgres | [Neon](https://neon.tech) free branch (`DATABASE_URL` only in host env) | A paid RDS / a second database |
| Employer identity | NextAuth + Google OAuth (free) + email/password hashed in Neon | Facebook Login until App Review is worth the time |
| Express Interest | Keep `wa.me` (ADR-0004). Pages still do not build WhatsApp URLs | WhatsApp Business API (Meta charges per conversation) |
| Seeker alerts | Resend free tier (~100 emails/day) **or** a Facebook share + Andrew’s own WhatsApp for week-one blasts | WhatsApp Business, Twilio, paid SMS |
| Files / CVs | None. Express Interest does not need a file | Cloudinary, S3 |
| Payments | Price on the page only. Collect Standard/Featured later by invoice or M-PAiSA | Stripe until ~20 Employers have used Free First Post |
| Errors | Sentry free developer plan, PII scrubbed | A second APM |
| Analytics | First-party `Event` rows in Neon. SQL is the dashboard | Google Analytics, Meta Pixel, Plausible, PostHog (easy to leak phones) |
| Demand | Organic Facebook groups + one-tap share | Boosted ads until Verification + Report exist |
| Trust | Andrew as the Verification queue (phone + Facebook page) | Paid KYC / “SEEK Pass” APIs |

**Honest limit:** automated WhatsApp *broadcasts* are not free. Seek-quality alerts on WhatsApp cost Meta money. The free rail is email digest + Facebook share + manual WhatsApp from a human. Do not pretend otherwise.

**Honest limit:** Vercel Hobby and Neon free have bandwidth and storage caps. At Fiji launch volume (tens of Listings, hundreds of searches/day) we will not hit them. If we do, that is a success problem and we pay then.

---

## North star and the numbers we actually need

**North star:** Express Interest events on live Listings from real Employers, per week.

We cannot see whether the Seeker tapped *Send* in WhatsApp. That is fine. The click that opens `wa.me` is the last event we own. Treat it as the conversion.

### Store these (first-party `Event` or small tables)

Do **not** store the WhatsApp message body, the Seeker’s phone, or raw IP beyond a short-lived rate-limit bucket.

| Event / row | Why |
| --- | --- |
| `listing_search` `{ query?, town?, category?, type?, resultCount }` | Demand. Zero-result queries are product gold. |
| `listing_view` `{ listingId }` | Funnel denominator. |
| `express_interest` `{ listingId, employerId }` | **North star.** Rate-limit key. Employer “who pinged” list. |
| `listing_publish` `{ listingId, employerId, tier }` | Supply. Free First Post vs later. |
| `listing_report` `{ listingId, reason }` | Trust. Take-down queue. |
| `facebook_share` `{ listingId }` | Distribution. |
| `alert_subscribe` `{ town, category, channel }` | Alert demand — email or “manual WhatsApp list”, never a phone in the clear if we can avoid it. |

Listing and Employer rows already carry the rest: live count, Town/Category mix, `expiresAt`, Verification flag, pay/start completeness.

### Query these weekly (SQL on Neon is enough — no BI tool)

**Funnel**

- searches → unique listing views → Express Interest clicks  
- Express Interest / listing view (does the Listing convert?)  
- Express Interest / live Listing (is the feed working?)

**Supply**

- live Listings, unique Employers, new publishes, expired-and-hidden  
- Free First Post vs Standard vs Featured (Featured will be 0 until payment)  
- share of Listings with pay **and** a start date  
- Listings flagged below FJD 5.00/hour

**Demand**

- searches by Town and Category  
- zero-result queries (exact strings — no user id)  
- Town synonym hits (people typed Denarau, we served Nadi)

**Trust**

- reports opened / resolved / taken down  
- Verification rate (verified Employers / Employers who have published)  
- repeat reports on the same Employer

**Retention (the only growth metric that matters early)**

- Employers who publish a **second** Listing  
- Seekers who Express Interest twice (same browser session id is enough; no account)

**Stay-free cost**

- Neon storage, Vercel bandwidth, Resend sends that day  

If north star is flat and supply is rising, distribution is the problem. If supply is 13 mocks, stop polishing UI.

---

## Our information security (product + ours)

This sits **beside** the top 10, not after them. Several items below exist only because of this list.

### Product security (Seekers and Employers)

1. **Express Interest stays no-account.** An account wall is both a product failure and a larger PII store.
2. **Seekers never pay.** “No fee to apply” on every Listing. A registration-fee or “training bond” Listing is a Report reason and a take-down.
3. **Minimize what we hold.** Default path: no CV, no Seeker phone, no message body. Employer WhatsApp is already on the Listing — treat it as contact data, not as something to print in logs.
4. **Do not log `wa.me` URLs.** They contain the Employer’s number and the pre-filled text. Redact phones in Sentry and Vercel logs (`+679…` → `+679****`).
5. **Rate-limit** Express Interest and Listing publish (per IP hash + per Listing). We will otherwise become a WhatsApp spam cannon.
6. **Report + take-down** before Facebook traffic. Trafficking-adjacent and under-minimum ads will arrive the week groups share us.
7. **Verification is a stamp, not KYC theatre.** Business name, working phone, one Facebook page or a document Andrew can see. No passport pipeline.
8. **Kill `localStorage` “auth”.** It stores a user object the browser can edit. Production sessions are httpOnly, `Secure`, `SameSite` cookies via NextAuth.
9. **HTTPS only** in production. HSTS once the domain is stable.
10. **No Meta Pixel / Google Analytics at launch.** Share is a link. A pixel is a tracker we cannot justify for a job board that holds phone numbers.

### Our own security (Andrew + this repo + hosts)

1. **GitHub:** 2FA on the owner account. Do not put SynapseX-vault in this repo. `gh` stays least-privilege; this agent’s `gh` is read-only on purpose.
2. **Secrets:** `.env` never committed. `NEXTAUTH_SECRET` is a generated value, not `change-me`. Rotate anything that has ever been in a chat, a screenshot, or a Cloud Agent log.
3. **Neon:** app role is not superuser. Connection string lives only in Vercel env. No public `?sslmode=disable`.
4. **Vercel:** production env only on the production project. Preview deploys do not get OAuth client secrets that can redirect to `*.vercel.app` we do not control — or we register those URLs deliberately.
5. **OAuth:** Google consent screen restricted to the production origin. No Facebook Login until we need it.
6. **Domain:** registrar lock. DNS only at the host that serves the app. No leftover A records on old experiments.
7. **Dependencies:** `npm audit` on the lockfile before each production deploy. We do not add Stripe/Cloudinary/WhatsApp SDK “for later.”
8. **Backups:** Neon’s free branch history is the backup. Do not invent a second dump-to-Google-Drive story until we have real Employer data.
9. **Admin:** one `ADMIN` user (Andrew). Verification and take-down are not public endpoints.
10. **Retirement wizard** (`scripts/retire-extra-repos.sh`) stays human-run. Never archive the vault. Never archive fiji-jobs / vitiwork-landing until copies are on `main`.

If a secret leaks: rotate host env, Neon password, OAuth client secret, and `NEXTAUTH_SECRET` in that order. Assume the old values are public.

---

## The top 10

Order is the build order. Each item names the unlock, the free path, the security catch, and the metric it turns on.

### 1. Persist Listings on Neon and put the app on a public HTTPS URL

**Unlock:** Nothing else is a product while Listings live in the agent VM and `localStorage`. A Seeker on Vodafone cannot open localhost.

**Build:** Point the live app at the existing Prisma ListingCatalog adapter; persist `ListingPost.publish` to `Job` (ticket 14 is only half-done). `DATABASE_URL` on Neon. Deploy the Next app to Vercel. Custom domain + HTTPS. InMemory stays as the test adapter.

**Free:** Neon free + Vercel Hobby + existing domain.

**Security:** secrets only in host env; no `.env` in git; HTTPS; Prisma role is least-privilege.

**Metrics this turns on:** live Listing count that is *true* across devices; `listing_publish` that survives a refresh.

**Ticket:** [18](../../.scratch/vitiwork/issues/18-persist-and-deploy.md)

### 2. Replace `localStorage` auth with real sessions

**Unlock:** Free First Post is “one per Employer.” That is meaningless if identity is a writable browser key. Dashboard, Verification, and admin take-down all need a server session.

**Build:** NextAuth against Prisma `User` / `Session` / `Account` (already in the schema). Google OAuth + email/password. The unused `lib/session.ts` seam becomes the real one. Express Interest still does **not** require a session. Demo users can remain for local `npm run dev` only.

**Free:** Google Cloud OAuth client is free.

**Security:** httpOnly cookies; hashed passwords; no user object in `localStorage`; `NEXTAUTH_SECRET` rotated for production.

**Metrics this turns on:** unique Employers who actually published; second-post retention.

**Ticket:** [19](../../.scratch/vitiwork/issues/19-real-sessions.md)

### 3. Log Express Interest (not an ATS)

**Unlock:** This is the north-star counter **and** the Employer “someone pinged this Listing” list. Without it we cannot tell if the loop works and the Employer cannot tell anyone cared.

**Build:** A fourth, small seam — `InterestLog.record({ listingId })` — called when Express Interest is clicked, *after* `ExpressInterest.open` returns the URL. Pages still do not build `wa.me`. Store `listingId`, `employerId`, timestamp. Optional first name only if the Seeker typed one. **Never** the message body, **never** the Seeker’s phone.

**Free:** one Neon table.

**Security:** rate-limit per IP-hash and per Listing; redact phones in logs; do not store the constructed WhatsApp URL.

**Metrics this turns on:** north star, funnel, per-Listing conversion, Employer dashboard Interest list.

**Ticket:** [20](../../.scratch/vitiwork/issues/20-interest-log.md)

### 4. Honest pay, hours, and start date on every Listing

**Unlock:** Facebook looks like Facebook because pay is “competitive.” A Listing that shows FJD/hour *and* a start date is why an SME would leave the group. Minimum wage is FJD 5.00/hour (1 Apr 2025). Warn or block below that.

**Build:** Structured fields on draft → Listing: amount, unit (`hour` / `day` / `month` / `year`), live-in Y/N, start date, optional shift note. ListingPost rejects a publish with empty pay or empty start. Catalog cards show the structured pay, not a mystery string.

**Free:** form fields. No payroll API.

**Security:** under-minimum is a trust signal (and a Report reason). Do not let “registration fee deducted from first pay” hide in free text without a Report path (item 6).

**Metrics this turns on:** `%` of live Listings with pay + start; count of below-minimum flags.

**Ticket:** [21](../../.scratch/vitiwork/issues/21-honest-listing-fields.md)

### 5. Town synonyms and zero-result capture

**Unlock:** Rural and Northern Seekers are half the working-age population. “Denarau”, “Nasinu”, “Savusavu” must resolve. A zero-result search that we do not record is a wasted product interview.

**Build:** Town synonym map inside ListingCatalog (not in the page). Divisions: Central (Suva, Nasinu, Nausori), Western (Nadi, Lautoka, Ba, Sigatoka, Denarau), Northern (Labasa, Savusavu), Eastern (Levuka, islands). Record `listing_search` including `resultCount === 0` and the raw query.

**Free:** a map in `lib/` plus Event rows.

**Security:** store the query string, not the IP, on zero-result rows.

**Metrics this turns on:** demand by Town; synonym hit rate; the exact strings people type that we do not understand.

**Ticket:** [22](../../.scratch/vitiwork/issues/22-town-synonyms.md)

### 6. Report, no-fee-to-apply, and rate limits

**Unlock:** The week Facebook users arrive we will get fake Employers, under-minimum ads, and “pay to register” scams. If take-down is a DM to Andrew, we will be late. This is **information security for Seekers**, not a nice-to-have footer.

**Build:** Report on every Listing (reasons: scam / fee-to-apply / under-minimum / trafficking-adjacent / other). Admin take-down sets `CLOSED`. Copy on detail: Seekers never pay VitiWork or the Employer to Express Interest. Rate-limit publish + Express Interest in the seams.

**Free:** a `Report` table + Andrew’s admin screen.

**Security:** this *is* the control. Hide the Listing from search on take-down. Do not email the reporter’s identity to the Employer.

**Metrics this turns on:** reports opened / resolved; take-downs; repeat offenders.

**Ticket:** [23](../../.scratch/vitiwork/issues/23-report-and-rate-limits.md)

### 7. Manual Employer Verification

**Unlock:** Seek’s trust without SEEK Pass. A “Verified Employer” stamp is the difference between a WhatsApp from a resort HR and a WhatsApp from a burner.

**Build:** Andrew-only admin: mark `Company.verified`. Show the stamp on the Listing. Queue is “phone answered + Facebook page or a document.” No passport, no paid KYC. Unverified Employers can still Free First Post — the stamp is the signal, not a gate that kills supply.

**Free:** Andrew’s time. `Company.verified` already exists on the schema.

**Security:** admin route is session + `ADMIN` role only. Verification documents, if uploaded later, are **not** public and are **not** in git. At launch, Andrew looks at them on a call — no upload.

**Metrics this turns on:** Verification rate; Express Interest on verified vs unverified (do Seekers care?).

**Ticket:** [24](../../.scratch/vitiwork/issues/24-manual-verification.md)

### 8. Facebook share + concierge ten real Employers

**Unlock:** The product fails if the feed stays ~13 mocks. This item is mostly **not code**. MyJobsFiji already auto-posts to Facebook; we make *Seekers and Employers* the distribution with one tap. Then Andrew walks ten Nadi/Suva Employers (hotel, retail, construction, a driver role, a municipal/gov role) through Free First Post.

**Build:** Share URL on Listing detail (`whatsapp` is already the apply path; Facebook is the *broadcast* path). A short public “Post a job” landing that states Free First Post / FJD 15 / FJD 25 in the open. A checklist in the ticket for the ten Employers — not a CRM.

**Free:** `facebook.com/sharer` and Andrew’s existing accounts. **No ads. No pixel.**

**Security:** do not share Listings we have taken down; do not boost traffic until Report (item 6) is live. Concierge onboarding confirms a real WhatsApp that Andrew can message.

**Metrics this turns on:** `facebook_share` clicks; live Listings from **real** Employers (the liquidity test).

**Ticket:** [25](../../.scratch/vitiwork/issues/25-share-and-concierge.md)

### 9. Town-scoped alerts on a free rail

**Unlock:** Seek’s saved-search is the habit loop. In Fiji the habit rail is WhatsApp/Facebook, but **automated WhatsApp is not free**. Ship the *idea* on a rail we can afford.

**Build:** Seeker leaves Town + Category + an email (Resend). Daily digest: new Listings since last send, deep link to each. Optional: Andrew exports the same query and pastes into WhatsApp/Viber groups by hand for the first Employers. In-app “new since last visit” for anyone who comes back (no account required — a cookie is enough).

**Free:** Resend free tier + a cron on Vercel, or a GitHub Action hitting a secret-protected route. Manual WhatsApp is ops, not an API bill.

**Security:** email is PII — store it for the alert only, one-click unsubscribe, never sell it. Do not collect WhatsApp numbers into a blast list unless the Seeker typed them and we treat that list as sensitive as passwords.

**Metrics this turns on:** `alert_subscribe`; alerts sent; click-through from digest to `listing_view`.

**Ticket:** [26](../../.scratch/vitiwork/issues/26-free-alerts.md)

### 10. Production hardening + a SQL metrics page Andrew can open

**Unlock:** Items 1–9 leak value if logs print phones, if preview deploys leak OAuth, or if we cannot see the north star without asking an agent to `console.log`. This is the sleep-at-night item and the “is it working?” item.

**Build:**

- Security headers (HSTS when domain is stable, `X-Content-Type-Options`, `Referrer-Policy: no-referrer` on pages that might sit next to `wa.me`).
- Sentry with `beforeSend` scrubbing phones and emails.
- Admin `/admin/metrics` (Andrew only): the weekly queries above. Not a startup analytics product — six numbers and two tables.
- A short `docs/product/production-checklist.md` Andrew ticks before sharing the URL in a Facebook group (secrets, 2FA, Report live, HTTPS, demo auth off).

**Free:** Sentry developer + SQL.

**Security:** the checklist *is* the control. Metrics page shows counts, not phone numbers, not message text, not raw emails.

**Metrics this turns on:** everything in the north-star section, visible without a database GUI.

**Ticket:** [27](../../.scratch/vitiwork/issues/27-hardening-and-metrics.md)

---

## What we explicitly do not do in this sequence

- Payments / Stripe / M-PAiSA (price stays honest on the page; collect later).
- WhatsApp Business API.
- Account wall on Express Interest.
- Meta Pixel, Google Analytics, or any third-party tracker.
- Company reviews, talent search, CV inbox as the default, Play Store app.
- Shipping as FijiJobs.
- PALM / diaspora placement, VitiBiz / VitiRent / VitiLearn.
- Editing SynapseX-vault.
- Archiving fiji-jobs or vitiwork-landing before copies are on `main` (human wizard).

---

## Dependency graph

```
18 persist + deploy
        ├── 19 real sessions ──────────────┐
        │                                  ├── 24 Verification (admin)
        ├── 20 Interest log                │
        ├── 21 honest fields               ├── 27 metrics page + hardening
        ├── 22 Town synonyms               │
        └── 23 Report + rate limits ───────┴── 25 share + concierge 10 Employers
                                                 └── 26 free alerts (worth it once supply is real)
```

**25 (real Employers) is the only item that can fail the whole idea.** 18–24 exist so those ten Employers are not posting into a toy. 26 is habit, and habit on an empty feed is spam.

Do not start 26 or Facebook *ads* before 23. Do not call the product launched because the homepage looks finished.
