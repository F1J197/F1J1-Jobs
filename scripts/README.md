# Scripts

Human-only helpers. Agents must not run the archive stages for you.

## VitiWork cutover — OAuth and extra-repo retirement

Walks you through Facebook and Google OAuth, `DATABASE_URL`, then (only if you confirm) archiving the extra GitHub repos and optionally renaming `F1J1-Jobs` to `vitiwork`.

Do not archive anything until `docs/` and the VitiWork homepage copy are on `main` of [F1J197/F1J1-Jobs](https://github.com/F1J197/F1J1-Jobs).

```bash
# from the repo root
./scripts/retire-extra-repos.sh
```

The wizard opens each dashboard URL, captures values you paste, and writes them to `.env` (or `$ENV_FILE` if you set that). Re-run anytime — Enter keeps values already saved.

This script never archives a repository itself. You click Archive in GitHub after the confirmation gates.
