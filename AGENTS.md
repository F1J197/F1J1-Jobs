# VitiWork

Fiji job board. Repo of record is this repo (`F1J197/F1J1-Jobs`). Brand is **VitiWork**, never FijiJobs.

## Agent skills

### Issue tracker

Local markdown under `.scratch/<feature>/` — GitHub Issues preferred later, `gh` write is unavailable here. See `docs/agents/issue-tracker.md`.

### Triage labels

Defaults: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.

### Listing

A published job with Town, Category, type, pay, expiry. Search and filter only through the ListingCatalog seam.

### Express Interest

Seeker contacts Employer via WhatsApp without an account. Encode `wa.me` only inside the ExpressInterest seam.

### seam

Callers and tests cross ListingCatalog, ExpressInterest, ListingPost, InterestLog, ListingReport, ListingShare, EventLog, and AlertWatch. Pages do not own pricing, Town clusters, filter, WhatsApp, or funnel counts.

### wayfinder

This effort is bigger than one session. Read `.scratch/vitiwork/map.md` before inventing new tickets. Superpowers / Compound Engineering do not replace a Pocock skill that already covers the job.

### Vault

`SynapseX-vault` is read-only. Copy into `docs/product/`; never edit the vault.
