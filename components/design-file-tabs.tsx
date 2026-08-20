"use client"

import * as React from "react"

import { FigmaLogo, PaperLogo } from "@/components/brand-logos"
import { ArrowUpRight } from "@/components/icons"
import { Segmented, SegmentedItem } from "@/components/segmented"
import { Button } from "@/components/ui/button"

/**
 * The design-files section's picker, and the only client island in it.
 *
 * It is here rather than in `figma-showcase.tsx` because everything else that
 * section draws is static: two screenshots and eight sentences, all of which
 * should be server-rendered and in the markup a crawler reads. So the panels
 * arrive as props, already rendered, and this component does nothing but decide
 * which one is shown and which link the button opens.
 *
 * **Both panels stay in the DOM**, hidden with the `hidden` attribute rather
 * than switched with a ternary. The inactive panel holds a screenshot and an
 * outbound link, and a link that only exists after a click is a link nothing
 * crawls. It also means switching tabs costs no render.
 *
 * The picker it replaced was one enabled chip and one disabled chip with a
 * "Coming soon" badge, and it was not a tab set: no state, no `onClick`, no
 * panel per tab, rendered from a server component. The note there said what
 * turning it on would need — `"use client"`, state, `aria-selected` on
 * `role="tab"` items with a `tabpanel` under them — and this is that, plus the
 * keyboard behaviour a tablist owes: arrows move between tabs, Home and End go
 * to the ends, and only the selected tab is in the tab order.
 */

const TOOLS = [
  { id: "figma", label: "Figma", Logo: FigmaLogo },
  { id: "paper", label: "Paper", Logo: PaperLogo },
] as const

export type DesignTool = (typeof TOOLS)[number]["id"]

export function DesignFileTabs({
  urls,
  panels,
}: {
  /** Where each tool's button goes. */
  urls: Record<DesignTool, string>
  /** Each tool's panel, rendered on the server and handed over as-is. */
  panels: Record<DesignTool, React.ReactNode>
}) {
  const [tool, setTool] = React.useState<DesignTool>("figma")
  const tabs = React.useRef<Map<DesignTool, HTMLButtonElement | null>>(
    new Map()
  )

  /*
    Roving focus. A tablist is one tab stop, so the arrow keys move between the
    tabs rather than Tab doing it, and the move selects — these panels are cheap
    and already rendered, so there is nothing to be gained by making the reader
    press Enter after arriving.
  */
  function onKeyDown(event: React.KeyboardEvent) {
    const order = TOOLS.map((t) => t.id)
    const at = order.indexOf(tool)
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? order[(at + 1) % order.length]
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? order[(at - 1 + order.length) % order.length]
          : event.key === "Home"
            ? order[0]
            : event.key === "End"
              ? order[order.length - 1]
              : null
    if (!next) return
    event.preventDefault()
    setTool(next)
    tabs.current.get(next)?.focus()
  }

  const active = TOOLS.find((t) => t.id === tool) ?? TOOLS[0]

  return (
    <>
      {/*
        `flex-wrap` with the picker first: on a phone the two stack in that
        order rather than the button jumping above the tabs, and
        `justify-between` only starts separating them once there is room for
        both on one line.
      */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex">
          <Segmented
            role="tablist"
            aria-label="Design tool"
            onKeyDown={onKeyDown}
          >
            {TOOLS.map(({ id, label, Logo }) => (
              <SegmentedItem
                key={id}
                ref={(node) => {
                  tabs.current.set(id, node)
                }}
                role="tab"
                id={`design-tab-${id}`}
                aria-controls={`design-panel-${id}`}
                aria-selected={tool === id}
                /*
                  `SegmentedItem` sets `aria-pressed` for its usual job, which is
                  a toggle group. It is not allowed on `role="tab"`, and the
                  spread lands after it, so this is what removes it.
                */
                aria-pressed={undefined}
                tabIndex={tool === id ? 0 : -1}
                active={tool === id}
                onClick={() => setTool(id)}
              >
                {/*
                  The mark in its own brand colours rather than the chip's ink,
                  which is most of what makes a logo legible at 16px. Same as the
                  framework row. `mr-2` on the mark because `SegmentedItem` sets
                  no gap.
                */}
                <Logo className="mr-2 size-4 shrink-0" />
                {label}
              </SegmentedItem>
            ))}
          </Segmented>
        </div>

        {/*
          The default variant, which is the flat `--primary` fill: near-black in
          light, near-white in dark, and the loudest control this theme has. The
          icon page's "Open in Figma" is `outline`, and that is right there,
          because it sits in a row of quiet metadata about one drawing. Here it
          is the only action in the section, opposite a picker that is a recessed
          grey track, and an outline button against that read as a second,
          equally weighted control rather than as the thing to click.

          It carries the tool's mark, like the icon page's button does. This
          argued against it for a while, on the grounds that the chip 40px away
          already wears the same logo and repeating it reads as two links to two
          different places. What settles it the other way is that the chip and
          the button are not the same kind of thing: one selects, one leaves the
          site, and the mark on the button names the destination rather than the
          selection. It also follows the tool it opens, so the button changes
          when the tab does.
        */}
        <Button
          size="lg"
          render={
            <a href={urls[tool]} target="_blank" rel="noopener noreferrer" />
          }
          nativeButton={false}
        >
          {/*
            Both marks keep their brand colours, which hold against the flat
            `--primary` fill in either theme: near-black in light, near-white in
            dark, and neither Figma's five nor Paper's blue disappears into
            either. See `components/brand-logos.tsx`.
          */}
          <active.Logo data-icon="inline-start" className="size-4 shrink-0" />
          {`Open in ${active.label}`}
          <ArrowUpRight data-icon="inline-end" />
          <span className="sr-only">{" (opens in a new tab)"}</span>
        </Button>
      </div>

      {TOOLS.map(({ id }) => (
        <div
          key={id}
          role="tabpanel"
          id={`design-panel-${id}`}
          aria-labelledby={`design-tab-${id}`}
          hidden={tool !== id}
          /* The section is a `flex flex-col gap-3` column and a hidden panel
             must not take a gap with it, so the panel carries the column rather
             than sitting in it. */
          className="flex flex-col"
        >
          {panels[id]}
        </div>
      ))}
    </>
  )
}
