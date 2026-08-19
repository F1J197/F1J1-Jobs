# Fiji job market study and Seek gap analysis

**Written:** 2026-08-19  
**Purpose:** What the Fijian labour market actually is, what a board like [SEEK](https://au.seek.com/) does in AU/NZ, and what VitiWork must add (or refuse) so the prototype can become a board that can win *here* — not a thin Seek clone.

Primary sources are cited in place. Vault copies under `docs/product/` are first-party prior art, not official statistics.

---

## 1. The market in numbers (official)

Fiji Bureau of Statistics, [2023–24 Employment and Unemployment Survey](https://www.statsfiji.gov.fj/2023-24-fiji-employment-and-unemployment-survey-main-report/) (19th ICLS: employment = work for pay or profit; subsistence food production is *not* employment).

| Indicator | Figure |
| --- | ---: |
| Working-age population (15+) | 614,832 |
| Labour force | 314,898 |
| Employed | 296,825 |
| Unemployed (seeking + available) | 18,073 |
| Outside the labour force | 299,933 |
| Of which: subsistence foodstuff producers | 102,106 |
| Labour force participation | 51.2% (men 65.7%, women 36.2%) |
| Unemployment rate | 5.7% (men 4.9%, women 7.4%) |
| Youth unemployment (15–24) | **18.3%** (women 22.7%) |
| Fiji-defined youth 15–35 unemployment | 10.1% |
| Composite labour underutilization (LU4) | 12.5% |
| Informal employment rate | **41.9%** (men 46.0%, women 34.0%) |

**Where people work** (same survey):

- **Services** 57.6% — trade, transport, tourism, education, health.
- **Agriculture, forestry, fisheries** 23.3% — 44.6% of employment in the Eastern Division, 43.8% in the Northern. Central is services-heavy (62.6%).
- Rural working-age 337,153 vs urban 277,678. Rural unemployed 12,483 vs urban 5,591.

**Ethnic composition of the working-age population:** iTaukei 61%, Indo-Fijian 35%, other 4%. Employment shares track that closely.

**What this means for a job board:** the headline unemployment rate is *not* the product. Most adults are either in work (often informal), outside the labour force (especially women), or producing food for the household. The sharp pain is **youth**, **women’s participation**, **rural/Northern/Eastern access**, and **informal / casual / shift work** that never appears on a desktop ATS.

---

## 2. The 2025–26 labour weather (Reserve Bank)

Reserve Bank of Fiji, [Quarterly Review, December 2025](https://www.rbf.gov.fj/wp-content/uploads/2026/02/Quarterly-Review-December-2025.pdf):

- Economy grew ~3.4% in 2025; tourism had another record year; services still drive growth.
- **Job advertisements fell 4.1% to 13,638 vacancies** in 2025 (from 14,220). Formal FNPF registrations grew only 0.3% to **203,849** workers — that is the *formal* wage economy, not the 296k EUS employed.
- Wages paid +9.0%; PAYE +17.0% — firms paying more to **keep** people.
- Residents leaving for overseas employment −15.5%; labour imports −87.4%; **PALM short-term placements +32.0%**.
- Inward remittances **FJD 1,358.1 million** (mobile-money rails are the main channel).

**What this means:** Fiji is not a giant vacant-job desert. Formal ads are a thin slice (~14k/year). Hotels and trades still cannot keep people. A board that only scrapes “professional Suva” will miss both the volume (informal/casual) and the *employer* pain (replacement hiring after PALM/migration).

---

## 3. Skills, migration, and who employers actually lose

Fiji Commerce & Employers Federation, [National Skills Gap Assessment Survey 2025](https://www.fcef.com.fj/wp-content/uploads/2026/05/NSGAS-Report-2025_Embargoed_Until_7May2026_5PM.pdf) (embargoed to 7 May 2026; now public):

- Employers name **overseas migration** as the main cause of skilled-worker loss, then internal migration, then NEC and **PALM**.
- Responses: upskill remaining staff, re-hire retirees, hire locals, then hire foreigners.
- Foreign workforce mix in the survey: Bangladeshi nationals ~26%, Indian ~12% — established recruitment channels, not a one-off.

FNU commentary (reported by [FBC News](https://www.fbcnews.com.fj/news/strong-remittance-culture-blamed-for-36-youth-unemployment/)) links remittance households to weaker local job attachment. Treat the “36%” figure as a speaker’s claim; official youth unemployment is **18.3% (15–24)**. The *mechanism* (remittances + PALM + village labour) is real and shows up in RBF remittance totals.

**What this means:** VitiWork has two Employer jobs, not one.

1. **Fill a shift this week** (hospitality, retail, drivers, construction).
2. **Replace someone who left for Australia/NZ** (trades, nurses, chefs, heavy vehicle).

A Seek-style “30-day branded ad + CV inbox” solves (2) for corporates. It does not solve (1) for an SME in Nadi.

---

## 4. How Fijians actually find work today

| Channel | Role in the market | Evidence |
| --- | --- | --- |
| **Facebook groups + WhatsApp / Viber** | Default for casual and SME hire | Vault digital landscape; Youth Jobs Fiji Viber community targeting tens of thousands of members ([LinkedIn/Youth Jobs Fiji](https://www.linkedin.com/posts/shanilchetty_youth-jobs-fiji-activity-7285224028083048448-UuvD)) |
| **MyJobsFiji** | Formal incumbent since 2018 | 80k+ candidates claimed; **FJD 100 / 28 days**; account required to apply; Seekers must be Fiji residents with right to work ([about](https://myjobsfiji.com/about/), [pricing](https://myjobsfiji.com/employer-products/), [terms](https://myjobsfiji.com/terms-of-use/)) |
| **eJobsFiji** | Android-first local board (from 2022) | Live category feed + Play Store app ([ejobsfiji.com](https://ejobsfiji.com/)) |
| **HRmonise jobs** | Corporate HCM / agency ATS | Date-closed professional EOIs ([jobs.hrmonise.com](https://jobs.hrmonise.com/)) |
| **fijijobs.com** | Weak UX competitor | Vault `docs/product/competitor-fijijobs.md` — **do not ship as FijiJobs** |
| **Newspapers / Fiji Times classifieds** | Legacy, dying | Vault market research |
| **Government / NEC** | Public placement, not a consumer feed | Skills-gap employers treat NEC as a *drain*, not a board |
| **Walk-in / noticeboard / wantok** | Still dominant in villages and resorts | Informal employment 41.9% |

**Pay floor:** national minimum wage **FJD 5.00/hour** from 1 April 2025 ([Employment Relations (National Minimum Wage) (Amendment) Regulations 2024](https://wageindicator.org/salary/minimum-wage/fiji/39744-national-minimum-wage); some sectors have higher awards). Listings that hide pay will feel like Facebook. Listings that show FJD/hour *and* monthly will feel local.

**Devices:** Android ~81%, design at ~360px, Facebook is the public internet, WhatsApp is identity (`docs/product/Fiji-Digital-Landscape.md`, DataReportal / Statcounter).

---

## 5. What Seek actually is (AU/NZ)

SEEK is not “a list of jobs.” It is a **two-sided marketplace with paid demand, a CV supply, and matching**.

**Seeker side** ([SEEK help: create a profile](https://help.au.seek.com/article/How-do-I-create-a-SEEK-profile), [app listing](https://apps.apple.com/sl/app/seek-jobs-search-employment/id520400855), [profile visibility](https://www.seek.com.au/profile-privacy), [SEEK Pass](https://seekpass.co/)):

- Saved search + email/app alerts.
- Profile: summary, history, education, licences, skills, languages, up to 10 CVs.
- One-tap apply with the default CV; track “viewed / likely to progress.”
- Company profiles and reviews.
- Recommendations / conversational search.
- **SEEK Pass:** reusable verified credentials (right to work, RSA, high-risk licence, vehicle).
- Native iOS/Android apps.

**Employer side** ([ad types](https://help.au.employer.seek.com/s/article/Which-job-ad-type-should-I-choose), [variable pricing](https://help.au.employer.seek.com/s/article/How-much-does-it-cost-to-post-a-job-ad)):

- **No free plan** in AU/NZ. Price varies by title, classification, location, competitiveness (AI-set; Basic / Advanced / Premium).
- Inbox + talent search (credit-limited).
- Assist: AI pre-screens, reference checks, targeted emails, “likely interested.”
- Branding, urgently-hiring badge, ATS integrations.
- 26+ million monthly visits claimed in third-party write-ups — liquidity Seek spent 25 years buying.

**Seek’s moat is liquidity + trust + habit**, not the colour of the apply button.

---

## 6. Fiji context: what would fail if we copied Seek

| Seek pattern | Why it breaks in Fiji |
| --- | --- |
| Account wall before apply | MyJobsFiji already does this; WhatsApp *is* identity. Copying Seek’s apply wall copies the incumbent’s worst friction. |
| Variable AI pricing in AUD | SMEs cannot “look up” a mystery price. They compare to FJD 100 (MyJobsFiji) and FJD 0 (Facebook). Transparent FJD 15–25 + Free First Post is the Seek *idea* (tiers) without the Seek *mechanism*. |
| 10 CVs + PDF ATS | Many Seekers have no formatted CV. Licences (LTA, food safety, RSA-equivalent) matter more than a two-page résumé. |
| Company reviews at launch | Thin market + small towns = identifiable reviewers and Employer backlash. Defer until volume exists. |
| Talent-search credits / inbound recruiter spam | Wrong first customer. First customer is a resort HR or shop owner on WhatsApp. |
| SEEK Pass / right-to-work API | No equivalent national credential API. Manual Verification + later “licence photo” is the Fiji version. |
| Email-first alerts | Email is weak; WhatsApp / Facebook / Viber is where Youth Jobs Fiji already sits. |
| Desktop-grade taxonomy (300 classifications) | Eight Categories + free-text Town match how people search (“Nadi hotel”, “Labasa driver”). |
| iOS-first polish | Android 81%. 360px or it does not exist. |

Copy Seek’s **jobs** (liquidity, trust, alerts, Employer outcomes). Do not copy Seek’s **interface to those jobs**.

---

## 7. Gap analysis: Seek vs VitiWork today vs Fiji need

Legend: **Have** = in the current prototype · **Partial** = sketched · **Gap** = missing · **Defer** = Seek has it; Fiji should wait.

| Capability | Seek | VitiWork now | Fiji need | Verdict |
| --- | --- | --- | --- | --- |
| Mobile-first feed | App + web | Have (360px, teal/ink) | Mandatory | Keep |
| Search: keyword + place + type | Deep taxonomy | Have (query, Town, Category, type) | Towns + islands, not postcodes | Deepen Town synonyms (Denarau→Nadi, Labasa, Savusavu, Taveuni) |
| No-account contact | Rare (apply wall) | **Have (Express Interest / WhatsApp)** | This is the wedge | **Do not dilute** |
| Optional profile apply | Core | Partial (demo) | Needed for banks/gov later | Keep secondary |
| Saved search + alerts | Email + push | Gap | WhatsApp/Facebook first | **Add next** |
| Pay displayed in local units | Salary bands | Partial (free text) | FJD/hour *and* monthly; flag below FJD 5/hr | **Add** |
| Freshness / expiry honesty | Strong | Partial (string “21 days”) | Hide expired; show “closes Friday” | **Harden** |
| Employer Verification | Company pages + reviews | Named, not built | Manual stamp at launch | **Add** |
| Free First Post / SME price | No free AU ads | Rules in ListingPost; payment not live | Beat FJD 100 and Facebook chaos | **Wire payment later; keep price honest on the page** |
| Volume of live Listings | Hundreds of thousands | ~13 mock | Need real Employers or the feed is a demo | **Distribution, not more UI** |
| Alerts when a chef leaves for PALM | Recs / emails | Gap | “Roles like this in Nadi” on WhatsApp | **Add** |
| Licence / ticket fields | SEEK Pass | Gap | Driver, food safety, FNPF number optional | **Add Listing + Seeker fields** |
| Shift / start-date / live-in | Sometimes | Gap | Hospitality live-in, roster, “start Monday” | **Add** |
| Language (English / Fijian / Hindi) | Languages on profile | Gap | Filter + Listing language | **Add** |
| Company profile + reviews | Core | Gap | Profile yes; reviews **Defer** | Split |
| Application inbox / ATS | Core | Partial dashboard | WhatsApp is the inbox at launch; simple Interest log later | Log Interests before building ATS |
| Recommendations | AI | Gap | Start with Category+Town match, not an LLM | Simple first |
| Native Android app | Have | PWA only | PWA + Play later; eJobs already owns “app” | PWA install prompt first |
| Facebook share / pixel | Mature | Gap | Facebook *is* distribution | **Add share + boosted Listing** |
| Trust & safety | Mature | Gap | Fake Employers, under-minimum pay, trafficking-adjacent ads | **Add report + phone verify** |
| Accessibility / disability | Partial | Gap | EUS tracks disability LFPR | Later, not launch-critical |
| Diaspora / PALM | N/A | Gap / out of first destination | Do not become a migration agency | **Out of scope** (wayfinder) |
| Payments (M-PAiSA) | Invoice / card | Wizard only | Prepaid FJD like MyJobsFiji | After first 20 paying Employers |

---

## 8. What to add to the website / prototype (so it can succeed)

Ordered by **Fiji leverage**, not by how impressive it looks next to Seek.

### Must add before calling this more than a demo (success-critical)

1. **Real Listings from real Employers**  
   The product fails if the feed stays 13 mocks. Concierge-onboard 10 Nadi/Suva Employers (hotels, retail, construction, a municipal/gov role). Free First Post is the offer.

2. **WhatsApp / Facebook alerts**  
   Saved search: “Hospitality + Nadi” → message when a Listing lands. This is Seek’s saved-search, on the rail Fijians already open.

3. **Honest pay + hours + start**  
   Fields: pay amount, unit (hour/day/month/year), live-in Y/N, start date, shift note. Reject or warn below FJD 5/hour.

4. **Employer Verification stamp**  
   Manual: business name, phone, one document or a known Facebook page. Show “Verified Employer” on the Listing. Seek’s trust without SEEK Pass.

5. **Interest log (not a full ATS)**  
   When Express Interest fires, record Listing + timestamp + optional name. Employer dashboard lists who pinged. Pages still do not own `wa.me`.

6. **Town intelligence**  
   Synonyms and divisions: Central (Suva, Nasinu, Nausori), Western (Nadi, Lautoka, Ba, Sigatoka, Denarau), Northern (Labasa, Savusavu), Eastern (Levuka, Kadavu, islands). Rural Seekers are half the working-age population.

7. **Trust & safety**  
   Report Listing, block Employer, no-fee-to-apply rule (Seekers never pay). Trafficking and “registration fee” ads will show up the week Facebook users arrive.

8. **Share to Facebook**  
   One tap from a Listing. MyJobsFiji already auto-posts to Facebook; we should make *Seekers* the distribution, not only the Employer.

### Should add in the next slice (Seek-quality, Fiji-shaped)

9. **Licence tags** on Listing and optional Seeker card: LTA class, food safety, first aid, electrical licence.  
10. **Language** on Listing (English / iTaukei / Hindi / other).  
11. **PWA “Add to Home Screen”** + install hint (Android).  
12. **Featured** as a visible paid placement once payment exists — price on the page, FJD, no surge.  
13. **Company page** (description, Town, verified) without public reviews.  
14. **Simple match** (“more roles in this Town + Category”) — not an AI product.

### Add only when liquidity exists (Seek features that need density)

15. Seeker profile with one CV *or* a voice/WhatsApp intro.  
16. “Application viewed” status.  
17. Talent search for Employers.  
18. Company reviews.  
19. Credential verification product.  
20. Native Play Store app (compete with eJobs only after web+PWA habit).

### Do not add (success requires saying no)

- Shipping as FijiJobs.
- Account wall on Express Interest.
- AUD-style opaque pricing.
- Living-in-Fiji / visa / expat magazine (fog; not the Seeker).
- PALM / diaspora placement (different product, different regulator).
- Editing SynapseX-vault.
- VitiBiz / VitiRent / VitiLearn.

---

## 9. How VitiWork wins vs Seek *and* vs Fiji incumbents

Seek wins AU/NZ because **everyone already looks there**. VitiWork cannot spend 25 years. It wins Fiji if:

1. **Contact is cheaper than MyJobsFiji** — WhatsApp, no account, FJD 0 for the Seeker.  
2. **Posting is cheaper than MyJobsFiji and cleaner than Facebook** — Free First Post, then FJD 15–25, expiry that is real.  
3. **The feed includes the work people actually do** — hospitality, retail, trades, drivers, agriculture, government — not only Suva professional.  
4. **Alerts live on WhatsApp/Facebook**, not email.  
5. **Employers who lose staff to PALM can re-hire in days**, not in a 28-day FJD 100 cycle.

That is “Seek quality” in Fijian context: **liquidity + trust + habit**, built on rails that already have habit.

---

## 10. Success tests (so this does not stay a pretty prototype)

A later session should treat these as tickets, not as more homepage copy.

| Test | Pass |
| --- | --- |
| Seeker on a 360px Android, no login | Finds a live Listing and opens WhatsApp in one tap |
| Employer with no card | Publishes Free First Post and sees an Interest |
| Youth in Lautoka / Labasa | Sees Town-relevant work, not only Suva offices |
| Informal-friendly Listing | Pay/hour + start date + WhatsApp, no CV required |
| Trust | Verified badge or a working report path before public Facebook ads |
| Liquidity | ≥ 30 live Listings from ≥ 10 real Employers, or the demo is still a demo |

---

## Sources

- Fiji Bureau of Statistics, [2023–24 EUS main report](https://www.statsfiji.gov.fj/2023-24-fiji-employment-and-unemployment-survey-main-report/) (PDF tables: working-age 614,832; employed 296,825; unemployment 5.7%; youth 18.3%; informal 41.9%; services 57.6%; agri 23.3%).
- Reserve Bank of Fiji, [Quarterly Review December 2025](https://www.rbf.gov.fj/wp-content/uploads/2026/02/Quarterly-Review-December-2025.pdf) (13,638 ads; FNPF 203,849; remittances FJD 1,358.1m; PALM short-term +32%).
- FCEF, [National Skills Gap Assessment Survey 2025](https://www.fcef.com.fj/wp-content/uploads/2026/05/NSGAS-Report-2025_Embargoed_Until_7May2026_5PM.pdf).
- [MyJobsFiji about](https://myjobsfiji.com/about/), [pricing](https://myjobsfiji.com/employer-products/), [terms](https://myjobsfiji.com/terms-of-use/).
- [eJobsFiji](https://ejobsfiji.com/), [HRmonise jobs](https://jobs.hrmonise.com/).
- SEEK: [ad types](https://help.au.employer.seek.com/s/article/Which-job-ad-type-should-I-choose), [ad pricing](https://help.au.employer.seek.com/s/article/How-much-does-it-cost-to-post-a-job-ad), [seeker profile](https://help.au.seek.com/article/How-do-I-create-a-SEEK-profile), [SEEK Pass](https://seekpass.co/).
- Minimum wage: [WageIndicator / LN 44 2024](https://wageindicator.org/salary/minimum-wage/fiji/39744-national-minimum-wage) (FJD 5.00/hour from 1 Apr 2025).
- In-repo: `docs/research/myjobsfiji.md`, `ejobsfiji.md`, `hrmonise.md`; `docs/product/Fiji-Digital-Landscape.md`, `Fiji-Jobs-Market-Research.md`; `.scratch/vitiwork/spec.md`.
