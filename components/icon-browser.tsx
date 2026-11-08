"use client"

import * as React from "react"
import Link from "next/link"

import {
  AArrowDown,
  ArrowDownWideNarrow,
  ArrowRight,
  BarChart,
  Bed,
  Bird,
  Boy,
  Bold,
  Bot,
  CalendarArrowDown,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Coffee,
  Command,
  Cursor,
  DiagramProject,
  Divide,
  Eraser,
  FaceSmile,
  File,
  FlaskConical,
  GitBranch,
  Globe,
  GraduationCap,
  Leaf,
  Lungs,
  Mail,
  MapPin,
  Menu,
  Minus,
  Palette,
  PanelLeft,
  PanelTopCloseDashed,
  Plane,
  Play,
  Plus,
  RotateCcw,
  Scale,
  Settings,
  Shapes,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Square,
  Star,
  Sun,
  Trophy,
  User,
  Venus,
  Wallet,
  Wrench,
} from "@/components/icons"

import { cn } from "@/lib/utils"
import { Pager, plainClick } from "@/components/pager"
import { Button, buttonVariants } from "@/components/ui/button"
import { XLogo } from "@/components/brand-logos"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  artOf,
  CORNERS,
  SHARP_BADGE,
  Glyph,
  STYLES,
  type BrowserIcon,
  type Corners,
  type Style,
} from "@/components/glyph"
import { IconPreview, useIconPreview } from "@/components/icon-preview"
import { GRID_PAGE_SIZE, ICONS_SEGMENT, iconHref } from "@/lib/icon-pages"
import {
  aliasesFor,
  CATEGORIES,
  categoryOf,
  OTHER_CATEGORY,
} from "@/lib/icon-taxonomy"
import { Segmented, SegmentedItem } from "@/components/segmented"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PhoneToggle } from "@/components/phone-toggle"
import { TickSlider } from "@/components/tick-slider"
import { useBrowserSettings } from "@/hooks/use-browser-settings"
import { useEdgeFade } from "@/hooks/use-edge-fade"
import { type Treatments, useTreatmentChoice } from "@/hooks/use-treatments"
import {
  type BrowserSettings,
  RESET_DEFAULTS,
  SETTINGS_DEFAULTS,
  SORTS,
  type Sort,
  atResetDefaults,
} from "@/lib/browser-settings"
import { SEARCH_MIN_LENGTH, SEARCH_SETTLE_MS, track } from "@/lib/analytics"
import { nearestWord } from "@/lib/did-you-mean"
import { answers, answersQuery, gridOrder, terms } from "@/lib/icon-search"
import {
  NAV_HEIGHT,
  NAV_HEIGHT_NARROW,
  SET_REQUEST_URL,
  SET_X_URL,
} from "@/lib/site-chrome"

// The renderer and the types live in `components/glyph` because the hero draws
// the same glyphs at display size and must draw them the same way.
export type { StyleArt, BrowserIcon } from "@/components/glyph"

/**
 * The container an icon is drawn in, which is also how the grid is sectioned.
 *
 * Order matters twice: it is the order of the menu and the order of the
 * sections, and the two are kept in sync by reading from this one list.
 */
const SHAPES = [
  { value: "regular", label: "Regular", hint: "No container", icon: Minus },
  { value: "square", label: "Square", hint: "square- prefix", icon: Square },
  { value: "circle", label: "Circle", hint: "circle- prefix", icon: Circle },
] as const

type Shape = (typeof SHAPES)[number]["value"]
type ShapeFilter = Shape | "all"

/**
 * The sort menu's rows, in `SORTS` order. The two glyphs are a pair on
 * purpose: a letter and a date, each with the arrow that says which way the
 * list runs.
 */
const SORT_ROWS: Record<
  Sort,
  {
    label: string
    hint: string
    icon: React.ComponentType<{ className?: string }>
  }
> = {
  name: { label: "Name", hint: "A to Z", icon: AArrowDown },
  newest: {
    label: "Newest",
    hint: "Latest added first",
    icon: CalendarArrowDown,
  },
}

/**
 * A glyph for each category row, so the rail is also a sample of what the row
 * contains. The labels and patterns themselves live in `lib/icon-taxonomy`,
 * which the preview panel reads too.
 */
const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  // Kept while the shelf is empty. The review row is opened and closed in
  // `icon-taxonomy.ts` once a batch, and the label comes back with it; dropping
  // the entry here would make reopening a two-file edit, which is the thing
  // that row's own comment exists to avoid.
  New: Star,
  Arrows: ArrowRight,
  "Chevrons & Carets": ChevronRight,
  Git: GitBranch,
  Files: File,
  Time: Clock,
  Mail: Mail,
  Commerce: ShoppingCart,
  // Split off Commerce on 9 Sep 2026. The wallet rather than a currency mark:
  // the rail is read at 16px and a $ there is a letter, not a picture.
  Finance: Wallet,
  Maps: MapPin,
  // Its own bed rather than a house: the rail is read at 16px, and the roof
  // glyph already stands for Web.
  Home: Bed,
  Media: Play,
  Charts: BarChart,
  Diagrams: DiagramProject,
  Emoji: FaceSmile,
  Devices: Smartphone,
  Pointers: Cursor,
  Layout: PanelLeft,
  Users: User,
  // Opened 14 Sep 2026. The boy rather than a baby: at 16px the rail wants the
  // face with the most to read, and a bald dome is a circle.
  People: Boy,
  Gender: Venus,
  Actions: Check,
  // Every label in CATEGORIES needs a row here, including the ones added since:
  // the rail maps before it filters, so a label with a count and no icon renders
  // <undefined /> and takes the whole browser down rather than dropping a row.
  Controls: SlidersHorizontal,
  // The formatting shelf, added with the batch that created it. Without this row
  // the rail rendered <undefined /> and /icons answered 500 — which is the
  // failure the comment above is about, arriving the very next time a label was.
  Text: Bold,
  Weather: Sun,
  Shapes: Shapes,
  // A shelf of one, split off Sport on 9 Sep 2026. Its own drawing on the rail
  // rather than the trophy: the row is the mortarboard and nothing else.
  Education: GraduationCap,
  Sport: Trophy,
  // The two shelves the food and art batch opened. The mug and the palette are
  // the drawings that read at 16px; a cake is candles at that size and a brush
  // is a stick.
  "Food & Drink": Coffee,
  Art: Palette,
  Tools: Wrench,
  // Opened 11 Sep 2026 beside Tools. Its own drawing on the rail rather than a
  // borrowed pencil, the same call `Education` made with the mortarboard.
  Stationery: Eraser,
  Web: Globe,
  // The three shelves batch D opened, 12 Sep 2026.
  Transport: Plane,
  Nature: Leaf,
  Animals: Bird,
  // The three shelves batch B opened, 13 Sep 2026.
  AI: Bot,
  Science: FlaskConical,
  Health: Lungs,
  // The two shelves the symbol batch opened, 22 Sep 2026. The division sign
  // rather than the equals, which at 16px is two bars and reads as the menu.
  Math: Divide,
  Keyboard: Command,
  // Opened 5 Oct 2026 (1.7.0). The balance rather than the gavel: at 16px the
  // mallet is a diagonal stick, and the pans are the mark people know.
  Law: Scale,
  [OTHER_CATEGORY]: Circle,
}

/** The row that is not a category: everything. */
const ALL_ICON = Menu

/**
 * Below this the category rail is gone, so the drawer has to carry it. Keep it
 * in step with the `lg:` on the `<aside>` — they are two halves of one switch.
 */
const BELOW_SIDEBAR = "(max-width: 1023px)"

/**
 * Sets `key` on the address, or drops it when the value is at its neutral:
 * the whole set in stroke, rounded, on page 1 is `/icons` and nothing else.
 */
const carry = (
  params: URLSearchParams,
  key: string,
  value: string | null,
  neutral: string
) => {
  if (value && value !== neutral) params.set(key, value)
  else params.delete(key)
}

/**
 * One search, as the miss report counts searches: two that differ in any of
 * these four are two searches.
 */
const signatureOf = (
  query: string,
  style: Style,
  shape: ShapeFilter,
  category: string
) => `${query}|${style}|${shape}|${category}`

/**
 * What the grid is narrowed by, as one string. A page number only means
 * something against the same narrowing, so the page resets when this changes.
 * The style is left out on purpose: see the page reset in `IconBrowser`.
 */
const pageSignatureOf = (
  query: string,
  shape: ShapeFilter,
  category: string,
  sort: Sort
) => `${query}|${shape}|${category}|${sort}`

export function IconBrowser({
  icons,
  treatments,
  initialSettings,
  initialStyle = "stroke",
  initialShape = "all",
  initialIcon,
  initialIconStyle,
  initialIconCorners,
  initialPage = 1,
  query,
  onQueryChange,
}: {
  icons: BrowserIcon[]
  /** Which corner treatments are loaded, and how to load the other. */
  treatments: Treatments
  initialSettings: BrowserSettings
  /**
   * Seeded from `?style=`, so a link can arrive at the grid already showing one
   * weight. Same shape as the search seed: it starts the state and nothing
   * writes back to the URL afterwards.
   */
  initialStyle?: Style
  /** Seeded from `?shape=`, on the same terms as the style above. */
  initialShape?: ShapeFilter
  /**
   * Seeded from `?icon=`, so a link opens with the dock already on one drawing.
   *
   * Unlike the three seeds above, this one is also *written*: see the effect
   * that keeps the address on the icon being looked at. It is validated on the
   * server against the set, so an unknown name arrives here as `undefined`
   * rather than opening a panel with nothing in it.
   */
  initialIcon?: string
  /**
   * Seeded from `?icon-style=` and `?icon-corners=`: how the dock was showing
   * that drawing.
   *
   * Separate keys from `?style=` and `?corners=` because they are separate
   * facts. The panel's picks are local by design, so a link where the grid is
   * rounded and the panel is sharp is a screen that exists and has to be
   * reproducible.
   */
  initialIconStyle?: Style
  initialIconCorners?: Corners
  /**
   * Seeded from `?page=`, and written back like `?icon=`. Each page of the
   * grid is an address a crawler can reach, which is how the icon pages past
   * the first 120 get a link from here at all. Validated on the server against
   * the unfiltered set; a seeded search can still make it too high, and the
   * clamp below takes it back to the last page there is.
   */
  initialPage?: number
  /** Owned by `IconLibrary` — the field that drives it lives in the hero. */
  query: string
  onQueryChange: (next: string) => void
}) {
  /*
    How the set is drawn survives a reload — the settings ride in a cookie the
    server reads, so this render starts where you left off.

    What is *shown* does not: the search, the style, the shape and the category
    all start fresh. They narrow the library, and a narrowed library on arrival
    looks like a missing one.

    The exception is a link that asks for a narrowing on purpose: `?search=`
    seeds the search, `?style=` the weight, `?shape=` the container and `?icon=`
    the open dock. All four arrive as props from the server rather than being
    read here, so the first paint is already what was asked for, and all four
    are written back as you use the page, so the link exists to be made. A bare
    URL still opens the whole set.
  */
  const [settings, update] = useBrowserSettings(initialSettings)
  const { size, stroke, color, showNames, columns, corners, sort } = settings

  /*
    The grid's treatment, switched only once its drawings are here. The page
    carries one treatment; the other arrives on the first switch, or on hover
    or focus of the switch before that. See `hooks/use-treatments.ts`.
  */
  const cornersChoice = useTreatmentChoice(treatments, (next) =>
    update({ corners: next })
  )

  const [category, setCategory] = React.useState("all")
  const [style, setStyle] = React.useState<Style>(initialStyle)
  const [shape, setShape] = React.useState<ShapeFilter>(initialShape)
  const [browseOpen, setBrowseOpen] = React.useState(false)
  const [page, setPage] = React.useState(initialPage)
  // Starts on the seeded narrowing, or the first render would read it as a
  // change and put `?page=` back to 1 before anything had changed.
  const [lastPageSignature, setLastPageSignature] = React.useState(() =>
    pageSignatureOf(query, initialShape, "all", sort)
  )
  const gridRef = React.useRef<HTMLDivElement>(null)
  /** The whole browser: rail, filter row and grid, for the category scroll. */
  const sectionRef = React.useRef<HTMLDivElement>(null)
  /** The category rail's scroller, faded at whichever end has more list. */
  const railRef = useEdgeFade<HTMLDivElement>()

  /**
   * The preview dock: which icon it is showing, and the ones shown before it.
   *
   * It is `fixed`, so nothing below it reserves its space — the grid is handed
   * its measured height and pads itself by that much, otherwise the last row of
   * icons sits under the panel and cannot be clicked.
   */
  const preview = useIconPreview({
    icon: initialIcon,
    style: initialIconStyle,
    corners: initialIconCorners,
  })
  const [dockHeight, setDockHeight] = React.useState(0)

  /**
   * Whether the controls belong in the drawer, decided by an actual media query
   * rather than by a `hidden` class.
   *
   * It is the sidebar's breakpoint, not a smaller one. The rail appears at
   * `lg`, so anything narrower has to reach the categories through the drawer —
   * with the drawer cutting off at `md`, everything between 768 and 1023px had
   * neither, and the categories were simply unreachable.
   *
   * Hiding the drawer with CSS is not enough either: only the popup takes the
   * class, so its modal overlay survives at desktop width as an invisible sheet
   * over the whole page — `elementFromPoint` in the middle of the page returned
   * it. Not rendering it is the only version with nothing left behind. SSR
   * assumes desktop and hydration corrects it.
   */
  const isNarrow = React.useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(BELOW_SIDEBAR)
      // `resize` as well as the query itself: a viewport driven from devtools
      // (or any emulated metrics override) resizes without ever firing the
      // media query's own change event.
      mq.addEventListener("change", onChange)
      window.addEventListener("resize", onChange)
      return () => {
        mq.removeEventListener("change", onChange)
        window.removeEventListener("resize", onChange)
      }
    },
    () => window.matchMedia(BELOW_SIDEBAR).matches,
    () => false
  )

  /*
    Not the names or the columns, which Reset leaves alone (see
    `RESET_DEFAULTS`): a reader who likes names off would otherwise find Reset
    lit, and the Browse dot on, over a change it cannot undo.
  */
  const atDefaults =
    query === "" &&
    style === "stroke" &&
    shape === "all" &&
    category === "all" &&
    atResetDefaults(settings)

  const reset = () => {
    onQueryChange("")
    setStyle("stroke")
    setShape("all")
    setCategory("all")
    // The drawing settings at once, not the names or the columns; the
    // treatment through the same door as the switch, because the default may
    // be the one not loaded yet.
    update({ ...RESET_DEFAULTS, corners })
    cornersChoice.choose(RESET_DEFAULTS.corners)
  }
  /**
   * The one tooltip shared by every tile: its label and where it sits.
   *
   * It is our own element rather than the Tooltip primitive because the
   * primitive re-writes its positioner's inline style (`transition: none`
   * included) on every reposition, which cancels any transition mid-flight —
   * so a popup that follows a moving anchor can only ever jump.
   */
  const [tip, setTip] = React.useState<{
    name: string
    x: number
    y: number
  } | null>(null)
  const [tipOpen, setTipOpen] = React.useState(false)

  /**
   * Bumped on every fresh open, and used as the tooltip's `key`.
   *
   * Without it the tooltip flies in across the grid. Leaving the grid fades the
   * box out where it stood, and coming back somewhere else sets the new
   * position and re-opens in the *same* commit — so the browser sees one style
   * change carrying both a new `translate` and the class that transitions
   * `translate`, and animates the box from the tile you left to the tile you
   * arrived at, however far apart they are.
   *
   * Suppressing the transition for that one commit does not work: the change
   * lands in a single style recalculation either way, and it is the *new*
   * `transition-property` that decides whether the old-to-new translate
   * animates. A new `key` sidesteps it instead. A freshly mounted element has
   * no previous computed style, so there is nothing to animate from and it
   * simply appears where it belongs. Moving between tiles while open keeps the
   * same element, and that is the travel worth animating.
   *
   * The ref rather than `tipOpen` itself: this has to know whether the tooltip
   * was open *at the moment of the event*, and reading state here would need it
   * in the dependency array, which would rebuild the callback on every open and
   * close.
   */
  const tipWasOpen = React.useRef(false)
  const [tipKey, setTipKey] = React.useState(0)

  const tipRef = React.useRef<HTMLDivElement>(null)
  const tipPillRef = React.useRef<HTMLDivElement>(null)
  const tipArrowRef = React.useRef<HTMLSpanElement>(null)

  /**
   * Keep the pill inside the grid's box. It is centred on its tile, so a long
   * name on an edge tile pokes past the grid, and an absolutely positioned
   * element still counts toward the document's scrollable area: on a viewport
   * with no spare gutter that overhang *is* a horizontal scrollbar.
   *
   * The clamp needs the pill's rendered width, so it runs as a layout effect,
   * after every render, since any re-render re-applies the unclamped inline
   * translate. It writes the style directly rather than through state, which
   * an effect here is not allowed to set. The arrow takes the shift back, so
   * it stays over the tile the pill was pushed off.
   */
  React.useLayoutEffect(() => {
    const wrapper = tipRef.current
    const pill = tipPillRef.current
    const arrow = tipArrowRef.current
    const grid = gridRef.current
    if (!wrapper || !pill || !arrow || !grid || !tip) return

    /*
      A fresh mount is supposed to simply appear (see `tipKey`), and left
      alone it would, but measuring the pill below forces a style recalc at
      the unclamped spot, which hands the new element exactly the "previous
      style" a transition needs, and the clamp's correction plays as a slide.
      So the mount-time write goes through with transitions off, flushed, and
      the properties handed back; travels between tiles keep their animation.
    */
    const fresh = !("clamped" in wrapper.dataset)
    if (fresh) {
      wrapper.dataset.clamped = ""
      wrapper.style.transitionProperty = "none"
      arrow.style.transitionProperty = "none"
    }

    const half = pill.offsetWidth / 2
    const x = Math.min(
      Math.max(tip.x, half),
      Math.max(grid.clientWidth - half, half)
    )

    wrapper.style.translate = `${x}px ${tip.y}px`
    arrow.style.left = `calc(50% + ${tip.x - x}px)`

    if (fresh) {
      void wrapper.offsetHeight
      wrapper.style.removeProperty("transition-property")
      arrow.style.removeProperty("transition-property")
    }
  })

  const anchorTip = React.useCallback((tile: HTMLElement | null) => {
    if (!tile) {
      // Keep the last label and position so it fades out where it stood.
      tipWasOpen.current = false
      setTipOpen(false)
      return
    }

    if (!tipWasOpen.current) {
      tipWasOpen.current = true
      setTipKey((key) => key + 1)
    }

    setTip({
      name: tile.dataset.iconName ?? "",
      x: tile.offsetLeft + tile.offsetWidth / 2,
      y: tile.offsetTop,
    })
    setTipOpen(true)
  }, [])

  /**
   * Per-category totals for the sidebar, counted before the category filter so
   * picking one doesn't zero out every other row. Only the style narrows them —
   * a category with no fill icons should read 0 while fill is selected.
   */
  const perCategory = React.useMemo(() => {
    const counts = new Map<string, number>()
    for (const icon of icons) {
      if (!artOf(icon, style, corners)) continue
      const label = categoryOf(icon.base)
      counts.set(label, (counts.get(label) ?? 0) + 1)
    }
    return counts
  }, [icons, style, corners])

  /*
    A search does not run inside the active category. Typing under a picked
    category would land on their intersection, which is usually an empty grid
    that reads as the set missing the icon; the dock's search already drops
    the category for the same reason, and category picks clear the search in
    `selectCategory`. Adjusted during render, like the page reset below,
    because the query lives with the hero's input: no handler in this
    component sees the keystroke.
  */
  const [lastQuery, setLastQuery] = React.useState(query)
  if (query !== lastQuery) {
    setLastQuery(query)
    if (query !== "" && category !== "all") setCategory("all")
  }

  /*
    The search's raw material, kept for "Did you mean": every icon's haystack,
    and each word in them with how often it appears. Per style, so a word that
    only exists outside the current style is never offered as a fix for a grid
    it could not fill.
  */
  const searchable = React.useMemo(() => {
    const haystacks: string[] = []
    const vocabulary = new Map<string, number>()
    for (const icon of icons) {
      if (!artOf(icon, style, corners)) continue
      const haystack = [icon.name, ...aliasesFor(icon.base)].join(" ")
      haystacks.push(haystack)
      for (const token of haystack.split(/[^a-z0-9]+/)) {
        if (token) vocabulary.set(token, (vocabulary.get(token) ?? 0) + 1)
      }
    }
    return { haystacks, vocabulary }
  }, [icons, style, corners])

  // Everything the style, the search and the category allow, before the shape
  // filter — the shape menu counts read off this, so they stay honest about
  // what picking a shape would actually show.
  const matches = React.useMemo(() => {
    const words = terms(query)
    return icons.filter((i) => {
      if (!artOf(i, style, corners)) return false
      if (category !== "all" && categoryOf(i.base) !== category) return false
      /*
        Every word has to land somewhere in the name, in any order: "up arrow"
        and "arrow up" ask the same question.

        The aliases are searched with it, so "email" finds `mail` and "gear"
        finds `settings` — the words people reach for before they learn what we
        called it. They are appended to the haystack rather than matched
        separately, so "email plus" still works across both.
      */
      /*
        A name from another set answers on its own, matched whole: someone
        migrating types `message-square`, and the drawing here is `message`.
        Kept out of the haystack on purpose — see `FOREIGN` in
        lib/icon-taxonomy.ts for what putting it in there did to `square`.
      */
      return answersQuery(i, query, words)
    })
  }, [icons, query, style, category, corners])

  /**
   * Drawings this search would have found in one of the other two styles.
   *
   * The empty state used to test a per-style set count for zero, which counts the
   * whole set rather than this query's matches: it is 503, 415 and 368, so it
   * is never zero and the branch it guarded was unreachable. Searching `wifi`
   * in fill therefore said "try another word" while ten wifi icons sat one tab
   * away, which reads as a missing drawing rather than a missing variant.
   *
   * The Figma plugin fixed the same case and named this exact query in its own
   * comment. This is the site catching up.
   */
  const matchesElsewhere = React.useMemo(() => {
    if (matches.length > 0) return 0
    const words = terms(query)
    if (words.length === 0 && category === "all") return 0
    return icons.filter((i) => {
      if (artOf(i, style, corners)) return false
      if (category !== "all" && categoryOf(i.base) !== category) return false
      return answers([i.name, ...aliasesFor(i.base)].join(" "), words)
    }).length
  }, [icons, query, style, category, corners, matches.length])

  /*
    The corrected query, when the search missed and a small spelling slip
    explains it. Word by word, mirroring the search itself: words that match
    somewhere are kept, the rest are pulled to their nearest vocabulary word,
    and the result is only offered if the corrected words land together on at
    least one icon. A "did you mean" that opens another empty grid is worse
    than none.
  */
  const suggestion = React.useMemo(() => {
    if (matches.length > 0) return null
    const words = terms(query)
    if (words.length === 0) return null

    const { haystacks, vocabulary } = searchable
    const corrected: (string | null)[] = words.map((word) =>
      haystacks.some((h) => answers(h, [word]))
        ? word
        : nearestWord(word, vocabulary)
    )
    if (corrected.includes(null)) return null
    if (corrected.every((w, i) => w === words[i])) return null

    const fixed = corrected as string[]
    return haystacks.some((h) => answers(h, fixed)) ? fixed.join(" ") : null
  }, [matches, query, searchable])

  const perShape = React.useMemo(() => {
    const c = { regular: 0, square: 0, circle: 0 } as Record<Shape, number>
    for (const i of matches) c[i.container] += 1
    return c
  }, [matches])

  const shown = React.useMemo(
    () =>
      shape === "all" ? matches : matches.filter((i) => i.container === shape),
    [matches, shape]
  )

  /**
   * Drawings this search found that the shape or category filter is hiding.
   *
   * `matches` runs before the shape filter, so `file` under Circle has eleven
   * matches and an empty grid, and the empty state said "No icons match file"
   * over a set that has every one of them, with `elsewhere` at 0 because that
   * count only looks at other styles. The category is the same trap one level
   * up: typing clears it, but a link can arrive carrying both. (The first
   * write-up of this cited `file` and `move` as the month's most searched
   * misses; those rows were the `suggestion` export, not typed queries. The
   * case stands on the code, not on that evidence.)
   *
   * So this is the count with both filters off, in the style on show, and the
   * empty state offers it as one click. Only when the grid is empty and a
   * filter is on, so the ordinary case costs nothing.
   */
  const hiddenByFilter = React.useMemo(() => {
    if (shown.length > 0) return 0
    if (shape === "all" && category === "all") return 0
    const words = terms(query)
    if (words.length === 0) return 0
    return icons.filter((i) => {
      if (!artOf(i, style, corners)) return false
      return answersQuery(i, query, words)
    }).length
  }, [icons, query, style, shape, category, corners, shown.length])

  /**
   * A search that found nothing, reported once the typing stops.
   *
   * This is the one number on the site that says what to draw next. An empty
   * result is a request for an icon from someone who is never going to file
   * one, and the wording they used is the name they expect it to have.
   *
   * Three things keep it honest:
   *
   * - **It waits.** The grid filters on every keystroke, so "arrow" renders
   *   empty at "a", "ar" and "arr" on the way to matching. Counting the render
   *   would report prefixes of words that worked, and drown the queries that
   *   did not.
   * - **It carries the filters.** A miss under `duotone` with 40 matches in
   *   another style is not a gap in the set, it is a filter doing its job.
   *   `elsewhere` and `suggestion` are what separate "we have not drawn this"
   *   from "you were two keystrokes away", and only the first is work.
   * - **It reports a combination once.** The ref holds the last signature
   *   sent, so backspacing into a query already counted does not count it
   *   twice.
   */
  /**
   * What makes this result the result it is, to the miss report: two searches
   * that differ in any of these four are two searches, and a miss in duotone
   * is not the same miss as the same words in stroke.
   *
   * The pager reset on this same string once, kept as one const so the two
   * could not disagree about what "the same search" means. They now disagree
   * about the style, on purpose: a new style is a new search to the report,
   * but the same page to a reader. The pager keys on `pageSignature`, which
   * is this without the style; the page reset below says why.
   */
  const searchSignature = signatureOf(query, style, shape, category)

  const emptySearch =
    shown.length === 0 && query.trim().length >= SEARCH_MIN_LENGTH
  const reportedSearch = React.useRef("")

  React.useEffect(() => {
    if (!emptySearch || reportedSearch.current === searchSignature) return

    const timer = window.setTimeout(() => {
      reportedSearch.current = searchSignature
      track("search_empty", {
        query: query.trim(),
        style,
        shape,
        category,
        elsewhere: matchesElsewhere,
        hidden: hiddenByFilter,
        suggestion,
      })
    }, SEARCH_SETTLE_MS)

    return () => window.clearTimeout(timer)
  }, [
    emptySearch,
    searchSignature,
    query,
    style,
    shape,
    category,
    matchesElsewhere,
    hiddenByFilter,
    suggestion,
  ])

  /**
   * The page's slice, ordered before it is cut — page 2 has to be sorted
   * against the whole result, not against whatever landed on it. With nothing
   * typed this is the chosen order; a search lets the drawing it names lead.
   */
  const ordered = React.useMemo(
    () => [...shown].sort(gridOrder(query, sort)),
    [shown, query, sort]
  )

  const pageCount = Math.max(1, Math.ceil(ordered.length / GRID_PAGE_SIZE))

  /*
    Narrowing changes what a page number means, so the page resets when the
    search, the shape or the category does: adjusted during render rather
    than in an effect, which would paint the wrong page first and correct it
    after.

    Not when the style changes, any more than the corners. Every name is drawn
    in all four styles, so page 6 in duotone holds the same 120 drawings as
    page 6 in stroke, and a reader who switches style there is looking at
    those drawings another way. With the style in the signature the switch
    sent them back to page 1. The page number is what stays, rather than a
    drawing on it, so stroke to duotone and back lands where it started. If a
    style ever lacks drawings again, a page past its end shows its last page
    and the number comes back with a style that has it.

    The order does reset it. Page 3 by name and page 3 by newest are two
    different 120 drawings, so keeping the number would land the reader on a
    page that has nothing to do with the one they were on.
  */
  const pageSignature = pageSignatureOf(query, shape, category, sort)
  if (pageSignature !== lastPageSignature) {
    setLastPageSignature(pageSignature)
    setPage(1)
  }
  const currentPage = Math.min(
    pageSignature === lastPageSignature ? page : 1,
    pageCount
  )

  const paged = React.useMemo(
    () =>
      ordered.slice(
        (currentPage - 1) * GRID_PAGE_SIZE,
        currentPage * GRID_PAGE_SIZE
      ),
    [ordered, currentPage]
  )

  /**
   * Where a page falls in the order, from its first drawing to its last. By
   * name that is a stretch of the alphabet, which is what tells a reader which
   * hidden page holds the icon they are after. Bases, because that is what the
   * sort reads: a page that opens on `circle-dollar-sign` opens at D.
   *
   * By newest it is a stretch of dates instead, the labels the history file
   * already formats, because a name says nothing about where a page sits in
   * time. A page that starts and ends on one day says the day once.
   */
  const pageSpan = (n: number) => {
    const first = ordered[(n - 1) * GRID_PAGE_SIZE]
    const last = ordered[Math.min(n * GRID_PAGE_SIZE, ordered.length) - 1]
    if (sort === "name") return `${first.base} to ${last.base}`
    const from = first.history?.addedLabel ?? "Not committed"
    const to = last.history?.addedLabel ?? "Not committed"
    return from === to ? from : `${from} to ${to}`
  }

  /** Set by the pager so only a page turn scrolls, not every re-render. */
  const scrollPending = React.useRef(false)

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount))
    scrollPending.current = true
  }

  /**
   * Turning the page puts the top of the grid just under the site nav.
   *
   * This has to run *after* the new page is in the DOM. Scrolling straight from
   * the click measured the old page: the last page holds 81 tiles against 120,
   * so the document shrank under the moving scroll and the browser clamped it
   * partway, leaving the view stuck mid-grid.
   *
   * The offset is the nav's, because `scrollIntoView` aligns to the viewport's
   * top — which is behind the nav — and lands the first row underneath it.
   */
  React.useEffect(() => {
    if (!scrollPending.current) return
    scrollPending.current = false

    const grid = gridRef.current
    if (!grid) return

    /*
      Below `lg` there is more chrome to clear: the bar is 52px and the Browse
      row sticks under it, so the first tile has to land beneath both. The
      row's stuck box ends 96px down: `top-11` (44) plus its 36px of controls
      and the 8px of padding bled below them.
    */
    const chrome = isNarrow ? NAV_HEIGHT_NARROW + 44 : NAV_HEIGHT
    const top = grid.getBoundingClientRect().top + window.scrollY - chrome - 12
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    window.scrollTo({
      top: Math.max(0, top),
      behavior: still ? "auto" : "smooth",
    })
  }, [currentPage, isNarrow])

  /** Set by a category pick, so re-filtering is what scrolls, not resizes. */
  const categoryScrollPending = React.useRef(false)
  /** A pick made inside the drawer, which has to outwait the drawer. */
  const scrollAfterDrawer = React.useRef(false)

  const selectCategory = (next: string) => {
    // A category never opens under a live search; see the query adjuster
    // above. Every pick clears it: rail, drawer and dock alike.
    onQueryChange("")
    setCategory(next)
    /*
      Two routes to one scroll. A pick in the drawer cannot scroll on the
      spot: the drawer's scroll lock pins the page at 0 until the close
      animation ends and then puts the old position back; a scroll issued
      during it is measured against the lock and undone by the restore. So
      the drawer path waits for `onOpenChangeComplete`; everything else
      scrolls as soon as the new rows are in the DOM.

      `isNarrow &&` because `browseOpen` can be stale-true: widening past
      `lg` closes the drawer through its `open` expression, and Base UI does
      not report a controlled-prop close back through `onOpenChange`. Routed
      on the stale flag alone, a desktop pick would park its scroll on a
      callback that never fires.

      Re-picking the current category takes neither deferred route. The
      setState bails out on a same value, so the effect below never runs and
      a pending flag would sit stranded until `reset()` or the dock's search
      changed the category and inherited a scroll nobody asked for. Nothing
      re-renders either, so it is scrolled right here.
    */
    if (isNarrow && browseOpen) scrollAfterDrawer.current = true
    else if (next === category) scrollToBrowserTop()
    else categoryScrollPending.current = true
  }

  /**
   * Picking a category puts the top of the browser, the filter row and not
   * just the grid, back under the site bar.
   *
   * Same offset arithmetic as the pager's scroll above. It only ever scrolls
   * *up*: deep in Actions, the switch to Files would otherwise leave you
   * mid-list, but if the filter row is already fully on screen there is
   * nothing to correct. The breakpoint is read off the media query rather
   * than `isNarrow` so the callback needs no dependencies.
   */
  const scrollToBrowserTop = React.useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const bar = window.matchMedia(BELOW_SIDEBAR).matches
      ? NAV_HEIGHT_NARROW
      : NAV_HEIGHT
    const top = section.getBoundingClientRect().top + window.scrollY - bar - 12
    if (window.scrollY <= top) return

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    window.scrollTo({
      top: Math.max(0, top),
      behavior: still ? "auto" : "smooth",
    })
  }, [])

  /*
    After the category change is in the DOM, for the same reason the pager
    scrolls in an effect: a shorter category shrinks the document under a
    scroll measured off the old one.
  */
  React.useEffect(() => {
    if (!categoryScrollPending.current) return
    categoryScrollPending.current = false
    scrollToBrowserTop()
  }, [category, scrollToBrowserTop])

  /*
    A drawer pick's scroll can strand: resizing past `lg` mid-close unmounts
    the popup, and a close whose popup is already gone never reaches
    `onOpenChangeComplete`. The flag would then fire on some later drawer
    dismissal: a scroll long since forgotten. Drop it with the drawer.
  */
  React.useEffect(() => {
    if (!isNarrow) scrollAfterDrawer.current = false
  }, [isNarrow])

  /**
   * The address follows what is on screen: the query, the drawing the dock is
   * showing, the three axes the filter row sets and the page of the grid.
   *
   * Every one of these was already a seed a link could carry *in*. This is the
   * other direction, and it is the whole point: what you narrowed to and what
   * you opened can now be copied out of the address bar and sent to someone,
   * and what comes back is the same screen. A parameter that can only be read
   * is a URL nobody can produce.
   *
   * Five decisions in it:
   *
   * - **`replaceState`, not `push`.** A click is not a page, and a visit that
   *   compares six icons would otherwise take seven presses of Back to leave.
   *   The address stays copyable; the history stays one entry long.
   * - **Written through the native history API rather than `router.replace`.**
   *   This route is dynamic, because it reads the settings cookie, so a router
   *   call would re-render it on the server on every keystroke to produce the
   *   grid that is already on screen. Next keeps its own router state in step
   *   with the native call.
   * - **Debounced.** Typing would otherwise call it per keystroke, which some
   *   browsers rate-limit and all of them do for nothing: the URL is read when
   *   it is copied, not while it is being typed into.
   * - **A value at its neutral is dropped rather than spelled out.** The whole
   *   set in stroke, every shape, rounded corners: that is `/icons`, and a bare
   *   address is what it should say. `?style=stroke&shape=all&corners=regular`
   *   is three parameters that mean "no filters".
   * - **Neutral means the shipped default, not the cookie.** `corners` is a
   *   persisted setting, so a reader who prefers sharp sees a `?corners=sharp`
   *   appear on arrival without touching anything. That is correct: the link
   *   has to reproduce the screen for someone whose cookie says otherwise, and
   *   a link that quietly drew rounded for them is the failure this fixes.
   *   It still does not write the cookie, so their preference is theirs.
   *
   * Anything else already in the query string is left alone.
   *
   * A closing dock drops its name immediately rather than at the end of the
   * exit: the panel is on its way out, and an address naming it for another
   * fifth of a second is an address that can be copied wrong.
   */
  const openIcon = preview.closing ? null : preview.name

  /*
    The grid's half of the address: what it is narrowed by and which page of it
    is on screen. The effect below writes it to the address bar and the pager
    builds its links from it, so a page link carries the narrowing the screen
    does, and a cmd-click on page 3 of a search opens page 3 of that search.
  */
  const carryView = React.useCallback(
    (params: URLSearchParams, pageNumber: number) => {
      carry(params, "search", query, "")
      carry(params, "style", style, "stroke")
      carry(params, "shape", shape, "all")
      carry(params, "corners", corners, SETTINGS_DEFAULTS.corners)
      carry(params, "sort", sort, SETTINGS_DEFAULTS.sort)
      carry(params, "page", String(pageNumber), "1")
      return params
    },
    [query, style, shape, corners, sort]
  )

  const pageHref = (pageNumber: number) => {
    const search = carryView(new URLSearchParams(), pageNumber).toString()
    return `${ICONS_SEGMENT}${search ? `?${search}` : ""}`
  }

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = carryView(
        new URLSearchParams(window.location.search),
        currentPage
      )
      carry(params, "icon", openIcon, "")

      /*
        The dock's own two picks, and only where they say something the grid
        does not: a panel showing what the grid shows needs no parameter,
        because a freshly opened panel starts on the grid anyway. They go
        nowhere while the dock is closed, there being no panel to describe.
      */
      carry(params, "icon-style", openIcon ? preview.picked : null, style)
      carry(
        params,
        "icon-corners",
        openIcon ? preview.pickedCorners : null,
        corners
      )

      const search = params.toString()
      window.history.replaceState(
        null,
        "",
        // The hash rides along: `#icons` is how the nav's "Get started" lands
        // here, and dropping it would jump the page back to the top.
        `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`
      )

      // The server titles pages 2 and on "…, page 3 of 9 · Keyline Icons".
      // A page turned in place never reaches the server, so the tab would go
      // on naming the page the visit arrived on.
      document.title = document.title.replace(
        /(, page \d+ of \d+)? · /,
        currentPage > 1 ? `, page ${currentPage} of ${pageCount} · ` : " · "
      )
    }, 250)

    return () => window.clearTimeout(timer)
  }, [
    carryView,
    currentPage,
    pageCount,
    openIcon,
    style,
    corners,
    preview.picked,
    preview.pickedCorners,
  ])

  /**
   * The category list: the sidebar on a wide screen, the head of the drawer on
   * a narrow one. Rows whose count is zero under the current style are dropped
   * rather than shown as dead ends.
   */
  const categoryList = (
    <ul className="flex flex-col gap-0.5">
      {[
        {
          label: "All",
          value: "all",
          icon: ALL_ICON,
          count: [...perCategory.values()].reduce((a, b) => a + b, 0),
        },
        /*
          Alphabetical, sorted on a copy. `CATEGORIES` is ordered by resolution,
          first pattern to match wins, so Files is asked before Shapes and Media
          before Layout; sorting that array would refile icons rather than
          reorder a list. The rail, the Paper canvas and both Figma pages all
          read the same way as a result.

          `Other` stays last wherever it falls in the alphabet, and is filtered
          out below anyway while nothing is unmatched. It is the fallback for a
          name no pattern claims, not a shelf: `build-paper.mjs` fails the build
          rather than publishing one.
        */
        ...[
          ...CATEGORIES.map((c) => c.label).sort((a, b) => a.localeCompare(b)),
          OTHER_CATEGORY,
        ]
          .map((label) => ({
            label,
            value: label,
            icon: CATEGORY_ICONS[label],
            count: perCategory.get(label) ?? 0,
          }))
          .filter((c) => c.count > 0),
      ].map((c) => (
        <li key={c.value}>
          <button
            type="button"
            // The fill and weight below are the only other sign of which row
            // is chosen, and neither reaches a screen reader.
            aria-pressed={category === c.value}
            onClick={() => {
              selectCategory(c.value)
              setBrowseOpen(false)
            }}
            className={cn(
              // Labels stay at full strength in both states — the selected row
              // is marked by its fill and weight, not by dimming the rest.
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground transition-colors",
              category === c.value
                ? "bg-muted font-medium"
                : "hover:bg-muted/60"
            )}
          >
            {/*
              Drawn from the set itself, so the rail is also a sample of what
              each row contains.
            */}
            <span className="flex items-center gap-2">
              <c.icon
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground"
              />
              {c.label}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {c.count.toLocaleString("en-US")}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )

  /** The sliders' shell, so every control in the row reads as one family. */
  const pill =
    "flex h-9 items-center gap-1.5 rounded-lg bg-muted px-2.5 text-sm"

  /**
   * An open menu lifts its trigger out of the muted field, which is the same
   * thing the style group does to mark the chosen style. One idiom for "this
   * one is active", rather than a second, quieter one for menus.
   *
   * `aria-expanded` is the hook because Base UI sets it on the trigger, and
   * `button.tsx` already styles off it for the same reason.
   */
  const raised =
    "transition-[background-color,box-shadow] aria-expanded:bg-background aria-expanded:shadow-sm"

  /*
    The order, at the right-hand end of the row beside the count, and not in
    the filter group beside Shape where it started. Everything on the left
    changes how the set is drawn or narrows it; the order and the count are
    both about the list itself, so they read as one pair. Among the filters it
    wrapped onto the second line after Shape, read as one more filter, and
    was found only by looking for it. Here it is also outside the drawer, so a
    phone can reorder without opening Browse.

    The glyph in front is what says "order" before the word is read. Shape has
    none because it sits among controls that all explain themselves; this one
    stands alone.

    It persists, unlike Shape, because an order hides nothing (see
    `BrowserSettings`).
  */
  const sortMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(pill, raised)}>
        <ArrowDownWideNarrow className="size-4 text-muted-foreground" />
        <span className="max-sm:sr-only">Sort</span>
        <span className="text-muted-foreground">{SORT_ROWS[sort].label}</span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(value) => update({ sort: value as Sort })}
        >
          {SORTS.map((value) => {
            const row = SORT_ROWS[value]
            return (
              <DropdownMenuRadioItem
                key={value}
                value={value}
                closeOnClick
                className="gap-3"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                  <row.icon className="size-4 text-muted-foreground" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span>{row.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {row.hint}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  /**
   * The filter controls, rendered twice: inline on wide screens and inside the
   * drawer below `lg`. Only one copy is ever visible, and both drive the same
   * state, so there is no version of this that can disagree with itself.
   *
   * The layout is the same in both — one wrapping row. `stacked` only drops the
   * labels from the two controls that read fine as a glyph, so a phone fits the
   * row in fewer lines.
   */
  const filters = (stacked: boolean) => {
    const styleGroup = (
      <Segmented aria-label="Style">
        {STYLES.map((s) => (
          <SegmentedItem
            key={s}
            active={style === s}
            onClick={() => setStyle(s)}
          >
            {/* No count: since 1.0.0 every name is in all four styles, so the
                tabs would all read the same number. Sentence case by hand,
                because `capitalize` turns two-tone into Two-Tone. */}
            {s[0].toUpperCase() + s.slice(1)}
          </SegmentedItem>
        ))}
      </Segmented>
    )

    /**
     * Rounded or squared, with no count beside it.
     *
     * Every drawing exists in both treatments, so a count here would read 585
     * against 585 and say nothing, and since 1.0.0 the style tabs dropped theirs
     * for the same reason. It sits in the settings cookie while style does not.
     */
    const cornersGroup = (
      <Segmented
        aria-label="Corner treatment"
        onPointerEnter={cornersChoice.prefetch}
        onFocus={cornersChoice.prefetch}
      >
        {CORNERS.map((c) => (
          <SegmentedItem
            key={c}
            // The chip moves on the click even while the drawings are on
            // their way; the grid follows when they land.
            active={(cornersChoice.pending ?? corners) === c}
            onClick={() => cornersChoice.choose(c)}
            badge={c === "sharp" ? SHARP_BADGE : undefined}
          >
            {c === "regular" ? "Rounded" : "Sharp"}
          </SegmentedItem>
        ))}
      </Segmented>
    )

    const sizeSlider = (
      <TickSlider
        value={size}
        onChange={(next) => update({ size: next })}
        min={16}
        max={48}
        step={1}
        major={(v) => v % 8 === 0}
        label="Icon size in pixels"
      />
    )

    const strokeSlider = (
      <TickSlider
        value={stroke}
        onChange={(next) => update({ stroke: next })}
        min={1}
        max={3}
        step={0.25}
        major={Number.isInteger}
        label="Stroke width in pixels"
      />
    )

    const shapeMenu = (
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(pill, raised)}>
          Shape
          <span className="text-muted-foreground">
            {shape === "all"
              ? "All"
              : SHAPES.find((s) => s.value === shape)!.label}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuRadioGroup
            value={shape}
            onValueChange={(value) => setShape(value as ShapeFilter)}
          >
            <DropdownMenuRadioItem value="all" closeOnClick className="gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                <Shapes className="size-4 text-muted-foreground" />
              </span>
              All shapes
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {matches.length.toLocaleString("en-US")}
              </span>
            </DropdownMenuRadioItem>
            {SHAPES.map((s) => (
              <DropdownMenuRadioItem
                key={s.value}
                value={s.value}
                closeOnClick
                className="gap-3"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                  <s.icon className="size-4 text-muted-foreground" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span>{s.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.hint}
                  </span>
                </span>
                <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                  {perShape[s.value].toLocaleString("en-US")}
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    {
      /*
        A label rather than a button: clicking anywhere on it opens the OS
        colour picker through the input sitting invisibly on top.
      */
    }
    /*
      Once a colour is picked the swatch says it, and the hex beside it is the
      same fact twice — while making this the widest thing in the row. The word
      only earns its place while the swatch is still the default.
    */
    const swatchOnly = stacked || Boolean(color)

    const colorPicker = (
      <label
        title={color ?? "Icon colour"}
        className={cn(
          pill,
          "relative cursor-pointer",
          swatchOnly && "w-9 justify-center px-0"
        )}
      >
        <span
          aria-hidden="true"
          className="size-4 rounded-full border border-black/10"
          style={{ background: color ?? "currentColor" }}
        />
        {!swatchOnly && <span className="text-sm">Color</span>}
        <input
          type="color"
          value={color ?? "#000000"}
          onChange={(event) => update({ color: event.currentTarget.value })}
          aria-label="Icon colour"
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
    )

    /*
      The settings that shape the grid itself rather than filter it, tucked
      behind one trigger so the row stays about the icons.
    */
    const settingsMenu = (
      <DropdownMenu>
        {/*
          One element, two behaviours: the tooltip trigger renders *as* the menu
          trigger rather than wrapping it, so there is no extra box in the row
          and the button keeps its own layout. `title` is gone — a native
          tooltip alongside this one shows both.
        */}
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                aria-label="Grid settings"
                className={cn(pill, raised, "w-9 justify-center px-0")}
              />
            }
          >
            <Settings className="size-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>Grid settings</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-72 p-3">
          <div className="flex items-center justify-between gap-4">
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Icon names</span>
              <span className="text-xs text-muted-foreground">
                The label under each glyph
              </span>
            </span>
            <PhoneToggle
              on={showNames}
              label="Show icon names"
              onChange={(next) => update({ showNames: next })}
            />
          </div>

          <DropdownMenuSeparator className="my-3" />

          <div className="flex flex-col gap-2">
            <span className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Grid columns</span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {columns} per row
              </span>
            </span>
            <TickSlider
              value={columns}
              onChange={(next) => update({ columns: next })}
              min={4}
              max={16}
              step={1}
              major={(v) => v % 4 === 0}
              label="Grid columns"
              unit=""
              className="w-full"
              trackClassName="flex-1"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    /*
      Icon-only in both layouts. The label is carried by the tooltip and by
      `aria-label`, which the disabled state still exposes — the tooltip cannot,
      since a disabled button receives no pointer events to open it on.
    */
    const resetButton = (
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={reset}
              disabled={atDefaults}
              aria-label="Reset to defaults"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 justify-center px-0 disabled:pointer-events-none disabled:opacity-40"
              )}
            />
          }
        >
          <RotateCcw className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Reset to defaults</TooltipContent>
      </Tooltip>
    )

    return (
      <>
        {styleGroup}
        {cornersGroup}
        {sizeSlider}
        {strokeSlider}
        {shapeMenu}
        {colorPicker}
        {settingsMenu}
        {resetButton}
      </>
    )
  }

  if (icons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <p className="font-medium">No icons built yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Export the <span className="font-medium">Components</span> page from
          Figma as SVG, drop it into{" "}
          <code className="rounded bg-muted px-1 py-0.5">raw/</code>, then run{" "}
          <code className="rounded bg-muted px-1 py-0.5">
            node pipeline/build.mjs
          </code>
          .
        </p>
      </div>
    )
  }

  return (
    <Drawer
      open={isNarrow && browseOpen}
      onOpenChange={setBrowseOpen}
      // The drawer half of the category scroll; see `selectCategory`. Fires
      // once the close animation is done and the scroll lock has let go.
      onOpenChangeComplete={(open) => {
        if (open || !scrollAfterDrawer.current) return
        scrollAfterDrawer.current = false
        scrollToBrowserTop()
      }}
    >
      <div ref={sectionRef} className="flex gap-8">
        {/*
          The category rail. It scrolls on its own so a long list never drags
          the grid down with it, and it is dropped entirely on narrow screens,
          where the same list heads the filter drawer. Its ends fade while
          there is more list past them, so a cut row reads as more to come.
        */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <div
            ref={railRef}
            className="edge-fade sticky top-19 max-h-[calc(100dvh-5.75rem)] overflow-y-auto py-3"
          >
            <h2 className="px-2 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Categories
            </h2>
            {categoryList}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/*
            The count keeps the filters' line. This row does not wrap — the
            filter group inside it does, so when the controls run out of room
            they fold onto a second line and the count stays pinned to the
            right of the first. Letting the row itself wrap put the count on a
            line of its own, which reads as a stray label.
          */}
          {/*
            Below `lg` this row sticks under the site bar, so Browse and the
            count stay reachable however deep the grid goes, and only there:
            on a wide screen the whole filter row is one glance up, and a row
            of sliders pinned over the grid would be chrome for its own sake.

            `top-11` rather than the bar's 52: the padding is bled outward with
            a negative margin, so the row's box is 8px taller than its layout
            slot and the overlap tucks behind the bar. The `bg-background` is
            what the tiles scroll under. `z-10` clears the tiles and nothing
            more: the grid tooltip sits at z-20 on purpose, because a name
            hovered on the top visible row paints upward across this band, and
            under the row it read as the tooltip simply missing.
          */}
          <div className="flex items-start gap-2 max-lg:sticky max-lg:top-11 max-lg:z-10 max-lg:-my-2 max-lg:bg-background max-lg:py-2">
            {/*
              Everything past the search folds in here below `lg`: the category
              rail as well as the filters, which is why the trigger cannot be
              called "Filters".

              Both versions render and CSS picks one, rather than `isNarrow`
              picking either. The server snapshot assumes desktop, so a phone's
              first paint showed the full filter row and then swapped it for
              this button at hydration; the media query is in the stylesheet,
              so it is right before any script runs. `isNarrow` still gates the
              drawer itself, which CSS cannot safely hide (see above).
            */}
            <DrawerTrigger
              className={cn(
                buttonVariants({ variant: "outline" }),
                "relative h-9 lg:hidden"
              )}
            >
              <PanelTopCloseDashed
                data-icon="inline-start"
                className="size-4"
              />
              Browse
              {!atDefaults && (
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary"
                />
              )}
            </DrawerTrigger>
            <div className="hidden min-w-0 flex-1 flex-wrap items-center gap-2 lg:flex">
              {filters(false)}
            </div>

            {/*
              A status region, so a search, a filter or a style change is
              heard as well as seen: without it the grid changed silently and
              a screen reader had no way to learn that nothing matched. Always
              mounted, since a live region added together with its text is not
              reliably announced. The hidden word makes "34 shown" a sentence.
            */}
            <div className="ml-auto flex shrink-0 items-center gap-3">
              <span
                role="status"
                className="h-9 text-sm leading-9 whitespace-nowrap text-muted-foreground tabular-nums"
              >
                {shown.length.toLocaleString("en-US")}{" "}
                <span className="sr-only">icons </span>shown
              </span>
              {sortMenu}
            </div>
          </div>

          {isNarrow && (
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Browse</DrawerTitle>
                <DrawerDescription>
                  Categories, style, size, stroke, shape and colour.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-4 overflow-y-auto px-4 pt-4 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  {filters(true)}
                </div>
                <h3 className="px-2 pt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Categories
                </h3>
                {categoryList}
              </div>
            </DrawerContent>
          )}

          {shown.length === 0 ? (
            /*
              A search that finds nothing is the one moment the set's gaps are
              visible to the person who cares about them, so it asks for the
              drawing rather than apologising: the wording someone would use to
              file it is right there, and so is the issue tracker.

              It states what was searched, because the query has scrolled out of
              view by the time you read this on a phone, and it offers the way
              back — Reset is a 36px ghost icon up in the filter row, which is
              not a thing you find while reading a sentence about no results.
            */
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <p className="text-lg font-medium">
                No icons match{query ? ` “${query}”` : " these filters"}
              </p>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {/*
                  The suggestion takes the subtitle's place rather than adding
                  a line: it is the "try another word" advice, made specific.
                */}
                {/*
                  Worded exactly as the plugin words it, down to the full stop.
                  Not pluralised on purpose: "1 match in another style" reads as
                  a noun and "10 match in another style" as a verb, and both
                  parse, where the conditional it replaced produced "1 matches".
                */}
                {/*
                  In the order of how sure each one is. A filter hiding the
                  drawing is a fact about this grid; another style holding it
                  is a fact about the set; a spelling is a guess.
                */}
                {hiddenByFilter > 0 ? (
                  <>
                    {shape !== "all"
                      ? `Nothing in ${SHAPES.find((s) => s.value === shape)!.label.toLowerCase()}. ${hiddenByFilter} match in another shape.`
                      : `Nothing under ${category}. ${hiddenByFilter} match on another shelf.`}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setShape("all")
                        setCategory("all")
                      }}
                      className="rounded-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
                    >
                      Show all {hiddenByFilter}
                    </button>
                  </>
                ) : matchesElsewhere > 0 ? (
                  `Nothing in ${style}. ${matchesElsewhere} match in another style.`
                ) : suggestion ? (
                  <>
                    Did you mean{" "}
                    <button
                      type="button"
                      onClick={() => onQueryChange(suggestion)}
                      className="rounded-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
                    >
                      {suggestion}
                    </button>
                    ?
                  </>
                ) : (
                  "Try another word for it, or ask for the drawing if the set is missing one."
                )}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {/*
                  The same glyph the Reset control in the filter row wears, so
                  the two read as one action reached two ways rather than as
                  two different ones.
                */}
                <Button size="lg" variant="secondary" onClick={reset}>
                  <RotateCcw className="size-4" />
                  Clear filters
                </Button>

                <Button
                  size="lg"
                  render={
                    <a
                      href={SET_REQUEST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
                >
                  <Plus className="size-4" />
                  Request an icon
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  render={
                    <a
                      href={SET_X_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
                >
                  {/*
                    The mark, not the letter. "X" typed in the label is a
                    capital ex in the page's own typeface, which next to a
                    button that says "Request an icon" reads as a close button
                    rather than as the name of a place to send a message.
                  */}
                  Message on <XLogo className="size-3.5" />
                </Button>
              </div>

              {/*
                The paid offer, under the free ways to ask. A miss is the one
                moment a reader learns the set lacks a drawing, and a team that
                needs a dozen of them has a better answer than a dozen issues.
              */}
              <p className="mt-6 text-sm text-muted-foreground">
                Need a whole set drawn for your product?{" "}
                <Link
                  href="/custom?ref=no-results"
                  prefetch={false}
                  className="underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  Custom icons
                </Link>
              </p>
            </div>
          ) : (
            /*
          One tooltip for the whole grid, re-anchored to whatever tile the
          pointer is on: a tooltip per tile can only blink out and back, while
          a single element that stays mounted can travel between them.
        */
            <div
              ref={gridRef}
              className="relative flex flex-col gap-6"
              onPointerOver={(event) => {
                const tile = (event.target as HTMLElement).closest<HTMLElement>(
                  "[data-icon-name]"
                )

                // Ignore the gaps between tiles — dropping the anchor there is what
                // makes a swept pointer flicker.
                if (tile) anchorTip(tile)
              }}
              onPointerLeave={() => anchorTip(null)}
              onFocus={(event) => {
                const tile = (event.target as HTMLElement).closest<HTMLElement>(
                  "[data-icon-name]"
                )

                if (tile) anchorTip(tile)
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  anchorTip(null)
                }
              }}
            >
              {/*
                One grid, in sort order. Splitting it into Regular/Square/Circle
                blocks left ragged part-rows wherever a block ended, and with a
                page of 120 the split landed mid-block anyway. The shape is a
                filter, not a heading.
              */}
              {/*
                The column count is a setting on a wide screen and a fit on a
                narrow one: ten columns across a phone would be 30px tiles.

                Decided by the stylesheet, not by `isNarrow`: the server
                snapshot assumes desktop, so an inline `gridTemplateColumns`
                laid a phone's first paint out at the cookie's count and
                re-flowed it at hydration. The count rides a custom property
                instead: an inline `grid-template-columns` would beat the
                `max-lg:` class, being inline style against a stylesheet rule.
              */}
              <div
                className="grid gap-2 max-lg:grid-cols-[repeat(auto-fill,minmax(104px,1fr))] lg:[grid-template-columns:var(--browser-columns)]"
                style={
                  {
                    "--browser-columns": `repeat(${columns}, minmax(0, 1fr))`,
                  } as React.CSSProperties
                }
              >
                {paged.map((icon) => (
                  /*
                    A link to the icon's page that a plain click keeps in the
                    dock. As a `<button>` the tile gave a crawler nothing to
                    follow: `/icons` linked to none of the icon pages, and the
                    dock's "Open page" only exists after a click. Search
                    Console had 150 icon pages discovered and not indexed on
                    14 Sep 2026, with 363 of 1,000 linked from no page but the
                    sitemap. A modified or middle click opens the page, which
                    is what a link under the pointer promises anyway.
                  */
                  <a
                    key={icon.name}
                    href={iconHref(icon.name)}
                    data-icon-name={icon.name}
                    data-in-place=""
                    /* Opens the dock. Copying moved in there with it: the panel
                       offers four formats, and a click that silently put one of
                       them on the clipboard was a guess about which. */
                    onClick={(event) => {
                      if (!plainClick(event)) return
                      event.preventDefault()
                      preview.select(icon.name)
                    }}
                    // Space pressed a button; on a link it scrolls the page.
                    onKeyDown={(event) => {
                      if (event.key !== " ") return
                      event.preventDefault()
                      preview.select(icon.name)
                    }}
                    aria-label={icon.name}
                    aria-haspopup="dialog"
                    className={cn(
                      "group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-lg p-2 transition-colors",
                      // The open icon stays marked while the dock is up, so the
                      // panel and the grid agree on what is being looked at.
                      preview.name === icon.name
                        ? "bg-background shadow-sm ring-1 ring-border"
                        : "bg-muted hover:bg-muted-hover"
                    )}
                  >
                    {/* `currentColor` all the way down, so the picked colour
                        reaches the glyph without touching its markup. */}
                    <span
                      className="flex h-12 items-center justify-center text-foreground"
                      style={color ? { color } : undefined}
                    >
                      <Glyph
                        art={artOf(icon, style, corners)!}
                        size={size}
                        stroke={stroke}
                      />
                    </span>
                    {/*
                      The label is the truncated one; the tooltip carries the
                      name in full either way, so hiding these loses nothing
                      but the wall of text.
                    */}
                    {showNames && (
                      <span className="w-full truncate text-center text-[11px] leading-tight text-muted-foreground group-hover:text-foreground">
                        {icon.name}
                      </span>
                    )}
                    {/*
                      A dot, not the word. At the tail of a release a hundred
                      tiles carry this at once, and a hundred labels reading
                      New pull harder than the drawings they sit on, which are
                      what the page is for. The word is still spelled out in
                      the preview panel, where one icon is being looked at and
                      there is nothing for it to shout over.

                      Absolute, so a marked tile is the same size as every
                      other one. In flow it would push the glyph off centre and
                      the grid would ripple around whichever icons are new.

                      For the eye only. The tile's accessible name is
                      `aria-label`, which a child cannot add to, so the mark is
                      hidden and the same fact is announced by the panel and by
                      the changelog entry that lists these by name.
                    */}
                    {icon.isNew && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary"
                      />
                    )}
                  </a>
                ))}
              </div>

              {tip && (
                <div
                  // A fresh element per open, so a re-open lands on its tile
                  // instead of travelling there from the last one. See
                  // `tipKey`.
                  key={tipKey}
                  ref={tipRef}
                  aria-hidden="true"
                  className={cn(
                    // Above every tile and the sticky Browse row's z-10,
                    // since a top-row name paints across that band; below
                    // the site nav's z-30.
                    "pointer-events-none absolute top-0 left-0 z-20 duration-150 ease-out",
                    // Open, the box follows the pointer from tile to tile and
                    // both properties animate. Closed, only the fade does: the
                    // position is held where it stood so it fades out in place.
                    tipOpen
                      ? "opacity-100 transition-[translate,opacity]"
                      : "opacity-0 transition-opacity",
                    "motion-reduce:transition-none"
                  )}
                  style={{ translate: `${tip.x}px ${tip.y}px` }}
                >
                  {/*
                    The pill is out of flow on purpose. In flow it hands the
                    wrapper its own width, and that box sits at the anchor
                    *before* the centring translate; the browser counts the
                    untranslated box toward the document's scrollable area, so
                    a long name on a right-edge tile widened the page even
                    with the pill painted safely inside it.
                  */}
                  <div
                    ref={tipPillRef}
                    className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md bg-foreground px-3 py-1.5 text-xs whitespace-nowrap text-background"
                  >
                    {tip.name}
                    {/* Centred on the pill's bottom edge, so half of it reads as
                    the point aimed at the tile. The `left` transition matches
                    the pill's travel, for when the clamp above shifts it. */}
                    <span
                      ref={tipArrowRef}
                      className="absolute top-full left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] bg-foreground transition-[left] duration-150 ease-out motion-reduce:transition-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* The shared pager: links a crawler can follow, turning the page
              in place on a plain click. Only the first 120 tiles are in the
              HTML of `/icons`, so these are how the icon pages on later
              pages get a link from the grid at all. */}
          <Pager
            current={currentPage}
            total={pageCount}
            hrefs={Array.from({ length: pageCount }, (_, i) => pageHref(i + 1))}
            onTurn={goToPage}
            describe={pageSpan}
            className="pt-2 pb-6"
          />

          {/*
            The room the dock takes. Its own height, measured, rather than a
            guess: the panel is three columns on a wide screen and a stack on a
            phone, and the last row of icons has to stay clickable in both.
          */}
          <div aria-hidden="true" style={{ height: dockHeight }} />
        </div>
      </div>

      <IconPreview
        icons={icons}
        name={preview.name}
        recents={preview.recents}
        closing={preview.closing}
        // Grid order, so the arrow keys walk what you can see.
        order={paged.map((icon) => icon.name)}
        gridStyle={style}
        gridCorners={corners}
        picked={preview.picked}
        setPicked={preview.setPicked}
        pickedCorners={preview.pickedCorners}
        setPickedCorners={preview.setPickedCorners}
        treatments={treatments}
        size={size}
        stroke={stroke}
        color={color}
        onSelect={preview.select}
        onClose={preview.close}
        /*
          Both of these clear the other filter on the way out. A synonym
          searched inside a category, or a category opened under a live search,
          lands on the intersection of two things you did not ask for together
          — usually an empty grid, which reads as the link being broken. The
          category half lives in `selectCategory`; the search half is stated
          here as well as in the render adjuster, because an alias click can
          re-send the query it is already showing.
        */
        onSearch={(next) => {
          setCategory("all")
          onQueryChange(next)
        }}
        onCategory={selectCategory}
        onHeightChange={setDockHeight}
      />
    </Drawer>
  )
}
