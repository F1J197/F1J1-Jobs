# 17 — Retirement wizard

**What to build:** A wizard script that a human can run after labelled copies and the VitiWork README are on `main`. It archives fiji-jobs first, then vitiwork-landing. It never offers SynapseX-vault. This ticket writes the script now; a human runs it after `main`.

**Blocked by:** 10 — Repo of record + VitiWork README + copied docs

**Status:** resolved

- [x] Wizard checks that copies and the VitiWork README are on `main` before it will archive anything
- [x] Archive order is fiji-jobs, then vitiwork-landing
- [x] Wizard refuses to include or mention SynapseX-vault as a retirement target
- [x] Running the wizard is a human step after `main`; CI does not archive remotes on its own
- [x] Script comments state that an optional later rename of this GitHub repo to vitiwork does not change git history
