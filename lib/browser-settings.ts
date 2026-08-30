import { CORNERS, type Corners } from "@/components/glyph"

/**
 * What carries over between visits: how you like the set drawn, not what you
 * were looking at.
 *
 * Style, shape and category are deliberately absent. They narrow the set rather
 * than describe it, and arriving on a page that silently shows only duotone
 * circles — with no memory of having asked — reads as a broken library, not a
 * restored preference. They live in component state and start fresh every load.
 */
export type BrowserSettings = {
  size: number
  stroke: number
  color: string | null
  showNames: boolean
  /** Tiles per row. Ignored on narrow screens, which fit what they can. */
  columns: number
  /**
   * Rounded or squared corners.
   *
   * Here rather than beside style, and the distinction the comment above draws
   * is what decides it: a treatment does not narrow the set. Every drawing
   * exists in both, so arriving on sharp shows the whole library drawn the way
   * you left it, which is the same promise size and stroke make. Style narrows
   * — pick fill and 153 drawings are gone — so it does not persist.
   */
  corners: Corners
}

/** What a first visit sees, and what Reset puts back. */
export const SETTINGS_DEFAULTS: BrowserSettings = {
  size: 24,
  stroke: 2,
  color: null,
  showNames: true,
  columns: 10,
  corners: "regular",
}

/**
 * A cookie, not `localStorage`, because the server has to be able to read it.
 *
 * Storage is invisible to the server, so it renders the defaults and the client
 * corrects them on hydration — measured at ~57ms, long after the first paint.
 * That correction is the jump: the knob lands at 24px, then snaps to wherever
 * you left it, and every icon resizes with it. A cookie rides along with the
 * request, so the first paint is already right and there is nothing to correct.
 *
 * Renaming this does not migrate anything. The old cookie is simply never read
 * again, so every preference set against it — size, stroke, colour, columns —
 * is silently lost on the next visit. That was affordable exactly once, while
 * nothing is published and the only browser holding one is the author's. It
 * will not be affordable again, so any future rename should ride along with a
 * change that already invalidates the cookie's shape.
 */
export const SETTINGS_COOKIE = "keyline-icons-browser"

/** A year. These are preferences, not a session. */
export const SETTINGS_MAX_AGE = 60 * 60 * 24 * 365

/**
 * Take only the keys the app still has, and only where the type matches, so a
 * renamed setting or a hand-edited cookie can't reach the render.
 */
export function parseSettings(raw: string | undefined): BrowserSettings {
  if (!raw) return SETTINGS_DEFAULTS

  try {
    const parsed = JSON.parse(
      decodeURIComponent(raw)
    ) as Partial<BrowserSettings>
    const next = { ...SETTINGS_DEFAULTS }

    for (const key of Object.keys(
      SETTINGS_DEFAULTS
    ) as (keyof BrowserSettings)[]) {
      const value = parsed[key]
      const expected = SETTINGS_DEFAULTS[key]

      // `color` is the one nullable, so its default types as `object`.
      // `corners` is a union, and a `typeof` test would let any string through
      // — including one that reaches `artOf` and draws nothing.
      const ok =
        key === "color"
          ? value === null || typeof value === "string"
          : key === "corners"
            ? CORNERS.includes(value as Corners)
            : typeof value === typeof expected

      if (key in parsed && ok) Object.assign(next, { [key]: value })
    }

    return next
  } catch {
    return SETTINGS_DEFAULTS
  }
}

export function serializeSettings(settings: BrowserSettings) {
  return encodeURIComponent(JSON.stringify(settings))
}
