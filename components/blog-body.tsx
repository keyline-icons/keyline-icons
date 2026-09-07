import type { ReactNode } from "react"
import Link from "next/link"

import type { BlogBlock, BlogFigure, BlogPost, DiagnosticRef } from "@/lib/blog"
import { iconHref } from "@/lib/icon-pages"
import {
  loadIcons,
  SET_RELEASES,
  SET_UNRELEASED,
  toStyleArt,
  type Icon,
  type Redraw,
  type StyleArt,
} from "@/lib/icons"
import { Glyph } from "@/components/glyph"

/**
 * One post's body, rendered from the blocks `lib/blog.ts` declares.
 *
 * A server component, and it has to be: every figure in a post is drawn from
 * `icons/` at request time rather than from an image file, which is the whole
 * reason these posts live on this site. An article showing `bell` shows
 * whatever `bell` is today, and a redraw six months from now updates the
 * illustration in an article about something else without anyone touching it.
 *
 * The reading it deliberately does not do is a second `loadIcons` per figure.
 * That call memoises, so it would be free, but the map is built once here and
 * handed down, because a figure that resolves its own names is a figure that
 * can silently render nothing.
 */

/**
 * Every redrawn drawing the history file knows about, before and after,
 * keyed by name.
 *
 * **Why this reads the released entries as well as the unreleased one.** A
 * post about a batch is written while that batch is unreleased, so the
 * obvious source is `SET_UNRELEASED.updated`, and for a week or two that
 * works. Then the release is tagged, the unreleased block empties, its
 * contents move into `SET_RELEASES`, and every before-and-after figure in the
 * published article turns into a single drawing with no comparison in it.
 *
 * That is not hypothetical. It is exactly what happened to the sharp preview
 * on `/changelog`, which hung off the unreleased block, emptied when v0.3.0
 * was cut, and took the evidence for its own announcement with it.
 * `lib/changelog.ts` carries the constant that stopped it happening a second
 * time. This map is the same lesson: look in both places, and a figure keeps
 * working across the tag that moves its subject.
 *
 * Unreleased first, then releases newest-first, first write wins. A name that
 * has been redrawn twice shows its most recent pair, which is the one the
 * post that mentions it was written about.
 */
function redrawnPairs(): Map<string, Redraw> {
  const pairs = new Map<string, Redraw>()

  for (const redraw of [
    ...(SET_UNRELEASED?.updated ?? []),
    ...SET_RELEASES.flatMap((release) => release.updated ?? []),
  ]) {
    if (!pairs.has(redraw.name)) pairs.set(redraw.name, redraw)
  }

  return pairs
}

/**
 * The keyline every figure in a post is drawn at.
 *
 * 1.5 rather than the 2 the set is built at, and it is a display choice rather
 * than a change to the drawings: the browser's stroke control runs 1 to 3 in
 * quarters, so this is a weight a reader can actually set, not one invented
 * for the article. At the 40px these figures are drawn at, a 2-unit keyline
 * scales to something heavier than the prose around it; 1.5 sits with the
 * text.
 *
 * One constant behind all three call sites — the grids, the before-and-after
 * pairs and both layers of a diagnostic panel — because a figure drawn at a
 * different weight from the one above it reads as a different set.
 *
 * **The diagnostic panels take it too, and that was checked rather than
 * assumed.** The worry was that a narrower stroke would uncover plate the
 * black had been hiding and paint a false fault down every drawing. It does
 * not: a panel is the *difference* between two layers rendered with identical
 * parameters, so the stroke contributes the same to both and cancels.
 * Rendered side by side at 2 and at 1.5, the rose sliver is the same sliver,
 * marginally clearer at 1.5 because less of it sits under black.
 *
 * `app/blog/[slug]/opengraph-image.tsx` deliberately stays at 2. A card is
 * seen beside the icon pages' cards in a feed and shares their look; it is
 * never seen beside these figures.
 */
const FIGURE_STROKE = 1.5

/** A drawing's tile, linking to its own page. */
function Tile({ icon }: { icon: Icon }) {
  return (
    <li>
      <Link
        href={iconHref(icon.name)}
        className="flex flex-col items-center gap-2.5 rounded-lg bg-muted px-3 py-4 transition-colors hover:bg-accent"
      >
        <span className="text-foreground">
          <Glyph
            art={icon.art.stroke!}
            size={24}
            stroke={FIGURE_STROKE}
            className="size-10"
          />
        </span>
        {/*
          Wrapped rather than truncated, which is where this differs from the
          changelog's tile on purpose. There the name is a label on a list you
          are scanning; here it is the subject of a sentence in the paragraph
          above, and `package-arrow-right` rendered as `package-ar…` is a
          figure that cannot be matched to the prose that introduces it.
        */}
        <span className="w-full text-center text-[11px] leading-tight break-words text-muted-foreground">
          {icon.name}
        </span>
      </Link>
    </li>
  )
}

/**
 * A figure's caption.
 *
 * Under the picture rather than over it, and in the muted ink the rest of the
 * page's asides use. It is a `figcaption` so a reader on a screen reader gets
 * the association rather than a stray sentence after a list of icon names.
 */
function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </figcaption>
  )
}

/**
 * The drawings named, at display size.
 *
 * **Drawn at 40px, but still a 24 x 24 icon**, which is the distinction worth
 * keeping: `size={24}` writes the intrinsic `width` and `height` the set
 * actually ships, and `size-10` scales it. Passing `size={40}` would render
 * the same picture and put `width="40"` in the markup, which quietly says the
 * asset is a 40px icon. It is not; there is one drawing on one grid, shown
 * larger. `components/icon-detail.tsx` sizes the same way with `size-full`,
 * and it is how anyone consuming the set writes it: a class on the element,
 * not a different export.
 *
 * The size is a departure rather than an oversight. `/icons`, the related
 * strip on an icon page and the changelog all draw at 24 because a reader
 * there is *scanning*: they have a name in mind and are looking for it. An
 * article is the opposite situation. Nobody arrives at a figure looking for
 * `package-arrow-left`; they are being shown a family and asked to see what it
 * has in common, and a drawing at 24px inside 16px prose is smaller than the
 * text around it.
 *
 * Each tile is a link into the icon's own page, which is worth saying out loud
 * as an editorial rule and not only an SEO one: a post that names forty-four
 * drawings and gives you no way to reach any of them is a post that has made
 * you go and search for them.
 */
function GridFigure({ icons, caption }: { icons: Icon[]; caption: string }) {
  return (
    <figure className="my-8">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-2">
        {icons.map((icon) => (
          <Tile key={icon.name} icon={icon} />
        ))}
      </ul>
      <Caption>{caption}</Caption>
    </figure>
  )
}

/** One drawing's two states, at the size it ships at. */
type Pair = { name: string; before: StyleArt | null; after: StyleArt | null }

/**
 * Redraws as the change itself, before beside after.
 *
 * Same argument as the changelog's version, and the same layout on purpose: a
 * post naming a corrected drawing is asking a reader to remember what it used
 * to look like, and nobody can, which is precisely why the icon was worth
 * correcting. Both drawings at one size, in one ink, on one ground, so the
 * difference between them is the only thing that differs.
 *
 * Drawn at 40px through `size-10`, matching the grid above rather than the
 * changelog's 24, and a 24 x 24 icon in the markup either way. **This does
 * not weaken the caption that says the fix is invisible here**, which was
 * checked rather than assumed: the bells' plate ran 0.054 of a grid unit
 * proud, and the grid is 24 units wide, so at 40px that is 0.09 of a pixel.
 * It would still be invisible at four times this size. The figure that shows
 * it is the `diagnostic` below, which crops to three units.
 */
function PairsFigure({ pairs, caption }: { pairs: Pair[]; caption: string }) {
  const face = (art: StyleArt | null, label: string) =>
    art && (
      <span className="flex flex-col items-center gap-1.5">
        <span className="text-foreground">
          <Glyph
            art={art}
            size={24}
            stroke={FIGURE_STROKE}
            className="size-10"
          />
        </span>
        <span className="text-[10px] leading-none text-muted-foreground">
          {label}
        </span>
      </span>
    )

  return (
    <figure className="my-8">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
        {pairs.map((pair) => (
          <li
            key={pair.name}
            className="flex flex-col items-center gap-2.5 rounded-lg bg-muted px-3 py-4"
          >
            <span className="flex items-center gap-4">
              {face(pair.before, "Before")}
              {pair.before && pair.after && (
                <span aria-hidden="true" className="text-muted-foreground">
                  →
                </span>
              )}
              {face(pair.after, "After")}
            </span>
            <span className="w-full text-center text-[11px] leading-tight break-words text-muted-foreground">
              {pair.name}
            </span>
          </li>
        ))}
      </ul>
      <Caption>{caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------------------ *
 * The diagnostic figure.
 * ------------------------------------------------------------------------ */

/**
 * The three inks, and why they are hexadecimal rather than theme tokens.
 *
 * A diagnostic panel is a measurement, and the caption tells the reader what
 * each colour means. That sentence has to stay true, so the colours cannot
 * move with the page's theme: rose is what one drawing painted, emerald is
 * what the other did, and the dark is where the two coincide. There is no
 * light-mode reading and dark-mode reading of a finding.
 *
 * The dark is not chosen. It is what `multiply` makes of the other two, and
 * multiply is the whole mechanism: the second layer darkens the first
 * everywhere they overlap, so agreement paints itself out of the way and only
 * disagreement keeps a colour. That needs a light ground under it, which is
 * why the panel carries its own rather than taking the page's, and why it is
 * isolated so nothing behind it joins in.
 */
const DIAGNOSTIC = {
  a: "#e11d48",
  b: "#059669",
  ground: "#ffffff",
  edge: "#e5e5e5",
  /* multiply(#e11d48, #059669), stated rather than left to be inferred from a
     swatch: the legend has to name this colour and it is not a token. */
  both: "#041112",
} as const

/**
 * A drawing with every opacity taken off it.
 *
 * The duotone style paints its plate at `fill-opacity="0.4"`, which is right
 * on the page and wrong here: an overlay compares the *region a drawing
 * covers*, and a plate at four tenths would read as a partial disagreement
 * with itself. Flattened, each layer is a solid silhouette and the multiply
 * means exactly what the legend says.
 *
 * It removes the opacity attributes and nothing else. It does not touch `d`,
 * which is the rule this repo has learned the hard way: geometry is never
 * rewritten by a string replace.
 */
const flatten = (art: StyleArt): StyleArt => ({
  body: art.body.replace(/\s(?:fill|stroke)-opacity="[^"]*"/g, ""),
  root: Object.fromEntries(
    Object.entries(art.root).filter(
      ([key]) => key !== "fill-opacity" && key !== "stroke-opacity"
    )
  ),
})

/**
 * One panel: two drawings, one on top of the other, in two inks that multiply.
 *
 * Both layers are absolutely positioned in the same box at the same `viewBox`,
 * so they are registered to the grid rather than to each other. That is what
 * makes the picture trustworthy: nothing is nudged to line up, and if two
 * drawings coincide it is because they coincide.
 */
function DiagnosticPanelFigure({
  title,
  a,
  b,
  viewBox,
  verdict,
}: {
  title: string
  a: StyleArt | null
  b: StyleArt | null
  viewBox?: string
  verdict?: { text: string; tone: "bad" | "good" }
}) {
  const layer = (art: StyleArt | null, color: string, multiply: boolean) =>
    art && (
      <Glyph
        art={flatten(art)}
        size={320}
        stroke={FIGURE_STROKE}
        viewBox={viewBox}
        className="absolute inset-0 h-full w-full"
        style={{
          color,
          ...(multiply ? { mixBlendMode: "multiply" as const } : null),
        }}
      />
    )

  return (
    <figure className="flex min-w-0 flex-1 flex-col gap-2">
      <figcaption className="text-[11px] leading-tight text-muted-foreground">
        {title}
      </figcaption>
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg"
        /* `isolation` so the multiply stops at this box. Without it the blend
           reaches the page behind, and the panel goes black in dark mode. */
        style={{
          background: DIAGNOSTIC.ground,
          boxShadow: `inset 0 0 0 1px ${DIAGNOSTIC.edge}`,
          isolation: "isolate",
        }}
      >
        {layer(a, DIAGNOSTIC.a, false)}
        {layer(b, DIAGNOSTIC.b, true)}
      </div>
      {/*
        A `bad` verdict takes the rose the fault is painted in, so the sentence
        and the sliver it names are the same colour. A `good` one takes the
        page's own ink rather than the emerald: emerald already means "ink the
        second drawing added" in the legend two lines below, and a verdict
        wearing it would be a fourth meaning for a colour that has three.
      */}
      {verdict && (
        <span
          className={`text-[11px] leading-tight font-medium ${
            verdict.tone === "bad" ? "" : "text-foreground"
          }`}
          style={verdict.tone === "bad" ? { color: DIAGNOSTIC.a } : undefined}
        >
          {verdict.text}
        </span>
      )}
    </figure>
  )
}

/** The three inks, named. Without it the panels are a colour scheme. */
function DiagnosticLegend({
  legend,
}: {
  legend: { a: string; b: string; both: string }
}) {
  const swatch = (color: string, label: string) => (
    <span className="flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-[3px]"
        style={{ background: color }}
      />
      {label}
    </span>
  )

  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
      {swatch(DIAGNOSTIC.a, legend.a)}
      {swatch(DIAGNOSTIC.b, legend.b)}
      {swatch(DIAGNOSTIC.both, legend.both)}
    </div>
  )
}

/**
 * One of the article's outbound links, as a row rather than as a sentence.
 *
 * A post that ends in three links wants them to look like three places to go.
 * Inline anchors in a closing paragraph are the version of this that everyone
 * skims past.
 */
function LinkRow({
  href,
  label,
  text,
}: {
  href: string
  label: string
  text: string
}) {
  return (
    <p className="text-base leading-relaxed">
      <Link
        href={href}
        className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
      >
        {label}
      </Link>
      <span className="text-muted-foreground">
        {" "}
        <span aria-hidden="true">· </span>
        {text}
      </span>
    </p>
  )
}

export async function BlogBody({ post }: { post: BlogPost }) {
  const icons = await loadIcons()
  const byName = new Map(icons.map((icon) => [icon.name, icon]))
  const redraws = redrawnPairs()

  /*
    A name the set no longer has renders as nothing rather than as a crash.
    `pipeline/check-demos.mjs` resolves every `*_ICON_NAMES` list under `lib/`
    against `icons/` and fails CI on a name that has gone, so this filter is
    the second line rather than the first: it exists so that a rename is a
    build failure and a gap in one figure, not a 500 on a published article.
  */
  const resolve = (names: readonly string[]) =>
    names.map((name) => byName.get(name)).filter(Boolean) as Icon[]

  /*
    A redraw with no stored pair falls back to the drawing as it stands. That
    is the honest thing to show for an icon the generator found no visible
    change for: it was still touched, and half a figure beats an empty one.
  */
  const pairOf = (name: string): Pair => {
    const redraw = redraws.get(name)
    return {
      name,
      before: redraw?.before ? toStyleArt(redraw.before) : null,
      after: redraw?.after
        ? toStyleArt(redraw.after)
        : (byName.get(name)?.art.stroke ?? null),
    }
  }

  /*
    One layer of a diagnostic panel, resolved.

    `before` and `after` come out of git and exist nowhere else: a superseded
    drawing is not in `icons/` any more, which is the entire reason a figure
    about a correction reads the history file. `current` is `icons/`, and is
    what the other half of a comparison between two different names wants.

    A `before` that git found no change for falls back to `current`, so a panel
    degrades into "these two drawings coincide" rather than into a blank half.
  */
  const artFor = ({ name, take }: DiagnosticRef): StyleArt | null => {
    const redraw = redraws.get(name)
    const stored = take === "before" ? redraw?.before : redraw?.after

    if (take !== "current" && stored) return toStyleArt(stored)

    /* Stroke, because it is the base every drawing owes and the only style two
       arbitrary names are both guaranteed to have. */
    return byName.get(name)?.art.stroke ?? null
  }

  const figure = (spec: BlogFigure, key: string) => {
    switch (spec.kind) {
      case "grid":
        return (
          <GridFigure
            key={key}
            icons={resolve(spec.names)}
            caption={spec.caption}
          />
        )
      case "pairs":
        return (
          <PairsFigure
            key={key}
            pairs={spec.names.map(pairOf)}
            caption={spec.caption}
          />
        )
      case "diagnostic":
        return (
          <figure key={key} className="my-8">
            {/*
              Panels across on a wide screen and stacked on a phone. Two is the
              usual count and three is the most that stays legible: a panel
              narrower than about 150px stops being a magnification of
              anything.
            */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              {spec.panels.map((panel) => (
                <DiagnosticPanelFigure
                  key={panel.title}
                  title={panel.title}
                  a={artFor(panel.a)}
                  b={artFor(panel.b)}
                  viewBox={panel.viewBox}
                  verdict={panel.verdict}
                />
              ))}
            </div>
            <Caption>{spec.caption}</Caption>
            <DiagnosticLegend legend={spec.legend} />
          </figure>
        )
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {post.body.map((block: BlogBlock, i) => {
        const key = `${block.kind}-${i}`

        switch (block.kind) {
          case "h2":
            return (
              /*
                `scroll-mt` because the site bar is fixed: a heading jumped to
                by its own anchor otherwise lands underneath it. The value is
                the bar's height plus the space a heading wants above it.
              */
              <h2
                key={key}
                id={block.id}
                className="mt-8 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground"
              >
                {block.text}
              </h2>
            )
          case "p":
            return (
              <p
                key={key}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {block.text}
              </p>
            )
          case "note":
            return (
              /*
                The one sentence a section is really about, pulled out. A
                border rather than a tint, so it reads as an aside in both
                themes without needing a colour of its own.
              */
              <p
                key={key}
                className="border-l-2 border-foreground/20 py-1 pl-4 text-base leading-relaxed text-balance text-foreground"
              >
                {block.text}
              </p>
            )
          case "list":
            return (
              <ul
                key={key}
                className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-muted-foreground"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case "link":
            return (
              <LinkRow
                key={key}
                href={block.href}
                label={block.label}
                text={block.text}
              />
            )
          case "figure":
            return figure(block.figure, key)
        }
      })}
    </div>
  )
}
