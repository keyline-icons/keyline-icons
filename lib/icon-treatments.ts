import "server-only"

import { createHash } from "node:crypto"

import { artOf, type Corners, type Style } from "@/components/glyph"
import { loadIcons } from "@/lib/icons"

const hashOf = (body: string) =>
  createHash("sha1").update(body).digest("hex").slice(0, 12)

/**
 * One corner treatment of every drawing, with the full history of each, as
 * the file the browser fetches: `{ art: { [name]: { [style]: StyleArt } },
 * history: { [name]: IconHistory } }`.
 *
 * `/icons` used to hand its client every drawing, so that a page turn, a search
 * or the corner switch was instant. That made the page 7.4 MB of HTML, rendered
 * per request for the settings cookie and never cached, of which a reader could
 * see 120 tiles. The page now carries those 120, and this is the rest:
 * prerendered once per deploy, cached like any other asset, and fetched right
 * after load for the treatment on screen and on demand for the other.
 *
 * The history rides along because only the dock reads most of it, and a second
 * request for 400 KB would buy nothing.
 *
 * Held for the life of the process, like `loadIcons`: the page asks for the
 * version on every request and the drawings do not change while it runs.
 */
const files = new Map<Corners, Promise<{ body: string; version: string }>>()

export function treatmentFile(corners: Corners) {
  let file = files.get(corners)
  if (!file) {
    file = loadIcons().then((icons) => {
      const body = JSON.stringify({
        art: Object.fromEntries(
          icons.map((icon) => [
            icon.name,
            (corners === "sharp" ? icon.sharp : icon.art) ?? {},
          ])
        ),
        history: Object.fromEntries(
          icons.flatMap((icon) =>
            icon.history ? [[icon.name, icon.history]] : []
          )
        ),
      })
      return { body, version: hashOf(body) }
    })
    files.set(corners, file)
  }
  return file
}

/**
 * One style of one treatment, `{ [name]: StyleArt }`: what the grid is showing,
 * fetched ahead of the whole file so a page turned early is not an empty one.
 */
const styleFiles = new Map<string, Promise<{ body: string; version: string }>>()

export function styleFile(corners: Corners, style: Style) {
  const key = `${corners}.${style}`
  let file = styleFiles.get(key)
  if (!file) {
    file = loadIcons().then((icons) => {
      const body = JSON.stringify(
        Object.fromEntries(
          icons.flatMap((icon) => {
            const art = artOf(icon, style, corners)
            return art ? [[icon.name, art]] : []
          })
        )
      )
      return { body, version: hashOf(body) }
    })
    styleFiles.set(key, file)
  }
  return file
}

export const TREATMENT_SEGMENT = "/icon-art"

/**
 * Where the browser fetches one treatment, with a hash of its contents in the
 * query string.
 *
 * The page and the file come from the same drawings in the same deploy; a
 * browser cache does not. Without the hash a reader could pair this deploy's
 * page with the last deploy's file, and a drawing added in between would have
 * nothing to draw. With it, the file can be cached for as long as it exists.
 */
export async function treatmentHref(corners: Corners) {
  const { version } = await treatmentFile(corners)
  return `${TREATMENT_SEGMENT}/${corners}.json?v=${version}`
}

/** Where the browser fetches one style alone, on the same terms. */
export async function styleHref(corners: Corners, style: Style) {
  const { version } = await styleFile(corners, style)
  return `${TREATMENT_SEGMENT}/${corners}.${style}.json?v=${version}`
}
