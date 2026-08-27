import usage from "@/lib/icon-usage.json"

/**
 * What each drawing shows, and what it is used for.
 *
 * This exists because every icon page said the same sentence with the name
 * swapped into it: "The X icon, drawn on a 24×24 grid in stroke, duotone and
 * fill." Across 554 pages that is one page repeated, which is the doorway
 * pattern the route was allowed on condition of avoiding, and it is why none of
 * them rank for the query they are obviously about. A page about the `upload`
 * icon that never says what an upload icon depicts has nothing to match "arrow
 * out of a tray icon" on.
 *
 * Keyed by BASE name, like `lib/icon-keywords.json`: one drawing boxed three
 * ways is one drawing, and `circle-upload` shows the same arrow as `upload`.
 * What separates those three pages is added in `iconDescription` from the
 * container, not written out three times here.
 *
 * Hand-written and not generated. There is no source to generate it from — the
 * Figma descriptions are comma-separated search terms, which is what
 * `build-keywords.mjs` bakes out, and a sentence assembled from those reads
 * exactly like a sentence assembled from those.
 */
const USAGE: Record<string, string> = (
  usage as { usage: Record<string, string> }
).usage

/**
 * The longest a line may be, in characters.
 *
 * Not a style preference. The line is the front of the meta description, a
 * snippet is cut somewhere past 160, and the clause that follows it carries the
 * two words worth having in a result: "free" and "MIT". The worst case is a
 * boxed variant of a three-style drawing, whose tail runs 63 characters, so 96
 * is what leaves that tail intact on every page in the set.
 *
 * `pipeline/check-usage.mjs` enforces this against the real descriptions rather
 * than against the arithmetic, because the arithmetic is what will be wrong
 * after the next wording change.
 */
export const USAGE_LIMIT = 96

/** What this drawing shows, or nothing if it has not been written yet. */
export const usageOf = (base: string): string | undefined => USAGE[base]

/** Every base that has a line, for the checker and for counting coverage. */
export const usageBases = (): string[] => Object.keys(USAGE)
