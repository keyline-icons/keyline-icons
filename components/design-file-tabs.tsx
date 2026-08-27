"use client"

import * as React from "react"

import {
  FigmaLogo,
  FigmaPluginLogo,
  PaperLogo,
} from "@/components/brand-logos"
import { ArrowUpRight } from "@/components/icons"
import { Segmented, SegmentedItem } from "@/components/segmented"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * The design-files section's picker, and the only client island in it.
 *
 * It is here rather than in `figma-showcase.tsx` because everything else that
 * section draws is static: three screenshots and twelve sentences, all of which
 * should be server-rendered and in the markup a crawler reads. So the panels
 * arrive as props, already rendered, and this component does nothing but decide
 * which one is shown and which link the button opens.
 *
 * **Every panel stays in the DOM**, hidden with the `hidden` attribute rather
 * than switched with a ternary. An inactive panel holds a screenshot and an
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

/**
 * `action` rather than `Open in ${label}` computed at the call site, which is
 * what this was. Two of these are files you open in a tool and the third is a
 * plugin you install, so "Open in Plugin" was the sentence that formula
 * produced and it names no destination at all.
 *
 * The plugin carries both marks, Figma's and the set's own, as one lockup — see
 * `FigmaPluginLogo`. Either alone says half of what the chip is: Figma's is the
 * tab beside it wearing the same logo, and ours is a mark most readers meet for
 * the first time here. Together they say whose editor and whose icons, which is
 * the whole of it.
 *
 * **The order is the plugin, then Figma, then Paper**, and the plugin is the
 * panel that opens. It runs most-reached to least: someone drawing in Figma
 * gets the set from the plugin without ever opening the library file, where the
 * two files below are for reading and for taking the drawings out of.
 *
 * Figma opened by default for one version, on the argument that the lead above
 * this row is a sentence about the Figma file and landing elsewhere under it
 * reads as a mismatch. That was overruled, and it was the weaker half of the
 * argument: a tablist whose first chip is not the selected one reads as a bug
 * before it reads as anything. If the mismatch ever bites, the lead is the
 * thing to change.
 */
const TOOLS = [
  {
    id: "plugin",
    label: "Figma Plugin",
    action: "Get the plugin",
    Logo: FigmaPluginLogo,
    /*
      Both dimensions given, rather than a height and `w-auto`. An `<svg>` with
      a viewBox and no width/height attributes is a replaced element whose
      `auto` width browsers have historically resolved against the containing
      block rather than against the viewBox's ratio, and the failure mode is a
      mark that fills the chip. Pinning both is one class either way and cannot
      go wrong. The lockup is 70.67 x 40, so 16 tall wants 28.27 wide, which is
      `w-[1.77rem]` to within a twentieth of a pixel.

      The other two keep the `size-4` they shipped with. A square box letterboxes
      Figma's 2:3 mark exactly as it always has; nothing about those two moves.
    */
    logoClass: "h-4 w-[1.77rem]",
  },
  {
    id: "figma",
    label: "Figma",
    action: "Open in Figma",
    Logo: FigmaLogo,
    logoClass: "size-4",
  },
  {
    id: "paper",
    label: "Paper",
    action: "Open in Paper",
    Logo: PaperLogo,
    logoClass: "size-4",
  },
] as const

export type DesignTool = (typeof TOOLS)[number]["id"]

export function DesignFileTabs({
  urls,
  panels,
  caveats,
}: {
  /** Where each tool's button goes. */
  urls: Record<DesignTool, string>
  /** Each tool's panel, rendered on the server and handed over as-is. */
  panels: Record<DesignTool, React.ReactNode>
  /**
   * A line about what the button opens, for the tools that need one. Beside the
   * button rather than under the picture: it is a caveat about the click, and
   * above four notes it is read after the click has already happened.
   */
  caveats?: Partial<Record<DesignTool, React.ReactNode>>
}) {
  const [tool, setTool] = React.useState<DesignTool>("plugin")
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
        Picker left, button right, and nothing else in this row. `flex-wrap`
        with the picker first so that on a phone the two stack in that order
        rather than the button jumping above the tabs, and `justify-between`
        only starts separating them once there is room for both on one line.

        The caveat sat in here beside the button for a version and it made the
        two tabs different shapes: caveat plus button is wider than the space the
        picker leaves, so on a narrower window the pair wrapped and the button
        dropped to a second line on Paper while Figma kept it on the first. A row
        that is one line on one tab and two on the other reads as the layout
        breaking on switch.
      */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex">
          <Segmented
            role="tablist"
            aria-label="Design tool"
            onKeyDown={onKeyDown}
          >
            {TOOLS.map(({ id, label, Logo, logoClass }) => (
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

                  **The size is per tool, in `logoClass`.** These were all
                  `size-4` until the plugin's lockup arrived, and a lockup is
                  nearly twice as wide as it is tall, so a square box letterboxes
                  it to half its height. The lockup names both dimensions; the
                  other two are untouched.
                */}
                <Logo className={cn("mr-2 shrink-0", logoClass)} />
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
          <active.Logo
            data-icon="inline-start"
            className={cn("shrink-0", active.logoClass)}
          />
          {active.action}
          <ArrowUpRight data-icon="inline-end" />
          <span className="sr-only">{" (opens in a new tab)"}</span>
        </Button>
      </div>

      {/*
        The caveat's line under the button, reserved on every tab and filled on
        the ones that have something to say.

        **Nothing here moves.** Two earlier versions animated the line's height,
        first with the `0fr` to `1fr` grid trick and then with a capped
        `max-height`, and both were solving the wrong problem: a reveal is
        smoother than a jump but it is still the picture shifting every time you
        toggle a control you are toggling back and forth. The slot is one line
        tall whatever tab is showing, and only the words fade. It costs a blank
        line under the Figma button, which is the cheaper of the two prices.

        Each tool's line is absolutely positioned so it contributes no height of
        its own, which is what makes the reservation exact rather than a
        `min-height` that the longest caveat could still outgrow. Keeping all of
        them mounted is what lets the one leaving fade out while the one arriving
        fades in; a single element fed `caveats[tool]` swaps its text instantly
        and reads as a pop however the box is animated.

        Two lines are reserved below `sm`, since the sentence wraps on a phone
        and an overflowing line would sit on top of the screenshot.
      */}
      <div className="relative h-10 sm:h-5">
        {TOOLS.map(({ id }) => (
          <p
            key={id}
            className={cn(
              "absolute inset-x-0 top-0 text-sm text-muted-foreground transition-opacity duration-260 ease-out sm:text-right",
              caveats?.[id] && tool === id ? "opacity-100" : "opacity-0"
            )}
            /* Its own tab is what it describes, so it leaves the accessibility
               tree with that tab's panel rather than being read out beside it. */
            aria-hidden={tool !== id}
          >
            {caveats?.[id]}
          </p>
        ))}
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
