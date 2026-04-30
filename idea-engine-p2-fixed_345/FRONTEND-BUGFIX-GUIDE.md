# Idea Engine v3 — 6 Frontend Bugs Found + Fixes

All bugs are in the builder's frontend conversion output. Backend is clean — no changes needed.

---

## BUG 1 — ScorePanel Meta section broken (P1)
**File:** `app/(dashboard)/idea/[id]/IdeaDetailClient.tsx` lines ~120-122
**Broken code:**
```tsx
<Section title="Meta">
  {[
    { label: 'Category', value: 'B2C / B2B' },
  ].filter(Boolean)}
```
**Root cause:** Builder dropped 3 of the 4 meta items (Time to MVP, Difficulty, Model) and hardcoded `'B2C / B2B'` instead of using `idea.category`. The `.filter(Boolean)` on an array of objects does nothing — every object is truthy. The result is a Meta section that shows nothing useful.
**Fix:** Restore all 4 meta items using actual idea properties. Add `idea` to `ScorePanel` props since it now needs `idea.time_to_mvp_days`, `idea.difficulty`, `idea.monetisation_model`, and `idea.category`. Update the call site to pass `idea`.

---

## BUG 2 — Cluster page is fully client-side (P1)
**File:** `app/(dashboard)/cluster/[id]/page.tsx`
**Broken code:** Entire file is `'use client'` with `useEffect` + `createClient()` from `@/lib/supabase/client` (browser client).
**Root cause:** Builder made the whole page a client component instead of following the server page + client component pattern used by every other page (Today, Runs, Idea Detail). This means no SSR, no `revalidate` caching, data fetched on the browser via the anon key, and a loading spinner flash on every visit.
**Fix:** Split into:
- `page.tsx` — Server Component using `createClient` from `@/lib/supabase/server`. Fetches cluster + posts, passes as props. Has `revalidate = 300`.
- `ClusterClient.tsx` — Client Component with `'use client'`. Receives `cluster` and `posts` as props. Handles the show more/less toggle.

---

## BUG 3 — body inline style in layout.tsx (P2)
**File:** `app/layout.tsx` line 16
**Broken code:**
```tsx
<body style={{ background: '#0A0A0B', color: '#FAFAFA', margin: 0 }}>
```
**Root cause:** `globals.css` already sets `body { background: var(--bg); color: var(--text); }` and the reset `* { margin: 0; }`. The inline style is redundant and contradicts the "no inline styles" rule.
**Fix:** Replace with Tailwind classes:
```tsx
<body className="bg-bg text-[#FAFAFA] m-0">
```

---

## BUG 4 — CSS variable circular reference (P2)
**File:** `app/globals.css` line 13
**Broken code:**
```css
--font-mono: var(--font-mono), 'Courier New', monospace;
```
**Root cause:** `--font-mono` references itself. This works by accident because Next.js injects `--font-mono` via a class on the `<html>` element, and CSS custom property resolution picks up the inherited value before the self-reference. But if the Next.js class is ever missing (e.g., during SSR flash, error boundary), the variable resolves to nothing and all mono text becomes `Courier New`.
**Fix:** Rename to `--font-code` to avoid the collision:
```css
--font-code: var(--font-mono), 'Courier New', monospace;
```
Note: Nothing in the codebase references `--font-code` — Tailwind's `font-mono` class reads from `tailwind.config.ts` which correctly uses `var(--font-mono)` from Next.js. The CSS var was dead code waiting to cause a bug.

---

## BUG 5 — RunsClient trigger response type missing `reason` (P3)
**File:** `app/(dashboard)/runs/RunsClient.tsx` lines 62-64
**Broken code:**
```tsx
const data = await res.json() as { success?: boolean; skipped?: boolean; error?: string; stats?: { ideasGenerated: number } };
// ...
setTriggerMsg(`Skipped — ${data.reason ?? "today's run already exists"}`);
```
**Root cause:** `data.reason` is accessed but `reason` is not in the type cast. TypeScript strict mode will error with `Property 'reason' does not exist`.
**Fix:** Add `reason?: string` to the type:
```tsx
const data = await res.json() as { success?: boolean; skipped?: boolean; reason?: string; error?: string; stats?: { ideasGenerated: number } };
```

---

## BUG 6 — Redundant inline `<style>` tags (P3)
**Files:** `app/login/page.tsx`, `app/(dashboard)/today/TodayClient.tsx`
**Broken code:**
```tsx
// login/page.tsx
<style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>

// TodayClient.tsx
<style>{`div::-webkit-scrollbar { display: none; }`}</style>
```
**Root cause:**
- Login's pulse keyframe is redundant — Tailwind's `animate-pulse` already provides this and is already used on the dot elements.
- Today's scrollbar hide targets ALL `div` elements globally, not just the carousel. Also, it's rendered inside the component so it mounts/unmounts with the page.

**Fix:**
- Delete the `<style>` tag from `login/page.tsx` entirely.
- Move scrollbar-hide CSS to `globals.css` as a utility class:
```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { scrollbar-width: none; }
```
- Add `scrollbar-hide` class to the carousel div in `TodayClient.tsx`.
- Remove the `scrollbarWidth: 'none'` from the inline style object on the same div.
- Delete the `<style>` tag from `TodayClient.tsx`.

---

## File Changes Summary

| Action | File |
|--------|------|
| MODIFIED | `app/(dashboard)/idea/[id]/IdeaDetailClient.tsx` — restored Meta, added idea prop to ScorePanel |
| REPLACED | `app/(dashboard)/cluster/[id]/page.tsx` — now server component |
| CREATED | `app/(dashboard)/cluster/[id]/ClusterClient.tsx` — extracted client component |
| MODIFIED | `app/layout.tsx` — inline style → Tailwind classes |
| MODIFIED | `app/globals.css` — fixed circular var, added scrollbar-hide utility |
| MODIFIED | `app/(dashboard)/runs/RunsClient.tsx` — added reason to type |
| MODIFIED | `app/login/page.tsx` — removed redundant style tag |
| MODIFIED | `app/(dashboard)/today/TodayClient.tsx` — removed style tag, added scrollbar-hide class |
