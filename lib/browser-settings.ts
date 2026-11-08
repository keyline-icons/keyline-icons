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
  /**
   * The order the grid is laid out in.
   *
   * Persisted on the same test as corners: an order hides nothing. Every
   * drawing is still on the grid, only in another place, so someone who left
   * it on newest and comes back to it newest-first has their own library back
   * rather than a narrowed one. It is a choice made once by the people who
   * come back to see what landed, and asking them to make it on every visit
   * is the cost a cookie exists to save.
   */
  sort: Sort
}

/**
 * The grid's orders, in menu order. `name` is the shipped default because it
 * is the only one a reader can predict a drawing's place in.
 */
export const SORTS = ["name", "newest"] as const
export type Sort = (typeof SORTS)[number]

/** What a first visit sees. Reset puts back only part of it: see below. */
export const SETTINGS_DEFAULTS: BrowserSettings = {
  size: 24,
  stroke: 2,
  color: null,
  showNames: true,
  columns: 10,
  corners: "regular",
  sort: "name",
}

type Resettable = Pick<BrowserSettings, "size" | "stroke" | "color" | "corners">

/**
 * What Reset puts back: how the drawings are drawn, and nothing about the grid
 * they are laid out in.
 *
 * `showNames` and `columns` are the reader's view of the grid, set once and
 * left. Size, stroke, colour and corners are what gets played with, and Reset
 * is the way back from that. Writing the defaults whole threw the view away
 * with them: a reader on 12 columns with names off tried a colour, reset it,
 * and got 10 columns with names back. Both Resets read this, the grid's and
 * the icon page's, which has no grid on it and was resetting it anyway.
 */
export const RESET_DEFAULTS: Resettable = {
  size: SETTINGS_DEFAULTS.size,
  stroke: SETTINGS_DEFAULTS.stroke,
  color: SETTINGS_DEFAULTS.color,
  corners: SETTINGS_DEFAULTS.corners,
}

/** Whether Reset has anything to undo, so the button and the dot agree with it. */
export const atResetDefaults = (settings: BrowserSettings) =>
  (Object.keys(RESET_DEFAULTS) as (keyof Resettable)[]).every(
    (key) => settings[key] === RESET_DEFAULTS[key]
  )

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

/** On `<html>` while the icon page's controls wait for their saved values. */
export const SETTINGS_PENDING = "data-settings-pending"

/**
 * Runs while the icon page's HTML is still being parsed, before anything paints.
 *
 * The page is built ahead of time, so it is drawn at the defaults and only the
 * browser knows what this reader saved. React cannot correct that before the
 * first paint, so for a reader whose size, stroke, colour or corners differ, the
 * controls stay invisible until hydration has put the saved values in them.
 * `visibility` holds their space, so nothing moves when they appear.
 *
 * A reader on the defaults has nothing to wait for and never sees the attribute,
 * and neither does a crawler, which sends no cookie. The timer is for a script
 * bundle that never arrives: the defaults are a better page than an empty box.
 */
export const SETTINGS_PREPAINT = `(function(){try{var m=document.cookie.match(/(?:^|; )${SETTINGS_COOKIE}=([^;]*)/);if(!m)return;var s=JSON.parse(decodeURIComponent(m[1])),d=${JSON.stringify(RESET_DEFAULTS)},h=document.documentElement;for(var k in d)if(k in s&&s[k]!==d[k]){h.setAttribute("${SETTINGS_PENDING}","");setTimeout(function(){h.removeAttribute("${SETTINGS_PENDING}")},4000);return}}catch(e){}})()`

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
      // `corners` and `sort` are unions, and a `typeof` test would let any
      // string through: one that reaches `artOf` and draws nothing, or one
      // no menu row can show as chosen.
      const ok =
        key === "color"
          ? value === null || typeof value === "string"
          : key === "corners"
            ? CORNERS.includes(value as Corners)
            : key === "sort"
              ? SORTS.includes(value as Sort)
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
