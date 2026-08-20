"use client"

import * as React from "react"

import { Search, X } from "@/components/icons"
import { Glyph, type StyleArt } from "@/components/glyph"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

/**
 * How long a suggestion stands still before the field turns to the next.
 *
 * The name used to type itself out letter by letter, which took most of a
 * second before it said anything and read as a machine at a keyboard. It rolls
 * now, so the whole name is legible from the first frame and the only question
 * left is how long to leave it there: long enough to read and consider, short
 * enough that the field is visibly offering more than one thing.
 */
const DWELL = 2200

/**
 * How long one roll takes: the outgoing name and glyph leaving while the next
 * pair arrives.
 *
 * It is also how long the outgoing pair is kept mounted, so the number lives
 * here rather than in a class — the CSS and the timeout that clears it cannot
 * disagree about when the roll is over.
 */
const ROLL = 260

/**
 * One thing the field can suggest: a name to type, and the drawing behind it.
 *
 * The art comes from the caller rather than being looked up here, because the
 * icons are already loaded there and this component has no business reaching
 * into the set for one.
 */
export type SearchSuggestion = { name: string; art: StyleArt }

/**
 * The library's one search field.
 *
 * It sits in the hero rather than in the browser, so it is extracted here: the
 * grid still filters on it, but a second field next to the results would be two
 * places to type the same thing.
 */
export function IconSearch({
  value,
  onValueChange,
  suggestions,
  className,
}: {
  value: string
  onValueChange: (next: string) => void
  /**
   * The icons to offer in the placeholder, in order. The first is what the
   * server renders, so it is the one that has to read well cold.
   */
  suggestions: readonly SearchSuggestion[]
  className?: string
}) {
  const ref = React.useRef<HTMLInputElement>(null)

  /**
   * Which suggestion the field is offering.
   *
   * The placeholder used to read "Search 414 icons…", which said how many there
   * were and nothing about what they are. A name answers the question people
   * actually arrive with — is the thing I need in here — and one name after
   * another covers more of the set than any single line could. The count is
   * still on the page, in "414 shown" above the grid.
   *
   * It starts at 0 on the server and on the client alike, so hydration has
   * nothing to correct.
   */
  const [index, setIndex] = React.useState(0)

  /**
   * One timeout per turn of the wheel, rather than an interval.
   *
   * The effect re-running per turn is what cleans up the pending timer: nothing
   * can be left in flight when the field is typed into or the component goes
   * away.
   *
   * It stops entirely while the field has anything in it. The suggestion is
   * hidden behind whatever was typed, so turning it is work for nothing, and a
   * timer re-rendering the field between keystrokes is worse than nothing.
   *
   * It never starts for a reader who asked for reduced motion, and that reader
   * keeps the first suggestion for the visit — a complete one, since the name
   * no longer has to be typed out to be readable. `matchMedia` is read here
   * rather than during render because the server has none, and an effect is the
   * one place a platform check cannot cause a hydration mismatch.
   */
  React.useEffect(() => {
    if (value || suggestions.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % suggestions.length),
      DWELL
    )

    return () => window.clearTimeout(timer)
  }, [index, value, suggestions.length])

  /** What the field is offering right now. */
  const suggestion = suggestions[index]

  /**
   * The glyph the field is rolling away from, kept alive long enough to leave.
   *
   * The icon changes on a strict swap: React unmounts one drawing and mounts
   * the next, so there is nothing on screen to animate *out* unless the old one
   * is held somewhere. This is that somewhere, cleared once the roll is over.
   *
   * The whole strip could have been rendered instead — eight glyphs stacked in
   * a masked box, translated by index — which is what an odometer physically
   * is. Two things ruled it out: the wrap from the last name back to the first
   * rewinds the entire strip past every icon in it, and a page left open long
   * enough would be animating a column that only grows. Holding one outgoing
   * glyph is the same picture at a fixed cost.
   *
   * It carries the direction with it, because the wheel turns the other way
   * every time: one name rolls up, the next rolls down, and so on. Always
   * turning the same way reads as a feed scrolling past on its own, which is a
   * thing that is happening *to* the page; alternating reads as a wheel being
   * turned back and forth, which is closer to what the field is doing.
   *
   * The direction is stored on the roll rather than read at render, so both
   * glyphs in flight agree about which way they are going even though the
   * outgoing one is a frame older than the incoming one.
   */
  const [rolling, setRolling] = React.useState<{
    out: SearchSuggestion
    up: boolean
  } | null>(null)
  const shownGlyph = React.useRef(suggestion)
  const nextRollIsUp = React.useRef(true)

  React.useEffect(() => {
    const previous = shownGlyph.current
    if (!suggestion || previous?.name === suggestion.name) return

    shownGlyph.current = suggestion
    if (!previous) return
    // A reader who asked for reduced motion has no typing animation either, so
    // the icon never changes for them and this is unreachable. Guarded anyway,
    // because "unreachable" is a claim about today's code.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const up = nextRollIsUp.current
    nextRollIsUp.current = !up

    setRolling({ out: previous, up })
    const timer = window.setTimeout(() => setRolling(null), ROLL)

    return () => window.clearTimeout(timer)
  }, [suggestion])

  /**
   * The platform is unknowable during SSR, so the label is read through
   * `useSyncExternalStore`: the server commits to ⌘K and the client corrects it
   * on hydration, which is the one path that doesn't trip a mismatch.
   */
  const shortcut = React.useSyncExternalStore(
    () => () => {},
    () => (/mac|iphone|ipad/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "⌘K"
  )

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k") return
      if (!event.metaKey && !event.ctrlKey) return

      // Browsers bind ⌘K to the address bar, so the default has to go.
      event.preventDefault()
      ref.current?.focus()
      ref.current?.select()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <Input
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) {
            // Clear first, blur only on a second press — Escape on a full field
            // should undo the search, not throw away focus with it.
            event.preventDefault()
            onValueChange("")
          }
        }}
        // No native placeholder: the animated one below stands in for it, and
        // two of them would print over each other. An attribute cannot be
        // animated anyway — a placeholder is a string the browser draws, with
        // no element to move — which is the whole reason the rolling one is
        // markup.
        //
        // So the accessible name comes from `aria-label` instead. It is fixed
        // and says what the field is, rather than naming whichever icon the
        // wheel happens to be showing.
        aria-label="Search icons"
        className={cn("h-12 pl-11 md:text-base", value ? "pr-20" : "pr-14")}
      />

      {/*
        The placeholder, as markup rather than as an attribute, so the name can
        roll the way the glyph does.

        "Search for" holds still and only the name turns. The sentence is the
        same sentence throughout; what changes is the thing being searched for,
        and moving the words around it would say otherwise.

        **It rolls against the glyph.** When the icon leaves upward the name
        leaves downward, and the two swap on the next turn. Sending both the
        same way makes the whole field slide, which reads as the page moving;
        opposing them reads as one wheel geared to another, which is what an
        odometer actually is.

        `flex-1` on the box rather than a width: it takes whatever the sentence
        leaves, so a long name is never clipped by a short one's width during a
        roll. Nothing follows the name in the line, so the extra room after a
        short one is invisible.

        `pointer-events-none` throughout, or the clear button and the ⌘K badge
        stop being clickable through it. `aria-hidden` too: the input's own
        `aria-label` is the accessible name, and a placeholder that changes
        every couple of seconds would otherwise be announced as it turned.
      */}
      {!value && suggestion && (
        <div
          aria-hidden="true"
          // `right-0` as well as `left-11`, or the box has no width to give
          // away: an absolutely positioned element anchored on one side only
          // sizes to its content, so `flex-1` on the name has nothing to grow
          // into and the word renders zero pixels wide.
          className="pointer-events-none absolute inset-y-0 right-0 left-11 flex items-center gap-[0.3em] pr-14 text-sm text-muted-foreground md:text-base"
        >
          Search for
          <span className="relative h-6 flex-1 overflow-hidden">
            {rolling && (
              <span
                key={`out-${rolling.out.name}`}
                className={cn(
                  "absolute inset-0 flex animate-out items-center duration-260 ease-out fill-mode-forwards",
                  // The opposite of the glyph's direction, hence the inverted
                  // test: `rolling.up` describes the icon.
                  rolling.up
                    ? "slide-out-to-bottom-[100%]"
                    : "slide-out-to-top-[100%]"
                )}
              >
                {rolling.out.name}
              </span>
            )}
            <span
              key={suggestion.name}
              className={cn(
                "absolute inset-0 flex items-center",
                rolling && "animate-in duration-260 ease-out",
                rolling &&
                  (rolling.up
                    ? "slide-in-from-top-[100%]"
                    : "slide-in-from-bottom-[100%]")
              )}
            >
              {suggestion.name}
            </span>
          </span>
        </div>
      )}

      {/*
        The drawing of whatever the placeholder is spelling, at the left edge of
        the field.

        This is the demonstration the animation was only describing: the name
        types itself out and the thing it names is right there, so the field
        shows what a query into it returns before anyone has typed a character.
        It is also the set drawing its own search box, which is the argument the
        whole site is making.

        The magnifier takes over the moment the field has anything in it. The
        placeholder is invisible behind text, so a suggestion's glyph beside a
        query it has nothing to do with is a mismatch on screen; the magnifier
        is what an input with text in it should be wearing anyway.

        One drawing leaves as the next arrives from the opposite edge, both
        inside a box the height of one glyph — an odometer wheel, turning one
        name to the next. `overflow-hidden` on that box is the whole illusion:
        without it the two icons are simply two icons sliding around the field.

        The wheel turns the other way every time: up, then down, then up. Both
        halves of a roll read the direction off `rolling`, so a glyph on its way
        out and the one on its way in can never disagree about it.

        The travel is written as `[100%]`, an explicit percentage of the glyph
        itself, so the roll is exactly one wheel-position however the box is
        sized. Do not reach for the numeric scale here: `slide-in-from-bottom-5`
        looks like 1.25rem and resolves to *five percent*, because
        `tw-animate-css` matches its percentage scale before the spacing one.
        That moves the icon a single pixel, which reads as a twitch rather than
        as a roll, and nothing warns.

        `aria-hidden`: the field's placeholder and its own text say what this
        is, and a glyph that changes every few seconds announcing itself would
        be noise on a screen reader.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 overflow-hidden text-muted-foreground"
      >
        {value || !suggestion ? (
          <Search className="size-5" />
        ) : (
          <>
            {rolling && (
              <span
                key={`out-${rolling.out.name}`}
                className={cn(
                  "absolute inset-0 animate-out duration-260 ease-out fill-mode-forwards",
                  rolling.up
                    ? "slide-out-to-top-[100%]"
                    : "slide-out-to-bottom-[100%]"
                )}
              >
                <Glyph art={rolling.out.art} size={20} stroke={2} />
              </span>
            )}

            {/*
              `key` on the name, so React swaps the element rather than mutating
              one drawing into the next: `Glyph` writes its body through
              `dangerouslySetInnerHTML`, and reusing the node across two icons
              leaves the previous paths in place for a frame.

              It only rolls in when something is rolling out, and from whichever
              edge that one is leaving by. On the first paint there is nothing to
              replace, and an icon sliding into an empty field on arrival is an
              animation about nothing.

              Stroke 2 and 20px, which is the set's own keyline at the size a UI
              affordance is drawn: the field is a piece of the site's chrome, so
              it wears the same weight as everything else in it rather than the
              browser's current stroke setting.
            */}
            <span
              key={suggestion.name}
              className={cn(
                "absolute inset-0",
                rolling && "animate-in duration-260 ease-out",
                rolling &&
                  (rolling.up
                    ? "slide-in-from-bottom-[100%]"
                    : "slide-in-from-top-[100%]")
              )}
            >
              <Glyph art={suggestion.art} size={20} stroke={2} />
            </span>
          </>
        )}
      </div>

      <div className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center gap-1">
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              onValueChange("")
              ref.current?.focus()
            }}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
        <kbd
          aria-hidden="true"
          className="pointer-events-none flex h-7 items-center rounded-md bg-muted px-2 font-sans text-xs text-muted-foreground"
        >
          {shortcut}
        </kbd>
      </div>
    </div>
  )
}
