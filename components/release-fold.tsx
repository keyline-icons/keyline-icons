"use client"

import * as React from "react"

import { ChevronDown, ChevronUp } from "@/components/icons"

/**
 * How much of a folded release shows under its cover: the first section's
 * chip, its sentence and about a row of its drawings, fading out.
 */
const PEEK = 320

/* A mask rather than a gradient laid over the top, for the reason
   `FadedPreview` gives on the page: it is right in both themes and needs no
   token. */
const FOLDED: React.CSSProperties = {
  maxHeight: PEEK,
  maskImage: "linear-gradient(to bottom, #000 40%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent 100%)",
  /*
    Everything under a fold stays in the page for crawlers, which kept all of
    it in layout too: every drawing in every older release, re-laid out on
    each resize and theme switch. Containment lets the browser skip a fold
    that is off screen. It goes here rather than on the release section
    because this box is already clipped to PEEK, so skipped or rendered it is
    the same height, and nothing below it moves.
  */
  contentVisibility: "auto",
  containIntrinsicSize: `auto ${PEEK}px`,
}

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

/**
 * An older release, folded under its cover.
 *
 * Every release but the newest opens on its heading, its summary, its cover
 * and the start of its first section, fading out, with one toggle for the
 * rest. Fifteen releases read in full were 45 screens; folded, the page is the
 * newest release and a list of the others. Everything stays in the page, so
 * the tiles are still links a crawler follows to the icon pages.
 *
 * A link into a folded release opens it. Every chip and shelf carries a
 * shareable anchor, `anchors` is the release's list of them, and a link that
 * landed inside a fold would be a link to something faded out.
 */
export function ReleaseFold({
  version,
  anchors,
  children,
}: {
  version: string
  anchors: string[]
  children: React.ReactNode
}) {
  const hash = React.useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => ""
  )
  const target = decodeURIComponent(hash.slice(1))
  const targeted = anchors.includes(target)
  const [choice, setChoice] = React.useState<boolean | null>(null)
  const open = choice ?? targeted
  const region = React.useId()
  const regionRef = React.useRef<HTMLDivElement>(null)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const keep = React.useRef<number | null>(null)

  /* The browser scrolled to the anchor while the release was still folded,
     inside the fold's clipped box. Opened, the anchor sits lower, so go to it
     again, clearing the fixed bar by the anchor's own `scroll-margin-top`. */
  React.useLayoutEffect(() => {
    if (!targeted || choice !== null) return
    const el = document.getElementById(target)
    if (!el) return
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - margin,
      behavior: "auto",
    })
  }, [targeted, target, choice])

  /* Folding a long release pulls the toggle up by everything it hid, out from
     under the pointer that pressed it. Put it back where it was. */
  React.useLayoutEffect(() => {
    if (keep.current === null || !toggleRef.current) return
    window.scrollBy(
      0,
      toggleRef.current.getBoundingClientRect().top - keep.current
    )
    keep.current = null
  }, [open])

  return (
    <>
      <div
        id={region}
        ref={regionRef}
        className={open ? undefined : "overflow-hidden"}
        style={open ? undefined : FOLDED}
        /* A tab into something the fold is hiding opens the release, so
           keyboard focus never lands where nobody can see it. */
        onFocus={(event) => {
          if (open) return
          const box = regionRef.current!.getBoundingClientRect()
          if (
            event.target.getBoundingClientRect().bottom >
            box.top + PEEK * 0.6
          ) {
            regionRef.current!.scrollTop = 0
            setChoice(true)
          }
        }}
      >
        {children}
      </div>
      <p className="mt-6 text-sm">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={region}
          onClick={() => {
            if (open)
              keep.current = toggleRef.current!.getBoundingClientRect().top
            setChoice(!open)
          }}
          className="group inline-flex items-center gap-1.5 font-medium text-foreground"
        >
          <span className="underline underline-offset-4 group-hover:no-underline">
            {open ? `Show less of v${version}` : `Show all of v${version}`}
          </span>
          {open ? (
            <ChevronUp
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:-translate-y-0.5"
            />
          ) : (
            <ChevronDown
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-y-0.5"
            />
          )}
        </button>
      </p>
    </>
  )
}
