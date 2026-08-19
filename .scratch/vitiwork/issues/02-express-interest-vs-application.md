# 02 — Express Interest vs Application

Type: grilling
Status: resolved
Blocked by: none

## Question

Is “apply” one intent or two? The current prototype uses a cover-letter Application behind a login. The vault and market notes push WhatsApp with no account. Which is the default Seeker path?

## Answer

Two intents.

- **Express Interest** — a Seeker contacts an Employer via WhatsApp with no account. This is the default path.
- **Application** — a Seeker submits through a VitiWork profile. Optional; not the default.

Do not collapse the two into one “apply” button. Pages must not encode `wa.me` themselves — that lives in the ExpressInterest seam.
