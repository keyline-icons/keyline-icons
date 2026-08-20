"use client"

import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * The hairline at the top of the window that says a page is on its way.
 *
 * Every navigation on this site is a client navigation, so the browser's own
 * loading state never runs: the tab keeps its favicon, the address bar never
 * moves, and until the new page commits there is no evidence at all that the
 * click landed. Most of them are prefetched and arrive inside a frame, which is
 * exactly why the slow ones are jarring. The reader has no reason to think this
 * one is different from the last one.
 *
 * The App Router has no router events to hang this on, so the two ends are read
 * separately, and they are genuinely different signals:
 *
 * - **The start** is the click, caught at the document in the capture phase.
 *   Capture rather than bubble because `next/link` calls `preventDefault` on
 *   the way past, so a listener running after it sees every real navigation as
 *   already handled.
 * - **The end** is the URL changing. `usePathname` alone would miss half of
 *   them: the style and shape filters on `/icons` move the query string and
 *   nothing else, and those are the slowest navigations on the site.
 *
 * `useSearchParams` is why the export below is wrapped in `Suspense`. Reading
 * it opts everything above it out of static rendering, and in a root layout
 * that is the whole site. The boundary keeps it to this hairline.
 */

/*
  Long enough that a prefetched page never flashes a bar on its way in, short
  enough that a navigation you can feel always gets one. Most navigations here
  land well inside it and show nothing at all, which is the point: the bar is
  the exception, so it still means something when it appears.
*/
const APPEAR_DELAY = 150

/*
  Where the creep stops, and how long it takes to get there. It stops short of
  the end because it does not know the end: the bar cannot report progress it
  has no measurement of, and a bar that fills to 100% and then waits is a bar
  that has lied. Everything past 0.9 is the real answer arriving.

  The curve spends most of its travel in the first few hundred milliseconds and
  then crawls, so a normal navigation reads as decisive movement and a stalled
  one still visibly advances instead of parking.
*/
const CREEP_TARGET = 0.9
const CREEP_DURATION = 6000
const CREEP_EASE = "cubic-bezier(0.1, 0.9, 0.2, 0.98)"

/* Fill, hold, fade. The hold is what makes the fill legible rather than a blink. */
const FILL_DURATION = 180
const FADE_DELAY = 200
const FADE_DURATION = 250

/*
  A navigation that never commits would otherwise leave the bar creeping until
  the reader navigates away from it. It happens: a click on a link that some
  other handler cancels after this one has already run, or a request that never
  comes back. Finishing on a timer is a wrong answer, and it is a much smaller
  wrong answer than a bar that never stops.
*/
const GIVE_UP = 15000

type Phase = "idle" | "loading" | "done"

/*
  Held apart from the transition, because these are what the browser animates
  and mixing them into the class list would mean recomputing Tailwind's
  `transition-*` on every phase. `idle` carries a zero duration so the reset
  from a filled bar back to an empty one is a cut rather than a rewind.
*/
const PHASE_STYLE: Record<Phase, React.CSSProperties> = {
  idle: { transform: "scaleX(0)", opacity: 0, transitionDuration: "0ms" },
  loading: {
    transform: `scaleX(${CREEP_TARGET})`,
    opacity: 1,
    transitionProperty: "transform",
    transitionDuration: `${CREEP_DURATION}ms`,
    transitionTimingFunction: CREEP_EASE,
  },
  done: {
    transform: "scaleX(1)",
    opacity: 0,
    transitionProperty: "transform, opacity",
    transitionDuration: `${FILL_DURATION}ms, ${FADE_DURATION}ms`,
    transitionDelay: `0ms, ${FADE_DELAY}ms`,
    transitionTimingFunction: "ease-out",
  },
}

const START_EVENT = "keyline:route-start"

/**
 * Start the bar for a navigation that no click can be read from.
 *
 * `router.push` is a function call, and the click that led to it may not have
 * been on a link at all: the hero search submits a form. An event rather than a
 * shared setter so that the caller does not have to be under this component,
 * and so that calling it when the bar is not mounted is a no-op instead of a
 * crash.
 */
export function startRouteProgress() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(START_EVENT))
}

function RouteProgressBar() {
  const pathname = usePathname()
  const search = useSearchParams().toString()

  const [phase, setPhase] = useState<Phase>("idle")

  /*
    Whether a navigation is outstanding, which is not the same question as
    whether the bar is visible: for the first 150ms of one it is pending and
    hidden. A ref rather than state because the click handler reads it to
    decide, and a stale closure there would start a second bar over the first.
  */
  const pending = useRef(false)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const finish = useCallback(() => {
    if (!pending.current) return
    pending.current = false
    clearTimers()

    /*
      A navigation that beat the appear delay never showed a bar, and filling
      one now would put a flash on screen for a page that was already instant.
      It goes straight back to idle instead.
    */
    setPhase((current) => (current === "loading" ? "done" : "idle"))
    timers.current.push(
      window.setTimeout(
        () => setPhase("idle"),
        FILL_DURATION + FADE_DELAY + FADE_DURATION
      )
    )
  }, [])

  const start = useCallback(() => {
    if (pending.current) return
    pending.current = true
    clearTimers()
    timers.current.push(
      window.setTimeout(() => setPhase("loading"), APPEAR_DELAY)
    )
    timers.current.push(window.setTimeout(finish, GIVE_UP))
  }, [finish])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Anything the browser is about to handle as something other than a plain
      // navigation in this tab: a new tab, a download, a text selection drag.
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]")
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target && anchor.target !== "_self") return
      if (anchor.hasAttribute("download")) return

      const next = new URL(anchor.href, window.location.href)
      if (next.origin !== window.location.origin) return

      /*
        Same address, so the router will do nothing and there is no commit
        coming to end the bar on. A link that differs only in its hash is the
        common case: the changelog's own headings, and every skip link.
      */
      if (
        next.pathname === window.location.pathname &&
        next.search === window.location.search
      ) {
        return
      }

      start()
    }

    document.addEventListener("click", onClick, { capture: true })
    window.addEventListener(START_EVENT, start)
    return () => {
      document.removeEventListener("click", onClick, { capture: true })
      window.removeEventListener(START_EVENT, start)
    }
  }, [start])

  /*
    The commit. This also runs on mount, where `finish` returns immediately
    because nothing is pending, and on back and forward, where the same is true:
    those are served from the router cache and arrive too fast to be worth
    announcing, and starting a bar on `popstate` would mean starting one that
    frequently has nothing to wait for.
  */
  useEffect(() => {
    finish()
  }, [pathname, search, finish])

  useEffect(() => clearTimers, [])

  return (
    /*
      Above the site bar's `z-30` and outside its background, so it reads as an
      edge of the window rather than a part of the header. 2px because that is
      the keyline every icon in the set is drawn with.

      `aria-hidden` deliberately: the App Router already announces route changes
      to a screen reader when the new page commits, and this says the same thing
      less precisely and earlier. It is the visual half of an announcement that
      is already being made.
    */
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      {/*
        `scaleX` rather than `width`, so the creep is composited instead of
        laying out the page 60 times a second while the page it is waiting for
        is the thing that needs the main thread.

        Under `prefers-reduced-motion` every transition here is dropped and the
        bar simply appears at 90% and goes away. That keeps the information and
        loses the animation, which is the trade that setting is asking for.
      */}
      <div
        className="h-full w-full origin-left bg-primary transition-transform motion-reduce:transition-none"
        style={PHASE_STYLE[phase]}
      />
    </div>
  )
}

export function RouteProgress() {
  return (
    <Suspense fallback={null}>
      <RouteProgressBar />
    </Suspense>
  )
}
