# 01 — Where issues live

Type: grilling
Status: resolved
Blocked by: none

## Question

Where do wayfinder tickets, the spec, and implementation issues live for this effort? GitHub Issues is the usual default for a GitHub remote, but this Cloud Agent's `gh` CLI is read-only.

## Answer

Local markdown under `.scratch/`. One effort directory (`.scratch/vitiwork/`), the map at `map.md`, the spec at `spec.md`, and one file per ticket at `issues/NN-slug.md`.

GitHub Issues would be preferred later. Work stays in this repo as local files so later sessions can read and write tickets without a public issue stream. See `docs/agents/issue-tracker.md`.
