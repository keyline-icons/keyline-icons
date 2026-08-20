/**
 * Who drew what.
 *
 * The source is `git log`, collected per icon by `pipeline/build-history.mjs`
 * and arriving as `icon.history.by`. That is the right default: an outside
 * drawing arrives as a pull request, and a merge keeps the contributor as the
 * commit's author, so the credit lands on the right person without anyone
 * maintaining a list.
 *
 * Two things git cannot answer, which is what the rest of this file is:
 *
 * - **A git identity is not a name on a page.** Every commit in this repo is
 *   the maintainer's, and 414 icons crediting one person by their personal
 *   address is not what the set wants to say about itself — the house drew
 *   them. `IDENTITIES` maps the address to how it is credited.
 * - **The author is whoever committed, not always whoever drew.** A drawing
 *   handed over in Figma and exported by the maintainer is theirs in git and
 *   someone else's in fact. `CREDITS` overrides the log for exactly that case,
 *   and is empty until it happens.
 */
import type { IconHistory } from "@/components/glyph"
import { SET_TITLE } from "@/lib/site-chrome"

export type Contributor = {
  id: string
  name: string
  /**
   * Their GitHub handle, which is the whole avatar and link story: the face is
   * `github.com/<handle>.png` and the credit points at the profile. This is
   * what Lucide stores per icon, and it is worth matching — a credit you can
   * click through to is worth more to a contributor than a name in grey.
   */
  github?: string
  /** Set only for the house, which wears the logo instead of a face. */
  mark?: "brand"
}

const GITHUB = "https://github.com"

export const avatarUrl = (person: Contributor) =>
  person.github ? `${GITHUB}/${person.github}.png?size=80` : undefined

export const profileUrl = (person: Contributor) =>
  person.github ? `${GITHUB}/${person.github}` : undefined

export const HOUSE = "keyline"

export const PEOPLE: Record<string, Contributor> = {
  [HOUSE]: { id: HOUSE, name: SET_TITLE, mark: "brand" },
}

/** Git address -> who that is on screen. Anyone absent is credited as they commit. */
const IDENTITIES: Record<string, string> = {
  "theloonger@gmail.com": HOUSE,
}

/**
 * Icon name -> contributor ids, for the drawings the log gets wrong.
 *
 * Empty on purpose, and it should stay near-empty: a row here is a claim that
 * git is lying about this icon, which is only true when someone else's artwork
 * was committed by a maintainer.
 */
const CREDITS: Record<string, string[]> = {}

/**
 * GitHub's own commit addresses carry the handle: `12345+ada@users.noreply…`
 * and the older `ada@users.noreply…`. Anyone who opens a pull request from the
 * web or with the default privacy setting commits under one of these, so the
 * common case resolves to a real avatar and a real profile link with nothing
 * added to any table here.
 */
const NOREPLY = /^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/i

/**
 * A git author with no mapping, credited as themselves.
 *
 * Keyed by address rather than name, because the name on a commit is whatever
 * the machine was configured with and changes; the address is the identity.
 */
const fromGit = (author: { name: string; email: string }): Contributor => ({
  id: author.email,
  name: author.name,
  github: NOREPLY.exec(author.email)?.[1],
})

export function contributorsFor(
  name: string,
  history?: Pick<IconHistory, "by">
): Contributor[] {
  const override = CREDITS[name]
  if (override) return override.map((id) => PEOPLE[id]).filter(Boolean)

  const authors = history?.by ?? []
  if (authors.length === 0) return [PEOPLE[HOUSE]]

  // Deduplicated, because two git identities can map to the same credit.
  const seen = new Map<string, Contributor>()
  for (const author of authors) {
    const mapped = IDENTITIES[author.email]
    const person = mapped ? PEOPLE[mapped] : fromGit(author)
    if (person) seen.set(person.id, person)
  }

  return [...seen.values()]
}

/** First letters of the first two words: "Ada Lovelace" -> "AL". */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
