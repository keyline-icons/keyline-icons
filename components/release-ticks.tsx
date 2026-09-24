"use client"

import * as React from "react"

import { useSectionInView } from "@/hooks/use-section-in-view"
import { useSectionJump } from "@/hooks/use-section-jump"
import { cn } from "@/lib/utils"

export type ReleaseTick = {
  /** The section's id, which the tick links to. */
  id: string
  /** `v0.9.0`, or `Unreleased`. */
  version: string
  /** What the release is dated, as the entry prints it. */
  date: string
  /** The release's headline, where one was written. */
  title: string | null
}

/**
 * Tick widths by distance from the centre tick, in pixels, and the width every
 * tick further out settles at.
 *
 * Measured off the reference Zafar sent (17 Sep 2026), which was drawn at 2x:
 * 52, 40, 28 and 20 there, then 12 for the rest. The steps are what make it
 * read as a lens over a ruler rather than a bar chart, so they taper rather
 * than jump straight from the long tick to the short ones.
 */
const WIDTHS = [26, 20, 14, 10]
const REST = 6

/**
 * Every release as a tick in the margin, the one in view drawn long and black.
 *
 * It replaced two things at once: a sticky rail per release, which carried the
 * version and the date beside each entry and ran into the next one as it
 * scrolled, and a row of version badges under the header, which was the only
 * way to jump and scrolled away with the header. One column of ticks does both
 * jobs from a fixed place, and leaves the version and the date to the line
 * above each title.
 *
 * The widths are a lens, centred on the release in view, and on the tick under
 * the pointer while there is one: running a finger down the column swells the
 * ticks around it. The black stays on the release in view, so hovering
 * previews where a click goes without claiming to be there already.
 *
 * **A click scrolls rather than jumps** (Zafar, 17 Sep 2026: "let's see how
 * switching tags with smooth scroll looks"). The black and the label go to the
 * release clicked at once and hold there while the page travels, and the
 * widths and the label ease between rows, so the column moves once and the
 * page catches up with it.
 *
 * **One label is always showing**, beside the centre of the lens: the release
 * in view, or the one pointed at. It carries the version, the date and the
 * release's title. It was hover only at first, following the reference, and
 * that left a column of unlabelled dashes that said where the reader was only
 * to someone who already knew (Zafar, 17 Sep 2026: "make title visible").
 *
 * The current release comes from `useSectionInView` and the jump from
 * `useSectionJump`, both shared with the install page's contents. The hover is
 * plain state set from pointer events, not a ref: a pointer guard held in a ref
 * latched once on this site and silently disabled the feature that read it.
 */
/** A tick's row, `h-2.5`, which the label's glide is measured in. */
const ROW = 10

export function ReleaseTicks({ releases }: { releases: ReleaseTick[] }) {
  const ids = releases.map((release) => release.id)
  const active = useSectionInView(ids)
  const [hovered, setHovered] = React.useState<number | null>(null)
  /*
    The release a click is travelling to, while the page is still on its way,
    and the smooth scroll that takes it there. Shared with the install page's
    contents; the reasoning is on the hook.
  */
  const { target, go } = useSectionJump(ids)
  const lit = target ?? active
  const centre = hovered ?? lit

  const labelled = releases[centre]

  return (
    <nav
      aria-label="Releases"
      className="relative"
      onPointerLeave={() => setHovered(null)}
    >
      <ol className="flex flex-col">
        {releases.map((release, i) => {
          const distance = Math.abs(i - centre)
          const current = i === lit
          const pointed = i === hovered
          return (
            <li key={release.id}>
              <a
                href={`#${release.id}`}
                aria-current={i === active ? "location" : undefined}
                onClick={(event) => go(event, i)}
                onPointerEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="relative flex h-2.5 w-10 items-center outline-none"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-0.5 rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none",
                    current
                      ? "bg-foreground"
                      : pointed
                        ? "bg-foreground/45"
                        : "bg-foreground/15"
                  )}
                  style={{ width: WIDTHS[distance] ?? REST }}
                />
                <span className="sr-only">
                  {[release.version, release.date, release.title]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </a>
            </li>
          )
        })}
      </ol>

      {/*
        One label, not fourteen: labels beside every tick would be the list of
        badges this replaced, set vertically. It is one element that glides to
        the centre of the lens rather than a label mounted under each tick,
        which is what lets a jump read as the label travelling with the page
        instead of blinking from one row to another. Its first line is centred
        on its tick (a 16px line on a 10px row, so 3px above the row) and the
        title hangs below, beside ticks that stop at the far left.
      */}
      {labelled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute start-10 top-0 flex w-48 flex-col gap-1 transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `translateY(${centre * ROW - 3}px)` }}
        >
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-mono text-xs font-medium tracking-tight text-foreground">
              {labelled.version}
            </span>
            <span className="text-[11px] tracking-widest text-muted-foreground uppercase">
              {labelled.date}
            </span>
          </span>
          {labelled.title && (
            <span className="text-[13px] leading-snug font-medium text-balance text-foreground">
              {labelled.title}
            </span>
          )}
        </span>
      )}
    </nav>
  )
}
