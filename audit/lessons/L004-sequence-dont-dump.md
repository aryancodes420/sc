# L004 — Correct work, delivered as a dump, is failed work

**Filed:** 2026-08-12 · **By:** `claude/dog-nook-theme-review-pbwho6` · **Cost:** the owner lost
the thread and said *"what the fuck are you on about"*. The findings were right. The
delivery made them worthless.

## Symptom

Mid-task, the owner had to ask me two questions in a row:

> "What did I ask you to do at the start of this chat"
> "What did the start here ask you to do"

When someone has to ask you to restate their own request, they've stopped being able to
follow you. Everything after that point is noise until you reset.

## What it actually was

I narrated **process** instead of reporting **outcomes**. A ~40-minute debugging detour
(L001) got streamed live — proxy flags, SPKI hashes, TLS chains — none of which the owner
needed or could act on. The one sentence that mattered, *"your bundle page claims a saving
that isn't true, and I can now prove it"*, was buried under infrastructure.

The repo had already warned me, twice, in writing:

- `START-HERE-NEXT-BUILDER.md` §3: *"Run #1 handed over ~40 findings at once. The owner's
  literal reply was 'you're confusing me more than helping.' A correct report that can't
  be acted on has failed."*
- `BRIEF-FOR-WEB-ENABLED-BUILDER.md` §5: *"the value you add is certainty, not more code."*

I read both, then did it anyway — because each individual update felt justified in
isolation. That's the trap: dumping is never one bad decision, it's twenty reasonable ones.

## The fix

**Ship this shape, every time:**

1. **One line: what changed for you.** Plain English, no filenames.
2. **The single most important thing**, with the evidence.
3. **Then at most three** supporting items.
4. **Then a table**, if there's a long tail.
5. **One clear ask** — the decision or approval you need.

**Rules of thumb**
- Debugging is invisible. Report the *outcome* ("browser works now"), never the journey —
  the journey goes in a lesson file like L001, where a future builder will actually want it.
- If a message has no ask in it, it probably shouldn't be sent yet.
- Say the finding before the method. "Your bundle page states a false saving" comes before
  how you verified it.
- Count the numbered items before sending. Over ~5, cut or table them.
- The owner is one person on a phone. Long is not thorough — long is expensive.

**Reset protocol.** If they ask what the task was, or say they're confused: stop, restate
their ask in their words, give the single headline finding, ask one question. Don't
explain how you got lost.

## The rule

**Lead with what it means for them, not what you did.** Detail is opt-in — file it where
it's findable and let them ask.
