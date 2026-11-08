"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  CORNERS,
  STYLES,
  type BrowserIcon,
  type Corners,
  type GridIcon,
  type IconArt,
  type IconHistory,
  type Style,
  type StyleArt,
} from "@/components/glyph"

/**
 * The browser's icons, with the drawings the page did not carry.
 *
 * `/icons` sends the drawings of the 120 tiles on screen and names where the
 * rest are (`lib/icon-treatments.ts` says why). `has` is whether a treatment
 * can be shown; `ensure` fetches one, once, and folds it into `icons`.
 *
 * Nothing may show a treatment before `has` says so. `artOf` answers
 * undefined for a drawing that is not loaded, which is also how the grid's
 * filters read a style an icon does not come in, so switching early would not
 * draw blanks, it would empty the grid. The treatments the page opened in are
 * safe because `arrive` gives every off-screen icon a blank for each style.
 */
export type Treatments = {
  has: (corners: Corners) => boolean
  ensure: (corners: Corners) => Promise<void>
}

/** A drawing still on its way: an empty box the size of the real one. */
const BLANK: StyleArt = { body: "", root: {} }

/** One icon as sent, as the `BrowserIcon` the grid and the dock read. */
function arrive(icon: GridIcon, carried: readonly Corners[]): BrowserIcon {
  const { styles, history, art, sharp, ...rest } = icon
  const blanks = (corners: Corners) =>
    carried.includes(corners)
      ? Object.fromEntries((styles ?? STYLES).map((style) => [style, BLANK]))
      : {}
  const has = (drawings?: IconArt["art"]) =>
    drawings && Object.keys(drawings).length > 0

  return {
    ...rest,
    art: has(art) ? art! : blanks("regular"),
    sharp: has(sharp) ? sharp : blanks("sharp"),
    history:
      history && !("by" in history)
        ? {
            ...history,
            updated: history.added,
            updatedLabel: history.addedLabel,
            version: null,
            by: [],
            pending: true,
          }
        : history,
  }
}

export function useTreatments(
  initial: GridIcon[],
  /** Where each treatment's whole file is. */
  urls: Record<Corners, string>,
  /** What the page opened in, and so what has to arrive without being asked. */
  carried: readonly Corners[],
  /** The style on screen alone, a third of the weight, fetched ahead of it. */
  first: { url: string; corners: Corners; style: Style }
) {
  const [icons, setIcons] = React.useState(() =>
    initial.map((icon) => arrive(icon, carried))
  )
  const [loaded, setLoaded] = React.useState<ReadonlySet<Corners>>(
    () => new Set(carried)
  )
  const inflight = React.useRef(new Map<Corners, Promise<void>>())

  const ensure = React.useCallback(
    (corners: Corners) => {
      const url = urls[corners]

      let request = inflight.current.get(corners)
      if (!request) {
        request = fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error(`${url}: ${response.status}`)
            return response.json() as Promise<{
              art: Record<string, IconArt["art"]>
              history: Record<string, IconHistory>
            }>
          })
          .then(({ art, history }) => {
            setIcons((current) =>
              current.map((icon) => ({
                ...icon,
                history: history[icon.name] ?? icon.history,
                ...(corners === "sharp"
                  ? { sharp: art[icon.name] ?? {} }
                  : { art: art[icon.name] ?? {} }),
              }))
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
    [urls]
  )

  /*
    The rest of the page's own treatment, straight after hydration rather than
    on idle: the next thing a reader does may be to search, and a tile waiting
    on this is an empty box.

    The style on screen comes first. The whole file measured 10 seconds on a
    slow line, and turning to page 2 inside that window is an empty grid; one
    style is 193 KB against 622. A failure there costs nothing, the whole file
    covers it. The whole file retries because an empty box is otherwise
    permanent for the visit, and says so if it still cannot, which is the one
    case where the reader has something to do about it.
  */
  React.useEffect(() => {
    let live = true
    let left = 2
    let timer: number | undefined
    const failed = () => {
      if (!live) return
      if (left-- > 0) {
        timer = window.setTimeout(load, 2000)
        return
      }
      toast.error("Couldn't load every drawing", {
        description: "Some tiles may stay empty. Reload the page to try again.",
      })
    }
    function load() {
      Promise.all(carried.map(ensure)).catch(failed)
    }

    fetch(first.url)
      .then((response) =>
        response.ok
          ? (response.json() as Promise<Record<string, StyleArt>>)
          : undefined
      )
      .then((drawings) => {
        if (!live || !drawings) return
        setIcons((current) =>
          current.map((icon) => {
            const drawing = drawings[icon.name]
            if (!drawing) return icon
            return first.corners === "sharp"
              ? { ...icon, sharp: { ...icon.sharp, [first.style]: drawing } }
              : { ...icon, art: { ...icon.art, [first.style]: drawing } }
          })
        )
      })
      .catch(() => {})
      .finally(() => {
        if (live) load()
      })

    return () => {
      live = false
      window.clearTimeout(timer)
    }
  }, [carried, ensure, first])

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
        if (latest.current !== corners) return
        setPending(null)
        // The chip went back to where it was, which alone reads as a click
        // that did nothing. Say so, and say that another click will try again.
        toast.error("Couldn't switch corners", {
          description: `The ${corners === "sharp" ? "sharp" : "rounded"} drawings didn't load. Try again in a moment.`,
        })
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
