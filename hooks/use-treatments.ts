"use client"

import * as React from "react"

import {
  CORNERS,
  type BrowserIcon,
  type Corners,
  type IconArt,
} from "@/components/glyph"

/**
 * The browser's icons, with the corner treatments it has not got yet.
 *
 * `/icons` sends the treatment it opens in and names where the other one is
 * (`lib/icon-treatments.ts` says why). `has` is whether a treatment's
 * drawings are here; `ensure` fetches one, once, and folds it into `icons`.
 *
 * Nothing may show a treatment before `has` says so. `artOf` answers
 * undefined for a drawing that is not loaded, which is also how the grid's
 * filters read a style an icon does not come in, so switching early would not
 * draw blanks, it would empty the grid.
 */
export type Treatments = {
  has: (corners: Corners) => boolean
  ensure: (corners: Corners) => Promise<void>
}

export function useTreatments(
  initial: BrowserIcon[],
  /** The URL of each treatment the page did not carry. */
  pending: Partial<Record<Corners, string>>
) {
  const [icons, setIcons] = React.useState(initial)
  const [loaded, setLoaded] = React.useState<ReadonlySet<Corners>>(
    () => new Set(CORNERS.filter((corners) => !pending[corners]))
  )
  const inflight = React.useRef(new Map<Corners, Promise<void>>())

  const ensure = React.useCallback(
    (corners: Corners) => {
      const url = pending[corners]
      if (!url) return Promise.resolve()

      let request = inflight.current.get(corners)
      if (!request) {
        request = fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error(`${url}: ${response.status}`)
            return response.json() as Promise<Record<string, IconArt["art"]>>
          })
          .then((art) => {
            setIcons((current) =>
              current.map((icon) =>
                corners === "sharp"
                  ? { ...icon, sharp: art[icon.name] ?? {} }
                  : { ...icon, art: art[icon.name] ?? {} }
              )
            )
            setLoaded((current) => new Set(current).add(corners))
          })
        // A failed fetch is forgotten, so the next click tries again rather
        // than inheriting the failure for the rest of the visit.
        request.catch(() => inflight.current.delete(corners))
        inflight.current.set(corners, request)
      }
      return request
    },
    [pending]
  )

  const has = React.useCallback(
    (corners: Corners) => loaded.has(corners),
    [loaded]
  )

  return { icons, treatments: { has, ensure } satisfies Treatments }
}

/**
 * Choosing a treatment that may still be on its way.
 *
 * `choose` applies at once when the drawings are here, and otherwise marks the
 * choice `pending`, so the chip can move under the pointer while the grid
 * keeps the treatment it can draw, and applies it when they land. Only the
 * latest choice applies: pick sharp and then rounded before sharp arrives,
 * and the late sharp is not allowed to undo the rounded.
 *
 * `prefetch` is for hover and focus on the control, so that by the click the
 * file is usually already here.
 */
export function useTreatmentChoice(
  treatments: Treatments,
  apply: (corners: Corners) => void
) {
  const [pending, setPending] = React.useState<Corners | null>(null)
  const latest = React.useRef<Corners | null>(null)

  const choose = (corners: Corners) => {
    latest.current = corners
    if (treatments.has(corners)) {
      setPending(null)
      apply(corners)
      return
    }
    setPending(corners)
    treatments.ensure(corners).then(
      () => {
        if (latest.current !== corners) return
        setPending(null)
        apply(corners)
      },
      () => {
        if (latest.current === corners) setPending(null)
      }
    )
  }

  const prefetch = () => {
    for (const corners of CORNERS) {
      if (!treatments.has(corners)) treatments.ensure(corners).catch(() => {})
    }
  }

  return { pending, choose, prefetch }
}
