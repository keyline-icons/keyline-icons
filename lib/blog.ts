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
  /**
   * The line the index tile carries, in place of the title: short, in the
   * post's own words, told the way a newsroom tells it (his reference, Apple
   * Newsroom, 1 Nov 2026: "look how titles are done and if you look at ours,
   * they all read same"). The title stays the search line, for the `h1`, the
   * `<title>` and the card; twenty titles in one template read as one post
   * repeated, so the index leads with this instead. Taken from the post's
   * standfirst or its best heading, never a new claim. No version: the
   * poster carries it.
   */
  headline?: string
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
 * card headline, the index entry and the breadcrumb.
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
 * One function rather than `post.title` at each call site, because five
 * surfaces print this and a second spelling on any of them is a title that
 * disagrees with the page it is on, which is the one thing Google rewrites.
 */
export const postHeadline = (post: BlogPost) => post.title

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

export const BLOG_CLOUD_ICON_NAMES = [
  "cloud-plus",
  "cloud-check",
  "cloud-x",
  "cloud-alert",
] as const

export const BLOG_APP_ICON_NAMES = [
  "app-plus",
  "app-minus",
  "app-check",
  "app-x",
  "app-dot",
] as const

/**
 * The three that came out of one drawing: a canopy, a hem and a pole.
 *
 * There were four. `umbrella-closed` was drawn, written up here, and then
 * dropped before the tag; `check-demos` is what caught it still being named,
 * which is the whole reason these lists are `*_ICON_NAMES`.
 */
export const BLOG_UMBRELLA_ICON_NAMES = [
  "umbrella",
  "umbrella-off",
  "parasol",
] as const

/** The rest of the batch, the ones that belong to no family. */
export const BLOG_SINGLES_ICON_NAMES = [
  "briefcase",
  "bug",
  "crown",
  "flag",
  "flag-chequered",
  "traffic-light",
  "credit-card-2",
  "settings-dot",
  "replay",
  "move",
  "maximize-2",
  "circle-progress-play",
] as const

/**
 * The duplicate and the drawing it was a copy of, side by side.
 *
 * `git-branch` is here so the figure can make the point the prose makes: for
 * seven releases these two names rendered the same picture.
 */
export const BLOG_GIT_ICON_NAMES = ["git-branch", "git-merge"] as const

/** The bells whose plates were rebuilt as verified offsets. */
export const BLOG_BELL_ICON_NAMES = [
  "bell",
  "bell-dot",
  "bell-check",
  "bell-x",
  "bell-plus",
  "bell-minus",
  "bell-off",
] as const

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

/** Transport, Nature and Animals, and the money box that is not an animal. */
export const BLOG_V090_TRANSPORT_ICON_NAMES = [
  "plane", "plane-takeoff", "plane-landing", "ship", "train-front", "bike",
] as const
export const BLOG_V090_NATURE_ICON_NAMES = [
  "tree-palm", "leaf", "wind-turbine", "droplet", "droplet-off", "droplets",
] as const
export const BLOG_V090_ANIMAL_ICON_NAMES = ["bird", "pig", "piggy-bank"] as const

/** AI, Science and Health. */
export const BLOG_V090_AI_ICON_NAMES = ["bot", "brain-circuit"] as const
export const BLOG_V090_SCIENCE_ICON_NAMES = [
  "flask-conical", "flask-conical-off", "flask-round",
  "test-tube", "test-tube-diagonal", "test-tubes",
] as const
export const BLOG_V090_HEALTH_ICON_NAMES = [
  "brain", "lungs", "ear", "ear-listen", "ear-waveform", "thermometer",
] as const

/** The rest of the twenty-nine, filed with shelves that already existed. */
export const BLOG_V090_MEASURE_ICON_NAMES = [
  "temperature-empty", "temperature-quarter", "temperature-half",
  "temperature-high", "temperature-full", "thermometer-sun",
  "thermometer-snowflake",
] as const
export const BLOG_V090_HAND_ICON_NAMES = [
  "hand-pointer", "hand-pointer-right", "hand-pointer-down", "hand-pointer-left",
] as const
export const BLOG_V090_LISTEN_ICON_NAMES = [
  "earbuds", "airpods", "airpods-open", "radar",
] as const

/** The base and its nine, and the drawing whose name turned round. */
export const BLOG_V090_TRUCK_ICON_NAMES = [
  "truck", "truck-plus", "truck-minus", "truck-check", "truck-x",
  "truck-arrow-up", "truck-arrow-down", "truck-arrow-left",
  "truck-arrow-right", "truck-electric",
] as const
export const BLOG_V090_RENAMED_ICON_NAMES = ["hand-heart"] as const

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

/** The Home shelf. */
export const BLOG_V080_HOME_ICON_NAMES = [
  "bed", "bed-single", "bed-double", "sofa", "door", "door-open", "brick-wall",
] as const

/** Food & Drink. */
export const BLOG_V080_TABLE_ICON_NAMES = ["coffee", "cake", "soup", "bottle"] as const

/** Art, and the three keys that are three different keys. */
export const BLOG_V080_ART_ICON_NAMES = [
  "paintbrush", "paint-roller", "palette", "easel",
] as const
export const BLOG_V080_KEY_ICON_NAMES = ["key", "key-round", "key-square"] as const

/** The two doors, which share a frame and not a leaf. */
export const BLOG_V080_DOOR_ICON_NAMES = ["door", "door-open"] as const

/** The twelve redrawn, shown before against after. */
export const BLOG_V080_REDRAWN_ICON_NAMES = [
  "calendar", "calendar-off", "calendar-plus", "calendar-minus",
  "calendar-check", "calendar-x", "calendar-arrow-down", "calendar-arrow-up",
  "calendar-arrow-left", "calendar-arrow-right", "phone", "phone-off",
] as const

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

/** The badge and its nine signs. */
export const BLOG_V070_BADGE_ICON_NAMES = [
  "badge",
  "badge-check",
  "badge-x",
  "badge-plus",
  "badge-minus",
  "badge-alert",
  "badge-info",
  "badge-question",
  "badge-percent",
  "badge-dollar-sign",
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

/** The same option in the two bodies, round then square, four times over. */
export const BLOG_V070_PAIR_ICON_NAMES = [
  "message",
  "message-square",
  "message-dot",
  "message-square-dot",
  "message-off",
  "message-square-off",
  "messages",
  "messages-square",
] as const

/** The four that are one object each. */
export const BLOG_V070_SINGLES_ICON_NAMES = [
  "qr-code",
  "scan",
  "scissors",
  "hourglass",
] as const

/** The scan frame's family, and the slash pair. */
export const BLOG_V070_SCAN_ICON_NAMES = [
  "scan",
  "scan-line",
  "scan-text",
  "scan-barcode",
  "scan-qr-code",
  "scan-search",
  "scan-eye",
  "slash",
  "search-slash",
] as const

/** The sixteen charts on one axis, in the Changelog's order. */
export const BLOG_V070_AXIS_CHART_ICON_NAMES = [
  "chart-column",
  "chart-bar",
  "chart-gantt",
  "chart-line",
  "chart-spline",
  "chart-line-increasing",
  "chart-line-decreasing",
  "chart-area",
  "chart-scatter",
  "chart-candlestick",
  "chart-pie",
  "chart-column-big",
  "chart-column-stacked",
  "chart-bar-big",
  "chart-bar-stacked",
  "chart-network",
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

/** The four diagrams, a shelf of their own. */
export const BLOG_V070_DIAGRAM_ICON_NAMES = [
  "diagram-successor",
  "diagram-predecessor",
  "diagram-project",
  "diagram-subtask",
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

/** The four that are one object each, as opposed to the book's six. */
export const BLOG_V060_SINGLES_ICON_NAMES = [
  "flame",
  "store",
  "buildings",
  "cpu",
  "graduation-cap",
] as const

/** The money half of the batch: a wallet, the card's four signs, seven marks. */
/** The six currency marks that fit inside a ring. Bitcoin does not. */
export const BLOG_V060_CIRCLED_ICON_NAMES = [
  "circle-dollar-sign",
  "circle-euro",
  "circle-pound-sterling",
  "circle-japanese-yen",
  "circle-indian-rupee",
  "circle-swiss-franc",
] as const

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

/** The seven currency marks on their own, so the shared cap is visible. */
export const BLOG_V060_CURRENCY_ICON_NAMES = [
  "dollar-sign",
  "euro",
  "pound-sterling",
  "japanese-yen",
  "indian-rupee",
  "swiss-franc",
  "bitcoin",
] as const

/** The book family, shown together because that is how it was drawn. */
export const BLOG_V060_BOOK_ICON_NAMES = [
  "book",
  "book-open",
  "book-plus",
  "book-minus",
  "book-check",
  "book-x",
] as const

export const BLOG_V050_THUMBNAIL_ICON_NAMES = [
  "bold",
  "italic",
  "underline",
  "align-left",
  "quote",
  "list-ordered",
  "strikethrough",
  "align-center",
  "align-right",
  "align-justify",
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

/** The chain, after the swap: two names moved and one was renamed with them. */
export const BLOG_LINK_ICON_NAMES = [
  "link",
  "link-2",
  "link-2-off",
  "unlink",
] as const

/** The Text shelf, which this release created. */
export const BLOG_TEXT_SHELF_ICON_NAMES = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "align-left",
  "align-center",
  "align-right",
  "align-justify",
  "quote",
  "quote-end",
  "quote-single",
  "quote-single-end",
  "text-quote",
  "language",
] as const

/** Everything else new this round: no family, one decision each. */
export const BLOG_V050_SINGLES_ICON_NAMES = [
  "bell-ring",
  "phone",
  "phone-off",
  "message-lines",
  "send",
  "send-horizontal",
  "layers",
  "list",
  "list-ordered",
  "share-2",
  "sparkle",
  "sparkles",
  "zap",
  "zap-off",
  "sun-dim",
  "sun-medium",
  "fullscreen-2",
  "fullscreen-exit-2",
] as const

/** The seven redrawn, which is what the changelog's pairs column carries. */
export const BLOG_V050_REDRAWN_ICON_NAMES = [
  "link",
  "clock",
  "sliders-horizontal",
  "sliders-vertical",
  "pen",
  "pen-line",
  "pen-off",
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
    "Also new: a crown, a chequered flag, a traffic light, a bug, a " +
    "briefcase and an umbrella that turns into a parasol.",
  headline: "A merge that was a branch all along",
  date: "2026-09-06",
  updated: "2026-11-01",
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
        "An order page shows the same parcel over and over: packed, " +
        "shipped, delivered, sent back. Until this update the set had the " +
        "box and nothing to put on it.",
    },
    {
      kind: "p",
      text:
        "This update adds 43 icons and takes the set to 629. Nine of them " +
        "are the parcel with something on it, ten put a symbol on a search " +
        "glass, and the cloud and the app tile get theirs. Alongside them, " +
        "315 drawings that had already shipped were redrawn, nearly all of " +
        "them in sharp corners.",
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
      text:
        "Each state of a delivery is the same box with one change, so a " +
        "list of orders reads at a glance:",
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
  "align-left",
  "align-center",
  "align-right",
  "align-justify",
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
    "Also new: a ringing bell, sparkles, a lightning bolt and its off " +
    "state, a paper plane at two angles and the sun at two brightnesses.",
  headline: "Two names the wrong way round",
  date: "2026-09-08",
  updated: "2026-11-01",
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
        "A rich text editor's toolbar is one row of small marks: bold, " +
        "italic, underline, alignment, quotes, lists, a link. This update " +
        "draws that row and gives it a category of its own, Text.",
    },
    {
      kind: "p",
      text:
        "That is 35 new icons, which takes the set to 663, and seven " +
        "redraws. Two of the redraws trade names, so `link` draws " +
        "something different from this update on.",
    },

    { kind: "h2", text: "An editor toolbar, from one set", id: "toolbar" },
    {
      kind: "p",
      text: "Every button in a typical editor toolbar now has its icon:",
    },
    {
      kind: "list",
      items: [
        "Inline styles: `bold`, `italic`, `underline`, `strikethrough`.",
        "Alignment: `align-left`, `align-center`, `align-right`, " +
          "`align-justify`.",
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
        "Letters are rare in this set, because the small holes inside a " +
        "letter fill in at 16 pixels. The toolbar's letters are drawn too " +
        "big for that: the B in `bold` stands the full height of the icon, " +
        "and even its smaller bowl is 8 pixels tall.",
    },

    { kind: "h2", text: "link and link-2 traded drawings", id: "swap" },
    {
      kind: "p",
      text:
        "The most widely used open icon set calls the slanted chain `link` " +
        "and the level one `link-2`. This set had them the other way round " +
        "from the start. Code that moves from that set keeps its names, so " +
        "the names have to mean the same drawings, and the two swapped.",
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
        "`sliders-horizontal` and `sliders-vertical` used to run three " +
        "unbroken rails with a knob across each. Each knob now stands in a " +
        "gap in its rail, 2 pixels clear on either side, the space the set " +
        "keeps between any two parts.",
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
        "The other redraws are smaller. The pen family is a little larger, " +
        "with its band moved from the nib to the cap, and `clock` now " +
        "draws the same as `clock-3`.",
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
    "Also new: a QR code, a scanner frame that reads barcodes, QR codes " +
    "and text, scissors and an hourglass.",
  headline: "Swap the bubble and nothing moves",
  date: "2026-09-10",
  updated: "2026-11-01",
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
        "A dashboard that lets people switch chart types needs an icon for " +
        "each one, and a chat needs a bubble that matches the corners of " +
        "everything around it. This update brings both: twenty-six charts, " +
        "and the message family drawn again as a square.",
    },
    {
      kind: "p",
      text:
        "That is 73 new icons, taking the set to 765. Alongside the charts " +
        "and the bubbles are four diagrams, seven faces, a thumbs up and " +
        "down, and a badge with nine symbols.",
    },

    { kind: "h2", text: "A chart icon for every chart type", id: "charts" },
    {
      kind: "p",
      text: "Each option in a chart picker now has its own icon:",
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
        "The round `message` is an oval with a tail. The new " +
        "`message-square` is a rounded box whose left side runs on down " +
        "into the tail. Both take the same 20 by 20 pixels, so a list that " +
        "mixes them, or an app that switches from one to the other, " +
        "doesn't shift.",
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
  headline: "The rule the currencies break",
  date: "2026-09-09",
  updated: "2026-11-01",
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
        "A price field, a checkout and a currency picker all need the mark " +
        "for the money: a dollar, a euro, a pound, a yen. Until this " +
        "update the set had none of them.",
    },
    {
      kind: "p",
      text:
        "This update adds 29 icons and takes the set to 692. Thirteen are " +
        "currency marks, seven plain and six of them again inside a " +
        "circle. The rest are a wallet and four symbols for a payment " +
        "card, a book and its family, a shopfront, a flame, a processor " +
        "and a graduation cap.",
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
        "The set keeps 2 pixels between any two parts of a drawing, so the " +
        "eye can tell them apart. Inside a ring, 2 pixels on every side " +
        "leaves a letter about half the space there is, and a half-size " +
        "euro looks like a mistake.",
    },
    {
      kind: "p",
      text:
        "So the currency marks clear their ring by 1 pixel, and the " +
        "exception is a rule of its own. A ring isn't a second thing to " +
        "tell apart from the letter. It's the frame the letter sits in. " +
        "The set's other circled icons keep the full 2, because what they " +
        "hold is a slash, a chevron or three dots, with no holes inside to " +
        "keep open.",
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
        "Its four short strokes stand out above and below the letter, " +
        "right where a ring has the least room. Every way of fitting them " +
        "shrinks the B until the holes in it are 1 pixel wide.",
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
    "Also new: the Mars and Venus symbols, a brick wall, a roll of film " +
    "and a broom.",
  headline: "Drawn because people searched for them",
  date: "2026-09-11",
  updated: "2026-11-01",
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
        "Every search on this site that comes back empty is recorded, with " +
        "the word that was typed. A month of them is a list of what people " +
        "wanted and couldn't find, and this update is the top of that " +
        "list, drawn.",
    },
    {
      kind: "p",
      text:
        "That is 33 new icons, taking the set to 798, and twelve redraws: " +
        "the phone turned over, and the calendar a pixel taller.",
    },

    {
      kind: "h2",
      text: "Six in ten empty searches were the wrong word",
      id: "words",
    },
    {
      kind: "p",
      text:
        "The month came to 744 empty searches over 451 different words. " +
        "Six in ten asked for a drawing the set already had, under a name " +
        "nobody guesses: money for the wallet, reload for refresh, school " +
        "for the graduation cap. Those got search words, not new drawings.",
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
        "`door-open` keeps the frame of `door` exactly. Only the door " +
        "itself changes, and it isn't the closed one swung round. It's " +
        "drawn in perspective, its near edge 19 pixels tall and the edge " +
        "on the hinge 16.",
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
        "The handset had its earpiece at the bottom left, and the phones " +
        "people know hold it at the top left. So the drawing is now its " +
        "own mirror image, line for line. If your app shows `phone`, it " +
        "faces the other way from this update on.",
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
    "Also new: a plane taking off and landing, a ship, a train, a bike, " +
    "earbuds and a hand that points four ways.",
  headline: "A truck with one free corner",
  date: "2026-09-13",
  updated: "2026-11-01",
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
        "A lab booking page, a garden app and a clinic's patient record " +
        "all reach for things this set couldn't draw until now: a flask, a " +
        "leaf, the lungs, a thermometer.",
    },
    {
      kind: "p",
      text:
        "This update adds 53 icons and takes the set to 851, in six new " +
        "categories: Transport, Nature, Animals, AI, Science and Health. " +
        "The truck also learned to carry a symbol, and one shipped name " +
        "was turned round.",
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
        "A symbol goes in a corner. A file or a calendar opens its bottom " +
        "right corner and puts the plus or the check in the gap. The truck " +
        "has no bottom right to give, because that's a wheel, and the top " +
        "right is the roof of the cab.",
    },
    {
      kind: "p",
      text:
        "So it opens at the top left of the cargo box. The space there " +
        "holds a symbol 5 pixels wide, where every other icon in the set " +
        "uses 6. A slightly smaller check beats a check sitting on a " +
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

/** One drawing per duotone rule, in the order the list gives the rules. */
export const BLOG_V100_DUOTONE_ICON_NAMES = [
  "file-check",
  "bell-off",
  "chart-column-big",
  "sliders-2-horizontal",
  "hammer",
  "heart",
] as const

export const BLOG_V100_PEOPLE_ICON_NAMES = [
  "boy",
  "girl",
  "baby-boy",
  "baby-girl",
  "baby-2-boy",
  "baby-2-girl",
] as const

/** Left and bottom stand for all four sides; right and top mirror them. */
export const BLOG_V100_PANEL_ICON_NAMES = [
  "panel-left-open",
  "panel-left-close",
  "panel-left-dashed",
  "panel-left-open-dashed",
  "panel-bottom-open",
  "panel-bottom-close",
  "panel-bottom-dashed",
  "panel-bottom-open-dashed",
  "panels-left-bottom",
  "panels-right-bottom",
  "panels-top-left",
  "table",
] as const

export const BLOG_V100_DEVICE_ICON_NAMES = [
  "phone-call",
  "phone-incoming",
  "phone-outgoing",
  "phone-missed",
  "phone-forwarded",
  "tablet",
  "tablet-vertical",
  "tablet-check",
  "laptop",
  "laptop-smartphone",
  "watch",
  "hard-drive",
  "vision-pro",
  "cctv",
  "mouse",
  "shredder",
] as const

export const BLOG_V100_FAMILY_ICON_NAMES = [
  "banknote",
  "banknote-2-check",
  "wallet-cards",
  "alarm-clock-plus",
  "timer",
  "rocket",
  "rocket-fast",
  "rocket-vertical",
  "car",
  "arrow-big-up",
  "arrow-big-right-short",
  "heading-1",
  "heading-6",
  "case-sensitive",
] as const

export const BLOG_V100_SINGLES_ICON_NAMES = [
  "snowflake",
  "wind",
  "humidity",
  "cloud-sun",
  "earth",
  "recycle",
  "bot-off",
  "brain-cog",
  "sticky-notes",
  "swatch-book",
  "shield-key",
  "siren",
  "gauge",
  "milestone",
  "shirt",
  "paper-bag",
] as const

/** Redraws whose change shows in the stroke, which is what a pair draws. */
export const BLOG_V100_REDRAWN_ICON_NAMES = [
  "hand-pointer",
  "paperclip",
  "dice-5",
  "more-horizontal",
  "play",
  "gallery-horizontal",
  "monitor-off",
  "scan-search",
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

export const BLOG_V110_AI_ICON_NAMES = [
  "activity-sparkles",
  "app-window-sparkles",
  "battery-sparkles",
  "bell-sparkles",
  "bot-circle",
  "brain-sparkles",
  "calculator-sparkles",
  "calendar-sparkles",
  "camera-sparkles",
  "captions-sparkles",
  "chart-bar-sparkles",
  "clock-sparkles",
  "cloud-sparkles",
  "cpu-sparkles",
  "credit-card-sparkles",
  "cursor-sparkles",
  "dollar-sign-sparkles",
  "eraser-sparkles",
  "eye-sparkles",
  "file-sparkles",
  "folder-sparkles",
  "gift-sparkles",
  "heart-sparkles",
  "image-sparkles",
  "inbox-sparkles",
  "mail-sparkles",
  "mic-sparkles",
  "monitor-sparkles",
  "palette-sparkles",
  "phone-sparkles",
  "search-sparkles",
  "shield-sparkles",
  "terminal-sparkles",
  "truck-sparkles",
  "user-sparkles",
  "wallet-sparkles",
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

export const BLOG_V110_KEY_ICON_NAMES = [
  "command",
  "option",
  "escape",
  "space",
] as const

export const BLOG_V110_CORNER_ICON_NAMES = [
  "corner-left-up",
  "corner-left-down",
  "corner-right-up",
  "corner-right-down",
  "corner-down-left",
  "corner-down-right",
  "arrow-big-up-dash",
  "arrow-right-to-line",
] as const

export const BLOG_V110_SINGLE_ICON_NAMES = [
  "file-audio",
  "file-video",
  "eject",
  "trending-up-down",
  "wand",
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
    "Also new: six corner arrows for a reply or a forward, an eject " +
    "button, a wand and an audio and a video file.",
  headline: "Every sparkle is the same pair",
  date: "2026-09-23",
  updated: "2026-11-01",
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
        "An app that adds AI features marks them with a sparkle: a search " +
        "that understands questions, a summary of your inbox, a chart that " +
        "explains itself. That takes the same sparkle on dozens of " +
        "different things, all one size, so they read as one feature.",
    },
    {
      kind: "p",
      text:
        "This update adds 114 icons and takes the set to 1,114, each in " +
        "four styles with rounded or sharp corners: 8,912 SVGs. " +
        "Seventy-six of the new ones carry a sparkle. Twenty are maths " +
        "signs and four are Mac keys. And the whole set now installs in " +
        "React Native.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V110_HERO_ICON_NAMES,
        caption: "Eight of the new icons, one style to a row in that order.",
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
  headline: "Two-tone was an accident",
  date: "2026-09-18",
  updated: "2026-11-01",
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
        "A sidebar marks the page you're on with a filled icon and leaves " +
        "the rest as outlines. That takes two drawings of every icon, and " +
        "from this update every icon here has four.",
    },
    {
      kind: "p",
      text:
        "That is 1,000 icons, each in stroke, two-tone, duotone and fill, " +
        "with rounded or sharp corners: 8,000 in all. 149 of the thousand " +
        "are new, and 59 older ones were redrawn.",
    },
    {
      kind: "p",
      text:
        "Stroke is the outline. Fill is solid. Two-tone is the outline " +
        "with light grey inside. Duotone drops the outline: a grey shape " +
        "with the part that matters in black.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_HERO_ICON_NAMES,
        caption: "Eight of the new icons, one style to a row in that order.",
      },
    },

    { kind: "h2", text: "Two-tone was an accident", id: "two-tone" },
    {
      kind: "p",
      text:
        "In the design file, `circle` had an outline in duotone, and " +
        "`circle-x`, right beside it, didn't. A check of all 765 duotone " +
        "icons found 633 with a grey-filled outline and 132 with no " +
        "outline at all, every one of them drawn inside a square, a circle " +
        "or a badge. Two styles had shared one name since the first " +
        "release.",
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
        "Before this update, an icon came in a style only if the style " +
        "added something. An exclamation mark has nothing inside to fill, " +
        "so `alert` had no fill, and an app that switched to fill icons " +
        "had a hole where the alert should be.",
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

export const BLOG_V120_PLUS_ICON_NAMES = [
  "heart-plus",
  "bookmark-plus",
  "shopping-cart-plus",
  "shopping-basket-plus",
  "home-plus",
  "grid-2x2-plus",
  "grid-squares-plus",
  "grid-circles-plus",
  "circle-dashed-plus",
  "terminal-plus",
  "link-plus",
  "wifi-plus",
] as const

export const BLOG_V120_PROGRESS_ICON_NAMES = [
  "circle-progress-pause",
  "circle-progress-stop",
  "loader-circle",
  "hourglass-start",
  "hourglass-half",
  "hourglass-end",
  "gauge-low",
  "gauge-high",
  "cloud-terminal",
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
    "Also new: a plus on the heart, the bookmark, the cart, the basket and " +
    "the house, and on wifi and the link.",
  headline: "Nineteen tables in a single frame",
  date: "2026-09-24",
  updated: "2026-11-01",
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
        "A spreadsheet toolbar adds rows, deletes columns and merges " +
        "cells, and every button needs its own picture. Until this update " +
        "the set had the table and nothing to do to it.",
    },
    {
      kind: "p",
      text:
        "This update adds 64 icons and takes the set to 1,178. Nineteen " +
        "are tables, thirteen carry a lightning bolt, and the database and " +
        "the server get the symbols a data app asks for. The table and all " +
        "twenty-seven panels were redrawn in their filled styles.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V120_HERO_ICON_NAMES,
        caption: "Eight of the new icons, one style to a row.",
      },
    },

    { kind: "h2", text: "Nineteen tables, all one table", id: "tables" },
    {
      kind: "p",
      text: "Every edit a toolbar makes has its icon now:",
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
        "The fill of `panel-left` used to be a black square with one white " +
        "line down it, and `panel-right` the same square with the line " +
        "moved over. At 16 pixels you had to look twice. Now the fill " +
        "keeps the outline and fills only the side the panel docks to, and " +
        "the table fills only its header row.",
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

export const BLOG_V130_SINGLES_ICON_NAMES = [
  "chart-stock-up",
  "chart-stock-down",
  "gamepad",
  "atom",
  "paw-print",
  "hearts",
  "alien",
  "tree-deciduous",
] as const

export const BLOG_V130_ANCHOR_ICON_NAMES = [
  "anchor",
  "anchor-2",
  "lifebuoy",
  "pin",
  "pin-off",
  "bin-2",
  "shield-terminal",
  "file-terminal",
  "app-window-terminal",
] as const

export const BLOG_V130_DIAGONAL_ICON_NAMES = [
  "star-shooting",
  "send-fast",
  "rocket-fast",
] as const

export const BLOG_V130_ROAD_ICON_NAMES = [
  "truck",
  "truck-fast",
  "bike",
  "bike-fast",
  "timer",
  "timer-fast",
] as const

export const BLOG_V130_OFF_ICON_NAMES = [
  "captions",
  "captions-off",
  "subtitles",
  "subtitles-off",
  "play",
  "play-off",
  "square-play-off",
  "circle-play-off",
] as const

export const BLOG_V130_ARROW_IN_ICON_NAMES = [
  "square-arrow-in-down-left",
  "square-arrow-in-down-right",
  "square-arrow-in-up-left",
  "square-arrow-in-up-right",
] as const

export const BLOG_V130_PARCEL_ICON_NAMES = [
  "package",
  "package-check",
  "package-zap",
  "package-arrow-up",
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
    "Also new: an atom, a paw print, two hearts, an alien and a leafy " +
    "tree.",
  headline: "A star that leaves a trail",
  date: "2026-09-28",
  updated: "2026-11-01",
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
        "A sports app shows the ball for each game, and a trading screen " +
        "shows the market going up or down. Neither had an icon here until " +
        "now.",
    },
    {
      kind: "p",
      text:
        "This update adds 39 icons and takes the set to 1,217. Eight are " +
        "for sport, two are stock charts, and five are things in a hurry, " +
        "with speed lines behind them. Seventeen older drawings were " +
        "redrawn.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V130_HERO_ICON_NAMES,
        caption: "Eight of the 39, one style to a row.",
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

export const BLOG_V140_OBJECT_ICON_NAMES = [
  "landmark",
  "gold-bars",
  "stamp",
  "newspaper",
] as const

export const BLOG_V140_PAIR_ICON_NAMES = [
  "arrow-right-left",
  "arrow-up-down",
  "repeat",
  "history",
  "rotate-ccw",
  "calendar-days",
  "copy-check",
  "globe-search",
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
  headline: "A money bag wears its symbol on the front",
  date: "2026-09-28",
  updated: "2026-11-01",
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
        "A banking app's menu runs through the same dozen things: " +
        "accounts, transfers, savings, statements, history. On one such " +
        "menu, eleven of the icons weren't in this set. They are now.",
    },
    {
      kind: "p",
      text:
        "That is 16 new icons, the eleven and five more versions of the " +
        "money bag, which takes the set to 1,233.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V140_HERO_ICON_NAMES,
        caption: "Eight of the sixteen, in every style.",
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
        "When an icon here takes a plus or a check, it usually goes in the " +
        "bottom right corner, with a piece of the drawing cut away to make " +
        "room, as on `credit-card-plus` and `calendar-plus`. A money bag " +
        "has always worn its dollar on the front, so all five symbols go " +
        "in the middle of the bag, the way `cloud-plus` keeps its plus " +
        "inside the cloud.",
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
  /* The count, "free", "shadcn/ui" and the four things a search types for;
     the shadcn/create story is an h2 inside. The slug names the drawings, not
     the version, so it survives a renumbering. */
  slug: "bot-clipboard-save-and-shield-icons",
  version: "1.5.0",
  title: "53 free bot and shield icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: chatbots in six shapes, six security " +
    "shields, and clipboards and floppy disks with their signs.",
  standfirst: "A list of 182 icons, and nineteen still to draw.",
  headline: "Filling in what shadcn/create was missing",
  date: "2026-10-01",
  updated: "2026-10-01",
  readingMinutes: 4,
  thumbnail: BLOG_V150_THUMBNAIL_ICON_NAMES,
  keywords: [
    "bot icon",
    "chatbot icon",
    "ai bot icons",
    "shield icons",
    "security icons",
    "clipboard icon",
    "clipboard check icon",
    "paste icon",
    "save icon",
    "floppy disk icon",
    "external link icon",
    "cloud upload icon",
    "cloud download icon",
    "flip icon",
    "blocks icon",
    "target icon",
    "tv icon",
    "shipping container icon",
    "shadcn/create icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Fifty-three icons are new. Forty-one of them grew out of one list: the " +
        "icons shadcn/create uses in its previews. Nineteen of those had no " +
        "drawing here yet, and most of them brought a family along. The " +
        "clipboard comes with eleven signs, the floppy disk with five, and the " +
        "arrow leaving a square points out of all four corners.",
    },
    {
      kind: "p",
      text:
        "The other twelve are bots and shields. `bot-2` is `bot-circle` now, " +
        "the round one of seven bots that share one face. And the shield " +
        "gains six signs.",
    },
    {
      kind: "p",
      text:
        "That makes 1,286 icons. Each one comes in stroke, two-tone, duotone " +
        "and fill, with rounded or sharp corners: 10,288 SVGs in all.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V150_HERO_ICON_NAMES,
        caption: "Eight of the fifty-three, one style to a row.",
      },
    },

    { kind: "h2", text: "What shadcn/create was missing", id: "create" },
    {
      kind: "p",
      text:
        "shadcn/create is where a new shadcn/ui project picks its style, its " +
        "colours and its icon library. The previews it builds use 182 icons, " +
        "and each one is written down once for every library on offer, under " +
        "that library's own name.",
    },
    {
      kind: "p",
      text:
        "Checked against that list, 163 were already here. Most have the same " +
        "name, and the rest go by one of their own: the lock with a keyhole " +
        "is plain `lock`, and the settings sliders are " +
        "`sliders-2-horizontal`. Nineteen had no drawing at all. Those are " +
        "the ones drawn now.",
    },
    {
      kind: "p",
      text:
        "Some are everyday controls: `save`, `clipboard`, `frame`, " +
        "`columns-3`, `target` and `star-off`. Some are objects: a " +
        "television, a shipping container and a set of `blocks`, four squares " +
        "with one lifted out of its corner. The two flips are a pair of " +
        "triangles facing each other across a dashed line, side to side and " +
        "top to bottom. `square-arrow-out-up-right` is the external link, an " +
        "arrow leaving a square through the corner it opens, and it now " +
        "leaves through the other three corners too. `cloud-upload` came with " +
        "`cloud-download`, and the blocks with a pyramid of three and a " +
        "cluster of `hexagons`.",
    },
    {
      kind: "p",
      text:
        "Search had to know the list as well. A name from it now opens on the " +
        "drawing it means, even where this set spells it differently: " +
        "`external-link` opens on `square-arrow-out-up-right`, `log-out` on " +
        "`bracket-arrow-left` and `loader-2` on `loader-circle`. It works the " +
        "same on the site, in the MCP server, the CLI and the Figma plugin.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V150_CREATE_ICON_NAMES,
        caption: "The nineteen, then six drawn beside them.",
      },
    },

    { kind: "h2", text: "Signs on the board", id: "signs" },
    {
      kind: "p",
      text:
        "The clipboard takes its signs the way the money bag does, in the " +
        "middle rather than in a corner cut away for them. It is a board for " +
        "writing on, so the sign sits where the writing would be.",
    },
    {
      kind: "p",
      text:
        "That gives `clipboard-check`, `clipboard-plus`, `clipboard-minus` " +
        "and `clipboard-x`, then an alert, a list, code, a prompt and a T for " +
        "text. An arrow on the board is copy or paste. And `paste` on its own " +
        "is the clipboard with a page held in front of it.",
    },
    {
      kind: "p",
      text:
        "The floppy disk is `save`, still the picture almost every app uses " +
        "for it, long after the disk itself went away. Its tick, plus, minus " +
        "and cross take the place of the round hub, so the disk keeps its " +
        "outline. With a slash through it, the shutter along the " +
        "top is left out, since all it would leave is a stray piece beside " +
        "the slash.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V150_SIGN_ICON_NAMES,
        caption:
          "Four clipboards, `paste`, and the floppy disk plain, with a plus " +
          "and struck through.",
      },
    },

    { kind: "h2", text: "Seven bots and six shields", id: "bots" },
    {
      kind: "p",
      text:
        "`bot-circle` is the bot that shipped as `bot-2`: a round head and " +
        "two short eyes, tilted a little so they glance up and to the right. " +
        "With six more around it, the round one is named for its shape. The " +
        "old name keeps working, in search and as `Bot2` and `Bot2Icon` in " +
        "React.",
    },
    {
      kind: "p",
      text:
        "The face is the same drawing in every one, only moved: into a " +
        "square, a heart, a droplet, a star, the round speech bubble of " +
        "`message` and the body of `cloud`. Turned a little, the way " +
        "`star-shooting` is, the star comes out exactly as wide as it is " +
        "tall. `bot-message` is the one " +
        "for a chatbot: a face in a speech bubble, where people already look " +
        "for help.",
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
      kind: "p",
      text:
        "The shield had a tick, a plus, a minus and a cross, and a key, a " +
        "prompt and sparkles. Six more join them: an alert, a question mark, " +
        "a padlock, a person, a heart, and a slash for a shield that is " +
        "switched off. The alert, the question mark, the person and the heart " +
        "are the ones the set already draws inside a circle or a map pin, so " +
        "they read the same in a shield. The person's shoulders run down into " +
        "the bottom of the shield, the way they run into the ring of " +
        "`circle-user`. The padlock is drawn small enough to leave room " +
        "around it.",
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

export const BLOG_V160_SINGLE_ICON_NAMES = [
  "arrow-down-up",
  "arrow-down-up-2",
  "arrow-up-down-2",
  "arrow-left-right-2",
  "arrow-right-left-2",
  "glasses",
  "sunglasses",
  "heart-crack",
  "puzzle",
  "video-2",
  "bike-2",
  "smartphone-nfc",
  "smartphone-ringing",
  "cloud-search",
  "cloud-network",
] as const

export const BLOG_V160_REDRAWN_ICON_NAMES = [
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
  "user-voice",
  "brain-cog",
] as const

const RELEASE_1_6_0: BlogPost = {
  /* The count, "free", "shadcn/ui", "React" and "Figma" (his ask, 4 Oct 2026),
     and what a search types for these: house, user and settings icons. The
     slug names the drawings, not the version. */
  slug: "house-user-and-settings-icons",
  version: "1.6.0",
  title: "47 free home, user and settings icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: a second house with twelve variations, " +
    "a person with nine symbols, and a cog for files, folders, databases " +
    "and the globe.",
  standfirst: "Home has company.",
  headline: "Home has company",
  date: "2026-10-04",
  updated: "2026-10-04",
  readingMinutes: 4,
  thumbnail: BLOG_V160_THUMBNAIL_ICON_NAMES,
  keywords: [
    "house icon",
    "home icon",
    "smart home icons",
    "user icons",
    "user settings icon",
    "settings icon",
    "cog icon",
    "gear icon",
    "folder settings icon",
    "id badge icon",
    "glasses icon",
    "sunglasses icon",
    "broken heart icon",
    "puzzle icon",
    "phone ringing icon",
    "sort arrows icon",
    "cloud icons",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Forty-seven icons are new. Eighteen are houses: `house`, a second " +
        "house to sit next to `home`, with twelve variations, plus five " +
        "more for `home` itself. Ten are people: a person with a symbol " +
        "beside them, nine ways, and an ID badge. The rest are cogs, " +
        "arrows, two pairs of glasses, and a few everyday objects.",
    },
    {
      kind: "p",
      text:
        "Fourteen icons that already shipped were redrawn, mostly clouds. " +
        "The set is now 1,332 icons, each in stroke, two-tone, duotone and " +
        "fill, with rounded or sharp corners. That's 10,656 SVGs.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V160_HERO_ICON_NAMES,
        caption: "Eight of the forty-seven, one style to a row.",
      },
    },

    { kind: "h2", text: "A second house", id: "house" },
    {
      kind: "p",
      text:
        "`home` keeps its rounded peak and square door. `house` is the " +
        "other one people usually reach for: a roof that sticks out past " +
        "the walls, over an arched door.",
    },
    {
      kind: "p",
      text:
        "It comes with a chimney, plain and without a door, and as a pair. " +
        "A tick, a cross, a plus or a lightning bolt sits at the top " +
        "right, where the roof stops short to leave room. A heart, a cog " +
        "or a plug takes the place of the door, for favourites, settings " +
        "and power. `house-wifi` holds a wireless signal, with the dot " +
        "sitting in a gap in the floor. `house-cast` sends one out from " +
        "its lower corner. Together they cover most of what a smart home " +
        "app needs to say.",
    },
    {
      kind: "p",
      text:
        "`home` gets a heart, a cross, a tick, a version without a door, " +
        "and a pair of its own, so either house can carry an app from " +
        "start to finish.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_HOUSE_ICON_NAMES,
        caption: "`house` and its twelve, then `home` and its five.",
      },
    },

    { kind: "h2", text: "A person with something to say", id: "people" },
    {
      kind: "p",
      text:
        "The person already had a tick, a plus, a minus, a cross and a " +
        "lightning bolt. Nine more symbols join them: a cog for account " +
        "settings, a heart, a key, a list, a padlock, a speech bubble, a " +
        "pen for editing, a magnifying glass for finding people, and a " +
        "shield.",
    },
    {
      kind: "p",
      text:
        "These are objects, not small marks, so they're drawn larger, low " +
        "on the right beside the shoulder. The shoulder stops short so " +
        "each one has room. The person stays where it stands in " +
        "`user-plus`, so swapping one symbol for another never moves it. " +
        "`id-badge` is the tenth: a badge with a photo on it, and the slot " +
        "it hangs from.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_USER_ICON_NAMES,
        caption: "Nine people with a symbol, and the ID badge.",
      },
    },

    { kind: "h2", text: "One cog for everything", id: "cogs" },
    {
      kind: "p",
      text:
        "Settings attach to all sorts of things, so the cog now comes with " +
        "a file, a folder, a database and the globe, in the corner where " +
        "the plus sits on each of them. It's the same cog every time, and " +
        "the same one beside the person.",
    },
    {
      kind: "p",
      text:
        "`brain-cog` was redrawn to match. Its cog used to have a wider " +
        "ring and shorter teeth than anything else in the set. It now has " +
        "the same proportions as the rest.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_COG_ICON_NAMES,
        caption: "Four new cogs, the two from the families above, and the brain.",
      },
    },

    { kind: "h2", text: "And the rest", id: "singles" },
    {
      kind: "p",
      text:
        "`arrow-down-up` is two long arrows side by side, down on the left " +
        "and up on the right, the usual picture for sorting. Four shorter " +
        "pairs sit one step past the other, for swapping two things in " +
        "either direction.",
    },
    {
      kind: "p",
      text:
        "There are glasses with round lenses and sunglasses with dark " +
        "ones, a heart cracked down the middle, and a puzzle piece. " +
        "`video-2` is a video camera without its reels. `bike-2` is the " +
        "bicycle without its rider. A phone with waves on one side is for " +
        "tapping to pay. Waves on both sides means it's ringing. Two more " +
        "clouds: one with a magnifying glass, and one on a network.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V160_SINGLE_ICON_NAMES,
        caption: "Five pairs of arrows, then the singles.",
      },
    },

    { kind: "h2", text: "Clouds that open", id: "redrawn" },
    {
      kind: "p",
      text:
        "Each cloud with a check, a cross, a plus, an exclamation mark, an " +
        "arrow or a prompt used to hold the mark inside, drawn small so it " +
        "would fit. The cloud now opens along its bottom edge, and the " +
        "symbol sits underneath at full size, including the arrows for " +
        "upload and download. The rain cloud opens the same way, and the " +
        "rain falls straight out of it. `cloud-minus` is no longer in the " +
        "set.",
    },
    {
      kind: "p",
      text:
        "Four icons with a lightning bolt moved a step to the left: " +
        "`home-zap`, `database-zap`, `server-zap` and `user-zap`. Each now " +
        "sits exactly where its plus version sits, so switching one for " +
        "the other no longer makes the picture jump. `user-voice` moved " +
        "with them, and the voice grew to fill the same corner.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V160_REDRAWN_ICON_NAMES,
        caption: "All fourteen, before beside after.",
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
] as const

export const BLOG_V170_SINGLE_ICON_NAMES = [
  "log-in",
  "log-out",
  "locate",
  "locate-fixed",
  "battery-charging",
  "webcam",
  "voicemail",
  "notebook",
  "notebook-pen",
  "image-off",
  "telescope",
  "hand-coins",
  "list-filter",
  "list-todo",
  "circle-progress-plus",
  "circle-progress-arrow-up",
  "dot",
] as const

const RELEASE_1_7_0: BlogPost = {
  /* The count, "free", "shadcn/ui", "React" and "Figma" (his ask for every
     release title since 1.6.0), then what a search types for these: law,
     health and text editing icons. The slug names the drawings, not the
     version. */
  slug: "law-health-and-text-editing-icons",
  version: "1.7.0",
  title: "34 free law and medical icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: a gavel, the scales of justice, a " +
    "stethoscope, a syringe and a first-aid kit, text size arrows and a " +
    "spell check.",
  standfirst: "Order in court.",
  headline: "The law gets a category of its own",
  date: "2026-10-05",
  updated: "2026-10-05",
  readingMinutes: 3,
  thumbnail: BLOG_V170_THUMBNAIL_ICON_NAMES,
  keywords: [
    "law icons",
    "gavel icon",
    "scale icon",
    "justice icon",
    "signature icon",
    "medical icons",
    "stethoscope icon",
    "syringe icon",
    "pill icon",
    "bandage icon",
    "heartbeat icon",
    "font size icon",
    "spell check icon",
    "text icon",
    "curly braces icon",
    "regex icon",
    "login icon",
    "logout icon",
    "battery charging icon",
    "webcam icon",
    "voicemail icon",
    "location icon",
    "notebook icon",
    "telescope icon",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Thirty-four icons are new. Five start a Law category: a gavel, a " +
        "balance standing level and tipped either way, and a signature. " +
        "Five more fill out Health, seven help with text and code, and the " +
        "rest are everyday things apps keep asking for: signing in and " +
        "out, a charging battery, a webcam, voicemail, a notebook.",
    },
    {
      kind: "p",
      text:
        "The set is now 1,366 icons, each in stroke, two-tone, duotone and " +
        "fill, with rounded or sharp corners. That's 10,928 SVGs.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V170_HERO_ICON_NAMES,
        caption: "Eight of the thirty-four, one style to a row.",
      },
    },

    { kind: "h2", text: "A category for the law", id: "law" },
    {
      kind: "p",
      text:
        "A gavel, a balance and a signature cover most of what a legal or " +
        "contracts screen needs. The balance comes three ways: level, for " +
        "fairness and justice, and tipped to the right or to the left, for " +
        "bias, an unfair comparison, or one option outweighing another. Its " +
        "arms curl up at the ends, and a pan hangs below each one.",
    },
    {
      kind: "p",
      text:
        "`signature` is handwritten: a looping letter and a running " +
        "squiggle over a line, the way a name looks on a contract.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_LAW_ICON_NAMES,
        caption: "The gavel, the balance level and tipped both ways, and the signature.",
      },
    },

    { kind: "h2", text: "A first-aid kit", id: "health" },
    {
      kind: "p",
      text:
        "Health had a brain, lungs, ears and a thermometer. It now has a " +
        "heart with a pulse running through it, a stethoscope, a syringe, " +
        "a capsule and an adhesive bandage, enough for a clinic, a " +
        "pharmacy or a fitness app to stay inside one set.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_HEALTH_ICON_NAMES,
        caption: "The pulse, the stethoscope, the syringe, the capsule and the bandage.",
      },
    },

    { kind: "h2", text: "For text and code", id: "text" },
    {
      kind: "p",
      text:
        "An A with an arrow up and an A with an arrow down make text bigger " +
        "or smaller. `spell-check` is a lowercase ab with a tick under its " +
        "corner. `type` is a capital T, for the text tool.",
    },
    {
      kind: "p",
      text:
        "Code gets curly braces, square brackets, and `regex`: a dot and a " +
        "star, the shorthand for any run of characters.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_TEXT_ICON_NAMES,
        caption: "Text size, spell check and the T, then the braces, brackets and regex.",
      },
    },

    { kind: "h2", text: "And the rest", id: "singles" },
    {
      kind: "p",
      text:
        "`log-in` is an arrow entering a bracket, and `log-out` turns it " +
        "round: the bracket on the other side, the arrow leaving. Search " +
        "for sign in or sign out and they come up first. `locate` is a " +
        "crosshair for finding where you are, and `locate-fixed` shows the " +
        "spot found.",
    },
    {
      kind: "p",
      text:
        "`battery-charging` opens the battery for a lightning bolt. " +
        "`webcam` is a square camera on a stand, and `voicemail` two reels " +
        "joined by a tape. There's a spiral notebook, the same notebook " +
        "with a pen writing in it, a picture struck through for an image " +
        "that's missing, a telescope on two legs, and a hand held out " +
        "under two coins.",
    },
    {
      kind: "p",
      text:
        "`list-filter` narrows from top to bottom, and `list-todo` pairs " +
        "a box with a tick. The dashed progress ring takes a plus and an " +
        "arrow up, for adding or uploading while something is still " +
        "underway. And `dot` is just that: one dot.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V170_SINGLE_ICON_NAMES,
        caption: "Seventeen more, from signing in and out to a single dot.",
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

export const BLOG_V180_PAIR_REDRAW_ICON_NAMES = [
  "arrow-left-right",
  "arrow-right-left",
  "arrow-down-up",
  "arrow-up-down",
] as const

export const BLOG_V180_UNDO_ICON_NAMES = [
  "arrow-left-right-3",
  "arrow-right-left-3",
  "arrow-up-down-3",
  "arrow-down-up-3",
  "arrow-right-left-4",
  "undo",
  "undo-dot",
  "redo",
  "redo-dot",
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

export const BLOG_V180_TEXT_FIELD_ICON_NAMES = [
  "input",
  "input-cursor",
  "input-sparkles",
  "text-cursor",
  "text-cursor-input",
  "input-text-cursor",
  "text-split",
  "compact",
] as const

export const BLOG_V180_LAYOUT_ICON_NAMES = [
  "layout-bento",
  "grid-masonry",
  "fold-vertical",
  "fold-horizontal",
  "flip-2-horizontal",
  "flip-2-vertical",
  "list-todo-circle",
  "connection",
  "connections",
  "webhook",
  "diff",
  "file-diff",
  "braces-ellipsis",
  "brackets-ellipsis",
  "badge-terminal",
] as const

export const BLOG_V180_SINGLE_ICON_NAMES = [
  "bot-simple",
  "broom-sparkles",
  "hand-sparkles",
  "box",
  "card-sim",
  "unplug",
  "directions",
  "keyframes",
  "shuffle-2",
  "chevrons-down-up",
  "circle-dashed-user",
  "home-smile",
  "inbox-dot",
  "handbag-search",
  "shopping-basket-search",
  "flame-2",
] as const

export const BLOG_V180_HAND_REDRAW_ICON_NAMES = ["hand-coins"] as const

const RELEASE_1_8_0: BlogPost = {
  /* The count, "free", "shadcn/ui", "React" and "Figma", then what a search
     types for this batch: arrows, aspect ratios and inputs. The slug names the
     drawings, not the version. */
  slug: "long-arrows-aspect-ratios-and-input-icons",
  version: "1.8.0",
  title: "69 free arrow and aspect ratio icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: long arrows, swaps, undo and redo, " +
    "frames from 1:1 to 21:9, text fields, a bento grid and a webhook.",
  standfirst: "Longer arrows, and frames from 1:1 to 21:9.",
  headline: "Longer arrows, and frames up to 21:9",
  date: "2026-10-11",
  updated: "2026-10-11",
  readingMinutes: 4,
  thumbnail: BLOG_V180_THUMBNAIL_ICON_NAMES,
  keywords: [
    "arrow icons",
    "long arrow icon",
    "swap icon",
    "undo icon",
    "redo icon",
    "aspect ratio icon",
    "16:9 icon",
    "input icon",
    "text field icon",
    "text cursor icon",
    "bento grid icon",
    "masonry grid icon",
    "fold icon",
    "connection icon",
    "webhook icon",
    "diff icon",
    "sim card icon",
    "unplug icon",
    "keyframes icon",
    "box icon",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Sixty-nine icons are new. Twelve are long arrows and nine are aspect " +
        "ratios. The rest bring undo and redo, text fields and their cursors, " +
        "two grids for dashboards, links between things, and a few everyday " +
        "objects: a box, a SIM card, a plug pulled out of its socket.",
    },
    {
      kind: "p",
      text:
        "The set is now 1,435 icons, each in stroke, two-tone, duotone and " +
        "fill, with rounded or sharp corners. That's 11,480 SVGs.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V180_HERO_ICON_NAMES,
        caption: "Eight of the sixty-nine, one style to a row.",
      },
    },

    { kind: "h2", text: "Long arrows", id: "long-arrows" },
    {
      kind: "p",
      text:
        "These run almost edge to edge, where the plain arrows stop well " +
        "short of the sides. Four point straight, four point on the " +
        "diagonals, and four point both ways: across, up and down, and " +
        "corner to corner either way, for resizing, dragging and stretching. " +
        "They're named `move-right`, `move-up-left` and so on, after the " +
        "four-way `move` they sit beside, and searching for long arrow finds them.",
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
        "The four two-arrow pairs, `arrow-left-right`, `arrow-right-left`, " +
        "`arrow-down-up` and `arrow-up-down`, were redrawn with the same head " +
        "as the new arrows, a size up from what they had, so the pairs and " +
        "the long arrows look like one family.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V180_PAIR_REDRAW_ICON_NAMES,
        caption: "Each pair before and after: the heads grew a little.",
      },
    },

    { kind: "h2", text: "Swaps, undo and redo", id: "undo" },
    {
      kind: "p",
      text:
        "Each pair also gets a third drawing, its two arrows slid apart so " +
        "each head sits at the far edge. The swap gets a fourth, " +
        "`arrow-right-left-4`, with a single barb on each arrow, the way an " +
        "exchange sign is often printed.",
    },
    {
      kind: "p",
      text:
        "`undo` and `redo` are a curved arrow bending back over the top, the " +
        "button every editor has. Their `-dot` versions add a dot under the " +
        "curve, for a change that's waiting or not yet saved.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_UNDO_ICON_NAMES,
        caption: "The pairs slid apart, the single-barb swap, then undo and redo with and without a dot.",
      },
    },

    { kind: "h2", text: "Aspect ratios", id: "ratios" },
    {
      kind: "p",
      text:
        "Nine for picking a frame: square, 4:3 and 3:4, 3:2 and 2:3, 16:9 and " +
        "9:16, and 21:9. Each one is simply the shape, and every long side is " +
        "the same length, so a row of them looks like a row of frames to " +
        "choose from. `aspect-ratio` is a frame with two corner marks, for " +
        "the control that changes it.",
    },
    {
      kind: "p",
      text:
        "At 24 pixels, a frame only sits dead centre when its short side is " +
        "an even number of pixels, so each ratio rounds to the nearest even " +
        "one. 16:9 comes out a little squarer than the real thing and 21:9 a " +
        "little wider, still easy to tell apart. The widest frame also gets " +
        "smaller corners, so it doesn't turn into a pill.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_RATIO_ICON_NAMES,
        caption: "Square to ultrawide, then the aspect ratio control.",
      },
    },

    { kind: "h2", text: "Text fields", id: "text-fields" },
    {
      kind: "p",
      text:
        "`input` is an empty text field with a caret near its start. " +
        "`input-cursor` puts a pointer on its corner, for clicking into a " +
        "field, and `input-sparkles` swaps the caret for two stars, for a " +
        "prompt box.",
    },
    {
      kind: "p",
      text:
        "`text-cursor` is the I-beam, its serifs curving out of the stem. " +
        "`text-cursor-input` stands it inside a field, and `input-text-cursor` " +
        "adds the caret beside it. `text-split` breaks three lines of text at " +
        "one point, and `compact` holds two short lines between two corners, " +
        "for the summary of something long.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_TEXT_FIELD_ICON_NAMES,
        caption: "Fields, the I-beam, a split and a summary.",
      },
    },

    { kind: "h2", text: "Layouts, links and code", id: "layouts" },
    {
      kind: "p",
      text:
        "`layout-bento` and `grid-masonry` are the two grids dashboards and " +
        "galleries are built from: tiles of mixed sizes, and rows of bricks " +
        "laid off-centre. `fold-vertical` and `fold-horizontal` press two " +
        "arrows against a line, for collapsing a section. The flip gets a " +
        "second drawing, half a square drawn and half dashed across a line, " +
        "and `list-todo-circle` is a to-do list with round boxes.",
    },
    {
      kind: "p",
      text:
        "`connection` joins two nodes, `connections` adds two more around " +
        "them, and `webhook` is three nodes passing a signal round. For code " +
        "there's `diff`, a plus over a minus, on its own and on a page; " +
        "braces and brackets around three dots, for a folded object or list; " +
        "and a badge with a prompt in it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_LAYOUT_ICON_NAMES,
        caption: "Grids, folds and flips, then nodes, diffs and folded code.",
      },
    },

    { kind: "h2", text: "And the rest", id: "singles" },
    {
      kind: "p",
      text:
        "A simpler robot head joins the bots, and a broom and a hand each " +
        "get two stars. `box` is the parcel without its tape. `card-sim` is " +
        "a SIM card with its chip, and `unplug` pulls a plug out of its " +
        "socket.",
    },
    {
      kind: "p",
      text:
        "`directions` shows three ways out from where you start, one of them " +
        "taken. `keyframes` marks a moment on an animation's timeline, and " +
        "`shuffle-2` crosses two straight arrows. There's also a collapse " +
        "mark, a dashed circle with a person in it, a house with a smile, an " +
        "inbox with a dot, a bag and a basket with a magnifier, and a flame " +
        "with a second one burning inside it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V180_SINGLE_ICON_NAMES,
        caption: "Sixteen more, from a robot head to a flame in a flame.",
      },
    },
    {
      kind: "p",
      text:
        "One older drawing changed too. The hand under the coins is one shape " +
        "now, its palm rising from the wrist into the fingers, where it used " +
        "to have a separate thumb.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V180_HAND_REDRAW_ICON_NAMES,
        caption: "Before and after: the thumb joins the palm.",
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
  "align-left-2",
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

export const BLOG_V200_SINGLE_ICON_NAMES = [
  "list-checks",
  "list-indent-increase",
  "list-indent-decrease",
  "list-nested",
  "list-pin",
  "ban-square",
  "ban-square-flip",
  "square-star",
  "circle-star",
  "square-zap",
  "circle-zap",
  "plug-zap",
  "plug-circle",
  "code-panel",
  "workflow",
  "book-open-2",
  "library-big",
  "map-pin-2",
  "gallery-thumbnails",
  "align-left-2",
  "align-right-2",
  "nfc",
  "play-pause",
] as const

const RELEASE_2_0_0: BlogPost = {
  /* The count, "free", "shadcn/ui", "React" and "Figma", then what a search
     types for this batch: brackets, tallies, shapes and arrows. The slug names
     the drawings, not the version. */
  slug: "brackets-tally-marks-and-shape-icons",
  version: "2.0.0",
  title: "72 free bracket and tally mark icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: brackets, braces and punctuation, tally " +
    "marks, chevron levels, plain shapes and u-turn arrows.",
  standfirst: "Small pieces, the kind you only notice when they're missing.",
  headline: "The pieces you only notice when they're missing",
  date: "2026-10-18",
  updated: "2026-10-18",
  readingMinutes: 4,
  thumbnail: BLOG_V200_THUMBNAIL_ICON_NAMES,
  keywords: [
    "bracket icon",
    "parentheses icon",
    "curly brace icon",
    "punctuation icons",
    "tally icon",
    "tally marks icon",
    "chevron icon",
    "level icon",
    "triangle icon",
    "diamond icon",
    "hexagon icon",
    "octagon icon",
    "u-turn arrow icon",
    "list check icon",
    "indent icon",
    "plug icon",
    "workflow icon",
    "library icon",
    "play pause icon",
    "nfc icon",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "This update brings 72 new icons. Fourteen are brackets and " +
        "punctuation, eleven help you count or show a level, and fifteen are " +
        "arrows, mostly u-turns that stop at a line. The rest are simple " +
        "shapes, a few list icons, and some things people kept asking for, " +
        "like a charging plug and a play-pause key.",
    },
    {
      kind: "p",
      text:
        "With these, the set grows to 1,507 icons. Each one comes in stroke, " +
        "two-tone, duotone and fill, with rounded or sharp corners, so that's " +
        "12,056 SVGs in all.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V200_HERO_ICON_NAMES,
        caption: "Eight of the seventy-two, one style to a row.",
      },
    },

    { kind: "h2", text: "Brackets and punctuation", id: "brackets" },
    {
      kind: "p",
      text:
        "Parentheses, square brackets and curly braces now come as separate " +
        "opening and closing halves. They're handy for buttons that wrap a " +
        "selection or add one side of a pair. Two more keep both halves " +
        "together: `parentheses-ellipsis` hides what's inside, just like the " +
        "dotted braces and brackets from last time, and `parentheses-x` puts " +
        "an x between them, for when you mean a variable.",
    },
    {
      kind: "p",
      text:
        "The punctuation marks get their own icons too: `pipe`, `colon`, " +
        "`semicolon`, `comma`, `accent-grave` and `tilde`. They work well for " +
        "shortcut hints, separators and text tools. Since there's nothing " +
        "inside them to fill, they look the same in every style.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_BRACKET_ICON_NAMES,
        caption: "Each bracket alone, two pairs, then the punctuation.",
      },
    },

    { kind: "h2", text: "Tallies and levels", id: "levels" },
    {
      kind: "p",
      text:
        "The tally marks count from one to five the way you'd keep score on " +
        "paper: four strokes side by side, then a fifth across them. Each " +
        "stroke stays in place as the count goes up, so going from `tally-2` " +
        "to `tally-3` just adds one line. That makes it easy to animate a " +
        "counter ticking up.",
    },
    {
      kind: "p",
      text:
        "The chevron levels work a bit like signal bars. `chevrons-up-1` to " +
        "`chevrons-up-3` fill from the bottom, for priority, speed or " +
        "strength going up. `chevrons-down-1` to `chevrons-down-3` fill from " +
        "the top. Each chevron stays put as the level changes.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_LEVEL_ICON_NAMES,
        caption: "One to five, then one to three chevrons each way.",
      },
    },

    { kind: "h2", text: "Plain shapes", id: "shapes" },
    {
      kind: "p",
      text:
        "A triangle, a diamond, a hexagon and an octagon join the square and " +
        "circle as simple outlines. They're good for status markers, map keys " +
        "and flowcharts. And yes, all six sides of the hexagon are the same " +
        "length.",
    },
    {
      kind: "p",
      text:
        "Five shapes now hold a dot. The triangle, diamond and octagon each " +
        "get a new dotted version, and `dot` itself now comes framed as " +
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

    { kind: "h2", text: "Arrows at a line", id: "arrows" },
    {
      kind: "p",
      text:
        "The u-turn arrows now turn back at a line, for moments when you hit " +
        "an edge or a limit and head back. They point in all four directions, " +
        "and each has a mirrored version, so there are eight in total.",
    },
    {
      kind: "p",
      text:
        "Four more arrows pass right through a line, for crossing a boundary. " +
        "And the big outlined arrows pointing right, down and left now have a " +
        "bar behind them, to match `arrow-big-up-dash`, the one you'd " +
        "recognise from the caps lock key.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_ARROW_ICON_NAMES,
        caption: "U-turns, arrows through a line, and big arrows with a bar behind.",
      },
    },

    { kind: "h2", text: "And the rest", id: "singles" },
    {
      kind: "p",
      text:
        "Lists get a few new friends: a column of checks, indent in and out, " +
        "a nested level and a pin. `ban-square` is the no-entry slash inside " +
        "a square, available both ways round. The star and lightning bolt now " +
        "come framed in a square and a circle too.",
    },
    {
      kind: "p",
      text:
        "`plug-zap` is a plug that's charging, `plug-circle` is a plug inside " +
        "a ring, and `code-panel` is a panel with code brackets tucked into " +
        "its top edge. `workflow` links two boxes with a path. `book-open-2` " +
        "is an open book mid page-turn, and `library-big` shows two books " +
        "standing with a third leaning against them. There's also a pin " +
        "pushed into the ground, a large frame above a row of thumbnails, two " +
        "alignment icons with a bar along one edge, and `nfc`, for tapping to " +
        "pay.",
    },
    {
      kind: "p",
      text:
        "Finally, `play-pause` is the media key most keyboards have: play and " +
        "pause on one button, for anything that switches between the two.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V200_SINGLE_ICON_NAMES,
        caption: "Lists, the square bans, the framed star and bolt, and twelve more.",
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

export const BLOG_V210_SOLID_ICON_NAMES = [
  "cone",
  "cuboid",
  "cylinder",
  "pyramid",
  "triangle-right",
  "circle-slash-2",
  "square-slash-2",
] as const

export const BLOG_V210_SINGLE_ICON_NAMES = [
  "flag-swallowtail",
  "flag-triangle-right",
  "planet",
  "waves",
  "waves-2",
  "train-track",
  "drafting-compass",
  "hook",
  "gripper",
  "vector-square",
  "vector-polygon",
  "mouse-pointer",
  "scan-user",
  "card-chip",
  "weight",
  "weight-tilde",
  "copy-minus",
  "copy-x",
  "copy-off",
  "grid-2x2-check",
  "grid-2x2-x",
  "layout-columns",
  "flip-3-horizontal",
  "flip-3-vertical",
  "symmetry-horizontal",
  "symmetry-vertical",
] as const

const RELEASE_2_1_0: BlogPost = {
  /* The count, "free", "shadcn/ui", "React" and "Figma", then what a search
     types for this batch: monitors, Greek letters, 3D shapes and flags. The
     slug names the drawings, not the version. */
  slug: "monitor-greek-letter-and-3d-shape-icons",
  version: "2.1.0",
  title:
    "61 free Greek letter and 3D shape icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: sigma, pi, lambda and omega, a cube, a " +
    "cylinder, a cone and a pyramid, a monitor with its signs, pennants " +
    "and waves.",
  standfirst: "A screen that says what it's doing, and the letters a formula is written in.",
  headline: "Screens that say what they're doing",
  date: "2026-10-20",
  updated: "2026-10-20",
  readingMinutes: 4,
  thumbnail: BLOG_V210_THUMBNAIL_ICON_NAMES,
  keywords: [
    "monitor icon",
    "screen share icon",
    "display settings icon",
    "sigma icon",
    "pi icon",
    "function icon",
    "lambda icon",
    "omega icon",
    "greek letter icons",
    "math icons",
    "3d shape icon",
    "cube icon",
    "cylinder icon",
    "cone icon",
    "pyramid icon",
    "pennant icon",
    "planet icon",
    "waves icon",
    "compass icon",
    "cursor icon",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "This update brings 61 new icons. Fourteen are a second monitor and " +
        "the signs that go with it, fourteen are math, and seven are shapes, " +
        "four of them solid. The rest are pennants, waves, a planet, tools " +
        "for drawing and lifting, and a few signs for icons you already use.",
    },
    {
      kind: "p",
      text:
        "With these, the set grows to 1,568 icons. Each one comes in stroke, " +
        "two-tone, duotone and fill, with rounded or sharp corners, so that's " +
        "12,544 SVGs in all.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V210_HERO_ICON_NAMES,
        caption: "Eight of the sixty-one, one style to a row.",
      },
    },

    { kind: "h2", text: "A monitor and its signs", id: "monitors" },
    {
      kind: "p",
      text:
        "`monitor-2` is a taller display on a stand, and it comes with " +
        "thirteen signs. The ones about the device sit in the top corner: add " +
        "and remove, a check and a cross, a dot for something new, settings, " +
        "download, and an arrow for sending to another screen.",
    },
    {
      kind: "p",
      text:
        "The ones about what's on the screen sit in the middle of it: play, " +
        "pause and stop, and an arrow up for sharing your screen. " +
        "`monitor-speaker` puts a speaker beside the display, for desktop " +
        "audio.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V210_MONITOR_ICON_NAMES,
        caption: "The display, its thirteen signs, and a display beside a speaker.",
      },
    },

    { kind: "h2", text: "Greek letters and math", id: "math" },
    {
      kind: "p",
      text:
        "Sigma, pi, lambda, omega and phi join the math icons, with " +
        "`function` for formulas and calculated fields. Sigma, pi and the " +
        "function sign also come inside a square and a circle, the way the " +
        "equals and divide signs do.",
    },
    {
      kind: "p",
      text:
        "`angle` and `radius` are for geometry, and for the inputs that set " +
        "an angle or round a corner. The letters stand as tall as the other " +
        "letters in the set, so they line up beside bold and heading.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V210_MATH_ICON_NAMES,
        caption: "Five letters and the function sign, three of them framed, then the angle and the radius.",
      },
    },

    { kind: "h2", text: "3D shapes", id: "solids" },
    {
      kind: "p",
      text:
        "A cone, a cuboid, a cylinder and a pyramid, for 3D tools, geometry " +
        "and anything with volume. In duotone and fill one face stands out, " +
        "the way it does on `box`: the top of the cuboid and the cylinder, " +
        "the open base of the cone, the right side of the pyramid.",
    },
    {
      kind: "p",
      text:
        "A right triangle joins the plain one, and a circle and a square now " +
        "come struck corner to corner, for an empty set or a value that isn't " +
        "allowed.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V210_SOLID_ICON_NAMES,
        caption: "Four solids, a right triangle, and a circle and a square crossed out.",
      },
    },

    { kind: "h2", text: "And the rest", id: "singles" },
    {
      kind: "p",
      text:
        "Two pennants fly from a pole: a swallowtail and a plain triangle. " +
        "`planet` has its ring, `waves` and `waves-2` bring the sea, and " +
        "`train-track` runs off into the distance.",
    },
    {
      kind: "p",
      text:
        "For making things there's a `drafting-compass`, a crane `hook` and " +
        "a three-fingered `gripper`, and `vector-square` and `vector-polygon` " +
        "show the nodes a vector tool edits. `mouse-pointer` is the arrow " +
        "cursor with its tail, and `scan-user` puts a person inside scan " +
        "marks.",
    },
    {
      kind: "p",
      text:
        "`card-chip` is the chip on a payment card, and `weight` also comes " +
        "with a tilde, for an estimated weight. Copy gets a minus, a cross " +
        "and a slash, the two by two grid gets a check and a cross, and " +
        "`layout-columns` splits a frame into three. Two flips turn a solid " +
        "object over, and two symmetry icons mirror a shape across its axis.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V210_SINGLE_ICON_NAMES,
        caption: "Pennants, water, tools, pointers and the new signs.",
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

export const BLOG_V220_THINGS_ICON_NAMES = [
  "hamburger",
  "pizza",
  "cookie",
  "skull",
  "bone",
  "bone-fractured",
  "dna",
  "briefcase-medical",
  "boom-box",
  "cassette-tape",
  "speaker",
  "satellite-dish",
] as const

export const BLOG_V220_SINGLE_ICON_NAMES = [
  "router",
  "mails",
  "message-dashed",
  "message-square-dashed",
  "split",
  "alarm-clock-x",
  "octagon-minus",
  "scan-zap",
  "heart-handshake",
  "book-open-text",
  "magnet",
  "binoculars",
  "chess-rook",
  "dumbbell",
  "feather",
  "feather-2",
  "mountain-snow",
  "cloud-lightning",
] as const

const RELEASE_2_2_0: BlogPost = {
  /* The count, "free", "shadcn/ui", "React" and "Figma", then what a search
     types for this batch: transport, road works, food and music. The slug
     names the drawings, not the version. */
  slug: "transport-road-works-food-and-music-icons",
  version: "2.2.0",
  title:
    "55 free transport and construction icons for React, shadcn/ui and Figma",
  description:
    "Free, MIT-licensed SVG icons: buses, trams and taxis, an off state " +
    "for every vehicle, traffic cones and road works, burgers, pizza and a " +
    "cassette.",
  standfirst: "Every vehicle in the set can be switched off now, and the street has its cones.",
  headline: "Every vehicle can now be switched off",
  date: "2026-10-25",
  updated: "2026-10-25",
  readingMinutes: 4,
  thumbnail: BLOG_V220_THUMBNAIL_ICON_NAMES,
  keywords: [
    "bus icon",
    "tram icon",
    "taxi icon",
    "car icon",
    "car off icon",
    "flight mode icon",
    "traffic cone icon",
    "construction icon",
    "factory icon",
    "crosshair icon",
    "footprints icon",
    "burger icon",
    "pizza icon",
    "cookie icon",
    "skull icon",
    "bone icon",
    "dna icon",
    "speaker icon",
    "cassette icon",
    "router icon",
    "split icon",
    "free svg icons",
    "shadcn/ui icons",
    "figma icons",
    "react icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "This update brings 55 new icons. Eighteen are transport: a bus, a " +
        "tram, a taxi and a car seen from the front, and an off state for " +
        "every vehicle in the set. The rest are things from the street, the " +
        "kitchen, the body and the music shelf, and a few signs for icons " +
        "you already use.",
    },
    {
      kind: "p",
      text:
        "With these, the set grows to 1,623 icons. Each one comes in stroke, " +
        "two-tone, duotone and fill, with rounded or sharp corners, so that's " +
        "12,984 SVGs in all.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V220_HERO_ICON_NAMES,
        caption: "Eight of the fifty-five, one style to a row.",
      },
    },

    { kind: "h2", text: "Vehicles, on and off", id: "transport" },
    {
      kind: "p",
      text:
        "`bus` and `tram-front` join the train and the plane. `car-taxi` and " +
        "`car-taxi-front` put the light on the roof, from the side and from " +
        "the front, and `car-front` is the car you see coming towards you.",
    },
    {
      kind: "p",
      text:
        "Every vehicle that can take a slash has an off state now: the cars " +
        "and the taxi, the bus, the train, the tram, the truck, the plane, " +
        "the ship, both bikes and both rockets. Use them for a cancelled " +
        "service, a closed road, a launch on hold or flight mode. The train " +
        "seen from the front is called `train-front` now, beside " +
        "`tram-front`, and the old name still works.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V220_TRANSPORT_ICON_NAMES,
        caption: "Five new vehicles, then the off state of thirteen.",
      },
    },

    { kind: "h2", text: "On the street", id: "street" },
    {
      kind: "p",
      text:
        "A traffic cone and a striped barrier mark road works, and a page " +
        "that is still under construction. `factory` stands beside the " +
        "buildings, `crosshair` is for aiming at a precise point, and " +
        "`footprints` is a trail, a walk or a step count.",
    },
    {
      kind: "p",
      text:
        "For safety there's a fire extinguisher beside the lifebuoy, and a " +
        "flashlight for the torch on your phone or a search in the dark.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V220_STREET_ICON_NAMES,
        caption: "Road works, a factory, a crosshair, footprints, and the safety kit.",
      },
    },

    { kind: "h2", text: "Food, the body and music", id: "things" },
    {
      kind: "p",
      text:
        "A burger, a slice of pizza and a cookie, which is also the mark a " +
        "cookie banner wears. For health there's a skull, a bone whole and " +
        "broken in two, a DNA helix and the doctor's bag with its cross.",
    },
    {
      kind: "p",
      text:
        "For sound, a boom box with its handle, a cassette tape, a speaker " +
        "and the satellite dish that takes a broadcast in. In duotone the " +
        "body is grey and its working parts are black: the boom box's " +
        "handle and speakers, the cassette's reels, the speaker's cones.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V220_THINGS_ICON_NAMES,
        caption: "Three foods, four for health and four for sound.",
      },
    },

    { kind: "h2", text: "And the rest", id: "singles" },
    {
      kind: "p",
      text:
        "`router` has its two antennas, `mails` stacks two envelopes, and " +
        "both speech bubbles come dashed, for a draft or a reply still " +
        "being written. `split` forks one arrow into two.",
    },
    {
      kind: "p",
      text:
        "The alarm clock gets a cross, the octagon a minus and the scan " +
        "frame a bolt. `heart-handshake` puts two hands inside a heart, and " +
        "`book-open-text` fills an open book with lines. There's a magnet, a " +
        "pair of binoculars, a chess rook, a dumbbell, two feathers, a " +
        "snow-capped mountain and a thunderstorm.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V220_SINGLE_ICON_NAMES,
        caption: "Signs for icons you know, and the things that stand alone.",
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
    "1,654 free, MIT-licensed SVG icons for React, shadcn/ui and Figma. New: " +
    "the bath and shower, kitchen and laundry machines, a safe, a caravan, a " +
    "tent and a castle.",
  standfirst: "Drawn off the amenity lists of two booking sites, one gap at a time.",
  headline: "Hotel amenities, from the bath to the safe",
  date: "2026-10-30",
  updated: "2026-11-01",
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
        "A booking site shows what a place offers as a row of small icons. " +
        "The row runs long: the bath, the kitchen, the washer, air " +
        "conditioning, a safe, whether you can smoke. Until now this set " +
        "could draw the wifi and the parking, and stopped short of the " +
        "bathroom. Most of the 31 new icons fill in that row. The rest are " +
        "for getting there and what to see: a suitcase, a caravan, a tent, " +
        "a castle.",
    },
    {
      kind: "p",
      text:
        "That takes the set to 1,654 icons. Each comes in stroke, two-tone, " +
        "duotone and fill, with rounded or sharp corners: 13,232 SVGs in all.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V230_HERO_ICON_NAMES,
        caption:
          "Eight of the 31 in every style. Fill has nothing to add to `ski`, " +
          "`wheelchair`, `waves-ladder` or `a-text-cursor`, so those four keep " +
          "their outline.",
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
        "Until this update, searching this site for a safe found `lock`, a " +
        "padlock, because that was the closest thing the set had. Searching " +
        "for a castle found the chess rook. Both were fair guesses and both " +
        "were wrong on a listing. A padlock says the door locks, not that " +
        "there's a safe in the wardrobe.",
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
        "the plane, bus, taxi and bike the set already had. For the stay, " +
        "`tent`, `barn`, `castle` and `lighthouse` work whether the listing " +
        "is one or sits near one, and `ski` marks a resort.",
    },
    {
      kind: "p",
      text:
        "One new icon has nothing to do with travel. `a-text-cursor` puts a " +
        "capital A beside the text cursor, for a text field or a tool that " +
        "adds text.",
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
    "Also new: a bus seen from the front, a block of offices and a pencil " +
    "across a set square.",
  headline: "Minibar used to find nothing",
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
        "A listing that took its bathroom and kitchen from this set still " +
        "had nowhere to get the room itself: the couch, the desk, the " +
        "blinds, the heater, the minibar. Those are drawn now, and so is " +
        "the outside: a hot tub, a sun lounger, a table under a parasol.",
    },
    {
      kind: "p",
      text:
        "That is 38 new icons, and the set is at 1,692, each in stroke, " +
        "two-tone, duotone and fill with rounded or sharp corners: 13,536 " +
        "SVGs. Sixteen of the 38 are off states. Alongside them, 47 " +
        "drawings that already shipped were redrawn, most of them in duotone.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V250_HERO_ICON_NAMES,
        caption:
          "Eight of the 38 in every style. `sunrise-2` and `sunset-2` set " +
          "the sun over waves, where the shipped `sunrise` and `sunset` " +
          "stand it on a flat line.",
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
        "The other 37 redraws are smaller. Fills that ran parts together " +
        "now keep them apart: the envelope's flap from its body, the bell's " +
        "dome from its base, the dumbbell's weights from the bar. In " +
        "duotone the picture's mountain is solid across the ten image " +
        "icons, and the three rockets are black with grey fins. In sharp " +
        "corners, the money bag and its five signs tie the same knot as in " +
        "rounded.",
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
