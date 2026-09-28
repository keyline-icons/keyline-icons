import "server-only"

import { createHash } from "node:crypto"

import type { Corners } from "@/components/glyph"
import { loadIcons } from "@/lib/icons"

/**
 * One corner treatment of every drawing, as the file the browser fetches when
 * someone switches to it: `{ [name]: { [style]: StyleArt } }`.
 *
 * `/icons` used to hand its client every drawing in both treatments, so that
 * the switch between them was instant. That made the page 7.4 MB of HTML,
 * rendered per request for the settings cookie and never cached, of which a
 * reader could see one treatment. The page now carries the treatment it opens
 * in, and the other one is this file: prerendered once per deploy, cached like
 * any other asset, and fetched only by someone who asks for it.
 *
 * Held for the life of the process, like `loadIcons`: the page asks for the
 * version on every request and the drawings do not change while it runs.
 */
const files = new Map<Corners, Promise<{ body: string; version: string }>>()

export function treatmentFile(corners: Corners) {
  let file = files.get(corners)
  if (!file) {
    file = loadIcons().then((icons) => {
      const body = JSON.stringify(
        Object.fromEntries(
          icons.map((icon) => [
            icon.name,
            (corners === "sharp" ? icon.sharp : icon.art) ?? {},
          ])
        )
      )
      return {
        body,
        version: createHash("sha1").update(body).digest("hex").slice(0, 12),
      }
    })
    files.set(corners, file)
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
