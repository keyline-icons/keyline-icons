/*
  Server-only, enforced. This module imports all of `lib/icon-history.json`,
  and the one time a client component reached it (through `lib/seo.ts`) every
  page on the site shipped the whole file. The import turns that into a build
  error rather than a silent megabyte. Next resolves the package itself.
*/
import "server-only"

import history from "@/lib/icon-history.json"
import { BLOG_SEGMENT } from "@/lib/site-chrome"

export { BLOG_DESCRIPTION, BLOG_SEGMENT } from "@/lib/site-chrome"

/**
 * The writing about the set: one post per update, newest first.
 *
 * **Why this exists at all, given `/changelog`.** The changelog is generated.
 * It answers "what moved" off git and nothing else, which is the right answer
 * to that question and the only one it can keep true without anyone
 * maintaining it. What it structurally cannot carry is *why* something moved:
 * that a drawing was a duplicate of another under a second name, that a grey
 * plate was standing outside its own outline, that seven icons were drawn and
 * then turned down. None of that is derivable from a diff, and all of it is
 * the part a reader actually finds useful.
 *
 * So the two are deliberately different documents about the same events. The
 * changelog is the record. This is the account.
 *
 * **The body is data, not prose in a file.** There is no MDX here and adding a
 * markdown pipeline for it would be the wrong trade: the figures in these
 * posts are not images, they are the set's own drawings rendered from
 * `icons/`, and half the point of writing the post on this site rather than
 * somewhere else is that a figure showing `bell` shows whatever `bell` is
 * today. A markdown file would have to reference a PNG, which is a picture of
 * an icon and starts rotting the moment the icon is redrawn.
 *
 * The prose blocks carry plain strings. There is no inline markup and that is
 * on purpose: every post so far wants links and emphasis at paragraph level at
 * most, and a mini-markdown parser is how a content model grows a rendering
 * bug. `link` is a block, not a syntax.
 *
 * **Every icon list is a `*_ICON_NAMES` const.** `pipeline/check-demos.mjs`
 * finds those by name under `lib/` and resolves each one against `icons/`, so
 * a rename breaks CI here rather than leaving a hole in a published article.
 * Names written inline inside the blocks below would not be checked by
 * anything. If a figure needs icons, give the list a name up here first.
 */

/**
 * One drawing a `diagnostic` panel lays down, and which of its states to take.
 *
 * `before` and `after` are the two documents git holds for a redraw, out of
 * `lib/icon-history.json`. `before` is the only place a superseded drawing
 * still exists: this repository does not contain it any more, which is exactly
 * why a figure about a correction has to come from there rather than from
 * `icons/`.
 *
 * `current` is the drawing as it stands today. Use it for the *other* half of
 * a comparison between two different names, where there is no correction and
 * no history to take, only two things that either coincide or do not.
 */
export type DiagnosticRef = {
  name: string
  take: "before" | "after" | "current"
}

export type DiagnosticPanel = {
  /** What this panel is looking at. Printed above it. */
  title: string
  /** Painted first, in the first ink. */
  a: DiagnosticRef
  /** Painted over it, multiplied, in the second ink. */
  b: DiagnosticRef
  /**
   * The crop, in grid units. Omit for the whole 24 x 24.
   *
   * A figure usually wants two panels: the whole drawing, so a reader knows
   * where they are, then the crop, so they can see the thing at all. Pick the
   * crop by rendering candidates rather than by reasoning about coordinates.
   */
  viewBox?: string
  /** The finding, in three or four words, under the panel. */
  verdict?: { text: string; tone: "bad" | "good" }
}

/** One drawing, shown at the size the set is used at. */
export type BlogFigure =
  /**
   * A row of drawings. The default reading of "show me the new icons", and
   * what most sections in a release post want.
   */
  | { kind: "grid"; names: readonly string[]; caption: string }
  /**
   * The same drawings in every style, one row per style: stroke, two-tone,
   * duotone, fill.
   *
   * Written for 1.0.0, whose story is the styles rather than the drawings: a
   * grid can only show stroke, and the point of a duotone is how it differs
   * from the two-tone above it, which only a row against a row can show.
   * Keep it to about eight names, or a phone has to scroll it sideways.
   */
  | { kind: "styles"; names: readonly string[]; caption: string }
  /**
   * A redrawn icon as the change itself, before beside after.
   *
   * The two documents come out of git, via `lib/icon-history.json`, which is
   * the only place they exist: the "before" is a drawing this repository no
   * longer contains. See `redrawnPairs` in the renderer for the lookup, and
   * for the reason it searches the released entries as well as the unreleased
   * one.
   */
  | { kind: "pairs"; names: readonly string[]; caption: string }
  /**
   * Two drawings superimposed, so the difference between them paints itself.
   *
   * **This is the figure that actually explains a fault, and it replaced a
   * side-by-side crop that did not.** Before beside after asks a reader to
   * hold two pictures in their head and subtract one from the other, which
   * nobody does; at the sizes these faults live at there is nothing to see
   * anyway. Laid on top of each other there is no subtracting to do. What only
   * the first one painted comes out in one ink, what only the second painted
   * comes out in another, and everything both of them painted goes dark. The
   * fault is the coloured sliver, and it is the only coloured thing in the
   * frame.
   *
   * It reads either way round, which is why it is one figure kind and not two:
   * point it at one drawing's two states and the colour is a correction, point
   * it at two different drawings and the colour is the distance between them.
   * The second is how this post shows that `git-merge` and `git-branch` were
   * the same picture, and it is the strongest image in it, because a duplicate
   * overlaid on its original has no coloured sliver at all. A figure whose
   * finding is a blank is a finding nothing else states as plainly.
   *
   * `legend` is required rather than optional for that reason: the inks mean
   * whatever the panels are comparing, and a reader cannot guess which.
   */
  | {
      kind: "diagnostic"
      panels: readonly DiagnosticPanel[]
      caption: string
      /** What each of the three inks means in this figure. Three short phrases. */
      legend: { a: string; b: string; both: string }
    }

/**
 * A table row's heading when the row is a project with a home of its own: its
 * name, linked there, with its mark beside it. Only the first cell, so a row
 * still reads as one thing and the other cells stay plain data. `logo` is the
 * project's own artwork under `public/`, drawn for a light page; on a dark one
 * it sits on a small white tile rather than being recoloured.
 */
export type BlogTableLink = { text: string; href: string; logo: string }

/**
 * A guide's picture on the index and on its social card, in place of the band
 * of drawings an update shows. An update's picture is what shipped; a guide is
 * about other things too, so it shows those: the projects it compares, as
 * their own marks, over the sheet the post is built on.
 */
export type BlogCover = {
  logos: readonly { name: string; src: string }[]
  image: { src: string; width: number; height: number }
}

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id: string }
  | { kind: "list"; items: readonly string[] }
  /** A pulled-out line. Used for the one sentence a section is really about. */
  | { kind: "note"; text: string }
  | { kind: "link"; href: string; label: string; text: string }
  | { kind: "figure"; figure: BlogFigure }
  /** A snippet, set as `/install` sets one. Copied by eye, so it scrolls. */
  | { kind: "code"; code: string }
  /**
   * A comparison a sentence would bury. Cells read the same backtick grammar
   * as a paragraph. Kept to five columns or so: a phone scrolls it sideways,
   * and past that a reader loses which row they are on.
   */
  | {
      kind: "table"
      head: readonly string[]
      rows: readonly (readonly [string | BlogTableLink, ...string[]])[]
    }
  /**
   * A picture that cannot come from `icons/`: another set's drawings, or a
   * component rendered with one of ours inside it. Never a drawing of this
   * set on its own, which a `figure` draws live from the files. `src` is a
   * path under `public/` and the size is the 1x size, so the page reserves
   * its space before it loads.
   */
  | {
      kind: "image"
      src: string
      width: number
      height: number
      alt: string
      caption: string
    }

export type BlogPost = {
  /**
   * The URL segment, and the one field that must never change once a post is
   * up. A slug rewrite is a 404 for every link anyone has already shared.
   *
   * Named for the story rather than for a version, which is a rule about
   * timing rather than taste: a post is written while its batch is still
   * untagged, so a URL announcing a version is a URL that has to be corrected
   * when the number turns out to be a different one. It did here. The post
   * below was drafted as 0.3.1 and shipped as 0.4.0; only the `version` field
   * had to change, because the slug never named either.
   */
  slug: string
  /**
   * The `h1`, the `<title>` and the card headline, in that order of authority.
   * `pageMetadata` appends the set name to the tab title; this is the page's
   * own name and nothing else.
   */
  title: string
  /** The search snippet. Written for a result, so it says what is inside. */
  description: string
  /** The line under the heading. Shorter, and written for a reader who clicked. */
  standfirst: string
  /**
   * The release this post is about, if it is about one.
   *
   * Set it as soon as the batch has a version it is *going* to ship as, not
   * once it has shipped: nothing here announces it until the tag exists. See
   * `postHeadline` and `postVersionLabel`, which both check
   * `lib/icon-history.json` and print "Unreleased" in the meantime, the same
   * word `/changelog` heads untagged work with.
   *
   * Omit it for a post that is not about a release. There will be some.
   */
  version?: string
  /**
   * What a post that is not about a release is instead, printed where an
   * update prints its version. Without it a guide's entry on the index had an
   * empty slot above its date and read as one more update, which it is not:
   * it is written to be found by a search and kept current, not read once in
   * a series. A post carries `version` or `kind`, never both.
   */
  kind?: "guide"
  /** A guide's picture; see `BlogCover`. Without one it falls back to `thumbnail`. */
  cover?: BlogCover
  /** ISO date. Drives `datePublished`, the printed date and the sitemap. */
  date: string
  /** ISO date of the last substantive edit, or the publication date. */
  updated: string
  /** Minutes, rounded. Printed on the index card, and honest rather than flattering. */
  readingMinutes: number
  /**
   * The drawings this post is about, most representative first.
   *
   * **Enough of them to be a picture.** The first version of this field held
   * six names and the index card drew them at 24px in a bar, which read as a
   * toolbar somebody had left at the top of the card rather than as an image
   * of anything. A card's picture has to be a picture: `BlogThumbnail` packs
   * the whole list into a full-bleed panel and lets it run off the edges, the
   * same argument `components/icon-wall.tsx` makes on the landing page, where
   * two hundred glyphs behind the headline are the evidence for a number that
   * would otherwise just be a claim.
   *
   * Forty or so is the working size: enough to fill three rows at the card's
   * width without the panel having to repeat anything. Fewer is fine and the
   * panel simply carries fewer rows.
   *
   * **The order is load-bearing at both ends.** The social card takes the
   * first six through `BLOG_SOCIAL_CARD_ICONS`, because a 1200x630 card has
   * room for six drawings at a size worth looking at and no more, so the six
   * that say which post this is go first. The panel takes all of them and
   * fades out at the top and bottom, so whatever is last is the half-row that
   * disappears into the edge.
   */
  thumbnail: readonly string[]
  /**
   * Terms this post is genuinely about, for the `keywords` property on the
   * JSON-LD node. Not a place to list things the post does not cover: a
   * keyword the page does not support is the oldest way to be ignored.
   */
  keywords: readonly string[]
  body: readonly BlogBlock[]
}

export const postHref = (slug: string) => `${BLOG_SEGMENT}/${slug}`

/**
 * Every version that has actually been tagged, straight out of the generated
 * history.
 *
 * **The JSON rather than `SET_RELEASES` from `lib/icons.ts`.** This file used
 * to be reachable from a client component through `lib/seo.ts`, and that
 * module reads the icon directories off disk, so the tidier import would have
 * put `node:fs` in a browser bundle. The edge is cut now and `server-only`
 * above keeps it cut, but the JSON is still the lighter dependency.
 *
 * The JSON is the same source `SET_RELEASES` is built from, so the two cannot
 * disagree about which versions exist.
 */
const RELEASED_VERSIONS: readonly string[] = (
  (history as { releases?: { version: string }[] }).releases ?? []
).map((release) => release.version)

export const isReleased = (version?: string) =>
  Boolean(version && RELEASED_VERSIONS.includes(version))

/**
 * The post's title as every surface prints it: the `h1`, the `<title>`, the
 * card headline and the breadcrumb. The index tile prints it less its
 * platform tail, through `postTileTitle`.
 *
 * **No version in front.** Release titles carried "v2.1.0: " until 1 Nov
 * 2026, on the model of "Tailwind CSS v4.3: ...". That shape suits a project
 * whose readers search for its versions, and nobody searches for this set's.
 * A search result shows about 60 characters, so the prefix spent 8 of them on
 * every post and pushed the subject, the only words a search matches, past
 * the cut: "v2.1.0: 61 free shadcn/ui, React and Figma icons for monitor...".
 * The version still prints where a reader looks for it, above the date and on
 * the card, through `postVersionLabel`, which keeps the "Unreleased" guard.
 *
 * One function rather than `post.title` at each call site, because four
 * surfaces print this and a second spelling on any of them is a title that
 * disagrees with the page it is on, which is the one thing Google rewrites.
 */
export const postHeadline = (post: BlogPost) => post.title

/**
 * The title as the index tile prints it: the whole title less the platforms
 * it ends on, "55 free transport and construction icons".
 *
 * The tail is there for search, and it is the same on every update post, so
 * on a page of tiles it is the one part that reads alike twenty times. The
 * subject in front of it is the part that differs. Tiles carried a separate
 * newsroom-style `headline` from 1 Nov 2026 to get away from that sameness;
 * on 2 Nov the call was for the posts' own titles instead, with the tail
 * cut, so a tile names exactly the post it opens. Taken from the title rather than
 * typed beside it, so the two cannot drift. A title with no such tail (1.0.0,
 * the guide) prints whole.
 */
export const postTileTitle = (post: BlogPost) =>
  post.title.replace(/ for React(, [^,]+)* and Figma$/, "")

/**
 * What the meta column prints above the date: the version, or the fact that
 * there is not one yet.
 *
 * Null for a post that is not about a release at all, which is not the same as
 * a release that has not happened.
 */
export const postVersionLabel = (post: BlogPost) =>
  post.version
    ? isReleased(post.version)
      ? `v${post.version}`
      : "Unreleased"
    : null

/**
 * What a post is, as a section name: the label a post that is not an update
 * prints in the version's place, and the `articleSection` of its structured
 * data, so the page and what a crawler is told agree.
 */
export const postSection = (post: BlogPost) =>
  post.kind === "guide" ? "Guides" : "Updates"

/** The singular, for the label on the index, the post and the card. */
export const postKindLabel = (post: BlogPost) =>
  post.kind === "guide" ? "Guide" : null

/*
  `BLOG_AUTHOR` was here, set to Zafar's name, and it is gone rather than
  changed.

  It put a person's byline on a post that person did not write. The drawings,
  the calls about what ships and every fact in the prose are his; the prose is
  not, and the commit trailers on this branch say so in the one place that
  cannot be edited to flatter anybody. A byline is a claim of authorship, not a
  credit for the work being written about, and the two are not the same thing.

  What replaces it is the set itself as the author, which is honest at both
  ends: `Keyline Icons` publishes the post, and nobody is credited with writing
  it who did not. See `blogPostJsonLd`, where the node is an `Organization`.
*/

/* ------------------------------------------------------------------------ *
 * v0.4.0.
 * ------------------------------------------------------------------------ */

/**
 * The parcel's modifier set, which is the batch's clearest single argument:
 * which modifiers a base takes is a question the set already answers, and
 * these were read off the six bases that carry arrows rather than chosen.
 */
export const BLOG_PACKAGE_ICON_NAMES = [
  "package",
  "package-plus",
  "package-minus",
  "package-check",
  "package-x",
  "package-alert",
  "package-arrow-up",
  "package-arrow-down",
  "package-arrow-left",
  "package-arrow-right",
] as const

/** Both glasses, with the five signs each. `search-2` is the round lens. */
export const BLOG_SEARCH_ICON_NAMES = [
  "search-plus",
  "search-minus",
  "search-check",
  "search-x",
  "search-list",
  "search-2-plus",
  "search-2-minus",
  "search-2-check",
  "search-2-x",
  "search-2-list",
] as const

/**
 * The duplicate and the drawing it was a copy of, side by side.
 *
 * `git-branch` is here so the figure can make the point the prose makes: for
 * seven releases these two names rendered the same picture.
 */
export const BLOG_GIT_ICON_NAMES = ["git-branch", "git-merge"] as const

/**
 * The batch itself, as the picture on its card.
 *
 * Forty-three names, which is what fills the card's panel past its own height:
 * forty-one of v0.4.0's forty-four new drawings, plus two that are not new and
 * belong here anyway. `package` is the base the nine new parcel modifiers
 * hang off, and a family shown without it is nine variations on something the
 * reader has to picture; `git-merge` is a redraw rather than a new name and is
 * the post's best story.
 *
 * The three new drawings left out are an editorial call rather than a rule:
 * `circle-progress-play` is a ring, and a ring in a dense field of drawings
 * reads as a hole punched in it, while `move` and `maximize-2` are arrow
 * clusters that go to noise at 36px. All three are in the post, in the singles
 * grid, at the size where they read.
 *
 * **The first six are the social card**, in the order a reader meets them: a
 * parcel with an arrow for the family that drove the batch, a search glass for
 * the ten that took the most work, an umbrella because it is the one drawing
 * here nobody expects, a briefcase for the one drawn by hand, a traffic light for the
 * motorsport batch that mostly did not survive, and git-merge for the story.
 * Reordering this list changes what a shared link unfurls into.
 */
export const BLOG_BATCH_THUMBNAIL_ICON_NAMES = [
  "package-arrow-down",
  "search-check",
  "umbrella",
  "briefcase",
  "traffic-light",
  "git-merge",
  "package",
  "package-plus",
  "package-minus",
  "package-check",
  "package-x",
  "package-alert",
  "package-arrow-up",
  "package-arrow-left",
  "package-arrow-right",
  "search-plus",
  "search-minus",
  "search-x",
  "search-list",
  "search-2-plus",
  "search-2-minus",
  "search-2-check",
  "search-2-x",
  "search-2-list",
  "cloud-plus",
  "cloud-check",
  "cloud-x",
  "cloud-alert",
  "app-plus",
  "app-minus",
  "app-check",
  "app-x",
  "app-dot",
  "umbrella-off",
  "parasol",
  "crown",
  "flag",
  "flag-chequered",
  "bug",
  "credit-card-2",
  "settings-dot",
  "replay",
] as const

/**
 * What the 1200x630 card draws: the head of a post's list.
 *
 * Six, and the number is a measurement rather than a taste: at 1200px wide
 * with the padding the other cards in this repo use, six tiles at 132px is the
 * row that fits. A seventh makes every drawing smaller than the point at which
 * it is still recognisable in a feed.
 */
export const BLOG_SOCIAL_CARD_ICONS = 6

/**
 * The v0.5.0 batch, most representative first.
 *
 * The chain leads because the release's story is that two of its names were on
 * the wrong drawing, and a feed card shows the first six: `link`, `link-2` and
 * `unlink` say chain at a glance, and `bell-ring` and `sparkles` say the rest
 * of it is drawings rather than housekeeping. The formatting marks follow,
 * because fourteen of the thirty-five are one shelf.
 */
/** All fifty-three of v0.9.0, most recognisable first, then release order. */
export const BLOG_V090_THUMBNAIL_ICON_NAMES = [
  "flask-conical",
  "leaf",
  "thermometer",
  "lungs",
  "test-tubes",
  "droplet",
  "brain",
  "tree-palm",
  "wind-turbine",
  "bird",
  "plane",
  "bot",
  "truck-check",
  "flask-round",
  "test-tube",
  "test-tube-diagonal",
  "flask-conical-off",
  "droplets",
  "droplet-off",
  "ear",
  "ear-listen",
  "ear-waveform",
  "thermometer-sun",
  "thermometer-snowflake",
  "temperature-empty",
  "temperature-quarter",
  "temperature-half",
  "temperature-high",
  "temperature-full",
  "pig",
  "piggy-bank",
  "brain-circuit",
  "plane-takeoff",
  "plane-landing",
  "ship",
  "train-front",
  "bike",
  "truck-electric",
  "truck-plus",
  "truck-minus",
  "truck-x",
  "truck-arrow-up",
  "truck-arrow-down",
  "truck-arrow-left",
  "truck-arrow-right",
  "earbuds",
  "airpods",
  "airpods-open",
  "hand-pointer",
  "hand-pointer-down",
  "hand-pointer-left",
  "hand-pointer-right",
  "radar",
] as const

/** The base and its nine, and the drawing whose name turned round. */
export const BLOG_V090_TRUCK_ICON_NAMES = [
  "truck", "truck-plus", "truck-minus", "truck-check", "truck-x",
  "truck-arrow-up", "truck-arrow-down", "truck-arrow-left",
  "truck-arrow-right", "truck-electric",
] as const

/** All thirty-three of v0.8.0, most recognisable first, then release order. */
export const BLOG_V080_THUMBNAIL_ICON_NAMES = [
  "printer",
  "keyboard",
  "palette",
  "paintbrush",
  "calculator",
  "easel",
  "coffee",
  "bed",
  "key",
  "usb",
  "usb-drive",
  "file-code",
  "file-zip",
  "folder-search",
  "eraser",
  "tape",
  "bed-single",
  "bed-double",
  "sofa",
  "door",
  "door-open",
  "brick-wall",
  "mars",
  "venus",
  "cake",
  "soup",
  "bottle",
  "paint-roller",
  "key-round",
  "key-square",
  "coins",
  "film",
  "broom",
] as const

/** The ten that sit on a desk, and the shelves they landed on. */
export const BLOG_V080_DESK_ICON_NAMES = [
  "printer",
  "keyboard",
  "calculator",
  "usb",
  "usb-drive",
  "eraser",
  "tape",
  "file-code",
  "file-zip",
  "folder-search",
  "paintbrush",
  "paint-roller",
  "palette",
  "easel",
  "coffee",
  "bed-double",
  "sofa",
  "door-open",
  "key",
  "broom",
] as const

/** The two doors, which share a frame and not a leaf. */
export const BLOG_V080_DOOR_ICON_NAMES = ["door", "door-open"] as const

/**
 * The v0.7.0 batch, in the order the Figma changelog lists it: the square
 * bubble first, its eight companions, then the five singles.
 */
export const BLOG_V070_THUMBNAIL_ICON_NAMES = [
  "chart-column",
  "chart-pie",
  "message-square",
  "face-smile",
  "chart-candlestick",
  "qr-code",
  "chart-line",
  "chart-gantt",
  "badge-check",
  "thumbs-up",
  "message-square-plus",
  "scan-barcode",
  "chart-area",
  "chart-scatter",
  "chart-waterfall",
  "chart-tree-map",
  "face-laugh",
  "messages-square",
  "scan-qr-code",
  "chart-bar",
  "chart-spline",
  "chart-network",
  "chart-pyramid",
  "face-frown",
  "badge",
  "chart-line-increasing",
  "message-square-check",
  "scissors",
  "hourglass",
  "chart-bar-stacked",
  "chart-column-stacked",
  "chart-scatter-bubble",
  "face-neutral",
  "thumbs-down",
  "message-square-dot",
  "scan-text",
  "diagram-project",
  "chart-line-up",
  "badge-percent",
  "message-square-off",
] as const

/** The faces and the two thumbs, on the Emoji shelf. */
export const BLOG_V070_EMOJI_ICON_NAMES = [
  "face-angry",
  "face-frown",
  "face-neutral",
  "face-smile",
  "face-laugh",
  "face-expressionless",
  "face-smile-plus",
  "thumbs-up",
  "thumbs-down",
  "badge-check",
] as const

/** The nine that are one family. */
export const BLOG_V070_BUBBLE_ICON_NAMES = [
  "message",
  "message-dot",
  "message-off",
  "messages",
  "message-plus",
  "message-square",
  "message-square-dot",
  "message-square-off",
  "messages-square",
  "message-square-plus",
] as const

/** The ten charts, in the order the Charts band files them. */
export const BLOG_V070_CHART_ICON_NAMES = [
  "chart-column",
  "chart-bar",
  "chart-column-stacked",
  "chart-bar-stacked",
  "chart-line",
  "chart-spline",
  "chart-area",
  "chart-line-increasing",
  "chart-line-decreasing",
  "chart-scatter",
  "chart-scatter-bubble",
  "chart-scatter-3d",
  "chart-candlestick",
  "chart-waterfall",
  "chart-pie",
  "chart-pyramid",
  "chart-tree-map",
  "chart-gantt",
  "chart-network",
  "chart-diagram",
] as const

/**
 * The v0.6.0 batch: eleven names, the six of the book family together so the
 * card reads as a family rather than as six separate arrivals.
 */
export const BLOG_V060_THUMBNAIL_ICON_NAMES = [
  "dollar-sign",
  "euro",
  "book-open",
  "store",
  "circle-pound-sterling",
  "flame",
  "japanese-yen",
  "indian-rupee",
  "swiss-franc",
  "bitcoin",
  "pound-sterling",
  "wallet",
  "credit-card-check",
  "circle-dollar-sign",
  "circle-euro",
  "circle-japanese-yen",
  "circle-indian-rupee",
  "circle-swiss-franc",
  "book",
  "book-plus",
  "book-minus",
  "book-check",
  "book-x",
  "buildings",
  "cpu",
  "graduation-cap",
  "credit-card-plus",
  "credit-card-minus",
  "credit-card-x",
] as const

/** The money half of the batch: a wallet, the card's four signs, seven marks. */

export const BLOG_V060_MONEY_ICON_NAMES = [
  "dollar-sign",
  "euro",
  "pound-sterling",
  "japanese-yen",
  "indian-rupee",
  "circle-dollar-sign",
  "circle-euro",
  "circle-pound-sterling",
  "circle-japanese-yen",
  "circle-indian-rupee",
  "swiss-franc",
  "circle-swiss-franc",
  "bitcoin",
  "wallet",
  "credit-card-check",
] as const

export const BLOG_V050_THUMBNAIL_ICON_NAMES = [
  "bold",
  "italic",
  "underline",
  "text-align-start",
  "quote",
  "list-ordered",
  "strikethrough",
  "text-align-center",
  "text-align-end",
  "text-align-justify",
  "quote-end",
  "quote-single",
  "quote-single-end",
  "text-quote",
  "language",
  "list",
  "link",
  "link-2",
  "unlink",
  "link-2-off",
  "bell-ring",
  "sparkles",
  "zap",
  "layers",
  "phone",
  "phone-off",
  "message-lines",
  "send",
  "send-horizontal",
  "share-2",
  "sparkle",
  "sun-dim",
  "sun-medium",
  "zap-off",
  "fullscreen-2",
  "fullscreen-exit-2",
  "clock",
  "pen",
  "pen-line",
  "pen-off",
  "sliders-horizontal",
  "sliders-vertical",
] as const

const BATCH_0_3_1: BlogPost = {
  /* The parcel leads because an order screen is the search this post can
     win; the duplicate is the story, so it is a heading, not the title. 43
     is the count off the tag, where the first draft said 44. */
  slug: "44-new-icons-and-a-duplicate-that-shipped-seven-times",
  version: "0.4.0",
  title:
    "43 free package, cloud and search icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: a parcel in nine states for orders, ten " +
    "search icons, a cloud and an app tile with their symbols, and a fixed " +
    "git-merge.",
  standfirst:
    "One umbrella became three icons: open, switched off, and a parasol " +
    "with a pole where the hook should be.",
  date: "2026-09-06",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_BATCH_THUMBNAIL_ICON_NAMES,
  keywords: [
    "package icons",
    "parcel icon",
    "delivery icons",
    "order status icons",
    "search icons",
    "zoom icons",
    "cloud icons",
    "app icons",
    "git merge icon",
    "git branch icon",
    "bell icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Packed, shipped, delivered, sent back: the parcel takes a symbol " +
        "for each state of an order now. A list of orders can show one box " +
        "nine ways, where before the set had the box and nothing to put on " +
        "it.",
    },
    {
      kind: "p",
      text:
        "The search glass, the cloud and the app tile take symbols too, " +
        "which makes 43 new icons and a set of 629. More changed than was " +
        "added: 315 drawings that had already shipped were redrawn, nearly " +
        "all of them in sharp corners.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_PACKAGE_ICON_NAMES,
        caption: "The parcel and its nine. Only `package` was here before.",
      },
    },

    { kind: "h2", text: "Every state of an order, from one box", id: "orders" },
    {
      kind: "p",
      text: "Each state has its own name:",
    },
    {
      kind: "list",
      items: [
        "Packed or delivered: `package-check`.",
        "Added to an order, or taken out: `package-plus` and `package-minus`.",
        "Cancelled: `package-x`. Delayed or damaged: `package-alert`.",
        "Received, sent, returned and forwarded: `package-arrow-down`, " +
          "`package-arrow-up`, `package-arrow-left` and " +
          "`package-arrow-right`.",
      ],
    },
    {
      kind: "p",
      text:
        "Only things that hold something on the move get arrows. Before " +
        "this update that was six: the calendar, the clock, the file, the " +
        "folder, the picture and the phone. A parcel is the thing that " +
        "moves, so it joined them. The app tile did not. Installing, " +
        "removing and approving an app are plus, minus and check, and a " +
        "download has an icon of its own. So `app-dot` got a dot for a " +
        "notification instead.",
    },
    {
      kind: "p",
      text:
        "Search takes the same symbols on both of its glasses: plus and " +
        "minus to zoom, a check, an x and a list. They are one size on " +
        "both, the size the smaller glass can hold, because two sizes of " +
        "check read as two different checks.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_SEARCH_ICON_NAMES,
        caption:
          "The angled glass on top, the round one below. The cloud takes " +
          "four of the same: `cloud-plus`, `cloud-check`, `cloud-x` and " +
          "`cloud-alert`.",
      },
    },

    {
      kind: "h2",
      text: "git-merge was git-branch under a second name",
      id: "duplicate",
    },
    {
      kind: "p",
      text:
        "For a month, `git-merge` and `git-branch` were one drawing. Not " +
        "alike: the same lines in every style, identical to the pixel at " +
        "any size. Both were drawn on 8 August, the copy was found on 4 " +
        "September, and by then it had gone out in all seven releases the " +
        "set had made.",
    },
    {
      kind: "p",
      text:
        "Nobody reported it, and nobody would have. You reach for a merge " +
        "icon, you get some lines that join, and it looks like a merge " +
        "because merging is what you were thinking about.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`git-merge` as it shipped, laid over `git-branch`",
            a: { name: "git-merge", take: "before" },
            b: { name: "git-branch", take: "current" },
            verdict: {
              text: "No colour anywhere: one drawing, twice",
              tone: "bad",
            },
          },
          {
            title: "`git-merge` now, laid over `git-branch`",
            a: { name: "git-merge", take: "current" },
            b: { name: "git-branch", take: "current" },
            verdict: {
              text: "Two different drawings",
              tone: "good",
            },
          },
        ],
        caption:
          "Each panel paints one icon over the other, and wherever the two " +
          "differ, colour shows. The left panel has none, which is what a " +
          "duplicate looks like.",
        legend: {
          a: "only in git-merge",
          b: "only in git-branch",
          both: "in both",
        },
      },
    },
    {
      kind: "note",
      text:
        "A duplicate passes every check that looks at the picture. Only a " +
        "check that compares the files finds it.",
    },
    {
      kind: "p",
      text:
        "The shared drawing was a branch: one line splitting into two on " +
        "the way down. So `git-branch` kept it, and `git-merge` became its " +
        "mirror, two lines joining into one.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_GIT_ICON_NAMES,
        caption: "One line becoming two, and two becoming one.",
      },
    },

    {
      kind: "h2",
      text: "The bells painted grey outside their outline",
      id: "plates",
    },
    {
      kind: "p",
      text:
        "In two-tone, a bell is a black outline over a grey fill, and the " +
        "grey is meant to stop just inside the line. On all seven bells it " +
        "didn't. Along two thirds of each side the grey ran past the " +
        "outline, by a tenth of a pixel at most.",
    },
    {
      kind: "p",
      text:
        "That is far too small to see on a screen, which is how it shipped " +
        "seven times. It showed only when the grey was recoloured red in " +
        "Figma. Each side of the grey is now the outline itself, moved " +
        "inward, where it used to be traced by hand.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The whole bell, old grey laid over new",
            a: { name: "bell", take: "before" },
            b: { name: "bell", take: "after" },
            verdict: {
              text: "A hairline, at fifteen times the size",
              tone: "good",
            },
          },
          {
            title: "Three pixels of its left side",
            a: { name: "bell", take: "before" },
            b: { name: "bell", take: "after" },
            viewBox: "3.2 11 3 3",
            verdict: {
              text: "Grey outside the line",
              tone: "bad",
            },
          },
        ],
        caption:
          "The colour down the edge of the second panel is the whole " +
          "fault: grey the old bell painted outside its outline. None of " +
          "the second colour shows anywhere, so the fix only ever took " +
          "grey away.",
        legend: {
          a: "grey as it shipped",
          b: "grey as it is now",
          both: "outline that did not move",
        },
      },
    },
    {
      kind: "p",
      text:
        "Most of the other redraws are one change to sharp corners. A " +
        "sharp line ends square, and on a slanted line the square end " +
        "reached about 0.4 of a pixel further than the round end of the " +
        "same line. So switching an icon from rounded to sharp made every " +
        "chevron, arrowhead and slash a little longer. Now both end inside " +
        "the same box, and switching changes the shape of the ends and " +
        "nothing else.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

/**
 * Every post, newest first.
 *
 * The order is the array's, not a sort: a sort on `date` would silently
 * reorder the page the day two posts share one, and there is nothing to gain
 * from deriving an order that is already visible here.
 */
export const BLOG_V050_TOOLBAR_ICON_NAMES = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "language",
  "text-align-start",
  "text-align-center",
  "text-align-end",
  "text-align-justify",
  "text-quote",
  "quote",
  "quote-end",
  "quote-single",
  "quote-single-end",
  "unlink",
  "list",
  "list-ordered",
  "link",
  "link-2",
  "link-2-off",
] as const

const BATCH_0_5_0: BlogPost = {
  /* An editor's toolbar is the search this post can win. The seven
     currency marks the first draft covered shipped in 0.6.0, by the tags,
     so they moved to that post. */
  slug: "35-new-icons-and-two-names-the-wrong-way-round",
  version: "0.5.0",
  title: "35 free text formatting icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons for a text editor: bold, italic, " +
    "underline, alignment and quotation marks, plus links, sparkles, a " +
    "lightning bolt and send.",
  standfirst:
    "Brightness sliders get their steps: the sun comes dimmed and at half " +
    "strength too.",
  date: "2026-09-08",
  updated: "2026-11-02",
  readingMinutes: 3,
  thumbnail: BLOG_V050_THUMBNAIL_ICON_NAMES,
  keywords: [
    "text formatting icons",
    "text editor icons",
    "toolbar icons",
    "bold icon",
    "italic icon",
    "underline icon",
    "strikethrough icon",
    "align icons",
    "quote icon",
    "quotation mark icon",
    "list icon",
    "link icon",
    "unlink icon",
    "slider icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Rich text editors are covered button by button: bold, italic, " +
        "underline, alignment, quotes, lists and a link. The icons have a " +
        "category of their own, Text.",
    },
    {
      kind: "p",
      text:
        "Two older icons traded names on the way, so `link` draws " +
        "something different from this release on. With 35 new icons and " +
        "seven redraws, the set reached 663.",
    },

    { kind: "h2", text: "An editor toolbar, from one set", id: "toolbar" },
    {
      kind: "p",
      text: "The toolbar, group by group:",
    },
    {
      kind: "list",
      items: [
        "Inline styles: `bold`, `italic`, `underline`, `strikethrough`.",
        "Alignment: `text-align-start`, `text-align-center`, `text-align-end`, " +
          "`text-align-justify`.",
        "Quotes: `quote` and `quote-end` for double marks, `quote-single` " +
          "and `quote-single-end` for single, and `text-quote` for a block " +
          "quote.",
        "Lists: `list` and `list-ordered`.",
        "Links: `link`, and `unlink` to remove one. `language` opens a " +
          "translate menu.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V050_TOOLBAR_ICON_NAMES,
        caption:
          "`link` is the only name here that was in the set before, and it " +
          "draws something else now.",
      },
    },
    {
      kind: "p",
      text:
        "The toolbar's letters are drawn big, because the small holes " +
        "inside a letter fill in at 16 pixels. The B in `bold` stands the " +
        "full height of the icon, and even its smaller bowl is 8 pixels " +
        "tall. The same reason keeps letters rare in this set.",
    },

    { kind: "h2", text: "link and link-2 traded drawings", id: "swap" },
    {
      kind: "p",
      text:
        "The two chains swapped names to match the most widely used open " +
        "icon set, which calls the slanted chain `link` and the level one " +
        "`link-2`. This set had them the other way round from the start, " +
        "and code that moves from that set keeps its names, so the names " +
        "have to mean the same drawings.",
    },
    {
      kind: "p",
      text:
        "If your app imports `Link`, it draws the slanted chain now. " +
        "`LinkOff` is gone: the level chain with a slash through it is " +
        "`Link2Off`, because it is the off state of `link-2`. Searching " +
        "the site for link-off still finds it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`link` as it shipped, laid over today's `link-2`",
            a: { name: "link", take: "before" },
            b: { name: "link-2", take: "current" },
            verdict: {
              text: "No colour: the same drawing",
              tone: "bad",
            },
          },
          {
            title: "`link` now, laid over `link-2`",
            a: { name: "link", take: "current" },
            b: { name: "link-2", take: "current" },
            verdict: {
              text: "Two drawings",
              tone: "good",
            },
          },
        ],
        caption:
          "Each panel paints one icon over the other, and colour shows " +
          "only where they differ. The drawing that used to answer to " +
          "`link` answers to `link-2` now.",
        legend: {
          a: "only in link",
          b: "only in link-2",
          both: "in both",
        },
      },
    },

    {
      kind: "h2",
      text: "The sliders break their rails at each knob",
      id: "sliders",
    },
    {
      kind: "p",
      text:
        "Each knob on the sliders now stands in a gap in its rail, 2 " +
        "pixels clear on either side, the space the set keeps between any " +
        "two parts. `sliders-horizontal` and `sliders-vertical` used to " +
        "run three unbroken rails with a knob across each.",
    },
    {
      kind: "p",
      text:
        "The gap is always on the longer side of the rail, where there is " +
        "room for it. And the vertical icon is the horizontal one turned " +
        "on its side, so the pair can't drift apart.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`sliders-horizontal`, old over new",
            a: { name: "sliders-horizontal", take: "before" },
            b: { name: "sliders-horizontal", take: "after" },
            verdict: {
              text: "Three gaps, and one knob moved",
              tone: "good",
            },
          },
          {
            title: "Seven pixels of the top rail",
            a: { name: "sliders-horizontal", take: "before" },
            b: { name: "sliders-horizontal", take: "after" },
            viewBox: "11 2 7 6",
            verdict: {
              text: "Rail that is gone",
              tone: "good",
            },
          },
        ],
        caption:
          "The first colour is rail the old drawing had and the new one " +
          "doesn't. The middle knob moved 2 pixels along its rail to sit " +
          "where the gap leaves room.",
        legend: {
          a: "as it shipped",
          b: "as it is now",
          both: "lines that did not move",
        },
      },
    },
    {
      kind: "p",
      text:
        "The pen family is a little larger, with its band moved from the " +
        "nib to the cap, and `clock` now draws the same as `clock-3`.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

const BATCH_0_7_0: BlogPost = {
  /* Charts lead: a dashboard's chart switcher is the search this post can
     win. 73 is the count off the tag, where the first draft said 71. */
  slug: "the-message-family-in-a-second-body",
  version: "0.7.0",
  title: "73 free chart, chat and emoji icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: 26 charts from bar to candlestick, " +
    "square chat bubbles, QR and barcode scanners, seven faces and badges " +
    "with nine signs.",
  standfirst:
    "Scanning got a family of its own: one frame, holding a line, text, a " +
    "barcode, a QR code, a magnifier or an eye.",
  date: "2026-09-10",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V070_THUMBNAIL_ICON_NAMES,
  keywords: [
    "chart icons",
    "chart type icons",
    "bar chart icon",
    "line chart icon",
    "pie chart icon",
    "candlestick chart icon",
    "gantt chart icon",
    "chat icons",
    "chat bubble icon",
    "message square icon",
    "emoji icons",
    "rating icons",
    "thumbs up icon",
    "badge icons",
    "verified badge icon",
    "qr code icon",
    "scan icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Twenty-six chart types have an icon each, enough for every option " +
        "in a dashboard's chart picker. The message bubble was drawn again " +
        "as a square, so a chat can match the corners of everything around " +
        "it.",
    },
    {
      kind: "p",
      text:
        "Faces came too, seven of them, with a thumbs up and down, four " +
        "diagrams and a badge that carries nine symbols: 73 new icons, and " +
        "765 in the set.",
    },

    { kind: "h2", text: "A chart icon for every chart type", id: "charts" },
    {
      kind: "p",
      text: "Where to find each kind of chart:",
    },
    {
      kind: "list",
      items: [
        "Bars and columns: `chart-column` and `chart-bar`, and stacked, " +
          "`chart-column-stacked` and `chart-bar-stacked`.",
        "Lines: `chart-line`, `chart-spline` for a smooth curve, " +
          "`chart-area`, and `chart-line-increasing` and " +
          "`chart-line-decreasing` for a trend.",
        "Points: `chart-scatter`, `chart-scatter-bubble` and " +
          "`chart-scatter-3d`.",
        "Money: `chart-candlestick` and `chart-waterfall`.",
        "Parts of a whole: `chart-pie`, `chart-pyramid` and `chart-tree-map`.",
        "Plans and links: `chart-gantt` for a timeline and `chart-network` " +
          "for connected points.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_CHART_ICON_NAMES,
        caption:
          "Twenty of the twenty-six. Every chart with an axis uses the " +
          "same bent line, so the plots line up in a menu.",
      },
    },
    {
      kind: "p",
      text:
        "The pie is pulled apart so that every cut shows the same 2 pixels " +
        "of white. For that, each slice slides out by its own distance, " +
        "worked out from its angle. Slid out all the same distance, the " +
        "wide cuts open to nearly 3 pixels.",
    },

    { kind: "h2", text: "Swap the bubble and nothing moves", id: "bubbles" },
    {
      kind: "p",
      text:
        "The square bubble takes the same 20 by 20 pixels as the round " +
        "one, so swapping one for the other moves nothing on the screen. " +
        "The round `message` is an oval with a tail, and the new " +
        "`message-square` is a rounded box whose left side runs on down " +
        "into the tail.",
    },
    {
      kind: "p",
      text:
        "Every symbol sits where the round bubble puts it: plus, minus, " +
        "check and x in the middle, a dot at the top right for something " +
        "unread, and the slash from corner to corner for a muted chat.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_BUBBLE_ICON_NAMES,
        caption:
          "The round bubble on top, the square one under it, option for " +
          "option. The bottom row is new.",
      },
    },
    {
      kind: "p",
      text:
        "In `messages-square` two bubbles overlap, and in fill only the " +
        "front one is solid, with the one behind cut round it. Fill both " +
        "and you get two shapes stacked. Fill one and you get a reply in " +
        "front of a message, which is what a conversation looks like.",
    },

    { kind: "h2", text: "Five faces make a rating scale", id: "faces" },
    {
      kind: "p",
      text:
        "A feedback form that asks how something went can now run from " +
        "`face-angry` through `face-frown`, `face-neutral` and " +
        "`face-smile` to `face-laugh`. All seven faces are one face with a " +
        "different mouth and brows, so a row of them reads as a scale and " +
        "not as five drawings.",
    },
    {
      kind: "p",
      text:
        "For reactions there are `thumbs-up`, `thumbs-down` and " +
        "`face-smile-plus` to add one. The badge is a ring of eight bumps " +
        "carrying the circle's symbols, so `badge-check` marks a verified " +
        "account the way `circle-check` marks a done task.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_EMOJI_ICON_NAMES,
        caption:
          "The rating scale, then the expressionless face, the reaction " +
          "button, the thumbs and the verified badge.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V060_OBJECT_ICON_NAMES = [
  "book",
  "book-open",
  "book-plus",
  "book-minus",
  "book-check",
  "store",
  "buildings",
  "flame",
  "graduation-cap",
  "cpu",
] as const

const BATCH_0_6_0: BlogPost = {
  /* Currency leads: thirteen of the 29 are money marks, and they shipped
     here, not in 0.5.0, whose post first covered them. 29 is the count off
     the tag. */
  slug: "23-new-icons-and-a-shopfront-that-took-three-passes",
  version: "0.6.0",
  title: "29 free currency and book icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: dollar, euro, pound, yen, rupee, franc " +
    "and bitcoin, most in a circle too, a wallet, an open book, a " +
    "shopfront and a flame.",
  standfirst:
    "The circled euro is centred on its bowl, not its box: its open ends " +
    "reach further right than the bowl reaches left.",
  date: "2026-09-09",
  updated: "2026-11-02",
  readingMinutes: 3,
  thumbnail: BLOG_V060_THUMBNAIL_ICON_NAMES,
  keywords: [
    "currency icons",
    "money icons",
    "dollar icon",
    "euro icon",
    "pound icon",
    "yen icon",
    "rupee icon",
    "franc icon",
    "bitcoin icon",
    "wallet icon",
    "credit card icon",
    "payment icons",
    "book icon",
    "store icon",
    "shop icon",
    "flame icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Prices can carry their currency now. The dollar, the euro, the " +
        "pound, the yen, the rupee, the franc and bitcoin each have a " +
        "mark, and all but bitcoin come again inside a circle.",
    },
    {
      kind: "p",
      text:
        "The other sixteen new icons are a wallet, four symbols for a " +
        "payment card, a book and its family, a shopfront, a flame, a " +
        "processor and a graduation cap. That makes 29 in all, and 692 in " +
        "the set.",
    },

    { kind: "h2", text: "Seven currencies on one height", id: "money" },
    {
      kind: "p",
      text:
        "The marks share one height, the height of the capital letters in " +
        "`bold` and `italic`, so a euro next to a pound in a list of " +
        "prices lines up. Where to find each:",
    },
    {
      kind: "list",
      items: [
        "Prices: `dollar-sign`, `euro`, `pound-sterling`, `japanese-yen`, " +
          "`indian-rupee`, `swiss-franc` and `bitcoin`.",
        "A currency picker or a balance badge: the same marks in a circle, " +
          "`circle-dollar-sign` to `circle-swiss-franc`.",
        "Paying: `wallet`, `credit-card-plus` to add a card, " +
          "`credit-card-minus` or `credit-card-x` to remove one, and " +
          "`credit-card-check` for a payment that went through.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_MONEY_ICON_NAMES,
        caption: "Every mark plain and in a circle, except `bitcoin`.",
      },
    },

    {
      kind: "h2",
      text: "A circle leaves a letter less room than the rule asks",
      id: "circle",
    },
    {
      kind: "p",
      text:
        "Inside a ring, the currency marks break the set's spacing rule. " +
        "The set keeps 2 pixels between any two parts of a drawing, so the " +
        "eye can tell them apart. With 2 pixels on every side of a ring, a " +
        "letter gets about half the space there is. A half-size euro looks " +
        "like a mistake.",
    },
    {
      kind: "p",
      text:
        "The marks clear their ring by 1 pixel instead, and the exception " +
        "is a rule of its own. A ring isn't a second thing to tell apart " +
        "from the letter. It's the frame the letter sits in. The set's " +
        "other circled icons keep the full 2, because what they hold is a " +
        "slash, a chevron or three dots, with no holes inside to keep " +
        "open.",
    },
    {
      kind: "note",
      text:
        "A bitcoin with a cramped B in a ring is worse than no circled " +
        "bitcoin, so there isn't one.",
    },
    {
      kind: "p",
      text:
        "Bitcoin's four short strokes stand out above and below the " +
        "letter, right where a ring has the least room. Every way of " +
        "fitting them shrinks the B until the holes in it are 1 pixel " +
        "wide.",
    },

    { kind: "h2", text: "Each object is one detail", id: "objects" },
    {
      kind: "p",
      text:
        "At 24 pixels an object is recognised by one detail, and drawing " +
        "that detail wrong turns it into something else.",
    },
    {
      kind: "p",
      text:
        "A closed book seen from the front has three corners and a roll, " +
        "because the cover wraps round the spine. Drawn with a fourth " +
        "corner it reads as a card with a line on it. A shop is its " +
        "awning, and the awning is a wave with three short ribs standing " +
        "on its low points: without the ribs the wave reads as lace. A " +
        "flame's inner tongue is an arch, not a point, because at 16 " +
        "pixels a point closes up and leaves a comma.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_OBJECT_ICON_NAMES,
        caption:
          "The book and four of its family, then the shop, the skyline, " +
          "the flame, the graduation cap and the processor.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

const BATCH_0_8_0: BlogPost = {
  /* Office and art lead: they are the words people typed most. The empty
     searches are the story, so they are the first heading, not the title. */
  slug: "the-search-box-chose-this-one",
  version: "0.8.0",
  title: "33 free office and art supply icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons, each drawn for a search that came back " +
    "empty: a printer, a keyboard, a calculator, a paintbrush, a palette, " +
    "beds and keys.",
  standfirst:
    "Two marks, Mars and Venus, opened a category of their own: Gender.",
  date: "2026-09-11",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V080_THUMBNAIL_ICON_NAMES,
  keywords: [
    "office icons",
    "office supply icons",
    "art supply icons",
    "printer icon",
    "keyboard icon",
    "calculator icon",
    "usb icon",
    "eraser icon",
    "paintbrush icon",
    "palette icon",
    "easel icon",
    "coffee icon",
    "bed icon",
    "sofa icon",
    "door icon",
    "open door icon",
    "key icon",
    "phone icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Most of this release was asked for before it was drawn. The site " +
        "records every search that comes back empty, with the word typed, " +
        "and a month of those words is a list of what people wanted and " +
        "couldn't find.",
    },
    {
      kind: "p",
      text:
        "Thirty-three icons are new, which brings the set to 798, and " +
        "twelve were redrawn: the phone turned over, and the calendar is a " +
        "pixel taller.",
    },

    {
      kind: "h2",
      text: "Six in ten empty searches were the wrong word",
      id: "words",
    },
    {
      kind: "p",
      text:
        "Six in ten of the month's 744 empty searches asked for a drawing " +
        "the set already had, under a name nobody guesses: money for the " +
        "wallet, reload for refresh, school for the graduation cap. Those " +
        "got search words, not new drawings. The 744 came to 451 different " +
        "words.",
    },
    {
      kind: "p",
      text:
        "The rest asked for things the set didn't have, and each of these " +
        "finds its icon now:",
    },
    {
      kind: "list",
      items: [
        "Office: `printer`, `keyboard`, `calculator`, `usb`, `usb-drive`, " +
          "`eraser` and `tape`.",
        "Files: `file-code`, `file-zip` and `folder-search`.",
        "Art: `paintbrush`, `paint-roller`, `palette` and `easel`. Colour " +
          "and theme find the palette too.",
        "Food and drink: `coffee`, `cake`, `soup` and `bottle`.",
        "Home: `bed`, `bed-single`, `bed-double`, `sofa`, `door` and " +
          "`door-open`.",
        "Keys: `key`, `key-round` and `key-square`, three keys with " +
          "different heads.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_DESK_ICON_NAMES,
        caption: "Twenty of the 33.",
      },
    },
    {
      kind: "p",
      text:
        "The printer, the keyboard and the calculator were the objects " +
        "asked for most, and they share a problem: a panel full of small " +
        "parts. Keys and buttons turn into texture at 16 pixels, so each " +
        "is drawn with as few as it can lose and still be itself.",
    },

    { kind: "h2", text: "An open door is drawn in perspective", id: "doors" },
    {
      kind: "p",
      text:
        "The open door is drawn in perspective, its near edge 19 pixels " +
        "tall and the edge on the hinge 16. `door-open` keeps the frame of " +
        "`door` exactly, and only the door itself changes.",
    },
    {
      kind: "p",
      text:
        "Drawn flat, the two icons read as one picture with a line moved. " +
        "In perspective, the second reads as open even at 16 pixels.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_DOOR_ICON_NAMES,
        caption: "One frame, two doors.",
      },
    },

    {
      kind: "h2",
      text: "The phone turned over, and its slash with it",
      id: "phone",
    },
    {
      kind: "p",
      text:
        "`phone` is now its own mirror image, line for line, because the " +
        "handset had its earpiece at the bottom left and the phones people " +
        "know hold it at the top left. If your app shows `phone`, it faces " +
        "the other way from this release on.",
    },
    {
      kind: "p",
      text:
        "That broke `phone-off`. The set's slash runs from top left to " +
        "bottom right, to cut across what it cancels, and the turned " +
        "handset lies along that line. So on the phone, the slash runs the " +
        "other way.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The phone as it shipped, laid over the phone now",
            a: { name: "phone", take: "before" },
            b: { name: "phone", take: "after" },
            verdict: {
              text: "The same drawing, lying the other way",
              tone: "good",
            },
          },
        ],
        caption:
          "Mirror images share lines only where they cross, which is why " +
          "this is an X. Nothing was nudged to line up.",
        legend: {
          a: "only the old phone",
          b: "only the new one",
          both: "both, where they cross",
        },
      },
    },
    {
      kind: "p",
      text:
        "The calendar grew a pixel at the top, so its two rings cross the " +
        "top edge evenly, and the ten calendar icons with a symbol on them " +
        "follow it.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V090_SUBJECT_ICON_NAMES = [
  "flask-conical",
  "flask-round",
  "test-tube",
  "test-tubes",
  "flask-conical-off",
  "leaf",
  "tree-palm",
  "wind-turbine",
  "droplet",
  "droplets",
  "brain",
  "lungs",
  "ear",
  "ear-waveform",
  "thermometer",
  "temperature-empty",
  "temperature-half",
  "temperature-full",
  "thermometer-sun",
  "thermometer-snowflake",
] as const

const BATCH_0_9_0: BlogPost = {
  /* Science and nature lead: 2.2.0 owns transport, and two posts after one
     search split it. The truck is the story, so it is a heading. */
  slug: "transport-nature-ai-science-health-icons",
  version: "0.9.0",
  title: "53 free science and nature icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: flasks and test tubes, leaves and " +
    "water, birds, a bot, lungs and thermometers, and the first planes, " +
    "ship and train.",
  standfirst:
    "Planes take off and land from this release on, beside a ship, a train " +
    "and a bike.",
  date: "2026-09-13",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V090_THUMBNAIL_ICON_NAMES,
  keywords: [
    "science icons",
    "lab icons",
    "flask icon",
    "test tube icon",
    "nature icons",
    "leaf icon",
    "water drop icon",
    "wind turbine icon",
    "health icons",
    "lungs icon",
    "brain icon",
    "ear icon",
    "thermometer icon",
    "temperature icons",
    "truck icons",
    "delivery truck icon",
    "plane icon",
    "bot icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Science, nature and health open as categories here, with a flask, " +
        "a leaf, the lungs and a thermometer among their first drawings. A " +
        "lab booking page, a garden app and a clinic's patient record can " +
        "take what they need from one set.",
    },
    {
      kind: "p",
      text:
        "Transport, Animals and AI open at the same time, six categories " +
        "in one release of 53 icons. The truck also learned to carry a " +
        "symbol, and one shipped name was turned round.",
    },

    { kind: "h2", text: "A lab, a garden and a clinic", id: "subjects" },
    {
      kind: "p",
      text: "Where to find each, with the words a search finds them by:",
    },
    {
      kind: "list",
      items: [
        "Science: `flask-conical`, `flask-round`, `test-tube`, " +
          "`test-tube-diagonal` and a rack of them, `test-tubes`. " +
          "`flask-conical-off` for its off state.",
        "Nature: `leaf`, `tree-palm`, `wind-turbine` for clean energy, and " +
          "water as `droplet`, `droplets` and `droplet-off`.",
        "Health: `brain`, `lungs`, `ear` with `ear-listen` and " +
          "`ear-waveform` for hearing, and `thermometer`.",
        "Weather: the temperature at five levels, from `temperature-empty` " +
          "to `temperature-full`, and `thermometer-sun` and " +
          "`thermometer-snowflake` for hot and cold.",
        "Animals: `bird` and `pig`. `piggy-bank` is filed with the wallet " +
          "in Finance, because a money box isn't an animal.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_SUBJECT_ICON_NAMES,
        caption: "Twenty of the 53.",
      },
    },
    {
      kind: "p",
      text:
        "The brain is drawn from above, three folds to a side. With two to " +
        "a side it read as a butterfly.",
    },

    {
      kind: "h2",
      text: "The truck's symbol is one size smaller than every other",
      id: "truck",
    },
    {
      kind: "p",
      text:
        "The truck is the one icon that can't give its symbol the usual " +
        "corner. A file or a calendar opens its bottom right corner and " +
        "puts the plus or the check in the gap. The truck's bottom right " +
        "is a wheel, and its top right is the roof of the cab.",
    },
    {
      kind: "p",
      text:
        "Its symbol goes at the top left of the cargo box instead, in a " +
        "space 5 pixels wide, where every other icon in the set gives its " +
        "symbol 6. A slightly smaller check beats a check sitting on a " +
        "wheel.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`truck` laid over `truck-plus`",
            a: { name: "truck", take: "current" },
            b: { name: "truck-plus", take: "current" },
            verdict: {
              text: "The truck itself doesn't move",
              tone: "good",
            },
          },
        ],
        caption:
          "The only colour is the corner that opens and the plus inside " +
          "it. All nine trucks with a symbol cover exactly the box `truck` " +
          "covers, so swapping one for another in a list doesn't make it " +
          "jump.",
        legend: {
          a: "only the truck",
          b: "only the truck with a plus",
          both: "both",
        },
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_TRUCK_ICON_NAMES,
        caption:
          "The truck and its nine. The bolt on `truck-electric` is part of " +
          "the truck, so it's drawn at full size.",
      },
    },

    {
      kind: "h2",
      text: "A sliver of grey on the sharp truck, and a name turned round",
      id: "fixes",
    },
    {
      kind: "p",
      text:
        "In two-tone with sharp corners, the truck's grey fill showed past " +
        "its black outline beside the rear wheel, by a sixth of a pixel. " +
        "It had shipped that way since August, and every truck with a " +
        "symbol copied it. The grey now follows the wheel.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The sharp two-tone truck, before and after",
            a: { name: "truck", take: "before" },
            b: { name: "truck", take: "after" },
          },
          {
            title: "Beside the rear wheel",
            a: { name: "truck", take: "before" },
            b: { name: "truck", take: "after" },
            viewBox: "13.5 17.5 2 2",
            verdict: {
              text: "Grey past the outline",
              tone: "bad",
            },
          },
        ],
        caption:
          "The colour is grey the old truck showed past its outline. None " +
          "of the second colour appears, because the fix only took grey " +
          "away.",
        legend: {
          a: "only the old truck",
          b: "only the new one",
          both: "both",
        },
      },
    },
    {
      kind: "p",
      text:
        "`heart-hand` is `hand-heart` now. The drawing is a heart held in " +
        "an open hand, so the hand is the subject and the heart says which " +
        "kind, the order every other name in the set follows. In React, " +
        "`HeartHand` became `HandHeart`. Searching the site for heart-hand " +
        "still finds it.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

/* 1.0.0: the drawings every figure in the post names, each list resolved
   against icons/ by pipeline/check-demos.mjs. */

/** The opening figure: eight of the new drawings, one from each big family. */
export const BLOG_V100_HERO_ICON_NAMES = [
  "boy",
  "phone-call",
  "arrow-big-up",
  "banknote",
  "alarm-clock",
  "rocket",
  "brain-cog",
  "sticky-note-check",
] as const

/** The pairs whose mismatch in the old duotone gave the split away. */
export const BLOG_V100_ACCIDENT_ICON_NAMES = [
  "circle",
  "circle-x",
  "badge",
  "badge-check",
  "shield-plus",
  "square-plus",
] as const

/** Details and surfaces: the rules beyond one-drawing-per-rule. */
export const BLOG_V100_DETAIL_ICON_NAMES = [
  "download",
  "lock",
  "bed",
  "tape",
] as const

export const BLOG_V100_THUMBNAIL_ICON_NAMES = [
  "boy",
  "phone-call",
  "rocket",
  "banknote",
  "alarm-clock",
  "brain-cog",
  "girl",
  "panel-left-close",
  "arrow-big-up",
  "heading-1",
  "tablet",
  "laptop",
  "watch",
  "mouse",
  "cctv",
  "shredder",
  "wallet-cards",
  "timer",
  "car",
  "rocket-fast",
  "hand-closed",
  "hand-open",
  "toggles",
  "gauge",
  "milestone",
  "shirt",
  "paper-bag",
  "sticky-notes",
  "swatch-book",
  "earth",
  "recycle",
  "bot-off",
  "clouds",
  "cloud-sun",
  "snowflake",
  "siren",
  "shield-key",
  "accessibility",
  "fingerprint-pattern",
  "radio",
] as const


export const BLOG_V110_THUMBNAIL_ICON_NAMES = [
  "brain-sparkles",
  "search-sparkles",
  "message-sparkles",
  "chart-line-sparkles",
  "folder-sparkles",
  "cloud-sparkles",
  "command",
  "infinity",
  "bell-sparkles",
  "camera-sparkles",
  "calendar-sparkles",
  "clock-sparkles",
  "cpu-sparkles",
  "credit-card-sparkles",
  "cursor-sparkles",
  "dollar-sign-sparkles",
  "eraser-sparkles",
  "eye-sparkles",
  "file-sparkles",
  "gift-sparkles",
  "heart-sparkles",
  "image-sparkles",
  "inbox-sparkles",
  "mail-sparkles",
  "mic-sparkles",
  "monitor-sparkles",
  "palette-sparkles",
  "pen-sparkles",
  "phone-sparkles",
  "shield-sparkles",
  "terminal-sparkles",
  "truck-sparkles",
  "user-sparkles",
  "wallet-sparkles",
  "zap-sparkles",
  "bot-circle",
  "escape",
  "option",
  "radical",
  "parentheses",
  "equal-approximately",
  "wand",
] as const

export const BLOG_V110_HERO_ICON_NAMES = [
  "brain-sparkles",
  "search-sparkles",
  "message-sparkles",
  "chart-line-sparkles",
  "folder-sparkles",
  "cloud-sparkles",
  "command",
  "infinity",
] as const

export const BLOG_V110_MATH_ICON_NAMES = [
  "asterisk",
  "divide",
  "equal",
  "equal-not",
  "equal-approximately",
  "equal-approximately-not",
  "hash",
  "infinity",
  "parentheses",
  "radical",
  "variable",
  "x-line-top",
  "circle-asterisk",
  "circle-divide",
  "circle-equal",
  "circle-radical",
  "square-asterisk",
  "square-divide",
  "square-equal",
  "square-radical",
] as const

export const BLOG_V110_SPARKLE_ICON_NAMES = [
  "search-sparkles",
  "message-sparkles",
  "mail-sparkles",
  "file-sparkles",
  "folder-sparkles",
  "chart-line-sparkles",
  "chart-bar-sparkles",
  "image-sparkles",
  "mic-sparkles",
  "camera-sparkles",
  "calendar-sparkles",
  "clock-sparkles",
  "bell-sparkles",
  "inbox-sparkles",
  "user-sparkles",
  "brain-sparkles",
  "bot-circle",
  "cpu-sparkles",
  "terminal-sparkles",
  "cursor-sparkles",
  "wallet-sparkles",
  "credit-card-sparkles",
  "shield-sparkles",
  "palette-sparkles",
  "eraser-sparkles",
] as const

const RELEASE_1_1_0: BlogPost = {
  /* AI icons lead: 76 of the 114 carry a sparkle, and "react native icons"
     is the other search this post answers, so it rides in the title's
     tail. */
  slug: "free-ai-icons-math-symbols-mac-keys",
  version: "1.1.0",
  title: "114 free AI and sparkle icons for React, React Native and Figma",
  description:
    "Free, MIT-licensed SVG icons: 76 sparkle icons for AI features, " +
    "twenty maths signs and the Mac keys, and the set now installs in " +
    "React Native and Expo.",
  standfirst:
    "Six corner arrows turn for a reply, a forward, a redirect or a branch " +
    "in a flow.",
  date: "2026-09-23",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V110_THUMBNAIL_ICON_NAMES,
  keywords: [
    "ai icons",
    "sparkle icons",
    "sparkles icon",
    "ai search icon",
    "magic icon",
    "react native icons",
    "expo icons",
    "math icons",
    "math symbol icons",
    "divide icon",
    "equal icon",
    "command key icon",
    "option key icon",
    "mac keyboard icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "AI features get one mark across the whole set: the same two " +
        "stars, at one size, on 76 different objects. That is what lets AI " +
        "search, an inbox summary and a chart that explains itself read as " +
        "one feature in an app.",
    },
    {
      kind: "p",
      text:
        "React Native gets the whole set in this release, under the same " +
        "names as React. Twenty maths signs and four Mac keys are among " +
        "the other new icons, and the set now stands at 1,114: 8,912 SVGs.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V110_HERO_ICON_NAMES,
        caption:
          "Six objects carrying the pair of stars, then the command key " +
          "and the infinity sign.",
      },
    },

    { kind: "h2", text: "Every sparkle is the same pair", id: "sparkles" },
    {
      kind: "p",
      text:
        "The sparkle icons live in one AI category now, where they used to " +
        "sit beside their plain twins: `mail-sparkles` under Mail, " +
        "`folder-sparkles` under Files. Searching for any object still " +
        "finds its sparkle version. A few to start with:",
    },
    {
      kind: "list",
      items: [
        "AI search: `search-sparkles`.",
        "A summary or a drafted reply: `message-sparkles` and `mail-sparkles`.",
        "Insights on a report: `chart-line-sparkles` and `chart-bar-sparkles`.",
        "Smart files and folders: `file-sparkles` and `folder-sparkles`.",
        "An assistant: `bot-circle` and `brain-sparkles`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_SPARKLE_ICON_NAMES,
        caption: "Twenty-five of the 76.",
      },
    },
    {
      kind: "p",
      text:
        "Every one carries the same two stars, the larger 8 pixels across " +
        "and the smaller 5, in the same place beside the object. Smaller " +
        "stars were tried, and at 16 pixels they stopped looking like " +
        "stars and looked like a speck of dirt.",
    },
    {
      kind: "note",
      text:
        "A star never cuts into the drawing it marks. Where the pair " +
        "couldn't fit without breaking an outline, the icon wasn't made.",
    },
    {
      kind: "p",
      text:
        "`pen-sparkles` had shipped with two plus signs where the stars " +
        "go. The pen didn't move. The plus signs became stars, and the " +
        "star is the bigger of the two, which is the point.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The whole pen, old marks laid over new",
            a: { name: "pen-sparkles", take: "before" },
            b: { name: "pen-sparkles", take: "after" },
            verdict: {
              text: "The same pen in both",
              tone: "good",
            },
          },
          {
            title: "The top left corner",
            a: { name: "pen-sparkles", take: "before" },
            b: { name: "pen-sparkles", take: "after" },
            viewBox: "0 0 10 10",
            verdict: {
              text: "A plus 6 pixels wide, a star of 8",
              tone: "bad",
            },
          },
        ],
        caption:
          "The first colour is the plus sign as it shipped, the second the " +
          "star that replaced it, and the dark is the pen, identical in " +
          "both.",
        legend: {
          a: "the plus signs as they shipped",
          b: "the stars as they are now",
          both: "lines that did not move",
        },
      },
    },

    {
      kind: "h2",
      text: "Maths signs, and Mac keys that stay outlines",
      id: "math",
    },
    {
      kind: "p",
      text:
        "The maths signs are for a calculator or a formula editor: " +
        "`divide`, `equal`, `equal-not`, `equal-approximately`, " +
        "`asterisk`, `hash`, `infinity`, `parentheses`, `radical` and " +
        "`variable`. Four of them also come in a circle and in a square, " +
        "for a button that wants a frame.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_MATH_ICON_NAMES,
        caption:
          "The plain signs first, the eight in a circle or a square last.",
      },
    },
    {
      kind: "p",
      text:
        "The four keys, `command`, `option`, `escape` and `space`, are " +
        "drawn as a Mac prints them, for shortcut hints. They stay " +
        "outlines in every style, because a solid keycap symbol reads as a " +
        "blob.",
    },

    { kind: "h2", text: "The same names in React Native", id: "native" },
    {
      kind: "p",
      text:
        "The whole set installs in React Native and Expo as " +
        "`@keyline-icons/react-native`, with the same names as the React " +
        "package. `Check` is `Check`, so code shared between web and phone " +
        "changes only the package name.",
    },
    {
      kind: "code",
      code:
        `import { Check } from "@keyline-icons/react-native"\n` +
        `import { Bell } from "@keyline-icons/react-native/duotone"\n` +
        `\n` +
        `<Check size={16} color="#2563eb" />`,
    },
    {
      kind: "p",
      text:
        "The one difference is colour. On the web an icon takes the colour " +
        "of the text around it, and a phone screen has no text colour to " +
        "inherit, so each icon takes a `color` prop. The grey in two-tone " +
        "and duotone follows it, so one prop still sets both tones.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V100_NEW_ICON_NAMES = [
  "panel-left-open",
  "panel-left-close",
  "panel-bottom-open",
  "panel-bottom-close",
  "table",
  "phone-call",
  "phone-incoming",
  "phone-outgoing",
  "phone-missed",
  "phone-forwarded",
  "boy",
  "girl",
  "baby-boy",
  "baby-girl",
  "heading-1",
] as const

const RELEASE_1_0_0: BlogPost = {
  /* The four styles are what 1.0 is, and "duotone icons" is a search
     people make; the count leads, as every headline of this set does, and
     the corners and the 8,000 go in the description. */
  slug: "1000-free-shadcn-ui-icons-in-four-styles",
  version: "1.0.0",
  title: "1,000 free shadcn/ui icons in stroke, two-tone, duotone and fill",
  description:
    "1,000 free, MIT-licensed SVG icons for React, shadcn/ui and Figma, " +
    "each in four styles with rounded or sharp corners: 8,000 in all. " +
    "Version 1.0, out of beta.",
  standfirst:
    "The first release went out on 20 August with 503 icons. A month and " +
    "fourteen releases later, this one is 1.0.",
  date: "2026-09-18",
  updated: "2026-11-02",
  readingMinutes: 5,
  thumbnail: BLOG_V100_THUMBNAIL_ICON_NAMES,
  keywords: [
    "free icons",
    "duotone icons",
    "two-tone icons",
    "fill icons",
    "outline icons",
    "sharp icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
    "sidebar icons",
    "panel icons",
    "phone call icons",
    "people icons",
    "coins icon",
  ],
  body: [
    {
      kind: "p",
      text:
        "The set reaches 1,000 icons with 1.0, and every one now comes in " +
        "all four styles: stroke, two-tone, duotone and fill. A sidebar " +
        "can mark the page you're on with a filled icon and leave the rest " +
        "as outlines, and the two always match.",
    },
    {
      kind: "p",
      text:
        "With rounded or sharp corners on each, that is 8,000 SVGs. Of the " +
        "thousand, 149 are new in this release and 59 older ones were " +
        "redrawn.",
    },
    {
      kind: "p",
      text:
        "The four styles differ in where the black goes. Stroke is the " +
        "outline and fill is solid. Two-tone is the outline with light " +
        "grey inside, and duotone drops the outline: a grey shape with the " +
        "part that matters in black.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_HERO_ICON_NAMES,
        caption:
          "Stroke at the top, then two-tone, duotone and fill. The boy is " +
          "one of the set's first four people.",
      },
    },

    { kind: "h2", text: "Two-tone was an accident", id: "two-tone" },
    {
      kind: "p",
      text:
        "Two styles had shared the name duotone since the first release. " +
        "In the design file, `circle` had an outline in duotone, and " +
        "`circle-x`, right beside it, didn't. A check of all 765 duotone " +
        "icons found 633 with a grey-filled outline and 132 with no " +
        "outline at all, every one of them drawn inside a square, a circle " +
        "or a badge.",
    },
    {
      kind: "p",
      text:
        "Both looks were good, so both stayed and each got its own name. " +
        "The outlined one is two-tone now, unchanged but for the name. " +
        "Duotone is the one without an outline, and it went from 132 icons " +
        "to all 1,000.",
    },
    {
      kind: "p",
      text:
        "If you import duotone icons in React and want the look you had, " +
        "change `@keyline-icons/react/duotone` to " +
        "`@keyline-icons/react/two-tone`.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_ACCIDENT_ICON_NAMES,
        caption:
          "The icons that gave it away. Two-tone, the second row, outlines " +
          "them all. Duotone, the third, drops the outline wherever " +
          "there's a symbol to carry the black.",
      },
    },

    { kind: "h2", text: "What goes black in a duotone", id: "duotone" },
    {
      kind: "list",
      items: [
        "A small symbol is black, and what it sits on is grey: the check " +
          "on `file-check`.",
        "With a slash through it, like `bell-off`, only the slash is black.",
        "Backgrounds stay grey. A chart's axes are grey and its bars " +
          "black, a slider's track grey and its knob black.",
        "On a tool, the working end is black: the head of `hammer`.",
        "Small details on a black shape show through in grey: the keyhole " +
          "on `lock`, the pillows on `bed`.",
      ],
    },
    {
      kind: "note",
      text:
        "Every duotone has something black in it. An all-grey icon looks " +
        "disabled, so a plain heart, star or circle keeps a black outline.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_DETAIL_ICON_NAMES,
        caption:
          "One icon for each rule. Compare the two-tone row with the " +
          "duotone row under it.",
      },
    },

    { kind: "h2", text: "Every icon comes in every style", id: "every-style" },
    {
      kind: "p",
      text:
        "Before 1.0, an icon came in a style only if the style added " +
        "something, and that left holes. An exclamation mark has nothing " +
        "inside to fill, so `alert` had no fill, and an app that switched " +
        "to fill icons had a gap where the alert should be.",
    },
    {
      kind: "p",
      text:
        "Now every icon comes in every style. Where a style has nothing to " +
        "add, it uses the same drawing: the fill of `x` is its outline, " +
        "because a cross has no inside.",
    },

    {
      kind: "h2",
      text: "The set's first people, and a sidebar on every side",
      id: "new",
    },
    {
      kind: "p",
      text: "Among the 149 new icons:",
    },
    {
      kind: "list",
      items: [
        "A sidebar that collapses: `panel-left-open` and " +
          "`panel-left-close`, and the same on every side, solid or dashed.",
        "Calls: `phone-call`, `phone-incoming`, `phone-outgoing`, " +
          "`phone-missed` and `phone-forwarded`.",
        "People, in a category of their own: `boy`, `girl`, `baby-boy` and " +
          "`baby-girl`.",
        "Headings for an editor: `heading-1` to `heading-6`, and " +
          "`case-sensitive`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V100_NEW_ICON_NAMES,
        caption: "Fifteen of the 149.",
      },
    },

    { kind: "h2", text: "Coins that looked too heavy", id: "coins" },
    {
      kind: "p",
      text:
        "`coins` used the same line as every other icon and still looked " +
        "heavier. Each coin was squashed flat, so the hole inside it was " +
        "tiny, and the coins sat so close there was hardly any white " +
        "between them. At small sizes a thin gap fills in, and the lines " +
        "either side read as one thick line. The coins are taller now and " +
        "further apart.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`coins`, old laid over new",
            a: { name: "coins", take: "before" },
            b: { name: "coins", take: "after" },
            verdict: {
              text: "Even gaps now",
              tone: "good",
            },
          },
        ],
        caption:
          "Where the colours split, the coins moved: the new ones are " +
          "taller and further apart.",
        legend: {
          a: "only the old coins",
          b: "only the new ones",
          both: "both",
        },
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V120_THUMBNAIL_ICON_NAMES = [
  "table-rows-add-below",
  "database-plus",
  "bell-zap",
  "table-cells-merge",
  "hourglass-half",
  "cloud-terminal",
  "table-columns-add-after",
  "server-zap",
  "circle-progress-pause",
  "table-rows-merge-next",
  "database-arrow-down",
  "mail-zap",
  "gauge-high",
  "table-pivot",
  "heart-plus",
  "calendar-zap",
  "table-columns-remove-before",
  "database-check",
  "shopping-cart-plus",
  "table-tree",
  "folder-zap",
  "hourglass-start",
  "table-cells-split",
  "server-plus",
  "link-plus",
  "table-rows-remove-above",
  "user-zap",
  "gauge-low",
  "table-columns-merge-previous",
  "database-x",
  "grid-2x2-plus",
  "package-zap",
  "table-off",
  "circle-progress-stop",
  "wifi-plus",
  "clock-zap",
  "table-cells-rows",
  "terminal-plus",
  "smartphone-zap",
  "loader-circle",
] as const

export const BLOG_V120_HERO_ICON_NAMES = [
  "table-rows-add-below",
  "table-cells-merge",
  "database-plus",
  "server-zap",
  "bell-zap",
  "hourglass-half",
  "gauge-high",
  "cloud-terminal",
] as const

export const BLOG_V120_TABLE_ICON_NAMES = [
  "table-rows-add-above",
  "table-rows-add-below",
  "table-rows-remove-above",
  "table-rows-remove-below",
  "table-rows-merge-previous",
  "table-rows-merge-next",
  "table-columns-add-before",
  "table-columns-add-after",
  "table-columns-remove-before",
  "table-columns-remove-after",
  "table-columns-merge-previous",
  "table-columns-merge-next",
  "table-cells-merge",
  "table-cells-split",
  "table-rows",
  "table-cells-rows",
  "table-tree",
  "table-pivot",
  "table-off",
] as const

export const BLOG_V120_BOLT_ICON_NAMES = [
  "bell-zap",
  "calendar-zap",
  "clock-zap",
  "file-zap",
  "folder-zap",
  "home-zap",
  "mail-zap",
  "package-zap",
  "smartphone-zap",
  "tablet-zap",
  "user-zap",
  "server-zap",
  "database-zap",
] as const

export const BLOG_V120_DATA_ICON_NAMES = [
  "database-plus",
  "database-minus",
  "database-check",
  "database-x",
  "database-arrow-down",
  "database-arrow-up",
  "database-arrow-left",
  "database-arrow-right",
  "server-plus",
  "server-minus",
  "database-sparkles",
  "cloud-terminal",
  "circle-progress-pause",
  "circle-progress-stop",
  "loader-circle",
  "hourglass-start",
  "hourglass-half",
  "hourglass-end",
  "gauge-low",
  "gauge-high",
] as const

export const BLOG_V120_REDRAWN_ICON_NAMES = [
  "table",
  "panel-left",
  "panel-top-open",
  "panels-top-left",
  "panel-right-dashed",
  "panel-bottom-close-dashed",
] as const

const RELEASE_1_2_0: BlogPost = {
  /* Tables and databases lead: a spreadsheet toolbar and a data app are
     the searches this post can win. The bolt and the panels are in the
     description. */
  slug: "table-database-and-quick-action-icons",
  version: "1.2.0",
  title: "64 free table and database icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: rows and columns added, merged and " +
    "split, database and server signs, a lightning bolt family and more " +
    "progress states.",
  standfirst:
    "Twelve more icons take a plus, from the heart and the cart to wifi " +
    "and the link.",
  date: "2026-09-24",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V120_THUMBNAIL_ICON_NAMES,
  keywords: [
    "table icons",
    "spreadsheet icons",
    "add row icon",
    "merge cells icon",
    "database icons",
    "server icons",
    "import icon",
    "export icon",
    "lightning bolt icons",
    "automation icon",
    "progress icons",
    "loading icon",
    "hourglass icon",
    "gauge icon",
    "panel icons",
    "sidebar icons",
    "vue icons",
    "svelte icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Spreadsheet toolbars can take every button from this set, " +
        "nineteen of them, from adding a row to splitting a cell. Each is " +
        "drawn on the set's own `table`, and before them the set had the " +
        "table and nothing to do to it.",
    },
    {
      kind: "p",
      text:
        "Thirteen more carry a lightning bolt, and the database and the " +
        "server get the symbols a data app needs: 64 new icons in all. The " +
        "table and all twenty-seven panels were redrawn in their filled " +
        "styles.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V120_HERO_ICON_NAMES,
        caption: "From the table to the cloud shell, one row per style.",
      },
    },

    { kind: "h2", text: "Nineteen tables, all one table", id: "tables" },
    {
      kind: "p",
      text: "The nineteen, by what they act on:",
    },
    {
      kind: "list",
      items: [
        "Rows: `table-rows-add-above` and `table-rows-add-below`, " +
          "`table-rows-remove-above` and `table-rows-remove-below`, and " +
          "`table-rows-merge-previous` and `table-rows-merge-next`.",
        "Columns: the same six, from `table-columns-add-before` to " +
          "`table-columns-merge-next`.",
        "Cells: `table-cells-merge` and `table-cells-split`.",
        "Kinds of table: `table-rows`, `table-cells-rows`, `table-tree` " +
          "for nested rows, `table-pivot` and `table-off`.",
      ],
    },
    {
      kind: "p",
      text:
        "Each one is drawn on the `table` the set already had, at its " +
        "size. The plus or the x sits on the edge it acts on, along the " +
        "top for a row added above, down the left for a column added " +
        "before, and a merge is an arrow crossing the line it takes away.",
    },
    {
      kind: "note",
      text:
        "A row of these reads as one table being edited, because it is one " +
        "table in every icon.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_TABLE_ICON_NAMES,
        caption:
          "Rows first, then columns, then cells, then the kinds of table.",
      },
    },

    {
      kind: "h2",
      text: "A bolt for anything that happens at once",
      id: "bolt",
    },
    {
      kind: "p",
      text:
        "Thirteen icons carry a lightning bolt, from the bell to the " +
        "database, for an automation, a trigger, express delivery or a " +
        "fast cache. Each bolt takes the spot the plus sign already has on " +
        "that icon, so the plus, minus and bolt versions line up in a " +
        "list.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_BOLT_ICON_NAMES,
        caption: "All thirteen.",
      },
    },

    { kind: "h2", text: "A data app, from import to loading", id: "data" },
    {
      kind: "list",
      items: [
        "Import and export: `database-arrow-down` and `database-arrow-up`, " +
          "with left and right for a sync.",
        "A record added, removed, saved or failed: `database-plus`, " +
          "`database-minus`, `database-check` and `database-x`.",
        "Servers: `server-plus` and `server-minus`, and `cloud-terminal` " +
          "for a shell that runs somewhere else.",
        "A job paused or stopped: `circle-progress-pause` and " +
          "`circle-progress-stop`, and `loader-circle` while it runs.",
        "Time left: `hourglass-start`, `hourglass-half` and " +
          "`hourglass-end`. Load: `gauge-low` and `gauge-high`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_DATA_ICON_NAMES,
        caption: "All twenty are new.",
      },
    },

    {
      kind: "h2",
      text: "A filled left panel no longer looks like a right one",
      id: "panels",
    },
    {
      kind: "p",
      text:
        "A filled panel now fills only the side it docks to, and the table " +
        "fills only its header row. The fill of `panel-left` used to be a " +
        "black square with one white line down it, and `panel-right` the " +
        "same square with the line moved over. At 16 pixels you had to " +
        "look twice.",
    },
    {
      kind: "note",
      text:
        "The docked side is the solid side, so a left panel and a right " +
        "panel can't be mistaken for each other.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V120_REDRAWN_ICON_NAMES,
        caption:
          "Six of the twenty-eight in every style. The stroke row is " +
          "exactly as it was.",
      },
    },
    {
      kind: "p",
      text:
        "The set also reaches Vue, Svelte and Solid now, through " +
        "unplugin-icons, which turns each icon you import into a component " +
        "for your framework when the app builds. Only the icons you use " +
        "end up in the bundle.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V130_THUMBNAIL_ICON_NAMES = [
  "soccer-ball",
  "star-shooting",
  "chart-stock-up",
  "anchor",
  "gamepad",
  "lifebuoy",
  "basketball",
  "tennis-ball",
  "baseball",
  "american-football",
  "cricket-bat",
  "hockey-sticks",
  "golf-hole",
  "chart-stock-down",
  "atom",
  "alien",
  "paw-print",
  "hearts",
  "tree-deciduous",
  "anchor-2",
  "pin",
  "pin-off",
  "bin-2",
  "shield-terminal",
  "file-terminal",
  "app-window-terminal",
  "truck-fast",
  "send-fast",
  "bike-fast",
  "timer-fast",
  "rocket-fast",
  "captions-off",
  "subtitles-off",
  "play-off",
  "square-play-off",
  "circle-play-off",
  "square-arrow-in-down-left",
  "square-arrow-in-down-right",
  "square-arrow-in-up-left",
  "square-arrow-in-up-right",
] as const

export const BLOG_V130_HERO_ICON_NAMES = [
  "soccer-ball",
  "chart-stock-up",
  "gamepad",
  "anchor",
  "lifebuoy",
  "pin",
  "star-shooting",
  "truck-fast",
] as const

export const BLOG_V130_SPORT_ICON_NAMES = [
  "soccer-ball",
  "basketball",
  "baseball",
  "tennis-ball",
  "american-football",
  "cricket-bat",
  "hockey-sticks",
  "golf-hole",
] as const

export const BLOG_V130_FAST_ICON_NAMES = [
  "truck",
  "truck-fast",
  "bike",
  "bike-fast",
  "rocket-fast",
  "star",
  "star-shooting",
  "send",
  "send-fast",
  "timer-fast",
] as const

export const BLOG_V130_HELP_ICON_NAMES = [
  "lifebuoy",
  "pin",
  "pin-off",
  "anchor",
  "anchor-2",
  "shield-terminal",
  "file-terminal",
  "app-window-terminal",
  "captions-off",
  "square-arrow-in-down-right",
] as const

const RELEASE_1_3_0: BlogPost = {
  /* Sport leads, then stock charts: both are searches a sports app or a
     trading screen makes. Speed and the support buoy go in the
     description. */
  slug: "sport-stock-chart-and-speed-icons",
  version: "1.3.0",
  title: "39 free sports and stock chart icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: five balls, stock charts, a gamepad, " +
    "two anchors, a lifebuoy, push pins, a shooting star and a fast " +
    "delivery truck.",
  standfirst:
    "There are two anchors: one curls its ends in, the other hangs two " +
    "barbed hooks.",
  date: "2026-09-28",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V130_THUMBNAIL_ICON_NAMES,
  keywords: [
    "sports icons",
    "soccer ball icon",
    "basketball icon",
    "tennis icon",
    "baseball icon",
    "golf icon",
    "cricket icon",
    "hockey icon",
    "stock chart icon",
    "stock market icon",
    "gamepad icon",
    "shooting star icon",
    "fast delivery icon",
    "express delivery icon",
    "lifebuoy icon",
    "support icon",
    "help icon",
    "push pin icon",
    "anchor icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Sport gets a ball for every game: football, American football, " +
        "basketball, baseball and tennis, with a cricket bat, hockey " +
        "sticks and a golf hole. Markets get two stock charts, one going " +
        "up and one going down.",
    },
    {
      kind: "p",
      text:
        "Speed came in the same release: five things in a hurry have lines " +
        "streaming behind them, a shooting star among them. Seventeen " +
        "older drawings were redrawn alongside the 39 new ones.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V130_HERO_ICON_NAMES,
        caption:
          "A ball, a stock chart and a gamepad, then the anchor, the " +
          "lifebuoy, the pin and two things in a hurry.",
      },
    },

    { kind: "h2", text: "A ball for every game", id: "sport" },
    {
      kind: "list",
      items: [
        "Football and American football: `soccer-ball` and " +
          "`american-football`.",
        "Basketball, baseball and tennis: `basketball`, `baseball` and " +
          "`tennis-ball`.",
        "Cricket, hockey and golf: `cricket-bat`, `hockey-sticks` and " +
          "`golf-hole`.",
        "Markets: `chart-stock-up` and `chart-stock-down`.",
        "Games: `gamepad`.",
      ],
    },
    {
      kind: "p",
      text:
        "The four round balls are one circle, as wide as the icon allows, " +
        "so a row of sports lines up, and the seams inside are what tell " +
        "them apart. In duotone each keeps its ring black and its seams " +
        "grey, so the outline carries the ball.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V130_SPORT_ICON_NAMES,
        caption: "All eight for sport, in every style.",
      },
    },

    { kind: "h2", text: "Three lines behind make anything fast", id: "speed" },
    {
      kind: "p",
      text:
        "`star-shooting` is the set's star with three lines streaming " +
        "behind it. The middle line is the longest and runs straight back, " +
        "and the star is turned a little so that one of its points faces " +
        "down that line.",
    },
    {
      kind: "note",
      text:
        "The longest line points at the star's back, so the trail reads as " +
        "something the star left behind.",
    },
    {
      kind: "p",
      text:
        "The paper plane, the bike and the stopwatch take the same three " +
        "lines. The truck can't: it already fills the icon's width, and " +
        "lines behind it would shrink it until its wheels were dots. So " +
        "`truck-fast` gives up its back wall, and the roof runs on past it " +
        "as the top line. In fill the lines are cut out of the solid " +
        "shape.",
    },
    {
      kind: "p",
      text:
        "The rocket flew like this already, as `rocket-2`. A number said " +
        "nothing about it, so it is `rocket-fast` now. The old name still " +
        "finds it in search, and `Rocket2` still imports in React.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V130_FAST_ICON_NAMES,
        caption:
          "The truck, the bike, the star and the paper plane beside the " +
          "drawings they grew from, with `rocket-fast` and `timer-fast`.",
      },
    },

    { kind: "h2", text: "Support gets a lifebuoy", id: "support" },
    {
      kind: "p",
      text:
        "The set had nothing for support or help until `lifebuoy`, and " +
        "searching support, help or life ring finds it now. With it came a " +
        "few more that apps kept reaching for:",
    },
    {
      kind: "list",
      items: [
        "Pinned and unpinned: `pin` and `pin-off`. The pin leans on the " +
          "diagonal, so the slash cuts it cleanly in two.",
        "Code and security: `shield-terminal`, `file-terminal` and " +
          "`app-window-terminal`.",
        "Media switched off: `captions-off`, `subtitles-off` and " +
          "`play-off`, each the original with a slash across it.",
        "Importing into a window: `square-arrow-in-down-right`, turned to " +
          "come in from each corner.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V130_HELP_ICON_NAMES,
        caption: "Ten of them, with the two anchors.",
      },
    },

    {
      kind: "h2",
      text: "Two off icons that didn't match what they switch off",
      id: "off",
    },
    {
      kind: "p",
      text:
        "Held to that same rule, two older off icons failed. `power-off` " +
        "still had the narrower opening the power button had before it was " +
        "redrawn, so its ring ran on past where the button's stops. With " +
        "sharp corners, `volume-off` drew a speaker taller than the sharp " +
        "speaker it switches off. Both are now their original with the " +
        "slash across.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`power-off` as it shipped, under `power-off` now",
            a: { name: "power-off", take: "before" },
            b: { name: "power-off", take: "after" },
            verdict: {
              text: "The ring ran on",
              tone: "bad",
            },
          },
          {
            title: "`volume-off` with sharp corners",
            a: { name: "volume-off", take: "before" },
            b: { name: "volume-off", take: "after" },
            verdict: {
              text: "The speaker stood taller",
              tone: "bad",
            },
          },
        ],
        caption:
          "Each panel paints the icon as it shipped under the icon now, so " +
          "only the difference has colour.",
        legend: {
          a: "as it shipped",
          b: "as it is now",
          both: "lines the two share",
        },
      },
    },
    {
      kind: "p",
      text:
        "In duotone, the parcel and its ten symbols changed too: the lid " +
        "is now the dark part, with the tape crossing it in grey.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V140_THUMBNAIL_ICON_NAMES = [
  "money-bag-dollar-sign",
  "landmark",
  "gold-bars",
  "arrow-right-left",
  "stamp",
  "newspaper",
  "history",
  "money-bag",
  "money-bag-check",
  "money-bag-x",
  "money-bag-plus",
  "money-bag-minus",
  "arrow-up-down",
  "calendar-days",
  "copy-check",
  "globe-search",
  "banknote",
  "coins",
  "piggy-bank",
  "wallet",
  "credit-card",
  "dollar-sign",
  "euro",
  "pound-sterling",
  "badge-dollar-sign",
  "banknote-check",
  "credit-card-plus",
  "wallet-cards",
  "building",
  "buildings",
  "repeat",
  "rotate-ccw",
  "calendar",
  "copy",
  "globe",
  "file-text",
  "receipt",
  "chart-line-up",
  "bitcoin",
  "japanese-yen",
] as const

export const BLOG_V140_HERO_ICON_NAMES = [
  "money-bag-dollar-sign",
  "landmark",
  "gold-bars",
  "stamp",
  "newspaper",
  "history",
  "arrow-right-left",
  "globe-search",
] as const

export const BLOG_V140_SIGN_ICON_NAMES = [
  "credit-card-plus",
  "calendar-plus",
  "cloud-plus",
  "money-bag-plus",
] as const

export const BLOG_V140_BAG_ICON_NAMES = [
  "money-bag",
  "money-bag-dollar-sign",
  "money-bag-check",
  "money-bag-x",
  "money-bag-plus",
  "money-bag-minus",
] as const

export const BLOG_V140_BANK_ICON_NAMES = [
  "landmark",
  "money-bag",
  "money-bag-dollar-sign",
  "gold-bars",
  "arrow-right-left",
  "money-bag-check",
  "money-bag-x",
  "money-bag-plus",
  "money-bag-minus",
  "history",
  "calendar-days",
  "stamp",
  "newspaper",
  "copy-check",
  "globe-search",
  "wallet",
  "credit-card",
  "piggy-bank",
  "coins",
  "banknote",
] as const

const RELEASE_1_4_0: BlogPost = {
  /* Banking leads: every drawing here came off one banking app's menu, and
     that is the search a finance screen makes. */
  slug: "banking-money-and-transfer-icons",
  version: "1.4.0",
  title: "16 free banking and money icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons for a banking app: a money bag with five " +
    "signs, a bank, gold bars, a rubber stamp, a newspaper and arrows for " +
    "transfers.",
  standfirst:
    "The transfer arrows borrow their heads from the repeat icon, so the " +
    "two sit well side by side.",
  date: "2026-09-28",
  updated: "2026-11-02",
  readingMinutes: 3,
  thumbnail: BLOG_V140_THUMBNAIL_ICON_NAMES,
  keywords: [
    "banking icons",
    "bank icon",
    "finance icons",
    "money icons",
    "money bag icon",
    "savings icon",
    "gold bars icon",
    "transfer icon",
    "swap icon",
    "sort icon",
    "history icon",
    "transaction history icon",
    "rubber stamp icon",
    "approved icon",
    "newspaper icon",
    "calendar days icon",
    "copied icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "One banking app's menu is the whole brief here, and every icon on " +
        "it is in this set. Eleven were drawn for it, among them the bank, " +
        "the money bag, gold bars, the transfer arrows and a stamp for an " +
        "approved document.",
    },
    {
      kind: "p",
      text:
        "Five more versions of the money bag carry a dollar, a plus, a " +
        "minus, a check and an x. Sixteen icons are new, and the set is at " +
        "1,233.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V140_HERO_ICON_NAMES,
        caption:
          "Half the release, stroke to fill, led by the money bag and the " +
          "bank.",
      },
    },

    { kind: "h2", text: "A banking menu, icon by icon", id: "menu" },
    {
      kind: "list",
      items: [
        "The bank: `landmark`, which a search for bank or ATM finds, and " +
          "which serves a courthouse or a museum too.",
        "Savings and balances: `money-bag`, `money-bag-dollar-sign` and " +
          "`gold-bars`.",
        "Money in and out: `money-bag-plus` and `money-bag-minus`, and " +
          "`money-bag-check` and `money-bag-x` for a payment that went " +
          "through or failed.",
        "Transfers: `arrow-right-left`. Sorting a list of transactions: " +
          "`arrow-up-down`.",
        "History and statements: `history` and `calendar-days`. An " +
          "approved document: `stamp`. News: `newspaper`.",
        "Small helpers: `copy-check` for a copied account number, and " +
          "`globe-search` for a web search.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V140_BANK_ICON_NAMES,
        caption:
          "Fifteen of the new icons. The last row was already in the set.",
      },
    },

    {
      kind: "h2",
      text: "A money bag wears its symbol on the front",
      id: "bag",
    },
    {
      kind: "p",
      text:
        "All five of the bag's symbols sit on its front, because a money " +
        "bag has always worn its dollar there. Most icons here put a plus " +
        "or a check in the bottom right corner, with a piece of the " +
        "drawing cut away to make room, as on `credit-card-plus` and " +
        "`calendar-plus`. The bag keeps its symbol inside, the way " +
        "`cloud-plus` does.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V140_SIGN_ICON_NAMES,
        caption: "Two symbols in a corner, two in the middle.",
      },
    },
    {
      kind: "p",
      text:
        "To hold them, the bag is a little fuller than it would be on its " +
        "own, with the neck tied higher. In fill the bag is solid with the " +
        "symbol cut out of it, and the knot on top stays an outline.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V140_BAG_ICON_NAMES,
        caption: "The bag and its five, from outline to solid.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V150_THUMBNAIL_ICON_NAMES = [
  "bot-heart",
  "clipboard-check",
  "save",
  "shield-user",
  "square-arrow-out-up-right",
  "bot-star",
  "blocks",
  "flip-horizontal",
  "cloud-upload",
  "target",
  "tv",
  "container",
  "frame",
  "hexagons",
  "columns-3",
  "paste",
  "clipboard-code",
  "clipboard-terminal",
  "save-plus",
  "save-off",
  "shield-lock",
  "shield-alert",
  "shield-question",
  "shield-heart",
  "bot-square",
  "bot-droplet",
  "bot-message",
  "bot-cloud",
  "bot-circle",
  "blocks-2",
  "flip-vertical",
  "cloud-download",
  "star-off",
  "archive-x",
  "file-alert",
  "file-chart-column",
  "message-question",
  "arrow-left-right",
  "clipboard-list",
  "clipboard-x",
] as const

export const BLOG_V150_HERO_ICON_NAMES = [
  "bot-heart",
  "clipboard-check",
  "save-plus",
  "shield-user",
  "blocks",
  "flip-horizontal",
  "cloud-upload",
  "square-arrow-out-up-right",
] as const

/** The nineteen shadcn/create names the set had no drawing for, then the six drawn beside them. */
export const BLOG_V150_CREATE_ICON_NAMES = [
  "clipboard",
  "clipboard-paste",
  "save",
  "frame",
  "columns-3",
  "target",
  "star-off",
  "archive-x",
  "file-alert",
  "file-chart-column",
  "message-question",
  "tv",
  "container",
  "blocks",
  "flip-horizontal",
  "flip-vertical",
  "square-arrow-out-up-right",
  "cloud-upload",
  "arrow-left-right",
  "blocks-2",
  "hexagons",
  "cloud-download",
  "square-arrow-out-up-left",
  "square-arrow-out-down-right",
  "square-arrow-out-down-left",
] as const

export const BLOG_V150_SIGN_ICON_NAMES = [
  "clipboard",
  "clipboard-check",
  "clipboard-code",
  "clipboard-copy",
  "paste",
  "save",
  "save-plus",
  "save-off",
] as const

export const BLOG_V150_BOT_ICON_NAMES = [
  "bot-circle",
  "bot-square",
  "bot-heart",
  "bot-droplet",
  "bot-star",
  "bot-message",
  "bot-cloud",
] as const

export const BLOG_V150_SHIELD_ICON_NAMES = [
  "shield-check",
  "shield-alert",
  "shield-question",
  "shield-lock",
  "shield-user",
  "shield-heart",
  "shield-off",
] as const

const RELEASE_1_5_0: BlogPost = {
  /* Bots and shields lead because those are searches people make;
     shadcn/create is the story, so it is the first heading. */
  slug: "bot-clipboard-save-and-shield-icons",
  version: "1.5.0",
  title: "53 free bot and shield icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: chatbots in seven shapes, six security " +
    "shields, clipboards and floppy disks with their signs, and the " +
    "external link.",
  standfirst:
    "Every bot glances up and to the right: the eyes are tilted a little.",
  date: "2026-10-01",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V150_THUMBNAIL_ICON_NAMES,
  keywords: [
    "bot icon",
    "chatbot icon",
    "ai bot icons",
    "shield icons",
    "security icons",
    "privacy icon",
    "clipboard icon",
    "copy icon",
    "paste icon",
    "save icon",
    "floppy disk icon",
    "external link icon",
    "cloud upload icon",
    "cloud download icon",
    "shadcn/create icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "This set now draws every one of the 182 icons in shadcn/create's " +
        "previews, where a new shadcn/ui project picks its icon library. " +
        "Nineteen were missing before.",
    },
    {
      kind: "p",
      text:
        "Bots and shields make up twelve of the 53 new icons, and the " +
        "other forty-one grew out of that list, families included.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V150_HERO_ICON_NAMES,
        caption:
          "Bots, clipboards, shields and the floppy disk, each down " +
          "through the four styles.",
      },
    },

    { kind: "h2", text: "Every icon shadcn/create asks for", id: "create" },
    {
      kind: "p",
      text:
        "Of the 182, 163 were already here, most under the same name. The " +
        "nineteen that weren't include `save`, `clipboard`, `frame`, " +
        "`columns-3`, `target`, a television and the external link, which " +
        "now leaves its square through all four corners.",
    },
    {
      kind: "p",
      text:
        "Search had to learn the list as well. A name from it opens on the " +
        "drawing it means, even where this set spells it differently, on " +
        "the site, in the MCP server, the CLI and the Figma plugin:",
    },
    {
      kind: "list",
      items: [
        "`external-link` finds `square-arrow-out-up-right`.",
        "`log-out` finds `bracket-arrow-left`.",
        "`loader-2` finds `loader-circle`.",
        "The lock with a keyhole is plain `lock`, and the settings sliders " +
          "are `sliders-2-horizontal`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V150_CREATE_ICON_NAMES,
        caption: "The nineteen, then six drawn beside them.",
      },
    },

    { kind: "h2", text: "Seven bots, one face", id: "bots" },
    {
      kind: "p",
      text:
        "`bot-message` is the one for a chatbot: a face in a speech " +
        "bubble, where people already look for help. The face is the same " +
        "drawing in all seven, only moved, into a circle, a square, a " +
        "heart, a droplet, a star, that bubble and a cloud.",
    },
    {
      kind: "p",
      text:
        "The round bot is `bot-circle` now, named for its shape once six " +
        "others stood beside it. It shipped as `bot-2`, and the old name " +
        "still finds it in search and still imports as `Bot2` in React.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V150_BOT_ICON_NAMES,
        caption: "All seven bots, from stroke down to fill.",
      },
    },

    {
      kind: "h2",
      text: "The clipboard wears its symbol where the writing goes",
      id: "board",
    },
    {
      kind: "p",
      text:
        "Where most icons here put a plus or a check in a corner cut away " +
        "for it, the clipboard puts its symbol in the middle, where the " +
        "writing would be:",
    },
    {
      kind: "list",
      items: [
        "Copy and paste: `clipboard-copy`, `clipboard-paste`, and `paste`, " +
          "a page held in front of the board.",
        "Checklists and tasks: `clipboard-check` and `clipboard-list`, " +
          "with a plus, a minus and an x.",
        "Saving: `save`, the floppy disk almost every app still uses, with " +
          "`save-plus`, `save-check` and `save-off`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V150_SIGN_ICON_NAMES,
        caption:
          "Four clipboards, `paste`, and the floppy disk plain, with a " +
          "plus and switched off.",
      },
    },
    {
      kind: "p",
      text:
        "The shield gets six more symbols for a security screen: " +
        "`shield-alert` for a warning, `shield-lock` for privacy, " +
        "`shield-user` for account security, `shield-question`, " +
        "`shield-heart` and `shield-off` for protection switched off.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V150_SHIELD_ICON_NAMES,
        caption: "`shield-check` beside the six new ones.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V160_THUMBNAIL_ICON_NAMES = [
  "house",
  "user-cog",
  "folder-cog",
  "glasses",
  "house-heart",
  "user-shield",
  "globe-cog",
  "puzzle",
  "house-wifi",
  "user-key",
  "file-cog",
  "sunglasses",
  "house-chimney",
  "user-lock",
  "database-cog",
  "heart-crack",
  "houses",
  "user-message",
  "cloud-search",
  "smartphone-ringing",
  "house-check",
  "user-pen",
  "arrow-down-up",
  "id-badge",
  "house-cast",
  "user-search",
  "cloud-network",
  "smartphone-nfc",
  "house-plug",
  "user-heart",
  "video-2",
  "bike-2",
  "home-heart",
  "user-list",
  "arrow-left-right-2",
  "house-zap",
  "home-check",
  "homes",
  "house-simple",
  "house-cog",
] as const

export const BLOG_V160_HERO_ICON_NAMES = [
  "house",
  "house-heart",
  "user-cog",
  "folder-cog",
  "glasses",
  "puzzle",
  "house-wifi",
  "user-shield",
] as const

/** `house` and its twelve, then `home` and its five. */
export const BLOG_V160_HOUSE_ICON_NAMES = [
  "house",
  "house-simple",
  "house-chimney",
  "houses",
  "house-check",
  "house-x",
  "house-plus",
  "house-zap",
  "house-heart",
  "house-cog",
  "house-plug",
  "house-wifi",
  "house-cast",
  "home",
  "home-simple",
  "homes",
  "home-check",
  "home-x",
  "home-heart",
] as const

export const BLOG_V160_USER_ICON_NAMES = [
  "user-cog",
  "user-heart",
  "user-key",
  "user-list",
  "user-lock",
  "user-message",
  "user-pen",
  "user-search",
  "user-shield",
  "id-badge",
] as const

export const BLOG_V160_COG_ICON_NAMES = [
  "file-cog",
  "folder-cog",
  "database-cog",
  "globe-cog",
  "house-cog",
  "user-cog",
  "brain-cog",
] as const

export const BLOG_V160_CLOUD_ICON_NAMES = [
  "cloud-check",
  "cloud-x",
  "cloud-plus",
  "cloud-alert",
  "cloud-upload",
  "cloud-download",
  "cloud-terminal",
  "cloud-rain",
  "home-zap",
  "database-zap",
  "server-zap",
  "user-zap",
] as const

const RELEASE_1_6_0: BlogPost = {
  /* Home leads, then users and settings: a smart home app and an account
     screen are the searches this post can win. */
  slug: "house-user-and-settings-icons",
  version: "1.6.0",
  title: "47 free home, user and settings icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: a second house with twelve variations, " +
    "a person with nine symbols, and a cog for files, folders, databases " +
    "and the globe.",
  standfirst:
    "`video-2` is a video camera without its reels, and `bike-2` is the " +
    "bicycle without its rider.",
  date: "2026-10-04",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V160_THUMBNAIL_ICON_NAMES,
  keywords: [
    "home icons",
    "house icon",
    "smart home icons",
    "home automation icons",
    "user icons",
    "account icons",
    "profile icons",
    "user settings icon",
    "settings icon",
    "cog icon",
    "gear icon",
    "folder settings icon",
    "id badge icon",
    "cloud upload icon",
    "cloud icons",
    "glasses icon",
    "puzzle icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "The set has two houses now, with seventeen variations between " +
        "them. That covers what a smart home app says about a house: it's " +
        "a favourite, the power is on, the wifi is down, all is well. The " +
        "first house, `home`, could say almost none of it on its own.",
    },
    {
      kind: "p",
      text:
        "People and settings take most of the rest: a person with nine new " +
        "symbols, and a cog for files, folders, databases and the globe. " +
        "Fourteen icons that had shipped were redrawn, most of them " +
        "clouds.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V160_HERO_ICON_NAMES,
        caption:
          "Two houses, two people, a folder with its cog, glasses and a " +
          "puzzle piece.",
      },
    },

    { kind: "h2", text: "A smart home, from two houses", id: "house" },
    {
      kind: "p",
      text:
        "`house` is the other house people reach for, a roof that sticks " +
        "out past the walls over an arched door, and `home` keeps its " +
        "rounded peak and square door. Between them they cover the states " +
        "a smart home app shows:",
    },
    {
      kind: "list",
      items: [
        "All well, or a problem: `house-check` and `house-x`.",
        "A new home: `house-plus`. Power: `house-zap` and `house-plug`.",
        "Favourites and settings: `house-heart` and `house-cog`.",
        "Connected: `house-wifi`, and `house-cast` for casting to a screen " +
          "at home.",
        "More than one: `houses` and `homes`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_HOUSE_ICON_NAMES,
        caption: "`house` and its twelve, then `home` and its five.",
      },
    },

    { kind: "h2", text: "A person takes nine new symbols", id: "people" },
    {
      kind: "list",
      items: [
        "Account settings: `user-cog`. Signing in: `user-key` and `user-lock`.",
        "Editing a profile: `user-pen`. Finding people: `user-search`. " +
          "Messaging them: `user-message`.",
        "Favourites, a member list and account security: `user-heart`, " +
          "`user-list` and `user-shield`.",
        "A staff card: `id-badge`, a badge with a photo and the slot it " +
          "hangs from.",
      ],
    },
    {
      kind: "p",
      text:
        "These symbols are objects, not small marks, so they're drawn " +
        "larger, low on the right beside the shoulder. The person stands " +
        "exactly where it stands in `user-plus`, so swapping one symbol " +
        "for another never moves it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_USER_ICON_NAMES,
        caption: "Nine people with a symbol, and the ID badge.",
      },
    },

    { kind: "h2", text: "One cog for every setting", id: "cogs" },
    {
      kind: "p",
      text:
        "Settings attach to all sorts of things, so the cog now comes with " +
        "a file, a folder, a database and the globe, in the corner where " +
        "each keeps its plus. It's the same cog every time, the one beside " +
        "the person and on the house. `brain-cog` was redrawn to match: " +
        "its cog had a wider ring and shorter teeth than any other.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_COG_ICON_NAMES,
        caption:
          "Four new cogs, the two from the families above, and the brain.",
      },
    },

    { kind: "h2", text: "Clouds put their symbol underneath", id: "clouds" },
    {
      kind: "p",
      text:
        "A cloud's symbol sits underneath it now, at full size, upload and " +
        "download arrows included. It used to sit inside, drawn small to " +
        "fit, and the cloud opens along its bottom edge to make room. The " +
        "rain cloud opens the same way, so the rain falls out of it. " +
        "`cloud-minus` is no longer in the set.",
    },
    {
      kind: "p",
      text:
        "Four icons with a lightning bolt moved a step left, to sit " +
        "exactly where their plus versions sit, so switching between the " +
        "two no longer makes the picture jump.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V160_CLOUD_ICON_NAMES,
        caption: "Twelve of the fourteen, before beside after.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V170_THUMBNAIL_ICON_NAMES = [
  "gavel",
  "scale",
  "stethoscope",
  "syringe",
  "a-arrow-up",
  "spell-check",
  "scale-unbalanced",
  "signature",
  "heart-pulse",
  "pill",
  "bandage",
  "a-arrow-down",
  "type",
  "braces",
  "brackets",
  "regex",
  "log-in",
  "log-out",
  "webcam",
  "battery-charging",
  "voicemail",
  "locate",
  "locate-fixed",
  "notebook",
  "notebook-pen",
  "telescope",
  "hand-coins",
  "image-off",
  "list-filter",
  "list-todo",
  "circle-progress-plus",
  "circle-progress-arrow-up",
  "scale-unbalanced-flip",
  "dot",
] as const

export const BLOG_V170_HERO_ICON_NAMES = [
  "gavel",
  "scale-unbalanced",
  "stethoscope",
  "syringe",
  "spell-check",
  "a-arrow-up",
  "webcam",
  "telescope",
] as const

export const BLOG_V170_LAW_ICON_NAMES = [
  "gavel",
  "scale",
  "scale-unbalanced",
  "scale-unbalanced-flip",
  "signature",
] as const

export const BLOG_V170_HEALTH_ICON_NAMES = [
  "heart-pulse",
  "stethoscope",
  "syringe",
  "pill",
  "bandage",
] as const

export const BLOG_V170_TEXT_ICON_NAMES = [
  "a-arrow-up",
  "a-arrow-down",
  "spell-check",
  "type",
  "braces",
  "brackets",
  "regex",
  "log-in",
  "log-out",
  "list-todo",
] as const

const RELEASE_1_7_0: BlogPost = {
  /* Law and medical lead: a contracts screen and a clinic's booking page
     are the searches this post can win. Text and code tools go in the
     description. */
  slug: "law-health-and-text-editing-icons",
  version: "1.7.0",
  title: "34 free law and medical icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: a gavel, the scales of justice, a " +
    "stethoscope, a syringe and a first-aid kit, text size arrows and a " +
    "spell check.",
  standfirst:
    "Voicemail is drawn as two reels joined by a tape, and the set's " +
    "plainest icon arrives: `dot`, one dot.",
  date: "2026-10-05",
  updated: "2026-11-02",
  readingMinutes: 3,
  thumbnail: BLOG_V170_THUMBNAIL_ICON_NAMES,
  keywords: [
    "law icons",
    "legal icons",
    "gavel icon",
    "scales of justice icon",
    "justice icon",
    "signature icon",
    "contract icon",
    "medical icons",
    "health icons",
    "stethoscope icon",
    "syringe icon",
    "vaccine icon",
    "pill icon",
    "bandage icon",
    "heart rate icon",
    "font size icon",
    "spell check icon",
    "regex icon",
    "login icon",
    "logout icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Law has a category of its own from this release: a gavel, the " +
        "scales of justice, level or tipped, and a signature for a " +
        "contracts screen. Health fills out alongside it, with a " +
        "stethoscope and a syringe for a clinic's booking page.",
    },
    {
      kind: "p",
      text:
        "Text and code take seven of the 34 new icons, and the rest are " +
        "things apps keep asking for: signing in and out, a charging " +
        "battery, a webcam.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V170_HERO_ICON_NAMES,
        caption:
          "Law and health on the left, with text tools, a webcam and a " +
          "telescope to their right.",
      },
    },

    { kind: "h2", text: "The balance tips both ways", id: "law" },
    {
      kind: "list",
      items: [
        "A ruling or a case: `gavel`.",
        "Fairness and justice: `scale`, the balance standing level.",
        "Bias, or one option outweighing another: `scale-unbalanced` and " +
          "`scale-unbalanced-flip`, tipped right and left.",
        "Signing a contract: `signature`, a handwritten name over a line.",
      ],
    },
    {
      kind: "p",
      text:
        "The balance comes tipped in both directions because a comparison " +
        "has to say which side wins. A balance that only tips one way can " +
        "say \"unfair\" and nothing else.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_LAW_ICON_NAMES,
        caption:
          "The gavel, the balance level and tipped both ways, and the " +
          "signature.",
      },
    },

    { kind: "h2", text: "A first-aid kit for a clinic app", id: "health" },
    {
      kind: "p",
      text:
        "Five more make Health enough for a clinic, a pharmacy or a " +
        "fitness app to stay inside one set, beside the brain, lungs, ears " +
        "and thermometer it already had:",
    },
    {
      kind: "list",
      items: [
        "Heart rate: `heart-pulse`.",
        "A check-up: `stethoscope`. A vaccination: `syringe`.",
        "Medication: `pill`. First aid: `bandage`.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_HEALTH_ICON_NAMES,
        caption:
          "The pulse, the stethoscope, the syringe, the capsule and the " +
          "bandage.",
      },
    },

    { kind: "h2", text: "Text size, spelling and sign in", id: "text" },
    {
      kind: "list",
      items: [
        "Bigger and smaller text: `a-arrow-up` and `a-arrow-down`. The " +
          "text tool: `type`.",
        "Spell check: `spell-check`, a lowercase ab with a check under it.",
        "Code: `braces`, `brackets`, and `regex`, a dot and a star, the " +
          "shorthand for any run of characters.",
        "Signing in and out: `log-in` and `log-out`. A search for sign in " +
          "or sign out finds them first.",
        "Tasks: `list-todo`, and `list-filter` for narrowing a list.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_TEXT_ICON_NAMES,
        caption: "Text, code, signing in and out, and the to-do list.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V180_THUMBNAIL_ICON_NAMES = [
  "move-right",
  "undo",
  "ratio-16-9",
  "input-cursor",
  "layout-bento",
  "webhook",
  "move-up-right",
  "redo",
  "aspect-ratio",
  "text-cursor",
  "grid-masonry",
  "connections",
  "move-horizontal",
  "undo-dot",
  "ratio-9-16",
  "input",
  "fold-vertical",
  "diff",
  "move-diagonal",
  "arrow-right-left-4",
  "ratio-21-9",
  "text-cursor-input",
  "flip-2-horizontal",
  "file-diff",
  "card-sim",
  "unplug",
  "keyframes",
  "box",
  "directions",
  "bot-simple",
  "broom-sparkles",
  "input-sparkles",
  "home-smile",
  "inbox-dot",
  "shuffle-2",
  "chevrons-down-up",
  "braces-ellipsis",
  "list-todo-circle",
  "circle-dashed-user",
  "flame-2",
] as const

export const BLOG_V180_HERO_ICON_NAMES = [
  "move-up-right",
  "undo-dot",
  "aspect-ratio",
  "input-cursor",
  "layout-bento",
  "webhook",
  "card-sim",
  "flame-2",
] as const

export const BLOG_V180_LONG_ARROW_ICON_NAMES = [
  "move-up",
  "move-right",
  "move-down",
  "move-left",
  "move-up-right",
  "move-down-right",
  "move-down-left",
  "move-up-left",
  "move-horizontal",
  "move-vertical",
  "move-diagonal",
  "move-diagonal-flip",
] as const

export const BLOG_V180_RATIO_ICON_NAMES = [
  "ratio-1-1",
  "ratio-4-3",
  "ratio-3-4",
  "ratio-3-2",
  "ratio-2-3",
  "ratio-16-9",
  "ratio-9-16",
  "ratio-21-9",
  "aspect-ratio",
] as const

export const BLOG_V180_FIELD_ICON_NAMES = [
  "input",
  "input-cursor",
  "input-sparkles",
  "text-cursor",
  "text-cursor-input",
  "layout-bento",
  "grid-masonry",
  "fold-vertical",
  "fold-horizontal",
  "compact",
  "connection",
  "connections",
  "webhook",
  "diff",
  "file-diff",
] as const

const RELEASE_1_8_0: BlogPost = {
  /* Arrows and aspect ratios lead: a crop menu and a resize handle are the
     searches this post can win. Inputs and grids go in the description. */
  slug: "long-arrows-aspect-ratios-and-input-icons",
  version: "1.8.0",
  title: "69 free arrow and aspect ratio icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: long arrows, swaps, undo and redo, " +
    "frames from 1:1 to 21:9, text fields, a bento grid and a webhook.",
  standfirst:
    "A plug pulled out of its socket is `unplug`, and the flame comes with " +
    "a second one burning inside it.",
  date: "2026-10-11",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V180_THUMBNAIL_ICON_NAMES,
  keywords: [
    "arrow icons",
    "long arrow icon",
    "resize icon",
    "drag icon",
    "aspect ratio icon",
    "crop ratio icons",
    "16:9 icon",
    "4:3 icon",
    "undo icon",
    "redo icon",
    "swap icon",
    "input icon",
    "text field icon",
    "text cursor icon",
    "prompt icon",
    "bento grid icon",
    "masonry grid icon",
    "webhook icon",
    "diff icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Crop menus get a frame for every common ratio, from 1:1 to 21:9, " +
        "and every editor gets undo and redo. Long arrows for dragging and " +
        "resizing fill out the release.",
    },
    {
      kind: "p",
      text:
        "Beyond the twelve long arrows and nine ratios, the 69 new icons " +
        "bring text fields, grids for a dashboard, and links between " +
        "things for a webhook or a diff.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V180_HERO_ICON_NAMES,
        caption:
          "A long arrow, undo with a dot, the ratio control, a text field, " +
          "a bento grid, a webhook, a SIM card and the double flame.",
      },
    },

    { kind: "h2", text: "Every frame rounds to an even number", id: "ratios" },
    {
      kind: "list",
      items: [
        "Square: `ratio-1-1`.",
        "Photos: `ratio-4-3` and `ratio-3-2`, and upright, `ratio-3-4` and " +
          "`ratio-2-3`.",
        "Video: `ratio-16-9`, `ratio-9-16` for a phone story, and " +
          "`ratio-21-9` for ultrawide.",
        "The control that changes it: `aspect-ratio`.",
      ],
    },
    {
      kind: "p",
      text:
        "At 24 pixels a frame sits dead centre only when its short side is " +
        "an even number of pixels, so each ratio rounds to the nearest " +
        "even one. 16:9 comes out a little squarer than the real thing and " +
        "21:9 a little wider, still easy to tell apart. Every long side is " +
        "the same length, so a row of them reads as frames to choose from.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_RATIO_ICON_NAMES,
        caption: "Square to ultrawide, then the control.",
      },
    },

    { kind: "h2", text: "Long arrows for dragging and resizing", id: "arrows" },
    {
      kind: "p",
      text:
        "The long arrows run nearly edge to edge, where the plain arrows " +
        "stop well short. They're named after the four-way `move` they sit " +
        "beside, and a search for long arrow finds them:",
    },
    {
      kind: "list",
      items: [
        "One way: `move-up`, `move-right`, `move-down` and `move-left`, " +
          "and the diagonals, `move-up-right` and so on.",
        "Resizing: `move-horizontal`, `move-vertical`, `move-diagonal` and " +
          "`move-diagonal-flip`.",
        "Undo and redo: `undo` and `redo`, and `undo-dot` and `redo-dot` " +
          "for a change not yet saved.",
        "Swapping: `arrow-right-left-3`, and `arrow-right-left-4` with one " +
          "barb on each arrow, as an exchange sign is often printed.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_LONG_ARROW_ICON_NAMES,
        caption: "Straight, diagonal and two-way.",
      },
    },
    {
      kind: "p",
      text:
        "The four shipped arrow pairs, `arrow-left-right` and its turns, " +
        "were redrawn with the same head as the long arrows, a size up, so " +
        "the two read as one family.",
    },

    { kind: "h2", text: "A text field, and one for a prompt", id: "fields" },
    {
      kind: "list",
      items: [
        "A text field: `input`, and `input-cursor` for clicking into one.",
        "A prompt box: `input-sparkles`, its caret swapped for two stars.",
        "The I-beam: `text-cursor`, and `text-cursor-input` with the field " +
          "round it. A summary: `compact`.",
        "Dashboards and galleries: `layout-bento` for tiles of mixed sizes " +
          "and `grid-masonry` for bricks laid off-centre. Collapsing a " +
          "section: `fold-vertical` and `fold-horizontal`.",
        "Links and code: `connection`, `connections` and `webhook`, and " +
          "`diff` and `file-diff` for a change.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_FIELD_ICON_NAMES,
        caption: "Fields, grids and folds, then links and diffs.",
      },
    },
    {
      kind: "p",
      text:
        "One shipped drawing changed: the hand in `hand-coins` is one " +
        "shape now, where it had a separate thumb.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V200_THUMBNAIL_ICON_NAMES = [
  "play-pause",
  "parentheses-x",
  "tally-5",
  "hexagon",
  "arrow-u-turn-left-line",
  "chevrons-up-3",
  "list-checks",
  "nfc",
  "brace-left",
  "octagon-dot",
  "plug-zap",
  "library-big",
  "book-open-2",
  "map-pin-2",
  "circle-zap",
  "square-star",
  "tally-3",
  "bracket-right",
  "diamond",
  "arrow-up-through-line",
  "chevrons-down-2",
  "workflow",
  "gallery-thumbnails",
  "code-panel",
  "ban-square",
  "list-indent-increase",
  "triangle-dot",
  "parentheses-ellipsis",
  "semicolon",
  "tilde",
  "arrow-big-right-dash",
  "list-pin",
  "plug-circle",
  "text-align-2-start",
  "octagon",
  "arrow-u-turn-down-line",
  "list-nested",
  "circle-dot",
  "pipe",
  "comma",
] as const

export const BLOG_V200_HERO_ICON_NAMES = [
  "play-pause",
  "book-open-2",
  "circle-zap",
  "octagon-dot",
  "library-big",
  "gallery-thumbnails",
  "map-pin-2",
  "code-panel",
] as const

export const BLOG_V200_BRACKET_ICON_NAMES = [
  "parenthesis-left",
  "parenthesis-right",
  "bracket-left",
  "bracket-right",
  "brace-left",
  "brace-right",
  "parentheses-ellipsis",
  "parentheses-x",
  "pipe",
  "colon",
  "semicolon",
  "comma",
  "accent-grave",
  "tilde",
] as const

export const BLOG_V200_LEVEL_ICON_NAMES = [
  "tally-1",
  "tally-2",
  "tally-3",
  "tally-4",
  "tally-5",
  "chevrons-up-1",
  "chevrons-up-2",
  "chevrons-up-3",
  "chevrons-down-1",
  "chevrons-down-2",
  "chevrons-down-3",
] as const

export const BLOG_V200_SHAPE_ICON_NAMES = [
  "triangle",
  "triangle-dot",
  "diamond",
  "diamond-dot",
  "hexagon",
  "octagon",
  "octagon-dot",
  "square-dot",
  "circle-dot",
] as const

export const BLOG_V200_ARROW_ICON_NAMES = [
  "arrow-u-turn-left-line",
  "arrow-u-turn-left-line-flip",
  "arrow-u-turn-right-line",
  "arrow-u-turn-right-line-flip",
  "arrow-u-turn-up-line",
  "arrow-u-turn-up-line-flip",
  "arrow-u-turn-down-line",
  "arrow-u-turn-down-line-flip",
  "arrow-up-through-line",
  "arrow-down-through-line",
  "arrow-left-through-line",
  "arrow-right-through-line",
  "arrow-big-right-dash",
  "arrow-big-down-dash",
  "arrow-big-left-dash",
] as const

const RELEASE_2_0_0: BlogPost = {
  /* Brackets and tally marks lead: both are searches with no other answer
     in this set's posts. Shapes and u-turn arrows go in the description. */
  slug: "brackets-tally-marks-and-shape-icons",
  version: "2.0.0",
  title: "72 free bracket and tally mark icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: brackets, braces and punctuation, tally " +
    "marks, chevron levels, plain shapes and u-turn arrows.",
  standfirst:
    "`book-open-2` is a book mid page-turn, and `library-big` has two " +
    "books standing and a third leaning on them.",
  date: "2026-10-18",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V200_THUMBNAIL_ICON_NAMES,
  keywords: [
    "bracket icon",
    "parentheses icon",
    "curly brace icon",
    "punctuation icons",
    "colon icon",
    "tilde icon",
    "tally icon",
    "tally marks icon",
    "counter icon",
    "priority icon",
    "chevron icon",
    "level icon",
    "triangle icon",
    "diamond icon",
    "hexagon icon",
    "octagon icon",
    "shape icons",
    "u-turn arrow icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Brackets come in halves here, tally marks run from one to five, " +
        "and a triangle stands beside the circle for a map key. These are " +
        "the small pieces nobody notices until one is missing.",
    },
    {
      kind: "p",
      text:
        "Of the 72 new icons, fourteen are brackets and punctuation, " +
        "eleven count or show a level, nine are plain shapes and fifteen " +
        "are arrows that meet a line.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V200_HERO_ICON_NAMES,
        caption:
          "Play and pause in one key, a bolt in a circle and an octagon " +
          "with a dot, with the code panel at the end.",
      },
    },

    { kind: "h2", text: "Each bracket comes in two halves", id: "brackets" },
    {
      kind: "list",
      items: [
        "One side of a pair, for a button that wraps a selection: " +
          "`parenthesis-left` and `parenthesis-right`, `bracket-left` and " +
          "`bracket-right`, `brace-left` and `brace-right`.",
        "A folded value: `parentheses-ellipsis`. A variable: `parentheses-x`.",
        "Shortcut hints and separators: `pipe`, `colon`, `semicolon`, " +
          "`comma`, `accent-grave` and `tilde`.",
      ],
    },
    {
      kind: "p",
      text:
        "Punctuation has nothing inside to fill, so it looks the same in " +
        "every style. A filled comma would only be a heavier comma.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_BRACKET_ICON_NAMES,
        caption: "Each bracket alone, two pairs, then the punctuation.",
      },
    },

    {
      kind: "h2",
      text: "Each stroke stays put as the count goes up",
      id: "levels",
    },
    {
      kind: "p",
      text:
        "The tally marks count from one to five the way a score is kept on " +
        "paper, four strokes side by side and a fifth across them. Each " +
        "stroke keeps its place from one icon to the next, so going from " +
        "`tally-2` to `tally-3` adds one line and moves nothing, which " +
        "makes a counter easy to animate.",
    },
    {
      kind: "p",
      text:
        "The chevron levels work like signal bars. `chevrons-up-1` to " +
        "`chevrons-up-3` fill from the bottom, for priority or strength " +
        "going up, and `chevrons-down-1` to `chevrons-down-3` fill from " +
        "the top.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_LEVEL_ICON_NAMES,
        caption: "One to five, then one to three chevrons each way.",
      },
    },

    { kind: "h2", text: "Shapes for a status key", id: "shapes" },
    {
      kind: "p",
      text:
        "A triangle, a diamond, a hexagon and an octagon join the square " +
        "and the circle as plain outlines, for status markers, map keys " +
        "and flowcharts. The triangle, the diamond and the octagon also " +
        "come with a dot inside, and the plain dot now comes framed, as " +
        "`square-dot` and `circle-dot`.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_SHAPE_ICON_NAMES,
        caption: "Four plain shapes, and a dot in five.",
      },
    },

    { kind: "h2", text: "Arrows that turn back at a line", id: "arrows" },
    {
      kind: "p",
      text:
        "The u-turn arrows now turn back at a line, for hitting a limit " +
        "and heading back, in all four directions and mirrored. Four more " +
        "pass straight through a line, for crossing a boundary. And the " +
        "big outlined arrows pointing right, down and left take a bar " +
        "behind them, like the caps lock arrow, `arrow-big-up-dash`.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_ARROW_ICON_NAMES,
        caption:
          "U-turns, arrows through a line, and big arrows with a bar " +
          "behind.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V210_THUMBNAIL_ICON_NAMES = [
  "monitor-2-play",
  "sigma",
  "cone",
  "flag-swallowtail",
  "planet",
  "drafting-compass",
  "waves-2",
  "gripper",
  "monitor-2-check",
  "pi",
  "cuboid",
  "flag-triangle-right",
  "mouse-pointer",
  "vector-polygon",
  "weight",
  "train-track",
  "monitor-2-cog",
  "lambda",
  "cylinder",
  "hook",
  "scan-user",
  "card-chip",
  "layout-columns",
  "copy-x",
  "monitor-2-arrow-up",
  "omega",
  "pyramid",
  "waves",
  "symmetry-horizontal",
  "grid-2x2-check",
  "monitor-speaker",
  "phi",
  "triangle-right",
  "vector-square",
  "flip-3-horizontal",
  "radius",
  "monitor-2-pause",
  "function",
  "circle-slash-2",
  "weight-tilde",
] as const

export const BLOG_V210_HERO_ICON_NAMES = [
  "monitor-2-play",
  "planet",
  "cone",
  "sigma",
  "drafting-compass",
  "flag-swallowtail",
  "waves-2",
  "gripper",
] as const

export const BLOG_V210_MONITOR_ICON_NAMES = [
  "monitor-2",
  "monitor-2-plus",
  "monitor-2-minus",
  "monitor-2-check",
  "monitor-2-x",
  "monitor-2-dot",
  "monitor-2-cog",
  "monitor-2-arrow-down",
  "monitor-2-arrow-in-up-right",
  "monitor-2-arrow-up",
  "monitor-2-play",
  "monitor-2-pause",
  "monitor-2-stop",
  "monitor-speaker",
] as const

export const BLOG_V210_MATH_ICON_NAMES = [
  "sigma",
  "square-sigma",
  "circle-sigma",
  "pi",
  "square-pi",
  "circle-pi",
  "function",
  "square-function",
  "circle-function",
  "lambda",
  "omega",
  "phi",
  "angle",
  "radius",
] as const

export const BLOG_V210_SOLID_STYLE_ICON_NAMES = [
  "cuboid",
  "cylinder",
  "cone",
  "pyramid",
] as const

const RELEASE_2_1_0: BlogPost = {
  /* Greek letters and 3D shapes lead: a formula editor and a 3D tool are
     searches no other post here answers. The monitor goes in the
     description. */
  slug: "monitor-greek-letter-and-3d-shape-icons",
  version: "2.1.0",
  title:
    "61 free Greek letter and 3D shape icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: sigma, pi, lambda and omega, a cube, a " +
    "cylinder, a cone and a pyramid, a monitor with its signs, pennants " +
    "and waves.",
  standfirst:
    "A train track runs off into the distance, and the sea comes in waves.",
  date: "2026-10-20",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V210_THUMBNAIL_ICON_NAMES,
  keywords: [
    "greek letter icons",
    "math icons",
    "sigma icon",
    "pi icon",
    "lambda icon",
    "omega icon",
    "function icon",
    "formula icon",
    "angle icon",
    "3d shape icons",
    "cube icon",
    "cylinder icon",
    "cone icon",
    "pyramid icon",
    "monitor icon",
    "screen share icon",
    "display settings icon",
    "pennant icon",
    "planet icon",
    "waves icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Sigma, pi, lambda and omega joined the set in this release, with " +
        "a cuboid, a cone, a cylinder and a pyramid beside them. A formula " +
        "editor and a 3D tool can both draw their toolbars from it, and a " +
        "second monitor says what a screen is doing: sharing, playing, " +
        "disconnected.",
    },
    {
      kind: "p",
      text:
        "Maths takes fourteen of the 61 new icons and shapes take seven, " +
        "four of them solid. The monitor arrives with thirteen symbols.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V210_HERO_ICON_NAMES,
        caption:
          "One from each part of the release: a monitor, a planet, a " +
          "solid, a letter, a compass, a flag, waves and a gripper.",
      },
    },

    {
      kind: "h2",
      text: "Greek letters stand as tall as the other letters",
      id: "math",
    },
    {
      kind: "list",
      items: [
        "Sums and series: `sigma`.",
        "Circles and geometry: `pi`, `angle` and `radius`, which also suit " +
          "an input that sets an angle or rounds a corner.",
        "Functions and calculated fields: `function` and `lambda`. And " +
          "`omega` and `phi`.",
        "Framed for a button: sigma, pi and the function sign in a square " +
          "and a circle, as `square-sigma`, `circle-pi` and so on.",
      ],
    },
    {
      kind: "p",
      text:
        "The letters stand as tall as the set's other letters, so a sigma " +
        "lines up beside `bold` or `heading-1` in one toolbar.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V210_MATH_ICON_NAMES,
        caption:
          "Five letters and the function sign, three of them framed, then " +
          "the angle and the radius.",
      },
    },

    { kind: "h2", text: "In a solid shape, one face stands out", id: "solids" },
    {
      kind: "p",
      text:
        "In duotone and fill, each solid picks out one face, as `box` " +
        "does: the top of the cuboid and the cylinder, the open base of " +
        "the cone, the right side of the pyramid. That face is what turns " +
        "an outline into a solid at a glance.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V210_SOLID_STYLE_ICON_NAMES,
        caption:
          "The four solids in every style. Duotone and fill pick out one " +
          "face.",
      },
    },
    {
      kind: "p",
      text:
        "A right triangle joins the plain one, and a circle and a square " +
        "now come crossed corner to corner, `circle-slash-2` and " +
        "`square-slash-2`, for an empty set or a value that isn't allowed.",
    },

    { kind: "h2", text: "A monitor that says what it's doing", id: "monitor" },
    {
      kind: "p",
      text:
        "On `monitor-2`, a taller display on a stand, what's about the " +
        "device sits in the top corner and what's on the screen sits in " +
        "the middle:",
    },
    {
      kind: "list",
      items: [
        "Screen sharing: `monitor-2-arrow-up`. Sending to another screen: " +
          "`monitor-2-arrow-in-up-right`.",
        "Playback: `monitor-2-play`, `monitor-2-pause` and `monitor-2-stop`.",
        "Display settings: `monitor-2-cog`. Connected or not: " +
          "`monitor-2-check` and `monitor-2-x`.",
        "Desktop audio: `monitor-speaker`, a display beside a speaker.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V210_MONITOR_ICON_NAMES,
        caption:
          "The display, its thirteen symbols, and the display beside a " +
          "speaker.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V220_THUMBNAIL_ICON_NAMES = [
  "bus",
  "traffic-cone",
  "hamburger",
  "boom-box",
  "skull",
  "router",
  "mountain-snow",
  "dumbbell",
  "car-taxi-front",
  "construction",
  "pizza",
  "cassette-tape",
  "dna",
  "mails",
  "feather",
  "chess-rook",
  "tram-front",
  "factory",
  "cookie",
  "speaker",
  "bone-fractured",
  "split",
  "binoculars",
  "fire-extinguisher",
  "car-front",
  "crosshair",
  "satellite-dish",
  "magnet",
  "heart-handshake",
  "flashlight",
  "cloud-lightning",
  "car-taxi",
  "footprints",
  "briefcase-medical",
  "book-open-text",
  "message-dashed",
  "plane-off",
  "scan-zap",
  "alarm-clock-x",
  "bike-off",
] as const

export const BLOG_V220_HERO_ICON_NAMES = [
  "bus",
  "car-taxi-front",
  "traffic-cone",
  "boom-box",
  "hamburger",
  "skull",
  "mountain-snow",
  "router",
] as const

export const BLOG_V220_TRANSPORT_ICON_NAMES = [
  "bus",
  "tram-front",
  "car-front",
  "car-taxi",
  "car-taxi-front",
  "car-off",
  "car-front-off",
  "car-taxi-front-off",
  "bus-off",
  "train-front-off",
  "tram-front-off",
  "truck-off",
  "plane-off",
  "ship-off",
  "bike-off",
  "bike-2-off",
  "rocket-off",
  "rocket-vertical-off",
] as const

export const BLOG_V220_STREET_ICON_NAMES = [
  "traffic-cone",
  "construction",
  "factory",
  "crosshair",
  "footprints",
  "fire-extinguisher",
  "flashlight",
] as const

export const BLOG_V220_SOUND_ICON_NAMES = [
  "boom-box",
  "cassette-tape",
  "speaker",
  "satellite-dish",
] as const

const RELEASE_2_2_0: BlogPost = {
  /* Transport leads and this is the one post that claims it; 0.9.0 gave it
     up for science and nature. Construction is the street half of the
     batch. */
  slug: "transport-road-works-food-and-music-icons",
  version: "2.2.0",
  title:
    "55 free transport and construction icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: buses, trams and taxis, an off state " +
    "for every vehicle, traffic cones and road works, burgers, pizza and a " +
    "cassette.",
  standfirst:
    "Dashed speech bubbles mark a draft, or a reply still being written.",
  date: "2026-10-25",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V220_THUMBNAIL_ICON_NAMES,
  keywords: [
    "transport icons",
    "transportation icons",
    "vehicle icons",
    "bus icon",
    "tram icon",
    "taxi icon",
    "car icon",
    "car off icon",
    "flight mode icon",
    "plane off icon",
    "traffic cone icon",
    "construction icon",
    "road works icon",
    "under construction icon",
    "factory icon",
    "burger icon",
    "pizza icon",
    "cookie icon",
    "skull icon",
    "bone icon",
    "dna icon",
    "speaker icon",
    "cassette icon",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Every vehicle in the set can be switched off now: bus, tram, " +
        "plane, car, taxi, truck, ship, bike and rocket. A travel app can " +
        "say a line is closed or flights are grounded without leaving the " +
        "set.",
    },
    {
      kind: "p",
      text:
        "Transport is eighteen of the 55 new icons. The rest come from the " +
        "street, the kitchen, the body and the music shelf, and bring the " +
        "set to 1,623.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V220_HERO_ICON_NAMES,
        caption:
          "A bus, a taxi from the front, a traffic cone and a boom box, " +
          "then a burger, a skull, a mountain and a router.",
      },
    },

    { kind: "h2", text: "Every vehicle can be switched off", id: "transport" },
    {
      kind: "list",
      items: [
        "A cancelled service: `bus-off`, `train-front-off` and " +
          "`tram-front-off`.",
        "Flight mode, or a grounded flight: `plane-off`.",
        "No cars, or no taxis: `car-off`, `car-front-off` and " +
          "`car-taxi-front-off`.",
        "Deliveries paused: `truck-off`. No ferry: `ship-off`. No bikes: " +
          "`bike-off` and `bike-2-off`. A launch on hold: `rocket-off` and " +
          "`rocket-vertical-off`.",
      ],
    },
    {
      kind: "p",
      text:
        "Each off state is its vehicle at the same size with the slash " +
        "across it, so a timetable can swap one for the other without the " +
        "row shifting. New vehicles came with them: `bus`, `tram-front`, " +
        "`car-front` seen coming towards you, and a taxi from the side and " +
        "the front with the light on its roof. The train seen from the " +
        "front is `train-front` now, and its old name still works.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V220_TRANSPORT_ICON_NAMES,
        caption: "Five new vehicles, then the off state of thirteen.",
      },
    },

    {
      kind: "h2",
      text: "Road works, and a page under construction",
      id: "street",
    },
    {
      kind: "list",
      items: [
        "Road works: `traffic-cone`, and `construction`, a striped barrier " +
          "that also marks a page still being built.",
        "Industry: `factory`. Aiming at a point: `crosshair`. A walk or a " +
          "step count: `footprints`.",
        "Safety: `fire-extinguisher` beside the lifebuoy, and `flashlight` " +
          "for the phone's torch.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V220_STREET_ICON_NAMES,
        caption:
          "Road works, a factory, a crosshair, footprints and the safety " +
          "kit.",
      },
    },

    {
      kind: "h2",
      text: "In duotone, the working parts are black",
      id: "things",
    },
    {
      kind: "list",
      items: [
        "Food: `hamburger`, `pizza`, and `cookie`, which is also the icon " +
          "a cookie banner wears.",
        "The body: `skull`, `bone` whole and as `bone-fractured`, `dna`, " +
          "and the doctor's bag, `briefcase-medical`.",
        "Sound: `boom-box`, `cassette-tape`, `speaker`, and " +
          "`satellite-dish` for a broadcast coming in.",
      ],
    },
    {
      kind: "p",
      text:
        "In duotone the body of each music player is grey and the parts " +
        "that make the sound are black: the boom box's speakers and " +
        "handle, the cassette's reels, the speaker's cones. The eye goes " +
        "to what the thing does.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V220_SOUND_ICON_NAMES,
        caption: "The four for sound in every style.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui registry, " +
        "the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V230_THUMBNAIL_ICON_NAMES = [
  "bath",
  "washing-machine",
  "castle",
  "sailboat",
  "coffee-maker",
  "luggage",
  "refrigerator",
  "tent",
  "concierge-bell",
  "caravan",
  "shower-head",
  "lighthouse",
  "oven",
  "ski",
  "grill",
  "microwave",
  "ev-charger",
  "vault",
  "stroller",
  "cooking-pot",
  "soap-dispenser-droplet",
  "barn",
  "wheelchair",
  "waves-ladder",
  "air-vent",
  "coffee-pot",
  "cigarette",
  "bottle-pump",
  "a-text-cursor",
  "cigarette-off",
  "spray-can",
] as const

export const BLOG_V230_HERO_ICON_NAMES = [
  "bath",
  "washing-machine",
  "coffee-maker",
  "castle",
  "sailboat",
  "luggage",
  "tent",
  "concierge-bell",
] as const

export const BLOG_V230_AMENITY_ICON_NAMES = [
  "bath",
  "shower-head",
  "bottle-pump",
  "soap-dispenser-droplet",
  "refrigerator",
  "oven",
  "microwave",
  "cooking-pot",
  "coffee-maker",
  "coffee-pot",
  "washing-machine",
  "spray-can",
  "air-vent",
  "wifi",
  "tv",
  "vault",
  "waves-ladder",
  "grill",
  "ev-charger",
  "car",
  "cigarette",
  "cigarette-off",
  "paw-print",
  "wheelchair",
  "concierge-bell",
] as const

export const BLOG_V230_BOX_ICON_NAMES = [
  "refrigerator",
  "oven",
  "microwave",
  "washing-machine",
  "vault",
] as const

export const BLOG_V230_TRIP_ICON_NAMES = [
  "luggage",
  "caravan",
  "sailboat",
  "stroller",
  "tent",
  "barn",
  "castle",
  "lighthouse",
  "ski",
  "a-text-cursor",
] as const

const RELEASE_2_3_0: BlogPost = {
  /* The subject leads, then "free", "React", "shadcn/ui" and "Figma". With
     the `v2.3.0: ` prefix the earlier order put "hotel amenities" past the
     60 or so characters a search result shows, behind words the five posts
     before it open with too. Kitchens and travel are in the description. The
     slug names the drawings, not the version. React goes before shadcn/ui
     so the card does not break the line at the slash. */
  slug: "hotel-amenities-kitchen-and-travel-icons",
  version: "2.3.0",
  title: "31 free hotel amenity icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons for a booking site: the bath and shower, " +
    "kitchen and laundry machines, a safe, a caravan, a tent and a castle.",
  standfirst: "Drawn off the amenity lists of two booking sites, one gap at a time.",
  date: "2026-10-30",
  updated: "2026-11-02",
  readingMinutes: 4,
  thumbnail: BLOG_V230_THUMBNAIL_ICON_NAMES,
  keywords: [
    "hotel amenities icons",
    "amenities icons",
    "bath icon",
    "shower icon",
    "soap dispenser icon",
    "fridge icon",
    "oven icon",
    "microwave icon",
    "washing machine icon",
    "air conditioning icon",
    "safe icon",
    "swimming pool icon",
    "luggage icon",
    "caravan icon",
    "sailboat icon",
    "stroller icon",
    "ev charger icon",
    "castle icon",
    "lighthouse icon",
    "tent icon",
    "no smoking icon",
    "wheelchair icon",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Hotel amenities are drawn from the bath to the safe. Most of the " +
        "31 new icons fill in the row a booking site uses to show what a " +
        "place offers. That row runs long: the kitchen, the washer, air " +
        "conditioning, whether you can smoke. This set used to stop at the " +
        "wifi and the parking. The rest of the 31 are for getting there " +
        "and what to see: a suitcase, a caravan, a tent, a castle.",
    },
    {
      kind: "p",
      text:
        "Each comes in stroke, two-tone, duotone and fill, with rounded or " +
        "sharp corners, so the set is now 1,654 icons and 13,232 SVGs.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V230_HERO_ICON_NAMES,
        caption:
          "Stroke on top, fill at the bottom. Fill has nothing to add to " +
          "`ski`, `wheelchair`, `waves-ladder` or `a-text-cursor`, so " +
          "those four keep their outline.",
      },
    },

    { kind: "h2", text: "The whole amenities row", id: "amenities" },
    {
      kind: "p",
      text:
        "A listing's whole amenities section now comes from one set, new " +
        "icons and old, in the groups a listing uses:",
    },
    {
      kind: "list",
      items: [
        "Bathroom: `bath`, `shower-head`, `bottle-pump` for the shampoo and " +
          "`soap-dispenser-droplet` for hand soap.",
        "Kitchen: `refrigerator`, `oven`, `microwave`, `cooking-pot`, and " +
          "`coffee-maker`, whose carafe also comes on its own as `coffee-pot`.",
        "Laundry and cleaning: `washing-machine` and `spray-can`.",
        "Comfort: `air-vent` for air conditioning, with `wifi` and `tv`.",
        "Safety: `vault` for the safe in the wardrobe, beside " +
          "`fire-extinguisher`, `briefcase-medical` for the first aid kit, " +
          "and `cctv`.",
        "Outside: `waves-ladder` for the pool, `grill` for the barbecue, " +
          "`ev-charger`, and `car` for parking.",
        "House rules: `cigarette` and `cigarette-off`, drawn at the same " +
          "size so one can replace the other without the row shifting, and " +
          "`paw-print` for pets.",
        "Access and service: `wheelchair` for a step-free entrance, " +
          "`concierge-bell` for the front desk and `luggage` for bag storage.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V230_AMENITY_ICON_NAMES,
        caption:
          "Twenty-one new icons and four that were already here, in the " +
          "order a listing reads.",
      },
    },

    { kind: "h2", text: "A safe used to be a padlock", id: "search" },
    {
      kind: "p",
      text:
        "A search for a safe used to find `lock`, a padlock, the closest " +
        "thing the set had, and a search for a castle found the chess " +
        "rook. Both were fair guesses and both were wrong on a listing. A " +
        "padlock says the door locks, not that there's a safe in the " +
        "wardrobe.",
    },
    {
      kind: "p",
      text:
        "Now each word finds its own drawing, and `chess-rook` is just a " +
        "chess piece again. The new names follow the most widely used open " +
        "icon set: the safe is `vault`, air conditioning `air-vent`, the pool " +
        "`waves-ladder` and the suitcase `luggage`. Code moving over from " +
        "that set keeps its names, and search here still answers to the " +
        "everyday word.",
    },

    { kind: "h2", text: "Five boxes, four sizes", id: "boxes" },
    {
      kind: "p",
      text:
        "Five of the new icons are rounded boxes: the fridge, the oven, the " +
        "microwave, the washing machine and the safe. At 16 pixels the small " +
        "details go first, so the outline does most of the work of telling " +
        "them apart.",
    },
    {
      kind: "p",
      text:
        "The set already had a size for each kind of box, measured off the " +
        "boxes drawn before, and these five use four of them:",
    },
    {
      kind: "table",
      head: ["Box", "At 24 pixels", "New icons"],
      rows: [
        ["Square", "20 by 20", "`vault`"],
        ["Tall", "18 by 22", "`oven`, `washing-machine`"],
        ["Narrow", "16 by 22", "`refrigerator`"],
        ["Wide", "22 by 18, on two feet", "`microwave`"],
      ],
    },
    {
      kind: "note",
      text:
        "A box that's only a little off square doesn't read as a new shape. " +
        "It reads as a square drawn too big.",
    },
    {
      kind: "p",
      text:
        "That rule keeps the washing machine 18 wide, not a nearly square " +
        "20. It costs a button: the panel on top fits the dial and one " +
        "button, not two. Each box keeps one detail of its own, like the " +
        "fridge's two doors or the safe's hinged door. Duotone draws that " +
        "detail black on a grey body and fill cuts it out of the solid, so " +
        "the five stay apart in every style.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V230_BOX_ICON_NAMES,
        caption: "From the narrow fridge to the square safe, stroke to fill.",
      },
    },

    { kind: "h2", text: "Getting there, and somewhere to go", id: "trip" },
    {
      kind: "p",
      text:
        "For the trip, `luggage`, `caravan`, `sailboat` and `stroller` join " +
        "the plane, bus, taxi and bike the set already had. For somewhere to " +
        "stay or something to see, there are `tent`, `barn`, `castle` and " +
        "`lighthouse`, and `ski` marks a resort.",
    },
    {
      kind: "p",
      text:
        "`a-text-cursor`, the one new icon with nothing to do with travel, " +
        "puts a capital A beside the text cursor, for a text field or a " +
        "tool that adds text.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V230_TRIP_ICON_NAMES,
        caption: "All ten are new in this update.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui " +
        "registry, the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

export const BLOG_V250_THUMBNAIL_ICON_NAMES = [
  "couch",
  "hot-tub",
  "breakfast",
  "desk-office",
  "sun-lounger",
  "bus-front",
  "blinds",
  "heater",
  "refrigerator-mini",
  "outdoor-seating",
  "mirror-round",
  "desk",
  "can-soda",
  "utensils",
  "sunrise-2",
  "sunset-2",
  "building-complex",
  "bookmarks",
  "briefcase-arrow-down",
  "pencil-ruler-2",
  "house-sparkles",
  "square-sparkles",
  "keyboard-off",
  "mouse-off",
  "server-off",
  "earbuds-off",
  "repeat-off",
  "flashlight-off",
  "wrench-off",
  "flag-off",
  "locate-off",
  "bookmark-off",
  "oven-off",
  "washing-machine-off",
  "cooking-pot-off",
  "ev-charger-off",
  "refresh-cw-off",
  "flame-off",
] as const

export const BLOG_V250_HERO_ICON_NAMES = [
  "couch",
  "hot-tub",
  "desk-office",
  "blinds",
  "breakfast",
  "sun-lounger",
  "bus-front",
  "sunrise-2",
] as const

export const BLOG_V250_ROOM_ICON_NAMES = [
  "couch",
  "sofa",
  "tv",
  "blinds",
  "heater",
  "desk",
  "desk-office",
  "wifi",
  "bed-double",
  "mirror-round",
  "refrigerator-mini",
  "can-soda",
  "breakfast",
  "utensils",
  "coffee-maker",
  "hot-tub",
  "sun-lounger",
  "outdoor-seating",
  "parasol",
  "waves-ladder",
] as const

export const BLOG_V250_OFF_ICON_NAMES = [
  "keyboard-off",
  "mouse-off",
  "server-off",
  "earbuds-off",
  "repeat-off",
  "flashlight-off",
  "wrench-off",
  "flag-off",
  "locate-off",
  "bookmark-off",
] as const

export const BLOG_V250_REDRAWN_ICON_NAMES = [
  "homes",
  "house",
  "castle",
  "store",
  "mail",
  "concierge-bell",
  "dumbbell",
  "image",
  "rocket",
] as const

/* Food, clothing and building in turn, the three the title names. The poster
   wall takes the first eight, so the list has to reach eight or it stops short. */
export const BLOG_V260_THUMBNAIL_ICON_NAMES = [
  "croissant",
  "dress",
  "hotel",
  "taco",
  "sneaker",
  "mosque",
  "donut",
  "pants",
] as const

export const BLOG_V260_MENU_ICON_NAMES = [
  "banana",
  "grape",
  "beef",
  "drumstick",
  "fish",
  "croissant",
  "donut",
  "popcorn",
  "salad",
  "taco",
  "burger-box-hot",
  "cup-soda",
  "hot-tea",
  "beer",
  "wine",
  "bottle-wine",
] as const

export const BLOG_V260_WARDROBE_ICON_NAMES = [
  "dress",
  "pants",
  "shorts",
  "socks",
  "sneaker",
  "hanger",
  "backpack",
  "ring-diamond",
] as const

export const BLOG_V260_PLACES_ICON_NAMES = [
  "cabin",
  "guesthouse",
  "hotel",
  "shepherds-hut",
  "church",
  "mosque",
  "temple",
  "school",
  "hospital",
  "tower",
  "bridge",
  "fountain",
  "ferris-wheel",
  "windmill",
  "warehouse",
  "parking",
] as const

export const BLOG_V260_ALIGN_ICON_NAMES = [
  "align-start-horizontal",
  "align-center-horizontal",
  "align-end-horizontal",
  "align-start-vertical",
  "align-center-vertical",
  "align-end-vertical",
  "align-horizontal-distribute-center",
  "align-vertical-distribute-center",
  "crop",
  "perspective",
  "move-3d",
  "rotate-3d",
  "scale-3d",
] as const

export const BLOG_V260_REDRAWN_ICON_NAMES = [
  "settings",
  "settings-dot",
  "images",
  "stethoscope",
  "wheelchair",
] as const

const RELEASE_2_6_0: BlogPost = {
  /* Food leads because it is the widest search the batch can win; clothes and
     buildings follow in the same title, the layout tools are for readers who
     arrive from a design tool and find them in the body. */
  slug: "food-clothing-and-building-icons",
  version: "2.6.0",
  title: "141 free food, clothing and building icons for React, shadcn/ui and Figma",
  description:
    "1,833 free, MIT-licensed SVG icons for React, shadcn/ui and Figma. New: " +
    "a croissant, a taco, a dress, a sneaker, a hotel, a mosque, and align " +
    "and distribute tools.",
  standfirst:
    "A delivery app, a clothes shop and a travel listing can now draw their " +
    "own menus.",
  date: "2026-11-08",
  updated: "2026-11-08",
  readingMinutes: 3,
  thumbnail: BLOG_V260_THUMBNAIL_ICON_NAMES,
  keywords: [
    "food icons",
    "drink icons",
    "croissant icon",
    "taco icon",
    "donut icon",
    "clothing icons",
    "dress icon",
    "sneaker icon",
    "hanger icon",
    "building icons",
    "hotel icon",
    "church icon",
    "mosque icon",
    "school icon",
    "hospital icon",
    "align icons",
    "distribute icons",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Most of this update is things people order, wear and visit: 141 " +
        "new drawings, each in stroke, two-tone, duotone and fill, with " +
        "rounded and sharp corners. Ten that already shipped were drawn " +
        "again.",
    },
    {
      kind: "p",
      text:
        "Three kinds of product were short of words before this. A " +
        "restaurant menu had a fork and a coffee cup. A clothes shop had a " +
        "shirt. A map of a town had a house and an office block, and " +
        "nothing to tell a school from a hotel.",
    },

    { kind: "h2", text: "A menu needs more than a fork", id: "menu" },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V260_MENU_ICON_NAMES,
        caption: "Sixteen things to eat and drink.",
      },
    },
    {
      kind: "p",
      text:
        "Fill works hardest here, where a dish is often 16 pixels wide " +
        "next to its price. The `croissant` splits along its folds and the " +
        "`taco` keeps a gap between shell and lettuce, so each still reads " +
        "as what it is when it goes solid.",
    },

    { kind: "h2", text: "One wardrobe, cut the same way", id: "wardrobe" },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V260_WARDROBE_ICON_NAMES,
        caption: "The fill cuts a waist into the dress and the trousers alike.",
      },
    },
    {
      kind: "p",
      text:
        "The `dress` has a scoop neck and the `pants` a belt line, and in " +
        "fill both take the same white cut at the waist. Side by side in a " +
        "category list they look like one shop's stock.",
    },

    { kind: "h2", text: "A street you can tell apart", id: "street" },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V260_PLACES_ICON_NAMES,
        caption: "Places to stay, worship, learn and visit.",
      },
    },
    {
      kind: "p",
      text:
        "Every one of these is a roof over a door, which is exactly why " +
        "they are easy to confuse. The difference is carried by the part " +
        "only that building has: the minaret, the school's flag, the " +
        "hospital's cross, the ladder up the `shepherds-hut`.",
    },

    { kind: "h2", text: "align-left was about text all along", id: "align-names" },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V260_ALIGN_ICON_NAMES,
        caption: "Tools for arranging objects on a canvas.",
      },
    },
    {
      kind: "p",
      text:
        "The six icons that line up paragraphs carried the names a design " +
        "tool uses for lining up objects. Now that the objects have their " +
        "own drawings, `align-left` is `text-align-start`, `align-center` " +
        "is `text-align-center`, `align-right` is `text-align-end` and " +
        "`align-justify` is `text-align-justify`, with the two `-2` " +
        "versions following. `flower` became `circles-five`, which is what " +
        "it shows. Old names still find the right drawing in search, the " +
        "old pages redirect, and old imports keep working until the next " +
        "major version.",
    },

    { kind: "h2", text: "The gear got its teeth back", id: "gear" },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V260_REDRAWN_ICON_NAMES,
        caption: "Before and after.",
      },
    },
    {
      kind: "p",
      text:
        "`settings` is the icon most apps show most often, so it was worth " +
        "drawing again from nothing. `settings-dot` follows it, with its " +
        "padding whole on every side.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text: "React, shadcn/ui, the CLI, the MCP server and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text: "Every drawing in this update, shelf by shelf.",
    },
  ],
}

const RELEASE_2_5_0: BlogPost = {
  /* Furniture leads because it is the search this post can win; the off
     states and the redraws are half the batch but are in every set's
     release. React before shadcn/ui so the card does not break at the
     slash. */
  slug: "furniture-room-and-minibar-icons",
  version: "2.5.0",
  title: "38 free furniture and room icons for React, shadcn/ui and Figma",
  description:
    "1,692 free, MIT-licensed SVG icons for React, shadcn/ui and Figma. New: " +
    "a couch, a desk, blinds, a hot tub, a minibar fridge, breakfast and " +
    "sixteen off states.",
  standfirst:
    "The bus turns to face you in this release, as the tram, the car and " +
    "the taxi already did.",
  date: "2026-11-01",
  updated: "2026-11-01",
  readingMinutes: 4,
  thumbnail: BLOG_V250_THUMBNAIL_ICON_NAMES,
  keywords: [
    "furniture icons",
    "room icons",
    "couch icon",
    "sofa icon",
    "desk icon",
    "office desk icon",
    "blinds icon",
    "radiator icon",
    "heater icon",
    "hot tub icon",
    "jacuzzi icon",
    "sun lounger icon",
    "patio icon",
    "minibar icon",
    "mini fridge icon",
    "soda can icon",
    "breakfast icon",
    "cutlery icon",
    "mirror icon",
    "sunrise icon",
    "sunset icon",
    "keyboard off icon",
    "transport icons",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Furniture fills the room this time: the couch, the desk, the " +
        "blinds, the heater, the minibar. The last update gave a listing " +
        "its bathroom and kitchen, and this one adds the room around them. " +
        "The outside is drawn too: a hot tub, a sun lounger, a table under " +
        "a parasol.",
    },
    {
      kind: "p",
      text:
        "Alongside the 38 new icons, 47 that already shipped were redrawn, " +
        "most of them in duotone. The set is at 1,692 icons, each in " +
        "stroke, two-tone, duotone and fill with rounded or sharp corners: " +
        "13,536 SVGs.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V250_HERO_ICON_NAMES,
        caption:
          "The couch, the hot tub and six more, stroke to fill. " +
          "`sunrise-2` and `sunset-2` set the sun over waves, where the " +
          "shipped `sunrise` and `sunset` stand it on a flat line.",
      },
    },

    { kind: "h2", text: "Minibar used to find nothing", id: "search" },
    {
      kind: "p",
      text:
        "Until this update, searching this site for a minibar came back " +
        "empty, and so did sunbed, jacuzzi, radiator, blinds, cutlery, " +
        "breakfast and soda. Each word now finds its drawing, and a " +
        "listing's rooms come from one set, new icons and old:",
    },
    {
      kind: "list",
      items: [
        "Living room: `couch` beside the shipped `sofa`, `tv`, `blinds`, " +
          "and `heater` for heating.",
        "Work: `desk` with its lamp and `desk-office` with its drawers, " +
          "beside `wifi`.",
        "Bedroom: `bed-double` and `mirror-round`, a mirror on a stand.",
        "Minibar and breakfast: `refrigerator-mini`, `can-soda`, " +
          "`breakfast` for breakfast included, `utensils` and `coffee-maker`.",
        "Outside: `hot-tub`, `sun-lounger`, `outdoor-seating` for a " +
          "terrace, and `parasol` and `waves-ladder` by the pool.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V250_ROOM_ICON_NAMES,
        caption: "Thirteen of the twenty are new.",
      },
    },
    {
      kind: "p",
      text:
        "Words for drawings that were already here moved too. Searching for " +
        "transport found two of the set's vehicles, a bus and a truck, and " +
        "transportation found none. Both now find all 47, trucks included, " +
        "and so does vehicle, on the site, in the Figma plugin, the CLI and " +
        "the MCP server.",
    },

    {
      kind: "h2",
      text: "The slash takes whole keys, never half of one",
      id: "off",
    },
    {
      kind: "p",
      text:
        "Sixteen of the new icons are off states: the keyboard, the mouse " +
        "and the server, the earbuds, the flashlight, the wrench, the flag, " +
        "the bookmark and eight more, for a device that is disconnected or " +
        "a feature that is turned off.",
    },
    {
      kind: "p",
      text:
        "Each is its original at the same size with a slash across it, and " +
        "the slash never leaves half of something behind. `keyboard-off` " +
        "keeps four of its eight keys. The four it drops are the ones the " +
        "slash runs through. Cut in half, a key is a speck at 16 pixels, " +
        "and a speck reads as dirt on the screen, not as part of a keyboard.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V250_OFF_ICON_NAMES,
        caption:
          "Ten of the sixteen. `oven-off`, `washing-machine-off` and " +
          "`cooking-pot-off` give the kitchen and laundry from the last " +
          "update an out of order state.",
      },
    },

    { kind: "h2", text: "Ten doors cut through the floor", id: "doors" },
    {
      kind: "p",
      text:
        "In duotone, ten buildings drew their door wrong. Eight drew it as " +
        "a black line, in the one style that has no lines: the house and " +
        "the home, the house with a chimney, the store, the barn, the " +
        "castle and both office blocks. The other two, `homes` and " +
        "`houses`, cut the door out through the bottom edge, which split " +
        "the front wall into two legs.",
    },
    {
      kind: "p",
      text:
        "Every door is now a solid shape, black on a grey wall or cut out " +
        "of a black one. And every door stops two pixels short of the " +
        "ground, so the wall runs unbroken along the bottom.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The front house of `homes`, old over new",
            a: { name: "homes", take: "before" },
            b: { name: "homes", take: "after" },
            verdict: {
              text: "All the colour is wall the new drawing adds",
              tone: "good",
            },
          },
          {
            title: "Ten units around the door",
            a: { name: "homes", take: "before" },
            b: { name: "homes", take: "after" },
            viewBox: "9 13 10 10",
            verdict: {
              text: "A frame round the door and a sill under it",
              tone: "good",
            },
          },
        ],
        caption:
          "The old door was 6 pixels wide at 24 and open at the bottom. The " +
          "new one is 4 wide, round at the top, and stops 2 above the " +
          "ground. None of the first ink shows anywhere, so the new door " +
          "sits wholly inside the old one.",
        legend: {
          a: "black as it shipped",
          b: "black as it is now",
          both: "black that did not move",
        },
      },
    },
    {
      kind: "p",
      text:
        "In the other 37 redraws, fills that ran parts together now keep " +
        "them apart: the envelope's flap from its body, the bell's dome " +
        "from its base, the dumbbell's weights from the bar. In duotone " +
        "the picture's mountain is solid across the ten image icons, and " +
        "the three rockets are black with grey fins. In sharp corners, the " +
        "money bag and its five signs tie the same knot as in rounded.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V250_REDRAWN_ICON_NAMES,
        caption:
          "Each in the style that changed: duotone for the buildings, the " +
          "picture and the rocket, fill for the envelope, the bell and the " +
          "dumbbell.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "React, React Native, Vue, Svelte and Solid, the shadcn/ui " +
        "registry, the CLI, the MCP server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

/* The card's six first, then the icons shadcn/ui's own components import,
   which is the set a swap has to cover before anything else. */
export const BLOG_SWAP_THUMBNAIL_ICON_NAMES = [
  "bell",
  "house",
  "inbox",
  "calendar",
  "search",
  "settings",
  "check",
  "x",
  "chevron-down",
  "chevron-up",
  "chevron-left",
  "chevron-right",
  "circle",
  "more-horizontal",
  "minus",
  "grip-vertical",
  "panel-left",
  "loader-circle",
  "circle-check",
  "info",
  "octagon-x",
  "triangle-alert",
  "arrow-left",
  "arrow-right",
  "user",
  "plus",
  "menu",
  "bin",
  "bin-2",
  "credit-card",
  "mail",
  "star",
  "heart",
  "copy",
  "eye",
  "log-out",
  "sun",
  "moon",
] as const

export const BLOG_SWAP_STYLES_ICON_NAMES = [
  "bell",
  "calendar",
  "house",
  "inbox",
  "settings",
  "credit-card",
] as const

const LUCIDE_ALTERNATIVES: BlogPost = {
  /* Not a release post, so no `version`: the title carries the search a
     reader types, and the post answers it before it argues anything. Every
     claim about another set comes from its own README or site, dated in the
     text; every claim about shadcn/ui from its component source. The year
     sits in the title, never the slug: people add it to this search, and a
     stale one costs more clicks than none, so each January the counts are
     re-read, the year moves and `updated` with it, at the same URL. */
  slug: "lucide-alternatives-shadcn-ui",
  title: "Lucide alternatives for shadcn/ui in 2026, and what breaks when you swap",
  description:
    "Tabler, Phosphor, Heroicons and Keyline compared for shadcn/ui, with the " +
    "import swap and the two sizing rules that override icons in Button and " +
    "Sidebar.",
  standfirst:
    "Checked against shadcn's component source and each set's own README, October 2026.",
  kind: "guide",
  cover: {
    logos: [
      { name: "Lucide", src: "/blog/lucide-alternatives-shadcn-ui/logos/lucide.svg" },
      { name: "Tabler Icons", src: "/blog/lucide-alternatives-shadcn-ui/logos/tabler.svg" },
      { name: "Phosphor", src: "/blog/lucide-alternatives-shadcn-ui/logos/phosphor.svg" },
      { name: "Heroicons", src: "/blog/lucide-alternatives-shadcn-ui/logos/heroicons.svg" },
      { name: "Keyline Icons", src: "/logo/logo.svg" },
    ],
    image: {
      src: "/blog/lucide-alternatives-shadcn-ui/compare-grid.png",
      width: 1200,
      height: 670,
    },
  },
  date: "2026-10-31",
  updated: "2026-10-31",
  readingMinutes: 4,
  thumbnail: BLOG_SWAP_THUMBNAIL_ICON_NAMES,
  keywords: [
    "lucide alternative",
    "lucide alternative shadcn/ui",
    "replace lucide-react",
    "shadcn/ui icons",
    "shadcn icon library",
    "filled icons for shadcn/ui",
    "tabler icons",
    "phosphor icons",
    "heroicons",
    "free svg icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "If you want off Lucide in a shadcn/ui project, pick a set drawn on the " +
        "same 24×24 grid with a 2px stroke. Tabler Icons and Keyline Icons both " +
        "are, so your components keep their spacing and the change is mostly an " +
        "import path. Pick Phosphor for several weights of one drawing, and " +
        "Heroicons for the Tailwind look, if a smaller set will do.",
    },
    {
      kind: "p",
      text:
        "Keyline is this site's own set, so its weak spots are listed here like " +
        "everyone else's.",
    },

    { kind: "h2", text: "Four sets that fit", id: "compared" },
    {
      kind: "table",
      head: ["Set", "Grid and stroke", "Styles", "Icons", "React package"],
      rows: [
        [
          {
            text: "Lucide",
            href: "https://lucide.dev",
            logo: "/blog/lucide-alternatives-shadcn-ui/logos/lucide.svg",
          },
          "24×24, 2px",
          "Outline",
          "2,015",
          "`lucide-react`",
        ],
        [
          {
            text: "Tabler Icons",
            href: "https://tabler.io/icons",
            logo: "/blog/lucide-alternatives-shadcn-ui/logos/tabler.svg",
          },
          "24×24, 2px",
          "Outline, and filled for 1,054",
          "6,257",
          "`@tabler/icons-react`",
        ],
        [
          {
            text: "Phosphor",
            href: "https://phosphoricons.com",
            logo: "/blog/lucide-alternatives-shadcn-ui/logos/phosphor.svg",
          },
          "Its own grid",
          "Six weights, from thin to duotone",
          "1,200+",
          "`@phosphor-icons/react`",
        ],
        [
          {
            text: "Heroicons",
            href: "https://heroicons.com",
            logo: "/blog/lucide-alternatives-shadcn-ui/logos/heroicons.svg",
          },
          "24×24 at 1.5px, plus 20 and 16 solid",
          "Outline, solid",
          "316",
          "`@heroicons/react`",
        ],
        [
          {
            text: "Keyline Icons",
            href: "/icons",
            logo: "/logo/logo.svg",
          },
          "24×24, 2px",
          "Stroke, two-tone, duotone and fill, each rounded and sharp",
          "1,654",
          "`@keyline-icons/react`",
        ],
      ],
    },
    {
      kind: "p",
      text:
        "Counts are from each project's site or README in October 2026. All " +
        "five are free for commercial use: Lucide under ISC, the rest under MIT.",
    },
    {
      kind: "image",
      src: "/blog/lucide-alternatives-shadcn-ui/compare-grid.png",
      width: 1200,
      height: 670,
      alt:
        "Home, search, settings, user, bell, calendar, trash and chart icons " +
        "from Lucide, Tabler Icons, Phosphor, Heroicons and Keyline Icons at " +
        "48px and 24px",
      caption:
        "Each set's own SVG at its default stroke, used under the licences " +
        "above, as are the sheets below. Keyline's trash is `bin`, and " +
        "Phosphor and Heroicons call search `magnifying-glass`.",
    },
    {
      kind: "list",
      items: [
        "Tabler matches the geometry and is by far the biggest. Only 1,054 of " +
          "its icons have a filled version, so check yours before counting on " +
          "filled active states. The stroke prop is `stroke`, not " +
          "`strokeWidth`, and names are prefixed: `IconBell`.",
        "Phosphor is the one for weights, picked with a `weight` prop. Install " +
          "`@phosphor-icons/react`, not the old `phosphor-react`, and import " +
          "from `@phosphor-icons/react/ssr` in Server Components. It draws " +
          "rounder than the rest.",
        "Heroicons draws its 16 and 20 pixel solid sets at those sizes rather " +
          "than scaling them down, which is its best feature. The set is small " +
          "and closed to new icon requests.",
        "Keyline has every icon in four styles, each with rounded or sharp " +
          "corners: eight versions of every name, none missing. It's young, out " +
          "of beta since September 2026, and a quarter the size of Tabler, so " +
          "check coverage first if your product spans niche areas.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_SWAP_STYLES_ICON_NAMES,
        caption: "Six of Keyline's icons in its four styles. Each also comes with sharp corners.",
      },
    },
    {
      kind: "p",
      text:
        "People usually leave Lucide for one of three reasons: no filled style " +
        "to mark a selected item, a product that looks like every other shadcn " +
        "app, or an icon it doesn't have. Borrowing that one icon from another " +
        "set is how two stroke weights end up on one screen.",
    },
    {
      kind: "note",
      text: "If none of the three is yours, stay. Lucide is good.",
    },

    { kind: "h2", text: "The swap is an import path", id: "swap" },
    {
      kind: "p",
      text:
        "shadcn copies its components into your repo, so the imports to change " +
        "live in your own files, `components/ui/` included.",
    },
    {
      kind: "code",
      code: `grep -rn --exclude-dir=node_modules 'from "lucide-react"' .`,
    },
    {
      kind: "p",
      text:
        "Every set changes the import path. Three of them also change the " +
        "names, and that is most of the work:",
    },
    {
      kind: "code",
      code:
        `import { Search, Settings } from "lucide-react"\n` +
        `import { IconSearch, IconSettings } from "@tabler/icons-react"\n` +
        `import { MagnifyingGlassIcon, GearIcon } from "@phosphor-icons/react"\n` +
        `import { MagnifyingGlassIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"\n` +
        `import { Search, Settings } from "@keyline-icons/react"`,
    },
    {
      kind: "p",
      text:
        "Keyline keeps Lucide's names. Every icon shadcn's components import " +
        "is there under the same name, `CheckIcon` as well as `Check`, except " +
        "the spinner: `Loader2Icon` is `LoaderCircleIcon`. In your own code, " +
        "the rename you'll meet most is the bin: `Trash` and `Trash2` are " +
        "`Bin` and `Bin2`. There's no `absoluteStrokeWidth`; the stroke " +
        "scales with the icon.",
    },
    {
      kind: "p",
      text:
        "To own the files instead of adding a dependency, the shadcn CLI copies " +
        "single icons in as components that import nothing: " +
        "`npx shadcn add @keyline/bell`.",
    },

    { kind: "h2", text: "shadcn sizes your icons, not you", id: "sizing" },
    {
      kind: "p",
      text:
        "Icon size is what catches people after a swap, whichever set they pick. " +
        "shadcn's components size the SVGs inside them with Tailwind classes, " +
        "and Button and Sidebar use different rules.",
    },
    {
      kind: "p",
      text:
        "Button uses `[&_svg:not([class*='size-'])]:size-4`. Every SVG inside " +
        "is 16px unless it carries a `size-*` class of its own:",
    },
    {
      kind: "code",
      code:
        `<Button>\n` +
        `  <Plus />                     {/* 16px: the button sized it */}\n` +
        `  <Plus size={32} />           {/* still 16px: the class beats the attribute */}\n` +
        `  <Plus className="size-6" />  {/* 24px: the button steps aside */}\n` +
        `</Button>`,
    },
    {
      kind: "image",
      src: "/blog/lucide-alternatives-shadcn-ui/button-sizing.png",
      width: 1000,
      height: 209,
      alt:
        "Three buttons with a Keyline plus icon: 16px by default, still 16px " +
        "with size 32, and 24px with a size-6 class",
      caption:
        "Rendered in Chromium with Button's own selector. The width that " +
        "`size={32}` writes loses to the class, and a `size-6` class opts out.",
    },
    {
      kind: "p",
      text:
        "Sidebar menu buttons use `[&>svg]:size-4` instead, with no way out " +
        "for your own class. To change icon size there, edit the class in " +
        "`components/ui/sidebar.tsx`. If an icon won't resize after a swap, " +
        "it's one of these two rules, not the new set.",
    },
    {
      kind: "p",
      text:
        "Both rules land on 16px, so judge a set there, not at the 24 it was " +
        "drawn on.",
    },
    {
      kind: "image",
      src: "/blog/lucide-alternatives-shadcn-ui/small-sizes.png",
      width: 704,
      height: 456,
      alt:
        "Eight icons from Lucide, Tabler Icons, Phosphor, Heroicons and " +
        "Keyline Icons at 16px, with Home and Settings next to 14px text",
      caption:
        "On a desktop screen this sheet is at true size. Heroicons here is its " +
        "24px outline set scaled down, not the solid sets it draws at 16 and 20.",
    },

    { kind: "h2", text: "A selected item needs a second drawing", id: "active" },
    {
      kind: "p",
      text:
        "A selected nav item reads best as the same icon in a heavier style. " +
        "That only works when the heavy version is the same drawing, and Lucide " +
        "has no filled style, so its selected item can only change the " +
        "background. In Keyline each style is its own import:",
    },
    {
      kind: "code",
      code:
        `import { House } from "@keyline-icons/react"\n` +
        `import { House as HouseFill } from "@keyline-icons/react/fill"\n` +
        `\n` +
        `function NavIcon({ active }: { active: boolean }) {\n` +
        `  const Icon = active ? HouseFill : House\n` +
        `  return <Icon />\n` +
        `}`,
    },
    {
      kind: "image",
      src: "/blog/lucide-alternatives-shadcn-ui/sidebar-before-after.png",
      width: 1000,
      height: 439,
      alt:
        "Two shadcn sidebars: with Lucide the active Home item only gets a " +
        "background, with Keyline its house switches to the filled drawing",
      caption:
        "The same sidebar on `lucide-react` and on `@keyline-icons/react`. " +
        "Only the second can switch Home to its fill drawing. Lucide icons " +
        "© Lucide Icons and Contributors, ISC licence.",
    },
    {
      kind: "p",
      text:
        "Phosphor does the same with one prop, " +
        '`weight={active ? "fill" : "regular"}`, Heroicons with an import ' +
        "from `@heroicons/react/24/solid`, and Tabler with `IconBell` and " +
        "`IconBellFilled`, where a filled version exists.",
    },
    {
      kind: "image",
      src: "/blog/lucide-alternatives-shadcn-ui/active-states.png",
      width: 1200,
      height: 518,
      alt:
        "The bell resting and selected in Lucide, Tabler Icons, Phosphor, " +
        "Heroicons and Keyline Icons; Lucide has no filled version",
      caption:
        "The bell, resting and selected. Tabler's filled bell is one of its " +
        "1,054 filled icons.",
    },
    {
      kind: "p",
      text:
        "To choose between two sets, swap the sidebar first. It has both " +
        "sizing rules and a selected item, so it shows every problem here " +
        "before the rest of the app moves.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/install#lucide",
      label: "Switch from Lucide",
      text: "Every name and prop that differs, and the shadcn registry setup.",
    },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the icons",
      text: "Every drawing, all four styles, both corner shapes.",
    },
    {
      kind: "link",
      href: "/custom",
      label: "Custom icons",
      text: "A family no set covers, drawn on the same grid as the free ones.",
    },
  ],
}

export const BLOG_POSTS: readonly BlogPost[] = [
  LUCIDE_ALTERNATIVES,
  RELEASE_2_6_0,
  RELEASE_2_5_0,
  RELEASE_2_3_0,
  RELEASE_2_2_0,
  RELEASE_2_1_0,
  RELEASE_2_0_0,
  RELEASE_1_8_0,
  RELEASE_1_7_0,
  RELEASE_1_6_0,
  RELEASE_1_5_0,
  RELEASE_1_4_0,
  RELEASE_1_3_0,
  RELEASE_1_2_0,
  RELEASE_1_1_0,
  RELEASE_1_0_0,
  BATCH_0_9_0,
  BATCH_0_8_0,
  BATCH_0_7_0,
  BATCH_0_6_0,
  BATCH_0_5_0,
  BATCH_0_3_1,
]

export const findPost = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug)

/**
 * Updates per page of `/blog`: the two-across row and three rows of three, so
 * a full page ends on a full row at three columns. It was fourteen, four rows
 * of three, and he moved the last row (1.1.0, 1.0.0, 0.9.0) to page 2: "move
 * these 3 to the next page", 1 Nov 2026. Guides sit above the updates on page
 * 1 only and do not count against it: they are few, kept current, and the
 * reason the page is visited from a search.
 *
 * Pages past the first are addressed and indexed the way `/icons?page=N` is:
 * see `app/blog/page.tsx`.
 */
export const BLOG_PAGE_SIZE = 11

/**
 * The update being drawn now, shown first on page 1 as a placeholder until
 * its post exists. Set to `null` in the commit that adds the post; nothing
 * else reads it.
 */
export const BLOG_UPCOMING: { version: string } | null = null

/** The updates, newest first: what the pages divide between them. */
export const BLOG_UPDATES = BLOG_POSTS.filter((post) => post.kind !== "guide")

export const blogPageCount = () =>
  Math.max(1, Math.ceil(BLOG_UPDATES.length / BLOG_PAGE_SIZE))

/**
 * The address of one page of the blog. Page 1 is the bare `/blog`, never
 * `?page=1`, so the first page has one address and not two.
 */
export const blogPageHref = (page: number) =>
  page > 1 ? `${BLOG_SEGMENT}?page=${page}` : BLOG_SEGMENT

/**
 * The date, as the site prints dates elsewhere: "6 September 2026".
 *
 * `en-GB` and an explicit UTC zone. The dates in this file are plain ISO days,
 * which `Date` reads as midnight UTC, so a build machine west of Greenwich
 * would otherwise print the day before.
 */
export const postDateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
