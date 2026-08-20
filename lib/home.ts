/**
 * The landing page's own data: the icons it names, and what each style is.
 *
 * The page itself reads every count off disk through `loadIcons()`, so nothing
 * here is a number. What cannot be derived is which handful of drawings should
 * stand for the set, and that is a judgement rather than a slice of the
 * library: the first six names alphabetically are four kinds of arrow.
 *
 * `STYLE_SAMPLE_ICON_NAMES` is named to the convention
 * `pipeline/check-demos.mjs` scans for. It finds every
 * `export const <NAME>_ICON_NAMES = [...] as const` under `lib/` and fails the
 * build if one of them names a drawing that is not on disk, which is the only
 * thing standing between a renamed icon and a hole in this page. That is also
 * why the list lives here rather than in the component that renders it: the
 * check reads `lib/` and nothing else.
 */

/**
 * The twelve drawings the style cards are built from. All three cards, all
 * twelve, one style each.
 *
 * This was briefly three separate lists, one per card, on the argument that
 * thirty-four different drawings show more of the set than twelve shown three
 * times. It does, and it costs the only thing the row is actually for: with
 * different icons in every card there is nothing to compare, and three
 * arrangements of three sets of glyphs read as three unrelated pictures. The
 * styles are the variable here, so everything else has to be held still.
 *
 * The arrangements still differ — a scatter, a set of plates, a named grid —
 * because each says something about how its style gets used. Same drawings,
 * three settings.
 *
 * **Every name has to exist in all three styles.** `duotone` and `fill` need a
 * region to fill and not every drawing has one, and the renderer falls back to
 * stroke rather than to a hole, so a wrong name here draws a stroke icon in the
 * fill card and nothing fails. `check-demos` cannot catch it: it verifies that
 * a name exists and that it has a *stroke* form, which is exactly the case that
 * would slip through. This list was filtered against `icons/duotone/` and
 * `icons/fill/` before being written down.
 *
 * Twelve, because that is 4×3 in the grid card with nothing left over, and
 * enough bodies to fill a scatter without crowding it.
 */
export const STYLE_SAMPLE_ICON_NAMES = [
  "search",
  "bell",
  "globe",
  "music-note",
  "folder",
  "user",
  "map-pin",
  "credit-card",
  "compass",
  "package",
  "calendar",
  "gift",
] as const

/**
 * The drawing the install terminal names in its `cli add` line.
 *
 * A name inside a shell command rather than a rendered glyph, which is exactly
 * why it belongs in a checked list: nothing about a wrong name here looks wrong
 * on screen, and the first anyone would know is a reader running the command
 * and getting a 404 from the CLI.
 *
 * `bell` because it is the plainest thing in the set, the same reason it opens
 * the search suggestions.
 */
export const INSTALL_EXAMPLE_ICON_NAMES = ["bell"] as const

/**
 * The glyph on each of the hero's three fact cards, in the order they appear.
 *
 * Here rather than inline in `app/page.tsx` for the same reason as the lists
 * below: `pipeline/check-demos.mjs` only scans `lib/`, and a name typed at the
 * call site is a name nothing checks. The page destructures it, so the pairing
 * of glyph to sentence stays readable at the point it is used.
 *
 * `shapes` for the count, `circle-half` for the weights — the one drawing in
 * the set that is literally half one tone and half another — and `unlock` for
 * the licence, which says "nothing is held back" rather than "here is a
 * document".
 */
export const HERO_FACT_ICON_NAMES = ["shapes", "circle-half", "unlock"] as const

/**
 * The four glyphs on the design-files notes, in the order the notes appear:
 * component set, export, search words, check.
 *
 * `shapes-2` rather than the hero's `shapes`, so the two rows of glyphs on this
 * page are not the same drawing twice. `download` for the export step, `search`
 * for the words the browser searches, and `git-check` for the check that diffs
 * the file against the repository, which is the one drawing in the set that says
 * both halves of that sentence.
 *
 * Here rather than in the component for the reason the note at the top of this
 * file gives: `pipeline/check-demos.mjs` reads `lib/` and nothing else, so a name
 * typed at the call site is a name nothing checks.
 */
export const DESIGN_NOTE_ICON_NAMES = [
  "shapes-2",
  "download",
  "search",
  "git-check",
] as const

/**
 * The four glyphs on the Paper notes, in the order the notes appear: artboard,
 * layer names, built from `icons/`, checked in CI.
 *
 * Deliberately not a second copy of `DESIGN_NOTE_ICON_NAMES`. The two panels sit
 * behind the same picker, so a reader who switches tabs sees both rows within a
 * second of each other, and four identical glyphs would say the two files are
 * the same thing described twice. `square-dashed` is the frame an artboard is,
 * `tag` is a name attached to something, `code` is the generator, and
 * `file-check` is the check, one step across from the Figma column's
 * `git-check` because it reads the sheets on disk rather than the design file.
 */
export const PAPER_NOTE_ICON_NAMES = [
  "square-dashed",
  "tag",
  "code",
  "file-check",
] as const

/*
  `FIGMA_SAMPLE_ICON_NAMES` lived here: `check`, `square-check` and `circle-check`,
  one per container, feeding a `Container` × `Style` matrix in the Figma section.
  That section shows a screenshot of the file itself now, and the matrix said the
  same thing beside it. See the note at the top of `components/figma-showcase.tsx`,
  which records what the matrix was for in case the picture ever comes out.
*/

/**
 * The glyph on the closing sponsor card, which wears the same card as the three
 * above and therefore takes its glyph from the same kind of checked list.
 *
 * `gift` because it is what the reader would be doing, and because it is drawn
 * at the same 2px keyline as everything else on the card. The obvious
 * alternative was GitHub's own mark, since that is where the link lands, and it
 * is a solid logo: `components/brand-logos.tsx` notes that a solid mark passes
 * beside this set at 16px and reads as the wrong weight above it at glyph size,
 * which is exactly what a 28px one did here. The outbound arrow at the end of
 * the sentence carries where the click goes instead.
 */
export const SPONSOR_ICON_NAMES = ["gift"] as const

/*
  Two lists lived here and are gone: `GRID_SAMPLE_ICON_NAMES`, one drawing shown
  on a 24-unit grid, and `CONTAINER_SAMPLE_ICON_NAMES`, one base drawing beside
  its square and circle forms. Both fed panels that arranged icons on cards to
  illustrate a sentence about how the set is built.

  `components/keyline-showcase.tsx` replaced them with cropped scenes, and the
  scenes need no list: they use the generated components from
  `@/components/icons` directly, which TypeScript resolves at build, so a rename
  is a failed compile rather than a name that has to be checked against disk.
  The container count is still on the page, in the section's own lead, counted
  off `loadIcons()`.
*/

/**
 * What each style is, in one line, in the order the set derives them.
 *
 * The order is not decorative: `stroke` is the drawing, and the other two are
 * made from it. A card row that led with `fill` would be describing the set
 * backwards.
 *
 * The counts are deliberately absent. They belong to the icons on disk and the
 * page reads them at render, so a number typed here would be a claim with an
 * expiry date on it, which is the same rule the titles follow.
 */
export const STYLE_BLURBS: Record<string, string> = {
  stroke:
    "The full set, and the drawing every other style is derived from. 2px keylines on a 24 grid.",
  duotone:
    "The same keylines over a flat plate at reduced opacity, for surfaces that need weight without going solid.",
  fill: "Solid, with the detail knocked back out of the shape rather than drawn on top of it.",
}
