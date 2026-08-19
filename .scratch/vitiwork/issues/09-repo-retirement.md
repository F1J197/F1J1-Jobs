# 09 — Repo retirement

Type: task
Status: resolved
Blocked by: none

## Question

Which sibling repos retire, in what order, and when? Does the vault ever go in the retirement wizard?

## Answer

Wizard later (implementation ticket after the spec). Sequence:

1. Labelled copies and the VitiWork README must already be on `main` of this repo (the repo of record).
2. Archive **fiji-jobs** first.
3. Archive **vitiwork-landing** second, only after those copies are on `main`.
4. **Never** include SynapseX-vault. Read-only; never delete; never retire.

An optional later rename of this GitHub repo to `vitiwork` does not change git history.
