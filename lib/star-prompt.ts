/**
 * When the icon browser may ask for a GitHub star, and what it remembers about
 * having asked.
 *
 * The rules are ReUI's, used with its maker's permission, and the reason to
 * borrow them rather than invent a timer is that every one of them answers a
 * way the usual popup goes wrong:
 *
 * - **Asked at a pause, never on arrival.** A modal on load covers the grid
 *   someone came to search. This one waits until the reader has been still for
 *   a few seconds, or is heading for the tabs, which is the moment they are
 *   between tasks rather than in one.
 * - **After the set has earned it.** Twelve seconds into the visit, or sooner
 *   once an icon has been copied or saved, which is the clearest sign the set
 *   was worth something to them.
 * - **Never while they are busy.** Not over a menu or another dialog, not while
 *   a field has focus or text is selected, and not in the few seconds after a
 *   copy, when they are pasting it somewhere.
 * - **Three times at most, two weeks apart, and never again after a star.**
 *   "Maybe later" is taken at its word: later, not next visit.
 * - **Desktop only.** A modal over a phone's whole screen is a much bigger
 *   interruption for the same ask.
 *
 * The history lives in local storage, not in the settings cookie: it is about
 * this browser having been asked, not about how the set is drawn, and the
 * server has no use for it. `app/legal/privacy/page.tsx` names the key.
 */

/** Where the history is kept. Named on the privacy page; rename both or neither. */
export const STAR_PROMPT_KEY = "keyline:star-prompt"

export const STAR_PROMPT = {
  /** Asks a browser ever gets. */
  maxAsks: 3,
  /** How long an ask holds off the next one. */
  snoozeMs: 14 * 24 * 60 * 60 * 1000,
  /** How far into a visit before asking someone who has taken nothing. */
  warmupMs: 12_000,
  /** How long the reader has to be still to count as paused. */
  idleMs: 4_000,
  /** How long after a copy before it is fine to interrupt. */
  afterTakeMs: 8_000,
  /** How recently the pointer must have left through the top edge. */
  exitWindowMs: 1_500,
} as const

export type StarHistory = {
  /** When "Star on GitHub" was pressed. Ends the asking for good. */
  starredAt: number | null
  /** When the prompt last opened. */
  askedAt: number | null
  /** How many times it has opened. */
  asks: number
  /** When an icon was last copied or saved, from the dock or by name. */
  takenAt: number | null
}

const EMPTY: StarHistory = {
  starredAt: null,
  askedAt: null,
  asks: 0,
  takenAt: null,
}

function timeOrNull(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

/**
 * The stored history, or `null` when storage cannot be read at all.
 *
 * `null` means do not ask. A browser that blocks storage cannot remember a
 * "Maybe later", so asking there would mean asking on every visit, which is
 * the one outcome all the rules above exist to prevent.
 */
export function readHistory(): StarHistory | null {
  let raw: string | null
  try {
    raw = window.localStorage.getItem(STAR_PROMPT_KEY)
  } catch {
    return null
  }
  if (!raw) return EMPTY

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return {
      starredAt: timeOrNull(parsed.starredAt),
      askedAt: timeOrNull(parsed.askedAt),
      asks: timeOrNull(parsed.asks) ?? 0,
      takenAt: timeOrNull(parsed.takenAt),
    }
  } catch {
    return EMPTY
  }
}

export function writeHistory(history: StarHistory) {
  try {
    window.localStorage.setItem(STAR_PROMPT_KEY, JSON.stringify(history))
  } catch {
    // Storage refused: nothing to remember with, and nothing to fail loudly
    // about. `readHistory` returns null on the same browser, so it never asks.
  }
}

/**
 * Record that an icon was taken. Called beside the `icon_copy`,
 * `icon_download` and `icon_name_copy` events.
 *
 * Written only for a browser that is still in line to be asked, so that a
 * reader who starred, or was asked three times, never has anything written for
 * them again.
 */
export function noteTaken(now = Date.now()) {
  const history = readHistory()
  if (!history || isDone(history, now)) return
  writeHistory({ ...history, takenAt: now })
}

/** Starred, asked enough, or asked too recently. */
export function isDone(history: StarHistory, now: number) {
  return (
    history.starredAt !== null ||
    history.asks >= STAR_PROMPT.maxAsks ||
    (history.askedAt !== null && now - history.askedAt < STAR_PROMPT.snoozeMs)
  )
}

/**
 * The next 500: 197 goes for 500, 620 for 1,000, 3,858 for 4,000.
 *
 * Two rules were tried first. Rounding to the count's own leading digit put
 * 197 three stars from 200, a goal met before most of the people asked have
 * come back and too small to be worth asking for (Zafar, 11 Nov 2026: "200 is
 * not enough"). ReUI's next thousand put it 803 short with a fifth of the row
 * lit, which reads as out of reach. Steps of 500 keep the goal in sight at any
 * count without it ever being a rounding error away.
 */
export function starGoal(stars: number) {
  return (Math.floor(stars / 500) + 1) * 500
}
