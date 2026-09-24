"use client"

import * as React from "react"

import { useSectionInView } from "@/hooks/use-section-in-view"
import { useSectionJump } from "@/hooks/use-section-jump"
import { cn } from "@/lib/utils"

export type ContentsEntry = {
  id: string
  title: string
  /**
   * The logo or glyph the section's own title leads with, where it has one.
   * The install page's sections do; a blog post's headings are plain.
   */
  mark?: React.ReactNode
}

/**
 * The "On this page" label over a margin rail.
 *
 * One component because three rails wear it, the install page's contents, a
 * blog post's and the changelog's ticks, and it is the icon browser's
 * "Categories" heading, class for class, so a reader who has met one rail
 * has met them all. `className` carries only placement: the install and blog
 * lists inset it by their rows' `px-2`, the ticks hang it above themselves.
 */
export function ContentsLabel({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-xs font-medium tracking-wide text-muted-foreground uppercase",
        className
      )}
    >
      On this page
    </p>
  )
}

/**
 * A page's sections as one list in the margin, the one in view filled.
 *
 * Zafar, 24 Sep 2026: finding anything on `/install` meant scrolling through
 * it, and the page needed "a section to view category titles"; the blog's
 * posts got the same list the same day. The rows are the icon browser's
 * category rail, class for class: full-strength labels, the current row marked
 * by its fill and weight rather than by dimming the rest, and a mark before
 * the label where the section has one, muted where it is a glyph. Brand logos
 * keep their own colours, as they do in the titles.
 *
 * Every title stays visible, which is the whole point and why this is not the
 * changelog's ticks: those show one label at a time, and a reader who wants to
 * know what the page covers would have to hover down the column to find out.
 *
 * A click scrolls rather than jumps, the way a tick does, through the same
 * `useSectionJump`: the row clicked fills at once and holds while the page
 * travels, rather than the fill running down every row the scroll passes.
 * Each row is still an `href` to its section, so it opens in a new tab and
 * copies as the title's own address.
 */
export function PageContents({ entries }: { entries: ContentsEntry[] }) {
  const ids = entries.map((entry) => entry.id)
  const active = useSectionInView(ids)
  const { target, go } = useSectionJump(ids)
  const lit = target ?? active
  return (
    <nav aria-label="On this page">
      <ContentsLabel className="px-2 pb-2" />
      <ul className="flex flex-col gap-0.5">
        {entries.map((entry, i) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={i === active ? "location" : undefined}
              onClick={(event) => go(event, i)}
              className={cn(
                "flex items-start gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors",
                i === lit ? "bg-muted font-medium" : "hover:bg-muted/60"
              )}
            >
              {entry.mark && (
                <span className="flex h-5 shrink-0 items-center text-muted-foreground [&>svg]:size-4">
                  {entry.mark}
                </span>
              )}
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * The same contents as chips, for screens where the margin is too narrow for
 * the rail.
 *
 * Chips rather than a list because a phone would otherwise spend a screen on
 * eleven rows before the first section, and a wrapped row of chips is still
 * every title at one glance. They are the changelog's topic chip, a mark in a
 * white disc on a muted pill. A client component only for the smooth scroll,
 * which they share with the rail; nothing here is lit, because the chips are
 * above the first section and out of sight by the time any of them is current.
 */
export function PageContentsChips({
  entries,
  className,
}: {
  entries: ContentsEntry[]
  className?: string
}) {
  const { go } = useSectionJump(entries.map((entry) => entry.id))
  return (
    <nav
      aria-label="On this page"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {entries.map((entry, i) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          onClick={(event) => go(event, i)}
          className={cn(
            "inline-flex items-center gap-x-2 rounded-full bg-muted py-1 pe-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted-hover",
            entry.mark ? "ps-1" : "ps-3.5"
          )}
        >
          {entry.mark && (
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-background shadow-xs [&>svg]:size-4">
              {entry.mark}
            </span>
          )}
          {entry.title}
        </a>
      ))}
    </nav>
  )
}
