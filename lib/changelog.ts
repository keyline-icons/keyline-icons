/**
 * The drawings the changelog shows when it announces the sharp treatment.
 *
 * **Curated, and it has to be.** This started as a spread — every nineteenth
 * name in `loadIcons` order — on the reasoning that a rule needs nobody to
 * refresh it and a list does. The rule picked six `circle-*` names out of
 * thirty, and a circle has no corners: the ring is the biggest thing in the
 * tile, it is identical in both treatments, and the only difference is a cap
 * buried inside it that nobody can see at 24px. A preview of a corner
 * treatment that leads with drawings having no corners is not a neutral
 * sample, it is an argument against its own sentence.
 *
 * So these thirty are chosen for what the treatment does to them: a right
 * angle losing its fillet, an apex going to a true point, a round cap going
 * square.
 *
 * **The order is load-bearing, because the grid fades out.** The mask takes
 * the bottom rows down to nothing, so the last six are decoration and the
 * first six carry the argument. The strongest cases lead — an apex going to a
 * true point, a window, a body with a lid — and the tail is the shapes that
 * make the same point more quietly. Sorting this list alphabetically, or
 * appending to it, puts the evidence under the fade.
 *
 * The maintenance the spread was avoiding is real and is handled instead by
 * `check-demos.mjs`, which resolves every `*_ICON_NAMES` list under `lib/`
 * against `icons/` and fails the build on a name that no longer exists. A
 * renamed drawing breaks the build here rather than quietly leaving a hole in
 * the grid, which is the property that made the rule attractive in the first
 * place.
 *
 * Three surfaces draw this: `/changelog`, the Paper board (which parses this
 * file, the way `build-paper.mjs` already parses `icon-taxonomy.ts`) and the
 * Figma Changelog page, which is drawn by hand and has to be re-drawn when
 * this list changes.
 */
/**
 * The release that introduced the corner treatment.
 *
 * The preview below belongs to that entry and stays with it: a changelog only
 * grows, so the release that announced sharp goes on showing what it announced
 * rather than handing the evidence to whatever is newest. It hung off the
 * `unreleased` block until v0.3.0 was tagged, at which point that block emptied
 * and took the preview with it — which is the bug this constant exists to stop
 * happening again.
 */
export const SHARP_RELEASE = "0.3.0"

export const CHANGELOG_SHARP_ICON_NAMES = [
  "triangle-alert",
  "building",
  "calendar",
  "camera",
  "panel-left",
  "cursor-window",
  "pencil-ruler",
  "layout-dashboard",
  "grid-2x2",
  "monitor",
  "smartphone",
  "server",
  "database",
  "terminal",
  "image",
  "file-text",
  "folder",
  "archive",
  "inbox",
  "bookmark",
  "tag",
  "receipt",
  "credit-card",
  "package",
  "truck",
  "gift",
  "shopping-bag",
  "toolbox",
  "shield",
  "podium",
] as const
