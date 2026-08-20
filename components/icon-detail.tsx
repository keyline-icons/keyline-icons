"use client"

import * as React from "react"
import { toast } from "sonner"

import { ArrowUTurnLeft, Check, Copy, Download } from "@/components/icons"
import { Glyph, STYLES, type BrowserIcon, type Style } from "@/components/glyph"
import { useBrowserSettings } from "@/hooks/use-browser-settings"
import { SETTINGS_DEFAULTS, type BrowserSettings } from "@/lib/browser-settings"
import { Segmented, SegmentedItem } from "@/components/segmented"
import { TickSlider } from "@/components/tick-slider"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  downloadName,
  FORMATS,
  MISSING_STYLE,
  PACKAGE_MANAGERS,
  snippet,
  type Format,
  type PackageManager,
} from "@/lib/icon-code"
import { cn } from "@/lib/utils"

/**
 * The reference sizes the true-size strip always draws, in px.
 *
 * The dock deliberately has no ramp: four copies of one drawing was a lot of a
 * small panel spent restating what the grid behind it already showed. A page is
 * the other case. There is no grid behind it, the visitor arrived from a search
 * result rather than from a wall of icons, and the question a page has to
 * answer that the dock does not is whether the drawing survives at 16.
 *
 * These are the sizes shadcn/ui actually renders at: 16 inside a button, 20 in
 * a sidebar row, 24 standalone, 32 in an empty state.
 */
const RAMP = [16, 20, 24, 32] as const

/** The tallest sample the strip has to leave room for. Matches the slider's max. */
const MAX_SIZE = 48

/**
 * The whole interactive half of an icon page: the specimen, what it is drawn
 * with, and the code that reproduces it.
 *
 * A client island inside an otherwise static page. Everything that a crawler
 * has to read — the heading, the tags, the family, the related grid — is
 * server-rendered around this, and this renders at its defaults on the server
 * too, so the markup a crawler is handed already contains the drawing and a
 * copyable snippet rather than an empty box waiting for hydration.
 *
 * Size, stroke and colour are the *browser's* settings, shared through the same
 * cookie the grid writes. That was local state at first, on the argument that
 * 414 pages should not render per request to answer a preference — and it was
 * wrong in use: setting a colour on the grid and opening an icon showed it back
 * in black, and setting one here was forgotten the moment you returned. The
 * cookie is what "how the set is drawn" means, and a page that draws the set
 * has to read it.
 *
 * The initial value arrives as a prop rather than being read here, which is the
 * whole reason there is no flash: `hooks/use-browser-settings.ts` seeds state
 * from what the server already rendered, so the first client render matches and
 * nothing moves after paint. Reading the cookie on the client instead paints
 * the defaults and corrects them ~57ms later, which on this page is the
 * specimen changing colour and size in front of you.
 */
export function IconDetail({
  icon,
  initialSettings,
}: {
  icon: BrowserIcon
  initialSettings: BrowserSettings
}) {
  const drawn = React.useMemo(
    () => STYLES.filter((style) => icon.art[style]),
    [icon]
  )

  const [style, setStyle] = React.useState<Style>(drawn[0] ?? "stroke")

  /**
   * Size, stroke and colour, shared with the grid through the cookie.
   *
   * `color` being `null` is "whatever the page's ink is", which is what the
   * drawings do on their own. None of the three reaches the copied markup as a
   * colour: every icon paints from `currentColor`, so the snippet stays
   * inheritable and the tint is a preview of the drawing in your palette rather
   * than an edit to it. Size and stroke do reach it, because they are what the
   * markup says.
   *
   * `showNames` and `columns` come along in the object and are simply not used
   * here — they describe a grid, and there is no grid on this page.
   */
  const [settings, update] = useBrowserSettings(initialSettings)
  const { size, stroke, color } = settings

  const [format, setFormat] = React.useState<Format>("svg")
  const [pm, setPm] = React.useState<PackageManager>("npm")
  const [copied, setCopied] = React.useState(false)

  const art = icon.art[style] ?? icon.art[drawn[0]!]!
  const tint = color ? { color } : undefined

  /**
   * The reference sizes with the chosen one folded in.
   *
   * The slider was the one control on the page that changed nothing you could
   * see: it only reached the copied snippet, so dragging it read as broken.
   * Putting its value in the strip is what makes it visible — a sample appears
   * between the reference sizes and grows as you drag, and at 16, 20, 24 or 32
   * it lands on the sample that is already there rather than duplicating it.
   */
  /*
    Only the three this page can change. `showNames` and `columns` belong to the
    grid, so a reader who left the grid at 12 columns would otherwise find
    Reset lit on a page with no columns on it and nothing to undo.
  */
  const atDefaults = (["size", "stroke", "color"] as const).every(
    (key) => settings[key] === SETTINGS_DEFAULTS[key]
  )

  const ramp = React.useMemo(
    () => [...new Set<number>([...RAMP, size])].sort((a, b) => a - b),
    [size]
  )

  const code = React.useMemo(
    () => snippet(format, icon.name, style, art, { size, stroke, pm }),
    [format, icon.name, style, art, size, stroke, pm]
  )

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error("Couldn't copy", {
        description: "Clipboard access was refused.",
      })
    }
  }, [code])

  const download = React.useCallback(() => {
    const file = snippet("svg", icon.name, style, art, { size, stroke, pm })
    const url = URL.createObjectURL(
      new Blob([`${file}\n`], { type: "image/svg+xml" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = downloadName(icon.name, style)
    link.click()
    URL.revokeObjectURL(url)
  }, [icon.name, style, art, size, stroke, pm])

  /*
    The specimen column steps with the window and the code takes the rest.

    Fixed tracks rather than a fraction, because the tile is square: at
    `lg:grid-cols-2` on a 1440 page the drawing would stand 700px tall, which is
    a poster, not a specimen. Stepping the track instead — 22rem, then 26rem
    past 1280 — keeps the two columns in proportion while the drawing stays a
    size you can take in at once.
  */
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-6">
      <div className="flex flex-col gap-4">
        {/*
          The drawing filling its box, which is the one view the grid cannot
          give you: at 24px a 2px keyline is two pixels and a 1-unit gap is one.
          Scaled up, the construction is visible — which corners are rounded,
          where the ink stops short of the edge.
        */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
          <span
            className="absolute inset-0 flex p-8 text-foreground"
            style={tint}
          >
            <Glyph art={art} size={24} stroke={stroke} className="size-full" />
          </span>
        </div>

        {/*
          And the same drawing at the sizes it will actually ship at, 1:1. No
          scaling, no box around each one: the point is the pixels, so anything
          drawn beside them competes with them.

          The slot is as tall as the largest sample the slider can ask for, so
          the strip never changes height while you drag — the samples grow
          inside it instead of pushing everything under them down.
        */}
        <div className="flex items-end justify-between gap-2 rounded-lg bg-muted px-4 py-3">
          {ramp.map((px) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <span
                className="flex items-center text-foreground"
                style={{ height: MAX_SIZE, ...tint }}
              >
                <Glyph art={art} size={px} stroke={stroke} />
              </span>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  // The chosen size names itself in full, so the strip says
                  // which sample the slider and the snippet are talking about.
                  px === size
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {px === size ? `${px} px` : px}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        {/*
          Which weight, and what it is drawn with. A style the icon has not got
          stays in the row and says why on hover: "there is no fill of this" is
          a fact about the drawing, and greying it out silently reads as a bug
          in the page.
        */}
        <div className="flex flex-wrap items-center gap-2">
          <Segmented>
            {STYLES.map((s) => {
              const item = (
                <SegmentedItem
                  key={s}
                  active={style === s}
                  disabled={!icon.art[s]}
                  onClick={() => setStyle(s)}
                  className="capitalize"
                >
                  {s}
                </SegmentedItem>
              )

              return icon.art[s] ? (
                item
              ) : (
                <Tooltip key={s}>
                  {/* A disabled button takes no pointer events, so the tooltip
                      hangs off a wrapper rather than off the chip. */}
                  <TooltipTrigger render={<span className="flex" />}>
                    {item}
                  </TooltipTrigger>
                  <TooltipContent className="max-w-64">
                    No {s} drawing. {MISSING_STYLE}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </Segmented>

          <TickSlider
            value={size}
            onChange={(next) => update({ size: next })}
            min={16}
            max={48}
            step={1}
            major={(v) => v % 8 === 0}
            label="Icon size in pixels"
          />

          <TickSlider
            value={stroke}
            onChange={(next) => update({ stroke: next })}
            min={1}
            max={3}
            step={0.25}
            major={Number.isInteger}
            label="Stroke width in pixels"
          />

          {/*
            The browser's colour control, same shape: a label rather than a
            button, because clicking anywhere on it has to open the OS picker,
            and the only thing that does that is a real `input[type=color]` lying
            invisibly over the top.

            The word "Color" is there until a colour is picked and gone
            afterwards — once the swatch is a colour it states the same fact,
            and the label was only ever naming the default swatch.
          */}
          <label
            title={color ?? "Icon colour"}
            className={cn(
              "relative flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-muted px-2.5 text-sm",
              color && "w-9 justify-center px-0"
            )}
          >
            <span
              aria-hidden="true"
              className="size-4 rounded-full border border-black/10"
              style={{ background: color ?? "currentColor" }}
            />
            {!color && <span>Color</span>}
            <input
              type="color"
              value={color ?? "#000000"}
              onChange={(event) => update({ color: event.currentTarget.value })}
              aria-label="Icon colour"
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>

          {/*
            The grid's Reset, in the grid's idiom: always present, disabled at
            the defaults, and it puts all three back at once.

            It was a clear-the-colour button that appeared only when a colour
            was set, which left two problems. A control that comes and goes
            moves the row it is in, and a native colour input has no "unset", so
            the page's own ink was a state you could leave and not get back to —
            and the same was true of a scrubbed size and stroke, which had no
            way back at all.

            `aria-label` rather than only a tooltip: a disabled button receives
            no pointer events, so the tooltip cannot open on it, and the label
            is what a screen reader still reads.
          */}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => update(SETTINGS_DEFAULTS)}
                  disabled={atDefaults}
                  aria-label="Reset size, stroke and colour"
                  className="disabled:pointer-events-none disabled:opacity-40"
                />
              }
            >
              <ArrowUTurnLeft className="size-4" />
            </TooltipTrigger>
            <TooltipContent>Reset to defaults</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Segmented>
            {FORMATS.map((f) => (
              <SegmentedItem
                key={f.value}
                active={format === f.value}
                onClick={() => setFormat(f.value)}
              >
                {f.label}
              </SegmentedItem>
            ))}
          </Segmented>

          {/* Only on the two formats whose snippet has a command in it. */}
          {(format === "react" || format === "cli") && (
            <Segmented>
              {PACKAGE_MANAGERS.map((m) => (
                <SegmentedItem
                  key={m.value}
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
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={download}
                    aria-label="Download SVG"
                  />
                }
              >
                <Download />
              </TooltipTrigger>
              <TooltipContent>
                Download {downloadName(icon.name, style)}
              </TooltipContent>
            </Tooltip>

            <Button size="lg" onClick={copy}>
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
          The code takes its own height between a floor and a ceiling, rather
          than filling the column.

          Filling was the first shape, copied from the dock, and on a page it is
          wrong: the specimen column is 400-odd pixels tall against three lines
          of SVG, so the block became a large empty grey panel with a snippet in
          the top corner. The floor keeps a one-line CLI command from reading as
          a text field; the ceiling keeps the five-line React snippet from
          moving everything under it on a tab change.
        */}
        <pre className="max-h-[26rem] min-h-40 overflow-auto rounded-lg bg-muted p-4 text-[13px] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
