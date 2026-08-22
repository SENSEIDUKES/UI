# SEIHOUSE-UI — Phase 1 Component Lab

**Repo:** `SENSEIDUKES/SEIHOUSE-UI`  
**Purpose:** Practical UI playground for exploring reusable components, visual directions, and a flexible design foundation.  
**Status:** Phase 1 UI-only component lab. This is **not** the final SEIHouse brand system.

---

## Installed packages

Phase 1 installed the requested UI dependencies:

```bash
npm install tailwindcss @tailwindcss/postcss tailwind-variants tailwind-merge lucide-react
```

`clsx` was already present in the project and is used by the class-name utility.

## Tailwind setup

- Added `postcss.config.mjs` using `@tailwindcss/postcss` for Tailwind CSS v4.
- Updated `app/globals.css` to include:

```css
@import "tailwindcss";
```

- Preserved the existing `--sh-*` CSS custom properties and useful global styles so the lab can keep using the current token language while Tailwind utilities power the new component layer.

## Components created

New Phase 1 component structure:

```text
components/
  sei/
    styles/
      cn.ts
      variants.ts
    primitives/
      sei-button.tsx
      sei-badge.tsx
      sei-panel.tsx
      sei-card.tsx
      sei-section.tsx
    particles/
      media-card.tsx
      player-shell-preview.tsx
      registry-seal.tsx
      showcase-block.tsx
    showcase-page.tsx
```

### Utility layer

- `cn.ts` combines `clsx` and `tailwind-merge` so class overrides work predictably.
- `variants.ts` centralizes `tailwind-variants` definitions for buttons, badges, panels, cards, sections, and registry seals.

### Primitives

- `SEIButton` — variants, sizes, accessible focus states, optional Lucide icons, loading state, disabled state, and class overrides.
- `SEIBadge` — variants for category, status, registry, and experimental labels with optional icons and class overrides.
- `SEIPanel` — flexible container with visual variants, padding options, interaction state, and class overrides.
- `SEICard` — reusable card layout with media, eyebrow, title, description, metadata, actions, footer, and content slots.
- `SEISection` — consistent showcase section wrapper with eyebrow, title, description, aside, spacing, and content slots.

### Particles

- `MediaCard` — mock content card for albums, artists, projects, fragments, and showcase items. Composes `SEICard`, `SEIBadge`, and `SEIButton`.
- `PlayerShellPreview` — visual-only future player shell with artwork placeholder, track info, mock progress, mock controls, and no playback behavior.
- `RegistrySeal` — visual status indicator for `draft`, `registered`, `verified`, `archived`, and `experimental` states.
- `ShowcaseBlock` — reusable block for displaying component examples, notes, and grouped demos.

## Showcase page

The homepage (`app/page.tsx`) now renders the Phase 1 component showcase. The existing `/lab` route also renders the same showcase with a `/lab` route label.

Showcase sections:

1. Intro / Mission
2. Buttons
3. Badges
4. Panels
5. Cards
6. Media Cards
7. Player Shell Preview
8. Registry Seals
9. Style Lanes

Style lanes demonstrated:

- Clean / default
- Soft
- Dark
- Light
- Glass Test
- Media Test

## Deferred features

Phase 1 intentionally does **not** include:

- Backend integrations
- Authentication
- Audio playback functionality
- Registry verification logic
- CLI tooling
- Component registry generation
- Base UI / React Aria behavior primitives
- Magic UI-style motion systems
- Final SEIHouse brand-system decisions

## Issues encountered

- `npm install` completed successfully, but npm reported `2 moderate severity vulnerabilities` in the dependency tree. No automatic fix was applied because `npm audit fix --force` can introduce breaking changes and is outside the Phase 1 UI scope.

## Run instructions

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the component showcase.  
Open [http://localhost:3000/lab](http://localhost:3000/lab) for the same lab view with the `/lab` route label.

Production build check:

```bash
npm run build
```

## Phase 2 — Music-Business Particles

Phase 2 evolved the generic component lab into a music-business UI lab while preserving the Phase 1 architecture and constraints.

### Components added

New Phase 2 particles:

```text
components/
  sei/
    particles/
      action-strip.tsx
      album-card.tsx
      artist-card.tsx
      dojo-module-card.tsx
      metric-card.tsx
      player-shell-expanded.tsx
      plugin-slot-preview.tsx
      registry-panel.tsx
      showcase-hero.tsx
      vault-fragment-card.tsx
      index.ts
    examples/
      mock-data.ts
      index.ts
```

- `AlbumCard` — album/EP/single preview particle with artwork, release metadata, tags, description, and actions. Local variants include `default`, `compact`, `feature`, `dark`, `light`, and `media-test`.
- `ArtistCard` — creator/artist profile particle with avatar, role, bio, status, tags, and actions. Local variants include `default`, `compact`, `profile`, `dark`, and `light`.
- `VaultFragmentCard` — visual card for demos, mixes, notes, archives, fake duration, and recovery/archive status. Local variants include `default`, `recovery`, `archive`, `compact`, and `dark`.
- `DojoModuleCard` — education/training particle for modules, difficulty, category, progress, and status. Local variants include `default`, `lesson`, `template`, `skill`, `dark`, and `light`.
- `ShowcaseHero` — reusable hero section for lab, portal, media, or experimental previews. Local variants include `clean`, `soft`, `dark`, `light`, `media`, and `experimental`.
- `PlayerShellExpanded` — richer visual-only SAP/player mock with artwork, fake controls, fake timeline, queue, and metadata/environment area. Local variants include `compact`, `expanded`, `docked`, `dark`, and `light`.
- `RegistryPanel` — reusable registry/status product particle composed from `SEIPanel`, `RegistrySeal`, `SEIBadge`, and `SEIButton`.
- `PluginSlotPreview` — visual placeholder for future plugin slots such as SAP, Vault Radio, Environment Engine, Registry Seal, and Creator Tools.
- `MetricCard` — dashboard stat card for plays, saves, registered works, vault items, active modules, revenue-style metrics, and completion values.
- `ActionStrip` — responsive action row composed from `SEIButton` for primary, secondary, and optional icon actions.

### Files changed

- Added realistic mock data in `components/sei/examples/mock-data.ts` for Album, Artist, Vault Fragment, Dojo Module, Registry Item, Showcase Entry, Player Track, and dashboard metrics.
- Added simple barrel exports in `components/sei/examples/index.ts` and `components/sei/particles/index.ts`.
- Updated `components/sei/showcase-page.tsx` into a one-page Phase 2 music-business lab with sections for:
  1. Intro / Mission
  2. Primitive Foundation
  3. Music-Business Particles
  4. Experience Blocks
  5. Registry / Status
  6. Dashboard / Utility
  7. Style Lanes

### Mocked features

- Albums, artists, vault fragments, Dojo modules, registry records, showcase entries, player tracks, plugin slots, metrics, and dashboard actions are mocked only.
- Player controls and timelines are visual-only. There is no audio element, playback state, queue logic, media-session behavior, or streaming integration.
- Registry states, IDs, seals, timestamps, and verification lines are fake display data only.
- Plugin slots are placeholders only and do not load plugins or connect to runtime systems.

### Deferred features

Phase 2 intentionally does **not** add:

- Backend/API logic
- Audio playback
- Authentication
- Supabase or database packages
- Registry databases or verification services
- SAP/Vault runtime behavior
- CLI tooling
- Base UI, React Aria, Motion/Framer Motion, or audio libraries
- Final brand-system lock-in

### Issues encountered

- One interrupted write occurred while updating the showcase, so the file was verified afterward before continuing.
- No new packages were installed.

### Recommended Phase 3 work

1. Add prop documentation and usage examples for each Phase 2 particle.
2. Consider a lightweight component index page or route grouping if the one-page lab becomes too dense.
3. Add accessibility review passes for keyboard focus order, button labeling, landmark structure, and visual contrast.
4. Decide whether any particle-local variant patterns should graduate into the global primitive variant system.
5. Add snapshot or smoke tests for rendering the showcase and all particles with mock data.
6. Explore behavior primitives only after choosing a strategy; do not add Base UI or React Aria unless Phase 3 explicitly approves it.
7. Define richer mock flows for SEA Portal, Vault Radio, SAP, Dojo, and Registry concepts before adding real service logic.

---

# Phase 3 — Accessible Behavior Primitives

**Status:** First phase to add headless behavior libraries. Behavior comes from Base UI and React Aria; **all visual styling stays in the SEIHouse Tailwind / tailwind-variants system.** Still no backend, audio, auth, or brand lock-in.

## Packages installed

```bash
npm install @base-ui/react react-aria-components
```

- `@base-ui/react` (v1.5.x) — the current official package name for Base UI (the `mui/base-ui` headless library). The older `@base-ui-components/react` RC name was **not** used.
- `react-aria-components` (v1.18.x) — Adobe React Aria Components.
- Nothing else was added: no Motion/Framer Motion, no audio libraries, no Supabase/auth/database, no CLI tooling.

## Behavior components added

All live in `components/sei/behavior/` (separate from Phase 1 `primitives/` and Phase 2 `particles/`). Every component is a `"use client"` component, accepts `className`, merges via `cn()`, and uses local `tv()` variants with `--sh-*` tokens plus the shared `focusRing` / `transitionSurface` from `styles/variants.ts`.

| Component                                                                  | File                       | Library               | Variants                                                                   |
| -------------------------------------------------------------------------- | -------------------------- | --------------------- | -------------------------------------------------------------------------- |
| `SEIDialog` (+ Trigger/Content/Title/Description/Close)                    | `sei-dialog.tsx`           | Base UI Dialog        | `default, soft, dark, light, glass-test`                                   |
| `SEIDrawer` (+ Trigger/Content/Header/Body/Footer/Title/Description/Close) | `sei-drawer.tsx`           | Base UI Dialog        | side `right/left/bottom` · size `compact/default/wide` · tone `dark/light` |
| `SEITabs` (+ List/Trigger/Panel)                                           | `sei-tabs.tsx`             | Base UI Tabs          | `default, underline, pill, panel, dark, light`                             |
| `SEIPopover` (+ Trigger/Content/Title/Description/Close)                   | `sei-popover.tsx`          | Base UI Popover       | `default, soft, dark, light`                                               |
| `SEITooltip` (+ Provider/Trigger/Content)                                  | `sei-tooltip.tsx`          | Base UI Tooltip       | `default, dark, light`                                                     |
| `SEIComboboxPreview`                                                       | `sei-combobox-preview.tsx` | React Aria Components | n/a (mock search)                                                          |
| `SEICommandPreview`                                                        | `sei-command-preview.tsx`  | React Aria Components | n/a (grouped mock palette)                                                 |

Mock data for the previews lives in `components/sei/behavior/behavior-mock.ts` (artist/vault-tag combobox options, grouped command palette). A barrel `components/sei/behavior/index.ts` re-exports everything.

## Base UI usage

- **Dialog** (`@base-ui/react/dialog`): `Root/Trigger/Portal/Backdrop/Popup/Title/Description/Close`. Provides focus trap, Escape, scroll lock, outside-click dismissal, and focus return to the trigger. Open/close transitions use the `data-[starting-style]` / `data-[ending-style]` / `data-[open]` attributes with CSS transitions only.
- **Drawer**: SEIDrawer is built on the **Dialog** primitive (not the newer Base UI `drawer` primitive). The Dialog popup is a plain portalled element, which lets SEIHouse fully own side/bottom positioning, sizing, and slide direction without fighting the Drawer's built-in swipe/viewport transforms. Accessibility guarantees are identical (Dialog).
- **Tabs** (`@base-ui/react/tabs`): `Root/List/Tab/Indicator/Panel`. Roving-tabindex arrow-key navigation, `data-[selected]` active state, `disabled` triggers, and `Tabs.Indicator` (driven by `--active-tab-*` CSS vars) for the underline/pill variants.
- **Popover** (`@base-ui/react/popover`): `Root/Trigger/Portal/Positioner/Popup/Arrow/Title/Description`. Anchored positioning (flip/shift) via `Positioner` (`side`/`align`/`sideOffset` exposed as props).
- **Tooltip** (`@base-ui/react/tooltip`): `Provider/Root/Trigger/Portal/Positioner/Popup`. `SEITooltipProvider` sets a shared open `delay`; tooltips open on hover **and** keyboard focus.

Triggers use Base UI's `render` prop so existing SEIHouse components compose as triggers (e.g. `<SEIDialogTrigger render={<SEIButton…/>} />`, `<SEIPopoverTrigger render={<…RegistrySeal/>} />`). React 19 passes `ref` as a regular prop, and the Phase 1/2 components spread props to their DOM node, so behavior + ref flow through without `forwardRef`.

## React Aria usage

- **SEIComboboxPreview**: `ComboBox` + `Label` + `Input` + `Button` + `Popover` + `ListBox` + `ListBoxItem`. Type-to-filter (built-in `contains`), arrow/Enter/Escape navigation, associated label, and an empty state via `ListBox renderEmptyState`.
- **SEICommandPreview**: `Autocomplete` + `useFilter` + `SearchField`/`Input` + `Menu` + `MenuSection` + `Header` + `MenuItem`. `Autocomplete` keeps focus in the search field while forwarding arrow/Enter navigation into the grouped menu; `Menu renderEmptyState` covers no-matches. `onAction` is a mock callback — nothing executes.

## Accessibility notes

- **Dialog / Drawer:** focus trap, Escape close, outside-click (backdrop), scroll lock, and focus return to trigger — all native to Base UI Dialog. `Title`/`Description` are wired for screen readers (where a card is shown instead of text, an `sr-only` title/description is provided).
- **Tabs:** roving tabindex, arrow/Home/End navigation, `aria-selected`, disabled state, and a visible focus ring (`focusRing`).
- **Popover:** keyboard dismissal and focus management native to Base UI. Triggers are real focusable `<button>`s.
- **Tooltip:** reachable by keyboard focus (not hover-only) and has an open delay. Each trigger is a focusable button/control.
- **Combobox / Command:** full React Aria listbox/menu semantics, labelled inputs, keyboard navigation, and empty states.
- Every interactive element keeps the shared `focusRing` for a visible focus-visible state on the dark theme.

## Mocked features

- Combobox options (artists, vault tags) and the command palette groups (Albums, Vault, Registry, Dojo, Creator Tools) are static mock data.
- Dialog/drawer actions ("Confirm", "Tag fragment", "Register work") do nothing. Command selection only calls a mock `onCommand`.
- The bottom-drawer "player queue" is a static list — no audio or queue logic.

## Deferred / weak spots

- **Native Base UI Drawer** (swipe gestures + snap points) is available and could replace the Dialog-based SEIDrawer in a future phase if drag-to-dismiss is wanted.
- **SEICommandPreview** is a _preview_: it is a filtered menu, not a global command system (no global hotkey to open, no recent/most-used ranking, no nested command execution).
- **SEIComboboxPreview** is single-select preview only — no multi-select tag chips, async loading, or create-new-option behavior yet.
- Popover/Tooltip arrows are minimal; arrow styling was kept simple and is opt-in (`showArrow`).
- Reduced-motion: transitions are short CSS transitions; no explicit `prefers-reduced-motion` gating was added yet.

## Issues encountered

- The task spec said `@base-ui/react`; confirmed via npm that this is the correct current official package (repo `mui/base-ui`), with `@base-ui-components/react` being the older RC name. Used `@base-ui/react`.
- `npm install` reports 2 pre-existing moderate advisories (unchanged from earlier phases); no `audit fix --force` was run to avoid breaking-change upgrades.
- No headless browser was available in the environment, so verification was done via `next build` + `next start` HTTP smoke tests rather than captured screenshots.

## Verification

- `npm run build` passes (Next 15 / React 19, TypeScript type-check clean).
- `npm run start` serves `/` and `/lab` with HTTP 200; the "04 / Behavior Primitives" section (`id="behavior"`) renders all seven components.

## Recommended Phase 4 next steps

1. Adopt the native Base UI **Drawer** primitive for swipe-to-dismiss / snap points where it improves mobile UX.
2. Promote `SEIComboboxPreview` to a real multi-select tag input and wire the command palette to a global hotkey.
3. Add automated tests (Playwright/axe) for keyboard flows and ARIA correctness across the behavior layer.
4. Add `prefers-reduced-motion` handling and a shared motion strategy (still without Motion/Framer unless approved).
5. Consider graduating the behavior `tv()` surfaces into shared tokens in `styles/variants.ts` if the variant sets stabilize.
6. Only after behavior + visual direction settle: revisit real data, auth, and registry/SAP/Vault services.

---

---

# Phase 4 — Behavior Hardening, Mobile Drawer, A11y Tests, Reduced Motion, Variant Cleanup

**Status:** Hardening phase. Strengthens the Phase 3 behavior layer for real apps — native drawer, multi-select tagging, a global command palette, automated a11y tests, a reduced-motion strategy, and promoted shared variants. Still mock-only; brand not locked.

## Packages installed

```bash
npm install vaul
npm install -D @playwright/test @axe-core/playwright
```

- `vaul@1.1.2` — drawer with swipe/snap (peer-supports React 19; built on Radix Dialog).
- `@playwright/test@1.60` + `@axe-core/playwright@4.11` (dev) — accessibility + keyboard tests.
- No Motion/Framer, audio, backend, auth, Supabase, or CLI tooling added.

## Drawer strategy chosen

Added a **new** `components/sei/behavior/sei-native-drawer.tsx` built on **vaul** (drag-to-dismiss, snap points, drag handle) for the native/mobile feel. The Phase 3 `sei-drawer.tsx` (Base-UI-Dialog modal drawer) is **kept** for lighter non-gesture modal drawers — no breaking change. vaul gives Radix Dialog accessibility (focus trap, Escape, scroll lock, focus return); SEIHouse owns all styling via `seiNativeDrawerStyles` (`side` bottom/left/right, `size` compact/default/wide, `tone` default/soft/dark/light/glass-test). vaul uses Radix `asChild` (not Base UI's `render`), so drawer triggers/closes in the showcase are styled directly with `seiButtonVariants`.

## Behavior components added / upgraded

| Component                                                                        | File                                    | Library                                    |
| -------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------ |
| `SEINativeDrawer` (+ Trigger/Content/Header/Body/Footer/Title/Description/Close) | `sei-native-drawer.tsx` (new)           | vaul                                       |
| `SEIMultiSelectCombobox`                                                         | `sei-multi-select-combobox.tsx` (new)   | React Aria + styled chips                  |
| `SEICommandPalette`                                                              | `sei-command-palette.tsx` (new)         | Base UI Dialog + React Aria + custom fuzzy |
| `fuzzyMatch` / `highlightSegments`                                               | `fuzzy.ts` (new)                        | —                                          |
| `SEICommandPreview` / `SEIDialog` / `SEIPopover`                                 | refactored to consume promoted variants | —                                          |

Showcase: new client component `behavior-hardening-showcase.tsx` rendered from a new “05 / Behavior Hardening” `SEISection` on `/` and `/lab` (later sections renumbered 06–09; Phase 3 section preserved).

## Command palette: fuzzy-search approach

`fuzzy.ts` implements a tiny dependency-free **case-insensitive subsequence matcher**: every query char must appear in order (so `ovf` → “Open Vault Fragments”). It returns matched indices (for highlighting) and a small score that rewards consecutive + word-boundary hits. It is wired to React Aria `Autocomplete`'s `filter={(textValue, input) => fuzzyMatch(textValue, input).matched}`, with the palette's input controlled via `inputValue`/`onInputChange`. Matched characters are emphasised with `highlightSegments` + a `<mark>` in sea blue.

## Recent commands strategy

`SEICommandPalette` keeps a `recentIds` state seeded from `mockRecentCommandIds`, hydrated from and persisted to `localStorage` (SSR-guarded, deduped, capped at 6). Selecting a command moves it to the front. A “Recent Commands” `MenuSection` renders at the top **only when the query is empty**. Recent items use composite menu keys (`group::id`) to keep React Aria collection keys unique versus their home group.

## Tests added

- `playwright.config.ts` — chromium project; `webServer` runs `npm run build && npm run start` on port 3100 (pre-compiled routes avoid dev lazy-compile flakiness); `reuseExistingServer` locally.
- `tests/accessibility/lab-accessibility.spec.ts` — `/` and `/lab` load (navigation landmark + `#behavior-hardening`); axe scans assert **no critical** violations and log serious ones.
- `tests/accessibility/behavior-keyboard.spec.ts` — dialog keyboard-open + Escape + focus return; native drawer open/close; tab arrow navigation; palette Ctrl+K **and** Meta+K; fuzzy `ovf` match; recent-commands section + virtual-focus; multi-select focus + select adds a chip; focus-visible class wired.
- Scripts: `test:e2e` (`playwright test`), `test:a11y` (`playwright test tests/accessibility`).
- **Run:** `npx playwright install` once, then `npm run test:a11y` / `npm run test:e2e`.
- **Result:** 12/12 passing locally (chromium).

## Reduced-motion strategy

- New `components/sei/styles/reduced-motion.ts` — `motionSafe` / `motionSafeTransform` / `motionSafeFade` utility constants, a `prefersReducedMotion()` runtime check, and `reducedMotionNotes` (shown in the lab).
- `app/globals.css` — a scoped `@media (prefers-reduced-motion: reduce)` block that **shortens** animations/transitions and disables smooth scrolling rather than deleting all transitions, preserving essential state-change feedback.
- Principle: motion is optional; primitives work without it; interaction never depends on an animation; future motion components must honour the preference and fall back to instant state.

## Variants promoted to styles/variants.ts

- `seiOverlayVariants` — modal/drawer scrim (used by dialog + command palette).
- `seiPopupSurfaceVariants` — `default/soft/dark/light/glass-test` floating-surface tones.
- `seiInteractiveItemVariants` — focused/selected/disabled item states (menus, comboboxes, commands).
- `seiCommandGroupHeader` — grouped-menu section header.
  Component-specific styling (drawer side/size, tabs indicator) intentionally stays local.

## Mocked features

All combobox options, command groups, recent history, drawer contents, and palette actions are static mock data. `onCommand` / `onChange` are demo callbacks — nothing navigates or executes.

## Known issues / weak spots

- **React Aria `TagGroup` crash:** rendering RAC `TagGroup`/`Tag` for the multi-select chips threw `Cannot destructure property 'onAction'` (a collection-context bug in the current RAC version). Worked around by rendering selected chips as a styled `<ul>` of accessible remove buttons (click or Backspace-to-remove). Revisit RAC `TagGroup` in a future version.
- **axe `color-contrast` (serious):** the exploratory **light/glass style lanes** use low-contrast muted text on light surfaces. Surfaced as a non-blocking warning in the a11y suite; to be resolved when the brand/tokens are finalised (out of scope while unlocked).
- **axe `scrollable-region-focusable`:** disabled in tests — React Aria's always-visible command/list menus use roving virtual focus rather than a tabbable scroll container (valid composite-widget pattern).
- Command palette is still a preview (no real navigation, no nested/async commands). Fuzzy ranking exists but results are not reordered by score yet.
- No headless browser ships in this environment by default; `npx playwright install` downloads chromium (~175 MB).

## Recommended Phase 5 next steps

1. Rank palette results by fuzzy score and add command categories/aliases; consider nested commands.
2. Revisit RAC `TagGroup` once the upstream bug is fixed; add async/create-new options to the multi-select.
3. Add a motion layer (still reduced-motion-gated) and decide whether to adopt a motion library.
4. Resolve light/glass-lane contrast as part of finalising tokens; expand axe coverage to open overlays (dialog/drawer/palette) and add `axe` checks in the opened state.
5. Add visual-regression snapshots and CI wiring for `test:e2e`.
6. Only after behavior + visual direction settle: real data, auth, and registry/SAP/Vault services.

---

## Historical Phase 1 suggested work

1. Add accessibility-focused behavior primitives using Base UI or React Aria patterns.
2. Add automated visual examples or Storybook-style isolated previews if desired.
3. Define a stricter token strategy once visual lanes have been evaluated.
4. Add motion experiments inspired by Magic UI, gated behind reduced-motion-friendly patterns.
5. Add keyboard and focus behavior for future interactive media/player shells.
6. Create component usage documentation and prop tables.
7. Decide whether legacy `components/ui`, `components/seihouse-core`, and `components/sea-ui` should be migrated, deprecated, or kept as reference material.

---

## This lab is exploratory by design. Components should remain adaptable until the final SEIHouse product and brand direction is established.

# Phase 5 — SEIHouse Component Workbench (internal design review)

The all-in-one showcase became too overwhelming to judge individual designs, so the repo
is now an internal design inspection tool. Nothing was deleted — the original showcase
moved to `/lab/raw` (`/lab` redirects there).

## Routes

- `/` — Workbench Home: what the workbench is, section links, and a Design Review Queue
  (Needs review / Experimental / Approved foundation) computed from the registry.
- `/workbench` and `/workbench/[slug]` — one component at a time. Left: searchable grouped
  component list. Center: solo preview on a controllable canvas. Right: variant selector,
  mock-data selector, canvas (dark/light/plain/glass), width (mobile/tablet/desktop),
  mode (solo/variants/context), status badge, and design notes (What works / What feels
  wrong / Change request / Founder verdict — saved to localStorage per component).
- `/gallery` — shadcn-style grouped text list, no previews.
- `/contexts` — components inside product situations (SEA Portal shell, album world hero,
  vault fragment list, SAP player dock, registry confirmation, creator dashboard, plugin
  settings drawer). Review environments, not final designs.
- `/lab/raw` — the preserved Phase 1–4 showcase.

## Component registry

`components/sei/registry/component-registry.ts` holds one entry per reviewable component:
name, slug, category, layer (foundation / behavior / music-particle / registry / layout),
status (not-designed / rough / reviewing / approved-foundation / experimental), plain
description, variants, mockDataOptions, preview component, context examples, and a
reviewNotes placeholder. Previews live in `registry/previews.tsx`; context environments in
`registry/context-registry.tsx`; the shell in `components/sei/workbench/`.

## Bug fixed along the way

`app/globals.css` had an **unlayered** `* { margin:0; padding:0 }` reset and
`button { border:none; background:none }`. Tailwind v4 emits utilities inside
`@layer utilities`, and unlayered CSS beats layered CSS, so every margin/padding/border/
background utility was being silently overridden (buttons rendered with no background,
cards with no padding). The custom reset/base styles now live inside `@layer base`.

## Verification

- `npm run build` — all routes compile; 26 workbench slugs prerendered.
- `npm run test:a11y` — 14/14 pass: existing keyboard/ARIA specs now run against
  `/lab/raw`; axe scans cover `/`, `/workbench`, and `/lab/raw`.

## Statuses are placeholders

Component statuses in the registry are starting points for review, not decisions. The
founder moves things between rough / reviewing / approved as designs get judged.

---

# Phase 6 — Foundation Gap Audit + Core UI Infrastructure

A senior design-system audit of the platform **before** real product UI (Vault, Audio
Player, Registry/SEA, Dojo) is built. Goal: turn the repo from a component _showcase_ into
a production-ready **Core UI Infrastructure Layer** — standardized application states,
form primitives, layout shells, scroll/overflow systems, media fallbacks, and consolidated
surface / elevation / layering utilities — while staying mock-only and brand-unlocked.

Scope decisions (with the founder): **broad core, defer heavy**; **promote design tokens
into the package** so `@seihouse/ui` is self-contained; **new `/foundations` diagnostics
route**.

## Audit summary

The Phase 1–5 foundation is directionally correct: strong primitives, accessible behavior
components, app-shaped particles, and a review workbench. But the layer that production
apps lean on every day was missing or scattered:

- **No standardized application states** — no skeleton / spinner / empty / loading / error
  / success / progress / status primitives. Each future screen would reinvent them.
- **No form primitives** — only the combobox family existed; no field/input/textarea/
  select/switch/checkbox/radio/slider.
- **No layout shells** — no app shell, page header, toolbar/action bar, filter bar, split
  pane, sticky footer, safe-area, or container helper.
- **No scroll/overflow system** — overflow was ad-hoc across ~17 files; no shared scroll
  area, scroll shadows, horizontal lanes, or keyboard-accessible scroll containers.
- **No media fallbacks** — broken images, avatars, aspect-ratio, and compact media rows
  were hand-rolled inside particles.
- **Scattered infrastructure** — z-index literals (`z-40`/`z-50`) in 12 files, and surface
  / glass / glow Tailwind strings duplicated across primitives and particles.
- **Tokens lived only in the app** (`apps/workbench/app/globals.css`), so the package was
  not self-contained.

## Foundation gaps discovered

| Area         | Gap                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Visual infra | Tokens app-only; no z-index scale; surface/glass/glow strings duplicated                            |
| States       | No empty/loading/skeleton/spinner/error/success/progress/status primitives                          |
| Forms        | No field/input/textarea/select/switch/checkbox/radio/slider                                         |
| Layout       | No app shell/page header/toolbar/action bar/filter bar/split pane/sticky footer/safe area/container |
| Scroll       | No scroll area, scroll shadows, horizontal lanes, or shared scrollbar styling                       |
| Media        | No thumbnail/avatar/aspect-ratio/media-row; no broken-image handling                                |
| Interaction  | Hover/active/focus/disabled/selected/loading not centralized                                        |
| Diagnostics  | Workbench exposed finished components, not the infrastructure underneath                            |

## Infrastructure implemented

### Core visual infrastructure (package-owned)

- **`styles/tokens.css`** — design tokens promoted out of the workbench into the package
  (single source of truth, imported by `globals.css`). Brand tokens unchanged. **New
  infrastructure tokens:** z-index layering scale (`--sh-z-base…toast`), elevation scale
  (`--sh-elevation-0…5`), glass/blur (`--sh-blur-*`, `--sh-glass-*`), glow (`--sh-glow-*`),
  scroll-shadow gradients, and mobile safe-area insets (`--sh-safe-*`). The
  prefers-reduced-motion block moved here too.
- **`styles/layering.ts`** — `SEI_Z_INDEX` (numeric) + `seiLayer` (Tailwind classes); the
  shared overlay scrim and sticky regions now reference it instead of literals.
- **`styles/surfaces.ts`** — `seiSurfaceVariants` (surface × elevation × glow) plus
  `seiGlass` / `seiGlowSea` / `seiGlowAccent`, consolidating repeated treatments.
- **`styles/variants.ts`** — added `interactionStates` (hover / active-pressed /
  focus-visible / disabled / selected / busy) as one shared expression.

### State primitives — `src/states/`

`SEISkeleton`, `SEISpinner`, `SEIProgressBar` (+ pure `clampProgress`), `SEIStatusDot` /
`SEIStatusLine`, `SEIEmptyState`, `SEILoadingState`, `SEIErrorState`, `SEISuccessState`.
Application-agnostic, share a consistent `StateShell`, real a11y (`role`, `aria-live`,
`sr-only` labels), reduced-motion safe.

### Form primitives — `src/forms/`

`SEIField` (label / helper / error / required / disabled, compact|comfortable sizing) +
`seiFieldControlVariants`, `SEIInput`, `SEITextarea`, `SEISelect` (styled native), and
React-Aria-based `SEISwitch`, `SEICheckbox`, `SEIRadioGroup`/`SEIRadio`, `SEISlider`.
Practical primitives, not a form framework.

### Layout primitives — `src/layout/`

`SEIContainer`, `SEIAppShell`, `SEIPageHeader`, `SEIToolbar`/`SEIActionBar`, `SEIFilterBar`,
`SEISplitPane` (static; draggable resize deferred), `SEIStickyFooter`, `SEISafeArea`.
Semantic landmarks; sticky regions use the shared layering scale and safe-area tokens.

### Scroll/overflow — `src/scroll/`

`SEIScrollArea` (styled scrollbar, top/bottom scroll shadows, keyboard-accessible,

- pure `getScrollShadows` helper) and `SEIScrollLane` (horizontal snap lane).

### Media — `src/media/`

`SEIAspectRatio`, `SEIThumbnail` (broken-image fallback + lazy/async), `SEIAvatar`
(image → initials fallback), `SEIMediaRow` (compact, list-friendly).

### Workbench — Foundation Diagnostics

New `/foundations` route (tabbed, mirrors `/contexts`) that exposes the _infrastructure_
rather than finished components: typography & token scales; surfaces / elevation / blur /
glass / glow; interaction states; application states; form states; layout shells; scroll &
overflow; media fallbacks; overlay/portal layering; mobile safe-area; dense list mode;
reduced motion. Linked from the nav and the home page.

### Tests

Vitest unit tests for the pure helpers (`clampProgress`, `getScrollShadows`, layering
scale). New Playwright/axe spec `test/accessibility/foundations.spec.ts` covering the
`/foundations` route (no critical/serious violations) and keyboard interaction for the new
form + scroll primitives. Existing a11y specs continue to pass.

## Intentionally deferred (documented for later)

- **Virtualized lists** for Vault-scale datasets — premature without real data; revisit
  with `@tanstack/react-virtual` when list sizes and row shapes settle.
- **Dense-mode data table** — `SEIMediaRow` + scroll area cover dense lists for now; a full
  sortable/virtualized table is a later phase.
- **Draggable `SEISplitPane` resize** — shipped static; add pointer-driven resize + storage
  later.
- **Motion layer / motion library** — reduced-motion scaffolding is in place; no Framer/
  Motion adopted yet (avoid large deps until interactions are designed).
- **Storybook** — the workbench + `/foundations` already serve as the review surface; not
  justified yet.
- **Light/glass contrast** — still surfaced as non-blocking axe `serious` findings; resolve
  when brand tokens are finalized.
- **Performance work** — blur/glass budget guidelines, image strategy, and large
  command-menu virtualization documented as recommendations, not yet enforced.

## Verification

- `pnpm typecheck` — package + workbench clean.
- `pnpm build` — all routes compile, including `/foundations`.
- `pnpm test:unit` — pure-helper unit tests pass.
- `pnpm test:a11y` — existing specs + new foundations spec pass (needs
  `npx playwright install` for chromium).

## Recommended next steps

1. Adopt virtualization for the first real Vault list; promote a dense table primitive.
2. Add the motion layer (still reduced-motion-gated) once premium interactions are designed.
3. Resolve light/glass contrast as part of finalizing brand tokens.
4. Wire CI (typecheck + unit + a11y) now that the foundation is stable.

# Phase 7 — Consolidate Foundation, CI, Core App Primitives

## What changed

- **Foundation primitives are now reviewable.** Phase 6 state, form, layout, scroll, and
  media primitives were added to the workbench registry with per-component previews and
  gallery grouping. New layers: States, Forms, and Media; layout and scroll stay under
  Layout.
- **New review contexts.** Added a form/state registry intake context and a layout/media
  list context so foundation pieces can be judged inside realistic app surfaces.
- **Ship-readiness tooling.** Added GitHub Actions CI for install, typecheck, unit tests,
  lint, build, Playwright browser install, and a11y tests. Added flat ESLint and Prettier
  configs plus root `lint`, `format`, and `format:check` scripts.
- **Menu / Dropdown.** Added `SEIMenu` parts on Base UI Menu: trigger, content, item,
  checkbox item, radio group/item, group, label, and separator. Styling reuses shared
  popup surface, interactive item, command label, and layering utilities.
- **Toast / notifications.** Added `SEIToastProvider`, `useSEIToast()`, and pure
  `toastReducer`. Toasts render through a portal at the shared toast layer, support tones,
  dismiss buttons, auto-dismiss with hover/focus pause, and polite/assertive live regions.
- **Data Table.** Added semantic table parts, sticky sortable headers, compact/comfortable
  density, zebra/hover rows, checkbox selection, and pure stable `sortRows` /
  `compareSortValues` helpers. No virtualization was added.

## Tests

- Added Vitest coverage for `sortRows` (stable ordering, mixed numeric values, immutability,
  empty values last) and `toastReducer` (add, dismiss, dedupe, cap, clear).
- Added component a11y coverage for opened Menu axe scan, toast announcement, and Data Table
  sortable header / keyboard behavior.

## Still deferred

- Virtualized tables/lists.
- Motion layer / animation library.
- Draggable SplitPane resize.
- Light-mode and final brand/theming decisions.
- Storybook.

# Foundation — Default / SEA / SEN Style System

## What changed

- **One system, three expressions.** Added a `data-experience="default" | "sea" | "sen"`
  layer to `packages/seihouse-ui/src/styles/tokens.css`. `data-theme` still owns contrast
  (dark / light); `data-experience` owns product personality. They compose: every
  experience supplies both a dark-context and a light-context palette.
- **No forked components.** The experience layer only rewrites the semantic `--sh-*` roles
  components already consume, so no primitive gained an `experience` prop and no SEA/SEN
  copy of Button, Card, Panel, or Input exists. Applied at the document root, it also
  reaches portal-based overlays (dialog, drawer, popover, menu, toast).
- **Token wiring.** Introduced role tokens so the shared variants can express character
  instead of hard-coding it: `--sh-radius-control|field|panel|card`,
  `--sh-elevation-panel|card|hover`, `--sh-hover-border`, `--sh-glass-body|sheen|rim`,
  `--sh-atmosphere`, `--sh-field-surface|border|border-hover|border-focus`,
  `--sh-motion-*-duration` / `--sh-motion-ease`, and the type-mood tokens
  `--sh-font-display|reading`, `--sh-tracking-display`, `--sh-leading-reading`,
  `--sh-measure-reading` (system font stacks only — no remote font dependencies).
- **Backward-safe by construction.** The mapping blocks only apply under
  `[data-experience]`, and the `default` seeds restate the current dark/light values, so
  pages that set no experience — or set `default` — render as before.
- **Workbench Style control.** A new first control above Mode, in both the desktop
  controls and the mobile drawer. It persists in `localStorage`
  (`sei-workbench-experience`), survives component navigation and refreshes, defaults to
  Default on a first visit, and is independent of Mode / Canvas / Width. The selection is
  passed into the isolated preview iframe (including variants and contextual previews),
  where it lands on that document's root element.
- **Foundation page.** New first section, _Experience_: Default / SEA / SEN side by side
  through Button, Card, Panel (incl. glass), Input, Textarea, Bottom Navigation, and
  Navigation Drawer, with a dark/light toggle to check both themes per experience. Every
  column is identical markup — only the attribute on its root differs.

## Visual direction

- **Default — Modern.** Unchanged: the neutral, premium SEIHouse foundation.
- **SEA — Music.** Deeper blue-cast ink, wider spectral atmosphere, richer glow and glass
  depth, rounder containers, snappier easing.
- **SEN — Narrative.** Deep ink with subtle celestial warmth, gold interactive primary,
  calmer surfaces, squarer containers, slower easing, and a serif display voice for
  reading hierarchy.

## Tests

- Vitest: experience vocabulary + guards, and token-file invariants (a seed block per
  experience, dark/light seed parity across all three, and mapping scoped to
  `[data-experience]`).
- Playwright: Style options and default selection, propagation into the isolated preview
  document and the shell root, persistence across navigation and reload while Mode still
  resets, independence from Canvas / Width, contextual previews, mobile drawer with a 44px
  target, plus axe scans with a non-default style and on the Foundation proof.

## Still deferred

- Per-category adaptation of each component family to the three experiences.
- Light-mode glass treatment (glass surfaces still pin themselves to a dark contract).
- Final brand decisions; the palettes here are directional, not locked.
