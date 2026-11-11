"use client"

import * as React from "react"

import {
  Bookmark,
  Heart,
  type IconProps,
  Star,
  ThumbsUp,
  Trophy,
  X,
} from "@/components/icons"
import { GitHubLogo } from "@/components/brand-logos"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { track } from "@/lib/analytics"
import { SET_REPO_URL } from "@/lib/site-chrome"
import { cn } from "@/lib/utils"
import {
  isDone,
  readHistory,
  STAR_PROMPT,
  starGoal,
  writeHistory,
} from "@/lib/star-prompt"

/**
 * Anything open that a prompt would land on top of.
 *
 * Base UI's dialogs, popovers and drawers, which mark themselves `data-open`
 * and, unlike Radix's, carry no `aria-modal` to look for. Not every
 * `role="dialog"`: the preview dock is one, and it is open for most of a visit
 * that is going well. Counting it would keep the prompt from the readers who
 * have just taken an icon, who are the ones it is for.
 */
const OVERLAY =
  '[role="dialog"][data-open], [role="alertdialog"], [role="menu"], [role="listbox"]'

/**
 * The row over the ask, fading out from the star in the middle. The star's own
 * slot is drawn separately, so its entry only holds the place.
 */
const THANKS: { Icon: (props: IconProps) => React.ReactNode; fade: string }[] =
  [
    { Icon: Bookmark, fade: "opacity-35" },
    { Icon: Heart, fade: "opacity-70" },
    { Icon: Star, fade: "" },
    { Icon: ThumbsUp, fade: "opacity-70" },
    { Icon: Trophy, fade: "opacity-35" },
  ]

/** How many ticks the progress row has: one per 2% of the goal. */
const TICKS = 50

/** The reader is typing, selecting, or has something else open. */
function busy() {
  const typing =
    document.activeElement?.matches(
      'input, textarea, select, [contenteditable="true"]'
    ) ?? false
  const selecting = !(window.getSelection()?.isCollapsed ?? true)
  return typing || selecting || document.querySelector(OVERLAY) !== null
}

/**
 * Asks for a GitHub star once the reader has paused, on the terms in
 * `lib/star-prompt.ts`.
 *
 * `stars` comes from the server, out of the same hourly cache the site bar
 * reads. ReUI fetches its count from the browser; here that would be a request
 * to GitHub from the reader's machine, which the privacy page says never
 * happens. With no count the prompt still asks, without the bar.
 */
export function StarPrompt({ stars }: { stars: number | null }) {
  const [open, setOpen] = React.useState(false)
  const [ask, setAsk] = React.useState(0)
  /*
    Focus goes to the panel rather than to its first button, so an Enter
    meant for the page does not star or dismiss anything, and no focus ring
    lights up on a button nobody has reached for.
  */
  const panel = React.useRef<HTMLDivElement>(null)
  /* Set by the star link, so its own close is not also counted as "later". */
  const starred = React.useRef(false)

  React.useEffect(() => {
    const history = readHistory()
    if (!history || isDone(history, Date.now())) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const startedAt = Date.now()
    let activeAt = startedAt
    let exitAt = 0
    let pointer = ""

    const active = () => {
      activeAt = Date.now()
    }
    // A mouse that has not moved still reports a move when the page scrolls
    // under it, which would keep a reader who is only reading "active".
    const moved = (event: PointerEvent) => {
      const at = `${event.screenX},${event.screenY}`
      if (at === pointer) return
      pointer = at
      active()
    }
    // Out through the top edge, towards the tabs and the address bar.
    const leaving = (event: MouseEvent) => {
      if (!event.relatedTarget && event.clientY <= 0) exitAt = Date.now()
    }

    const quiet = { capture: true, passive: true } as const
    const kinds = ["scroll", "keydown", "pointerdown", "focus"] as const
    kinds.forEach((kind) => window.addEventListener(kind, active, quiet))
    window.addEventListener("pointermove", moved, quiet)
    document.addEventListener("visibilitychange", active)
    document.addEventListener("mouseout", leaving)

    function stop() {
      window.clearInterval(timer)
      kinds.forEach((kind) => window.removeEventListener(kind, active, quiet))
      window.removeEventListener("pointermove", moved, quiet)
      document.removeEventListener("visibilitychange", active)
      document.removeEventListener("mouseout", leaving)
    }

    function check() {
      const now = Date.now()
      const exiting = now - exitAt < STAR_PROMPT.exitWindowMs
      if (now - activeAt < STAR_PROMPT.idleMs && !exiting) return
      if (document.visibilityState !== "visible") return

      // Read again every time: another tab may have starred or been asked.
      const latest = readHistory()
      if (!latest || isDone(latest, now)) return stop()

      const took = latest.takenAt !== null && latest.takenAt >= startedAt
      if (!took && now - startedAt < STAR_PROMPT.warmupMs) return
      if (
        latest.takenAt !== null &&
        now - latest.takenAt < STAR_PROMPT.afterTakeMs
      )
        return
      if (busy()) return

      const asks = latest.asks + 1
      writeHistory({ ...latest, askedAt: now, asks })
      stop()
      setAsk(asks)
      setOpen(true)
      track("star_prompt", { outcome: "shown", ask: asks })
    }

    const timer = window.setInterval(check, 1000)
    return stop
  }, [])

  function onOpenChange(next: boolean) {
    if (!next && !starred.current) {
      track("star_prompt", { outcome: "later", ask })
    }
    setOpen(next)
  }

  function onStar() {
    starred.current = true
    const latest = readHistory()
    if (latest) writeHistory({ ...latest, starredAt: Date.now() })
    track("star_prompt", { outcome: "star", ask })
    setOpen(false)
  }

  const goal = stars === null ? null : starGoal(stars)
  /* Ticks lit, out of `TICKS`. At least one, so a count is never drawn empty. */
  const lit =
    stars === null || goal === null
      ? 0
      : Math.max(1, Math.round((stars / goal) * TICKS))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        initialFocus={panel}
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0"
      >
        {/*
          The grid's own idiom: a row of drawings on the recessed surface, and
          the chosen one on white. These are ways to say thanks, and the star
          is the one picked, which says what is being asked before a word of
          it is read.
        */}
        <div
          aria-hidden="true"
          className="flex items-center justify-center gap-2 bg-muted py-6"
        >
          {THANKS.map(({ Icon, fade }, index) =>
            index === Math.floor(THANKS.length / 2) ? (
              <span
                key="star"
                className="mx-1 flex size-14 items-center justify-center rounded-xl bg-background"
              >
                <Star
                  className="size-7 text-primary"
                  style={{ fill: "currentColor" }}
                />
              </span>
            ) : (
              <span
                key={index}
                className={cn(
                  "flex size-10 items-center justify-center text-muted-foreground",
                  fade
                )}
              >
                <Icon className="size-5" />
              </span>
            )
          )}
        </div>

        {/*
          Its own close rather than the panel's: that one is a ghost button,
          whose hover is the muted fill this one sits on, so it would not
          answer the pointer here.
        */}
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3 text-muted-foreground hover:bg-muted-hover"
            />
          }
        >
          <X />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div ref={panel} tabIndex={-1} className="p-5 outline-none">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-lg font-semibold tracking-tight">
              {goal === null
                ? "Star Keyline Icons on GitHub"
                : `Help us reach ${goal.toLocaleString("en-US")} stars`}
            </DialogTitle>
            <DialogDescription className="mt-1.5 max-w-sm leading-relaxed text-balance">
              If the set saved you drawing an icon, a star on GitHub takes a
              moment and helps other people find it.
            </DialogDescription>
          </DialogHeader>

          {stars !== null && goal !== null && (
            <div className="mt-6">
              <div className="flex items-baseline justify-between gap-3 text-sm tabular-nums">
                <span className="text-muted-foreground">
                  <span className="text-xl font-semibold tracking-tight text-foreground">
                    {stars.toLocaleString("en-US")}
                  </span>{" "}
                  of {goal.toLocaleString("en-US")}
                </span>
                <span className="text-muted-foreground">
                  {(goal - stars).toLocaleString("en-US")} to go
                </span>
              </div>
              {/*
                Ticks rather than a bar: the site's ruler, from the sliders
                and the changelog's margin. Every tenth is long, so the row
                reads in tenths of the goal at a glance. The lit ones fill in
                left to right on opening.
              */}
              <div
                role="progressbar"
                aria-label="Stars"
                aria-valuemin={0}
                aria-valuemax={goal}
                aria-valuenow={stars}
                className="mt-3 flex h-5 items-end justify-between"
              >
                {Array.from({ length: TICKS }, (_, index) => (
                  <span
                    key={index}
                    style={
                      index < lit
                        ? { transitionDelay: `${index * 18}ms` }
                        : undefined
                    }
                    className={cn(
                      "w-0.5 rounded-full",
                      (index + 1) % 10 === 0 ? "h-5" : "h-3",
                      index < lit
                        ? "bg-primary transition-colors duration-300 motion-reduce:transition-none starting:bg-border"
                        : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <DialogClose
              render={
                <Button variant="secondary" size="lg" className="flex-1" />
              }
            >
              Maybe later
            </DialogClose>
            <Button
              size="lg"
              className="flex-1"
              nativeButton={false}
              render={
                <a
                  href={SET_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Star on GitHub (opens in a new tab)"
                  onClick={onStar}
                />
              }
            >
              <GitHubLogo className="size-4" />
              Star on GitHub
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
