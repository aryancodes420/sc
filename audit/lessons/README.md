# 🎓 Lessons — how this project stops repeating itself

> **What this is:** one small file per mistake that cost real time or nearly shipped
> something wrong. Each carries the **fix**, not just the story. Read the index before
> starting work; file a new one before you finish.
>
> **Why it exists:** this repo's recurring failure isn't bad work, it's **repeated work**
> — the same traps rediscovered by each new session, and docs written where nobody looks.

---

## Index

| # | Lesson | One-line takeaway |
|---|---|---|
| [L001](L001-chromium-https-blocked.md) | Chromium can't do HTTPS in this container | It's fixable in 2 min — don't declare "no browser" |
| [L002](L002-preview-theme-silently-wrong.md) | `?preview_theme_id=` gets silently dropped | Assert `Shopify.theme.id` on every page, always |
| [L003](L003-verify-before-you-fix.md) | Queued "bugs" may not be real | Reproduce it live before you edit anything |
| [L004](L004-sequence-dont-dump.md) | Correct but unreadable = failed | One "do this first", then three, then a table |

**Reusable tooling that came out of these:** [`tools/agent-browser/`](../../tools/agent-browser/)
— working browser access in one command.

---

## How to file a new lesson

**File one when:** you lost more than ~20 minutes to something non-obvious, you nearly
shipped something false, or you found a trap the docs don't mention.

**Don't file:** ordinary task notes (those go in `HANDOFF.md` §10 or
`audit/implementation-notes/live-catalog-changes.md`), or anything you haven't actually
verified.

1. Copy the template below to `audit/lessons/L00N-short-slug.md` (next free number).
2. Keep it **under a page**. The fix matters, the narrative doesn't.
3. Add a row to the index above.
4. If it produced reusable code, put the code in `tools/` and link it — a lesson with a
   working script attached is worth ten without one.

### Template

```markdown
# L00N — <symptom in one line>

**Filed:** YYYY-MM-DD · **By:** <branch/session> · **Cost:** <time lost / what nearly shipped>

## Symptom
What you saw. The literal error or wrong output.

## What it actually was
The real cause — especially if the obvious diagnosis was wrong.

## The fix
Copy-pasteable. Commands, flags, code. Assume the reader is tired and in a hurry.

## The rule
One sentence a future session should follow so this never recurs.
```

---

## The meta-lesson

Three of the four lessons here are the same failure in different clothes:
**believing you observed something you actually inferred.**

- L001 — inferred "the environment blocks browsers" from one failed launch
- L002 — inferred a page's contents while looking at the wrong theme
- L003 — inherited a "confirmed bug" that had never been reproduced

The repo already had a name for this before I arrived. From
`BRIEF-FOR-WEB-ENABLED-BUILDER.md`:

> *"Never claim you viewed a page you could not load. Assertion without observation is
> the failure mode here."*

It is still the failure mode. Assume it will be yours too, and design against it: assert
what you're looking at, reproduce before you fix, and say "I did not check this" out loud.
