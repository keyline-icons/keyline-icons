"use client"

import * as React from "react"
import { toast } from "sonner"

import Link from "next/link"

import {
  ArrowUpRight,
  Check,
  Circle,
  Copy,
  Download,
  Minus,
  Square,
  X,
} from "@/components/icons"

import { DesignFileLinks } from "@/components/design-file-links"
import {
  artOf,
  Glyph,
  STYLES,
  type BrowserIcon,
  type Corners,
  type Style,
} from "@/components/glyph"
import { Segmented, SegmentedItem } from "@/components/segmented"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { track } from "@/lib/analytics"
import { noteTaken } from "@/lib/star-prompt"
import { cn } from "@/lib/utils"
import {
  downloadName,
  FORMATS,
  PACKAGE_MANAGERS,
  snippet,
  type Format,
  type PackageManager,
} from "@/lib/icon-code"
import { iconHref } from "@/lib/icon-pages"
import { aliasesFor, categoryOf } from "@/lib/icon-taxonomy"
import { paperFileForCategory } from "@/lib/paper-files"

import { CopyName } from "@/components/copy-name"

/** How many previewed icons stay reachable. Three fits one row beside the tile. */
const RECENT_LIMIT = 3

/**
 * The size the specimen is drawn at.
 *
 * One, not a ramp. Four sizes of the same drawing was a lot of panel spent
 * restating what the 24px grid behind it already shows; what the panel owes is
 * a look at the drawing large enough to judge, which is this.
 */
const SPECIMEN = 48

/**
 * How long the panel takes to leave, matching the `duration-200` it arrives on.
 *
 * Kept next to the entrance rather than derived from it: the class and this
 * number are one decision in two places, and a mismatch either clips the exit
 * short or leaves an invisible panel holding the grid's bottom padding.
 */
const EXIT_MS = 200

const CONTAINERS = [
  { value: "regular", label: "Regular", icon: Minus },
  { value: "square", label: "Square", icon: Square },
  { value: "circle", label: "Circle", icon: Circle },
] as const

/**
 * Which icon is being previewed, and the ones previewed before it.
 *
 * The recents are the reason this is a hook rather than local state in the
 * panel: they have to outlive the panel closing, so that reopening it still
 * offers the two icons you were comparing against.
 *
 * Nothing here is persisted. It is a record of this visit, and a "recent" strip
 * restored from a previous one is a list of icons you no longer remember
 * looking at.
 *
 * `initial` is the exception to nothing being persisted, and it is not
 * persistence: `?icon=` in the address opens the panel on that drawing. The
 * icon seeds the recents too, because the strip is a record of what this visit
 * has shown and the seeded icon is the first thing it showed.
 *
 * There are no picks of the panel's own. It had a style and a corners switch
 * that drew one drawing differently from the grid; with the dock setting both
 * right under it, that was two controls for one thing that could disagree.
 */
export function useIconPreview(initial?: { icon?: string }) {
  const [name, setName] = React.useState<string | null>(initial?.icon ?? null)
  const [recents, setRecents] = React.useState<string[]>(
    initial?.icon ? [initial.icon] : []
  )
  /**
   * The panel is on its way out but still mounted.
   *
   * Dropping `name` on close unmounts the panel in the same frame, so the
   * entrance plays and the exit does not — it simply stops being there. The
   * flag keeps it rendered for one animation's length so the same slide and
   * fade can run backwards.
   */
  const [closing, setClosing] = React.useState(false)
  const timer = React.useRef<number | null>(null)

  const cancelClose = React.useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = null
  }, [])

  const select = React.useCallback(
    (next: string) => {
      // Picking an icon mid-exit cancels the exit rather than racing it: the
      // pending timer would otherwise fire and close the panel you just opened.
      cancelClose()
      setClosing(false)
      setName(next)
      setRecents((prev) =>
        // Re-selecting something already in the strip leaves the strip alone.
        // Comparing two icons means clicking between them, and tiles that
        // reshuffle on every click are impossible to aim at.
        prev.includes(next) ? prev : [next, ...prev].slice(0, RECENT_LIMIT)
      )
    },
    [cancelClose]
  )

  const close = React.useCallback(() => {
    cancelClose()
    setClosing(true)
    // A timer rather than `animationend`, because `motion-reduce` sets
    // `animate-none` and an animation that never runs never ends — the panel
    // would sit there permanently for anyone who asked for less motion.
    timer.current = window.setTimeout(() => {
      timer.current = null
      setName(null)
      setClosing(false)
    }, EXIT_MS)
  }, [cancelClose])

  React.useEffect(() => cancelClose, [cancelClose])

  return {
    name,
    recents,
    closing,
    select,
    close,
  }
}

export function IconPreview({
  icons,
  name,
  recents,
  closing,
  order,
  gridStyle,
  gridCorners,
  stroke,
  color,
  size,
  onSelect,
  onClose,
  onSearch,
  onCategory,
}: {
  /** The whole set, so a recent icon still resolves after the filters move. */
  icons: BrowserIcon[]
  name: string | null
  recents: string[]
  /** Still mounted, but playing its exit. See `useIconPreview`. */
  closing: boolean
  /** The names on screen, in grid order — what the arrow keys walk. */
  order: string[]
  /** The dock's style and corner treatment, which the panel draws in. */
  gridStyle: Style
  gridCorners: Corners
  stroke: number
  color: string | null
  /** Only reaches the copied markup; the specimen draws its own ramp. */
  size: number
  onSelect: (name: string) => void
  onClose: () => void
  /** Clicking an alias searches for it; clicking the category filters to it. */
  onSearch: (query: string) => void
  onCategory: (label: string) => void
}) {
  const byName = React.useMemo(
    () => new Map(icons.map((icon) => [icon.name, icon])),
    [icons]
  )

  const icon = name ? byName.get(name) : undefined

  const [format, setFormat] = React.useState<Format>("svg")
  /**
   * Which manager the install lines are written for.
   *
   * Local, not a persisted setting. The cookie carries how the set is *drawn*;
   * this is a fact about the reader's machine that costs one click to correct
   * and would otherwise have to survive a rename of `BrowserSettings`.
   */
  const [pm, setPm] = React.useState<PackageManager>("npm")
  /** Whether the code block was just copied. The name owns its own state,
   *  inside `CopyName`. */
  const [copied, setCopied] = React.useState(false)

  const corners = gridCorners

  /*
    The dock's style, or the first one this drawing has where it lacks it:
    an icon whose fill is its stroke still opens with something drawn.
  */
  const style: Style = React.useMemo(() => {
    if (!icon) return gridStyle
    for (const candidate of [gridStyle, ...STYLES]) {
      if (artOf(icon, candidate, corners)) return candidate
    }
    return gridStyle
  }, [icon, gridStyle, corners])

  const art = icon ? artOf(icon, style, corners) : undefined

  const code = React.useMemo(
    () =>
      icon && art?.body
        ? snippet(format, icon.name, style, art, { size, stroke, pm, corners })
        : "",
    [icon, art, format, style, size, stroke, pm, corners]
  )

  /*
    Counted after the write resolves, never before it. A copy the clipboard
    refused is the one case where the reader wanted the snippet and did not get
    it, and folding it into the same number as a successful copy would hide
    exactly that. The tick and the event agree for the same reason.
  */
  const copy = React.useCallback(
    async (text: string) => {
      if (!text || !icon) return
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
        track("icon_copy", {
          icon: icon.name,
          style,
          format,
          surface: "dock",
        })
        noteTaken()
      } catch {
        toast.error("Couldn't copy", {
          description: "Clipboard access was refused.",
        })
      }
    },
    [icon, style, format]
  )

  const download = React.useCallback(() => {
    if (!icon || !art?.body) return
    const file = snippet("svg", icon.name, style, art, {
      size,
      stroke,
      pm,
      corners,
    })
    const url = URL.createObjectURL(
      new Blob([`${file}\n`], { type: "image/svg+xml" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = downloadName(icon.name, style, corners)
    link.click()
    URL.revokeObjectURL(url)
    track("icon_download", { icon: icon.name, style, surface: "dock" })
    noteTaken()
  }, [icon, art, style, size, stroke, pm, corners])

  /*
    Escape closes, and the arrows walk the grid. Stepping between neighbours
    without going back to the grid is most of what the panel is for: two icons
    that differ by one detail sit next to each other in name order.

    Bound to the window rather than to the panel because the panel is not modal
    — the grid underneath stays live, and focus is usually still on the tile
    that opened this.
  */
  React.useEffect(() => {
    if (!name) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      const step =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
      if (!step || event.metaKey || event.ctrlKey || event.altKey) return

      // The search field owns its own arrows, and so does anything else you can
      // type into.
      const active = document.activeElement
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable)
      ) {
        return
      }

      const at = order.indexOf(name)
      const next = order[at + step]
      if (at !== -1 && next) {
        event.preventDefault()
        onSelect(next)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [name, order, onSelect, onClose])

  if (!icon || !art) return null

  /** The other two containers of the same drawing, where they exist. */
  const variants = CONTAINERS.map((c) => ({
    ...c,
    icon: icons.find(
      (candidate) =>
        candidate.base === icon.base && candidate.container === c.value
    ),
  })).filter((c) => c.icon)
  const hasFamily = variants.length > 1

  const aliases = aliasesFor(icon.base)
  const category = categoryOf(icon.base)
  const tint = color ? { color } : undefined

  /** Every chip and button in the panel stands 36px tall. */
  const chip =
    "flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs transition-colors"

  return (
    /*
      Not fixed itself any more: it rides the stack in `IconBrowser` that also
      holds the floating dock, which is measured as one so the grid pads by
      both.

      Narrower than the page from `lg` up, centred over the bar: across the
      full container the code ran 1,300px wide and the drawing sat a long way
      from the chips that change it. Below `lg` it is the container's width,
      as it always was.
    */
    <div className="mx-auto w-full px-6 lg:max-w-4xl lg:px-0">
      {/*
          Solid, not frosted. A blurred panel over a grid of small drawings
          turns the drawings into smears and the code underneath into grey on
          grey; the point of this surface is that it is opaque and the code on
          it is readable. The border is what separates it from the page.
        */}
      <div
        role="dialog"
        aria-label={`${icon.name} preview`}
        /* Half-strength edge: at full `--border` the outline competed with
             the hairline under the header and with the grid tiles behind it.
             The shadow is what separates the panel from the page; this only
             has to close it. */
        className={cn(
          "pointer-events-auto relative max-h-[75dvh] overflow-y-auto rounded-xl border border-border/50 bg-background shadow-lg duration-200 motion-reduce:animate-none",
          // The exit is the entrance run backwards, at the same length. It
          // arrives sliding up out of the page edge and leaves the same way,
          // so the two halves read as one gesture rather than an appearance
          // and a disappearance.
          // `fill-mode-forwards` holds the finished state until the unmount
          // lands. The exit keyframe animates *to* transparent with the
          // default fill mode of `none`, so without it the panel snaps back
          // to fully opaque for any frame between the animation ending and
          // the timer firing — a flash at the end of every close.
          closing
            ? "animate-out fill-mode-forwards fade-out slide-out-to-bottom-4"
            : "animate-in fade-in slide-in-from-bottom-4"
        )}
      >
        {/*
            The identity strip: two blocks, not one wrapping row.

            What the icon *is* — name, shelf, version, dates, synonyms — reads
            down the left. What takes you somewhere else — the icons opened
            before this one, and who drew it — is a block of its own at the
            right, and drops whole underneath on a narrow screen.

            As one flow they came apart there: the recents landed on a line of
            their own hooked to the right, the credit hooked to the right of the
            synonyms two lines below, and the two right-aligned fragments in the
            middle of a left-aligned column read as a broken layout.
          */}
        {/* Half strength, like the panel's own edge — the two hairlines meet
              at the corners and a heavier one there reads as a seam. */}
        <div className="flex flex-col gap-2 border-b border-border/50 px-3 py-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {/*
              The close button is out of the flow, so whatever shares its line
              has to leave its width — that is the `pr-9` below, and it is the
              only clearance in here. Everything else runs to the header's own
              padding, which is where the button's right edge sits too, so the
              credit line ends flush with it.
            */}
          <div className="flex min-w-0 flex-col gap-1 pr-8 sm:pr-0">
            <div className="flex min-h-8 flex-wrap items-center gap-x-2.5 gap-y-1">
              {/*
                The name is the thing most often wanted on its own — it is what
                goes in an issue, a message or an import you are writing by
                hand — so it copies itself rather than making you select it out
                of a code block that has six other things in it.
              */}
              <h2>
                {/* `text-sm`, with the rest of the dock. `text-base` here is
                      the one thing in the panel still at the old scale, and it
                      is the line most likely to wrap. */}
                <CopyName
                  name={icon.name}
                  className="font-mono text-sm font-medium"
                  iconClassName="size-3.5"
                />
              </h2>

              <button
                type="button"
                onClick={() => onCategory(category)}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted-hover hover:text-foreground"
              >
                {category}
              </button>

              {/*
                  The word, where the grid marks the tile with a dot alone. The
                  grid shows every new drawing at once and a label on each one
                  drowns the set; here there is one icon on screen, the row
                  already reads as prose about it, and the mark that was too
                  faint to name itself in the grid gets said out loud.

                  The dot comes with it, at the size and the colour it has on a
                  tile. That is the whole point of the badge: a dot in a corner
                  means nothing until you have seen it once with its name
                  attached, and the panel is where you see it, because opening
                  an icon is what you do after noticing the mark on it.

                  Outlined rather than filled, so it is not read as another
                  chip like the category beside it, and so the dot keeps the
                  blue it wears in the grid instead of inverting to sit on a
                  filled pill.

                  Not hidden from a reader, unlike the grid's dot: this line is
                  the panel's own description of the icon, so it is announced
                  with the version and the date beside it.
                */}
              {icon.isNew && (
                <span className="flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10px] leading-4 font-semibold tracking-wide text-foreground">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  New
                </span>
              )}

              {icon.history && !icon.history.pending && (
                <span className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground tabular-nums">
                  {/* No version until a tag covers it. Printing the current
                        one said a drawing shipped in a release that went out
                        without it. */}
                  <span>
                    {icon.history.version
                      ? `v${icon.history.version}`
                      : "Unreleased"}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Added{" "}
                    <time dateTime={icon.history.added}>
                      {icon.history.addedLabel}
                    </time>
                  </span>
                  {icon.history.updated !== icon.history.added && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        Updated{" "}
                        <time dateTime={icon.history.updated}>
                          {icon.history.updatedLabel}
                        </time>
                      </span>
                    </>
                  )}
                </span>
              )}
            </div>

            {/*
              The words someone would have searched instead. They are buttons
              because a synonym you can only read is trivia — clicking one runs
              the search and shows the rest of the family it belongs to.

              No label in front of them. A row of lowercase words under a name
              is already read as "or call it this", and "ALSO" only took the
              place where the first word should be.
            */}
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground">
              {aliases.map((alias, at) => (
                <React.Fragment key={alias}>
                  {/*
                      A separator element rather than an `::after` on the
                      button: inside it, the slash would be part of what you
                      click and would underline with the word on hover.
                    */}
                  {at > 0 && (
                    /* Half strength, not `--border`: that token is a
                         hairline colour, and a glyph painted in it at 12px is
                         invisible rather than quiet. */
                    <span aria-hidden="true" className="opacity-50">
                      /
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onSearch(alias)}
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {alias}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/*
              Where you go next: the icons opened before this one, the page,
              and out. At the right of the header on a wide screen, one row
              under the identity on a narrow one: never a right-aligned
              fragment inside a left-aligned column.

              No credit line. Who drew it is on the icon page, one click away;
              in the panel it was a row of faces under the close button that
              said nothing about the drawing being looked at.
            */}
          {/*
              It wraps on a phone and does not on a wide screen. Unwrappable,
              whatever ran past 327px of panel was clipped, because
              `overflow-y-auto` on the panel makes the other axis `auto` too, so
              the overflow was a scrollbar nobody would find rather than a
              visible mistake.
            */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:shrink-0 sm:flex-col sm:flex-nowrap sm:items-end sm:gap-1.5">
            {/*
                The recents and the close button share a line on a wide screen.
                `contents` on a phone: there the button is absolute at the
                panel's corner, and a box holding nothing else would leave a
                gap in this row.
              */}
            <div className="contents sm:flex sm:items-center sm:gap-2">
              {recents.length > 1 && (
                <div className="flex items-center gap-2">
                  {/* Named, because three unlabelled glyphs beside the close
                      button read as three more buttons that do something to
                      the icon you are looking at. */}
                  <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Recent
                  </span>
                  <div className="flex items-center gap-1">
                    {recents.map((recent) => {
                      const entry = byName.get(recent)
                      if (!entry) return null
                      const recentArt =
                        artOf(entry, style, corners) ??
                        artOf(entry, "stroke", corners)!

                      return (
                        <Tooltip key={recent}>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={() => onSelect(recent)}
                                aria-label={recent}
                                aria-current={recent === icon.name}
                                className={cn(
                                  "flex size-8 items-center justify-center rounded-lg transition-colors",
                                  recent === icon.name
                                    ? "bg-muted"
                                    : "hover:bg-muted"
                                )}
                              />
                            }
                          >
                            <span className="flex text-foreground" style={tint}>
                              <Glyph
                                art={recentArt}
                                size={18}
                                stroke={stroke}
                              />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{recent}</TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                </div>
              )}

              {/*
                  The dock's one link out, and the only route by which a crawler
                  reaches the icon pages from the grid: every tile is a button
                  that opens this panel, so without an `<a href>` in here the
                  414 pages would hang off the sitemap alone.

                  It is a link and not a second panel state on purpose. What the
                  page adds is what does not fit in a dock — the size ramp, the
                  family, the shelf, the credit in full — so sending you there
                  is the honest offer.

                  It sits beside the close button because both are ways out of
                  the panel. Among the name and the dates it read as another
                  fact about the icon rather than as somewhere to go.
                */}
              <Link
                href={iconHref(icon.name)}
                /* `whitespace-nowrap`, or a narrow row breaks it after
                     "Open" and the two words read as separate controls. */
                className="flex h-8 items-center gap-1 rounded-lg px-2 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Open page
                <ArrowUpRight className="size-3.5" />
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close preview"
                className="absolute top-2 right-3 sm:static"
              >
                {/* 20px, matching the glyphs in the recents beside it. The
                      button's own default is 16, which is right next to a text
                      label and too small next to a row of drawn icons. */}
                <X className="size-4.5" />
              </Button>
            </div>
          </div>
        </div>

        {/*
            The body is a grid, not columns of stacks.

            Three blocks — the square, the chips, the code — laid out as
            columns left every row free to sit at a different height, and they
            did: the chips ended up floating halfway down the panel with the
            square's top edge and the code's top edge either side of them. Rows
            in a grid share a top by definition.

            The square spans all three rows on a wide screen and the chips,
            the formats and the code stack beside it. On a phone only the chips
            fit beside it and the rest spans the full width.

            The last row is `minmax(0, 1fr)`, not `1fr`. A plain `1fr` track
            still takes its *minimum* from its content, so the five-line React
            snippet grew the row past the square's height and the whole panel
            jumped 10px taller on a tab change. With a zero floor the square
            alone decides the height and a long snippet scrolls inside the code
            block, which is what the scrollbar there is for.
          */}
        {/*
            One gap, both axes: 8px inside 12px of padding. It was 24px between
            the columns against 12px between the rows and 16px of padding,
            which put three different spacings in one small panel and made the
            square look adrift from the controls beside it.

            The gap being smaller than the padding is the point — the three
            blocks in here belong to each other more than they belong to the
            panel's edge. What the tightening buys goes to the code block,
            which fills whatever the square leaves.
          */}
        {/*
            The first track is `auto`, never a number. Pinned at 14rem against
            a 13.5rem square it left 8px of empty track on top of the gap, so
            the column read as 24px away from the controls while every other
            space in the panel was 16 — and the two numbers had to be kept in
            step by hand for every breakpoint the square has.
          */}
        {/*
          Two rows in column two where the drawing has no other containers,
          three where it does: the family row sits on top only when there is
          one, so a drawing without it does not open on an empty band.
        */}
        <div
          className={cn(
            "grid grid-cols-[auto_1fr] gap-2 p-3",
            hasFamily
              ? "sm:grid-rows-[auto_auto_minmax(0,1fr)]"
              : "sm:grid-rows-[auto_minmax(0,1fr)]"
          )}
        >
          {/*
              The drawing, once, big, filling the square.

              The square sets the panel's height rather than taking it. Sized
              off its row it collapsed to whatever three lines of SVG needed,
              which left the preview smaller than the code beside it; the code
              now fills what the square leaves.

              Every size is a multiple of 24, so one grid unit of the drawing is
              a whole number of pixels: 4, 5, then 9. The 96 on a phone is not a
              preference either — the three style chips sit beside it, and
              anything larger clips "Fill" off a 375px screen.
            */}
          {/*
              Below `sm` it is 72 wide and takes its height from the rows it
              spans — no `h-*`, so the grid's default `align-items: stretch`
              fills the area and nothing is left empty beside it. A fixed height
              left a hole there, and `h-full` cannot close it: a percentage
              against auto-sized rows resolves to auto, which is the content,
              which here is nothing.

              From `sm` up it is the square that sets the panel's height,
              spanning all three rows.
            */}
          <div
            className={cn(
              "relative size-18 overflow-hidden rounded-lg bg-muted sm:size-48",
              hasFamily ? "row-span-2 sm:row-span-3" : "sm:row-span-2"
            )}
          >
            {/*
              The drawing's 24×24 grid, one square per unit, the way the frame
              reads in Figma: you see where a stroke lands on the grid, not
              just that it looks right.

              From `sm` up only. The drawing fills the 192 square there, 8px
              to the unit, so every line falls on a whole pixel; on a phone it
              is 48, and 2px squares are a grey haze rather than a grid.

              Edge to edge, with no margin: the square's own edge is the
              frame. The layer covers the whole square, so every line runs
              out to both edges and the outer cells read as cells on all four
              sides. A tiled gradient puts a line at the start of each tile,
              which would draw one along the top and left edges and none
              along the bottom and right; the 1px of padding, with the
              background clipped to the content box, drops just that one.
              Started 8px in instead, the lines stopped short of the top and
              left, and those sides read as a margin the others did not have.
            */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden sm:block"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box",
                padding: "1px 0 0 1px",
              }}
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-foreground"
              style={tint}
            >
              {/*
                  The drawing is sized, not stretched. `size-full` in a box that
                  is taller than it is wide painted the glyph to both side edges
                  with a column of air above and below it — the drawing has 2
                  units of padding built in and no more, so filling the width is
                  how it ends up looking cramped in a tall tile. 48 centred is
                  the same drawing at a size it was built for. On `sm` the tile
                  is square again and the glyph can have all of it.
                */}
              <Glyph
                art={art}
                size={SPECIMEN}
                stroke={stroke}
                className="size-12 sm:size-full"
              />
            </span>
          </div>

          {/*
              The same drawing in its other containers, where it has them. No
              heading over them: three chips that each show a glyph and name a
              container are already saying what they are.

              No style or corner switches in this row any more: the dock sets
              both, and the panel draws whatever it is set to.
            */}
          {hasFamily && (
            <div className="flex min-w-0 gap-1.5">
              {variants.map((variant) => (
                <button
                  key={variant.value}
                  type="button"
                  onClick={() => onSelect(variant.icon!.name)}
                  /* The label is dropped where the room is not there; the
                         glyph beside it says the same. */
                  aria-label={variant.label}
                  className={cn(
                    chip,
                    "justify-center px-2 sm:px-2.5",
                    variant.icon!.name === icon.name
                      ? "bg-muted font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="flex size-5 items-center justify-center">
                    <Glyph
                      art={
                        artOf(variant.icon!, style, corners) ??
                        artOf(variant.icon!, "stroke", corners)!
                      }
                      size={18}
                      stroke={stroke}
                    />
                  </span>
                  <span className="hidden sm:inline">{variant.label}</span>
                </button>
              ))}
            </div>
          )}

          {/*
              Three rows in column two: what to copy, how to install it, and the
              code itself. From `sm` up the first two share one row — two items
              in the same cell, one hugging each edge — which is what keeps the
              square spanning three rows rather than four.
            */}
          <div
            className={cn(
              "col-start-2 flex min-w-0 items-center overflow-x-auto sm:justify-self-start sm:overflow-visible",
              hasFamily ? "sm:row-start-2" : "sm:row-start-1"
            )}
          >
            <Segmented size="sm" variant="ghost" aria-label="Format">
              {FORMATS.map((f) => (
                <SegmentedItem
                  key={f.value}
                  size="sm"
                  variant="ghost"
                  active={format === f.value}
                  onClick={() => setFormat(f.value)}
                >
                  {f.label}
                </SegmentedItem>
              ))}
            </Segmented>
          </div>

          {/*
              The package managers and the two actions on one line: the switcher
              belongs with the command it rewrites, and both belong next to the
              button that copies it. Full width below `sm`, where it is a row of
              its own; hooked to the right of the formats from `sm` up.
            */}
          {/*
              It wraps, because on a phone the React and CLI formats put the
              package managers, the two design files, Download and Copy on one
              303px line, which is more than it holds.
            */}
          <div
            className={cn(
              "col-span-2 flex min-w-0 flex-wrap items-center gap-2 sm:col-span-1 sm:col-start-2 sm:justify-self-end",
              hasFamily ? "sm:row-start-2" : "sm:row-start-1"
            )}
          >
            {/*
                Only where the snippet has a command in it. On the two formats
                that are just markup, a package manager is a control with
                nothing to change — and its absence costs no height here,
                because the actions hold the row open either way.
              */}
            {(format === "react" || format === "cli") && (
              <Segmented size="sm" aria-label="Package manager">
                {PACKAGE_MANAGERS.map((m) => (
                  <SegmentedItem
                    key={m.value}
                    size="sm"
                    active={pm === m.value}
                    onClick={() => setPm(m.value)}
                    className="px-2.5"
                  >
                    {m.value}
                  </SegmentedItem>
                ))}
              </Segmented>
            )}

            <div className="ml-auto flex items-center gap-2">
              {/*
                Figma and Paper, as marks with the label in a tooltip, with the
                other ways of taking the drawing away: the file it lives in sits
                beside the file you can download and the code you can copy.
                They were at the end of the style and corner chips, where they
                read as two more pickers.
              */}
              <DesignFileLinks
                paperUrl={paperFileForCategory(category).url}
                className="flex items-center gap-2"
              />
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={download}
                      aria-label="Download SVG"
                    />
                  }
                >
                  <Download />
                </TooltipTrigger>
                <TooltipContent>
                  Download {downloadName(icon.name, style, corners)}
                </TooltipContent>
              </Tooltip>

              <Button onClick={() => copy(code)}>
                {copied ? (
                  <Check data-icon="inline-start" />
                ) : (
                  <Copy data-icon="inline-start" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {/*
              The code is taken out of the flow on a wide screen — `absolute`
              inside this box — so that it contributes nothing to how tall its
              row wants to be. The square then decides the panel's height on its
              own, and a five-line snippet scrolls instead of pushing the whole
              panel up by ten pixels on a tab change.

              `minmax(0, 1fr)` alone does not do it: this grid's height is auto,
              and with no definite free space a flexible track is sized by its
              content, floor or no floor.

              On a phone there is no square to take the height from, so the
              block stays in the flow and caps itself instead.
            */}
          <div
            className={cn(
              "relative col-span-2 sm:col-span-1 sm:col-start-2",
              hasFamily ? "sm:row-start-3" : "sm:row-start-2"
            )}
          >
            <pre className="h-28 overflow-auto rounded-lg bg-muted p-2.5 text-xs leading-relaxed sm:absolute sm:inset-0 sm:h-auto">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
