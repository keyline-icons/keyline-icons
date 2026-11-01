"use client"

import type * as React from "react"

import { ChevronLeft, ChevronRight } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

/**
 * The pager under a paged list: `/icons` and `/blog`, one widget for both.
 *
 * Links, not buttons, for the reason the icon tiles are: a crawler follows an
 * `href` and never presses anything, so these are how the entries past page 1
 * get a link from the list at all. Previous and Next stay buttons at the ends,
 * since a disabled link is not a thing.
 *
 * With `onTurn`, a plain click turns the page in place (the icon grid, which
 * holds every page in memory); without it, each number is an ordinary link to
 * a server-rendered page (the blog). Either way the `href` is the page's own
 * address, so a new tab, a shared link and a crawler all land on it.
 */

/**
 * The page numbers to draw: always the first and last, always the neighbours of
 * the current one, and a gap for whatever is skipped. A gap is the list of pages
 * it stands for, because the ellipsis opens a menu of them: a skipped page
 * reachable only by stepping Next through its neighbours is not reachable.
 *
 * A gap of one is drawn as its number. The ellipsis takes the same room, so
 * hiding a single page saves nothing and costs the reader a click.
 */
function pageNumbers(current: number, total: number): (number | number[])[] {
  const wanted = new Set([1, total, current - 1, current, current + 1])
  const out: (number | number[])[] = []

  for (let n = 1; n <= total; n++) {
    const last = out.at(-1)
    if (wanted.has(n)) out.push(n)
    else if (Array.isArray(last)) last.push(n)
    else out.push([n])
  }

  return out.flatMap((entry) =>
    Array.isArray(entry) && entry.length === 1 ? entry : [entry]
  )
}

/**
 * A left click with no modifier held: the one a link here keeps for itself.
 * Anything else, cmd, ctrl, shift or a middle click, is left to the browser,
 * which opens the address the way a link under the pointer promises.
 */
export const plainClick = (event: React.MouseEvent) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey

/**
 * Previous or Next: a link to the neighbouring page, or a disabled button at
 * either end of the list, where there is no neighbour to link to.
 */
function PagerStep({
  href,
  onTurn,
  children,
}: {
  href: string | null
  onTurn?: () => void
  children: React.ReactNode
}) {
  const className = cn(
    buttonVariants({ variant: "ghost" }),
    "h-9 disabled:pointer-events-none disabled:opacity-40"
  )

  if (href === null)
    return (
      <button type="button" disabled className={className}>
        {children}
      </button>
    )

  return (
    <a
      href={href}
      onClick={
        onTurn &&
        ((event) => {
          if (!plainClick(event)) return
          event.preventDefault()
          onTurn()
        })
      }
      className={className}
    >
      {children}
    </a>
  )
}

export function Pager({
  current,
  total,
  hrefs,
  onTurn,
  describe,
  className,
}: {
  current: number
  total: number
  /**
   * Every page's address, page 1 first; page 1 is the bare list, never
   * `?page=1`. A list rather than a function, because a server page (the
   * blog) renders this and a function cannot cross into a client component.
   */
  hrefs: readonly string[]
  /** Turns the page in place on a plain click; omit for ordinary links. */
  onTurn?: (n: number) => void
  /** A second line for each page in a gap's menu (the grid's name range). */
  describe?: (n: number) => string
  className?: string
}) {
  if (total <= 1) return null
  const href = (n: number) => hrefs[n - 1]

  return (
    <nav
      aria-label="Pages"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1",
        className
      )}
    >
      <PagerStep
        href={current > 1 ? href(current - 1) : null}
        onTurn={onTurn && (() => onTurn(current - 1))}
      >
        <ChevronLeft data-icon="inline-start" className="size-4" />
        Previous
      </PagerStep>

      {pageNumbers(current, total).map((entry) =>
        Array.isArray(entry) ? (
          <DropdownMenu key={`gap-${entry[0]}`}>
            {/* Opens on hover as well as on click; the click is what a
                touch screen and a keyboard still have. `delay` is zero
                because Base UI's is a rest timer, restarted by every mouse
                move, so its default 100 waits for the pointer to stop and
                reads as half a second. */}
            <DropdownMenuTrigger
              openOnHover
              delay={0}
              closeDelay={150}
              aria-label={`Pages ${entry[0]} to ${entry.at(-1)}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 text-muted-foreground"
              )}
            >
              …
            </DropdownMenuTrigger>
            {/* Upward: the pager is the foot of the list. */}
            <DropdownMenuContent
              side="top"
              align="center"
              className="w-auto max-w-80"
            >
              {entry.map((n) => (
                <DropdownMenuItem
                  key={n}
                  {...(onTurn
                    ? { onClick: () => onTurn(n) }
                    : { render: <a href={href(n)} /> })}
                  className="gap-3 py-1.5"
                >
                  <span className="w-5 text-right font-medium tabular-nums">
                    {n}
                  </span>
                  {describe && (
                    <span className="truncate text-muted-foreground">
                      {describe(n)}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a
            key={entry}
            href={href(entry)}
            onClick={
              onTurn &&
              ((event) => {
                if (!plainClick(event)) return
                event.preventDefault()
                onTurn(entry)
              })
            }
            aria-current={entry === current ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: entry === current ? "default" : "ghost",
              }),
              "h-9 w-9 tabular-nums"
            )}
          >
            {entry}
          </a>
        )
      )}

      <PagerStep
        href={current < total ? href(current + 1) : null}
        onTurn={onTurn && (() => onTurn(current + 1))}
      >
        Next
        <ChevronRight data-icon="inline-end" className="size-4" />
      </PagerStep>
    </nav>
  )
}
