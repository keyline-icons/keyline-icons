import history from "@/lib/icon-history.json"
import { SET_TITLE } from "@/lib/site-chrome"

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

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id: string }
  | { kind: "list"; items: readonly string[] }
  /** A pulled-out line. Used for the one sentence a section is really about. */
  | { kind: "note"; text: string }
  | { kind: "link"; href: string; label: string; text: string }
  | { kind: "figure"; figure: BlogFigure }

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

export const BLOG_SEGMENT = "/blog"
export const postHref = (slug: string) => `${BLOG_SEGMENT}/${slug}`

/**
 * What the blog is, in one sentence, for the index page's description and for
 * the `Blog` node in its structured data.
 *
 * Here rather than in `lib/seo.ts` beside the other descriptions, because that
 * file imports this one for the route: the blog owns its own address and its
 * own sentence, and the SEO helpers read them. The other way round is a cycle.
 */
export const BLOG_DESCRIPTION =
  `How ${SET_TITLE} gets drawn: what shipped in each update, why a drawing ` +
  `was redrawn, and the faults that only show up at eight times size.`

/**
 * Every version that has actually been tagged, straight out of the generated
 * history.
 *
 * **The JSON rather than `SET_RELEASES` from `lib/icons.ts`, and this is a
 * trap worth knowing.** That module reads the icon directories off disk, so it
 * pulls `node:fs` in with it. This file is imported by `lib/seo.ts`, and
 * `lib/seo.ts` is imported by `components/share-dialog.tsx`, which is a client
 * component. Reaching for the tidier import would put `fs` in a browser bundle
 * and break the build somewhere that looks nothing like this line.
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
 * **The version goes in front once, and only once the tag exists.** A post
 * about a release wants to be findable by that release, which is why
 * "Tailwind CSS v4.3: ..." is the shape every good release post uses. What it
 * must not do is name a version that has not been cut. This repository has
 * shipped that bug twice from the other direction, announcing work under a tag
 * it was not in, and the changelog's answer is to head untagged work
 * "Unreleased" until the tag lands.
 *
 * So the headline graduates on its own. Write the version on the post the day
 * the branch is opened; the title stays bare until that version appears in
 * `lib/icon-history.json`, and the next build after the tag adds the prefix
 * everywhere at once. Nobody has to remember to come back and edit it.
 *
 * The post below is what that looks like from both sides. It was drafted
 * carrying `version: "0.3.1"`, the number its branches were named for, and
 * printed "Unreleased" for as long as no such tag existed. The batch then
 * shipped as **0.4.0**, because forty-four new names bump the second number
 * and the third is for a release that adds none. The field was corrected, the
 * tag exists, and the prefix appeared on its own.
 *
 * **The prefix is the bare version, not "Keyline Icons v0.4.0".** The root
 * layout's title template already appends the set name, so spelling it out
 * here renders "Keyline Icons v0.4.0: ... · Keyline Icons" in the tab and on
 * every card. That was written the long way first and caught by rendering a
 * released version rather than by reading the code, which is the only way this
 * class of mistake ever surfaces.
 *
 * One function rather than a string on the post, because five surfaces print
 * this and a second spelling on any of them is a title that disagrees with the
 * page it is on, which is the one thing Google rewrites.
 */
export const postHeadline = (post: BlogPost) =>
  isReleased(post.version) ? `v${post.version}: ${post.title}` : post.title

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
  "cloud-minus",
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
  "cloud-minus",
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
  "plane", "bot", "leaf", "flask-conical", "truck-check", "brain",
  "plane-takeoff", "plane-landing", "ship", "train", "bike", "truck-electric",
  "truck-plus", "truck-minus", "truck-x", "truck-arrow-up", "truck-arrow-down",
  "truck-arrow-left", "truck-arrow-right", "tree-palm", "wind-turbine",
  "droplet", "droplet-off", "droplets", "bird", "pig", "piggy-bank",
  "brain-circuit", "flask-conical-off", "flask-round", "test-tube",
  "test-tube-diagonal", "test-tubes", "lungs", "ear", "ear-listen",
  "ear-waveform", "thermometer", "thermometer-sun", "thermometer-snowflake",
  "temperature-empty", "temperature-quarter", "temperature-half",
  "temperature-high", "temperature-full", "earbuds", "airpods",
  "airpods-open", "hand-pointer", "hand-pointer-down", "hand-pointer-left",
  "hand-pointer-right", "radar",
] as const

/** Transport, Nature and Animals, and the money box that is not an animal. */
export const BLOG_V090_TRANSPORT_ICON_NAMES = [
  "plane", "plane-takeoff", "plane-landing", "ship", "train", "bike",
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
  "printer", "coffee", "bed", "key", "palette", "film",
  "keyboard", "calculator", "usb", "usb-drive", "file-code", "file-zip",
  "folder-search", "eraser", "tape", "bed-single", "bed-double", "sofa",
  "door", "door-open", "brick-wall", "mars", "venus", "cake", "soup",
  "bottle", "paintbrush", "paint-roller", "easel", "key-round",
  "key-square", "coins", "broom",
] as const

/** The ten that sit on a desk, and the shelves they landed on. */
export const BLOG_V080_DESK_ICON_NAMES = [
  "printer", "keyboard", "calculator", "usb", "usb-drive",
  "file-code", "file-zip", "folder-search", "eraser", "tape",
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
  "message-square",
  "message-square-plus",
  "message-square-minus",
  "message-square-check",
  "message-square-x",
  "message-square-lines",
  "message-square-dot",
  "message-square-off",
  "messages-square",
  "qr-code",
  "scan",
  "scissors",
  "hourglass",
  "scan-line",
  "scan-text",
  "scan-barcode",
  "scan-qr-code",
  "scan-search",
  "scan-eye",
  "search-slash",
  "slash",
  "scissors-horizontal",
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
  "chart-diagram",
  "chart-pyramid",
  "chart-waterfall",
  "chart-no-axes-combined",
  "chart-scatter-3d",
  "chart-tree-map",
  "chart-scatter-bubble",
  "chart-line-down",
  "chart-line-up",
  "diagram-successor",
  "diagram-predecessor",
  "diagram-project",
  "diagram-subtask",
  "bars-progress",
  "face-smile",
  "face-smile-plus",
  "face-frown",
  "face-neutral",
  "face-expressionless",
  "face-laugh",
  "face-angry",
  "thumbs-up",
  "thumbs-down",
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

/** The faces and the two thumbs, on the Emoji shelf. */
export const BLOG_V070_EMOJI_ICON_NAMES = [
  "face-smile",
  "face-smile-plus",
  "face-frown",
  "face-neutral",
  "face-expressionless",
  "face-laugh",
  "face-angry",
  "thumbs-up",
  "thumbs-down",
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
  "message-square",
  "message-square-plus",
  "message-square-minus",
  "message-square-check",
  "message-square-x",
  "message-square-lines",
  "message-square-dot",
  "message-square-off",
  "messages-square",
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
  "chart-diagram",
  "chart-pyramid",
  "chart-waterfall",
  "chart-no-axes-combined",
  "chart-scatter-3d",
  "chart-tree-map",
  "chart-scatter-bubble",
  "chart-line-down",
  "chart-line-up",
  "bars-progress",
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
  "flame",
  "store",
  "buildings",
  "cpu",
  "graduation-cap",
  "book",
  "book-open",
  "book-plus",
  "book-minus",
  "book-check",
  "book-x",
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
  "wallet",
  "credit-card",
  "credit-card-plus",
  "credit-card-minus",
  "credit-card-check",
  "credit-card-x",
  "dollar-sign",
  "euro",
  "pound-sterling",
  "japanese-yen",
  "indian-rupee",
  "swiss-franc",
  "bitcoin",
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
  "link",
  "link-2",
  "unlink",
  "bell-ring",
  "sparkles",
  "zap",
  "link-2-off",
  "quote",
  "quote-end",
  "quote-single",
  "quote-single-end",
  "text-quote",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "align-left",
  "align-center",
  "align-right",
  "align-justify",
  "language",
  "list",
  "list-ordered",
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
  slug: "44-new-icons-and-a-duplicate-that-shipped-seven-times",
  /* It shipped as 0.4.0, not the 0.3.1 the branches were named for: forty-four
     new names bump the second number, and the third is for a release that adds
     none. The tag exists, so every surface prints `v0.4.0` and the title takes
     the prefix. */
  version: "0.4.0",
  title: "44 new icons, and a duplicate that shipped seven times",
  description:
    "Inside Keyline Icons v0.4.0: the parcel, search, cloud and app families, " +
    "a redrawn bell whose plate was standing outside its own outline, and the " +
    "day git-merge turned out to be git-branch under a second name.",
  standfirst:
    "Everything that landed in v0.4.0, and what each of it was actually for. " +
    "Free SVG icons for shadcn/ui, drawn on one 24×24 grid.",
  date: "2026-09-06",
  /* Revised on the 7th, against what the tag actually shipped: the batch went
     out as 0.4.0 rather than the 0.3.1 its branches were named for, two of the
     drawings named here were dropped before the tag, and the redraw count is
     the release's own rather than the one this post was drafted with. */
  updated: "2026-09-07",
  readingMinutes: 7,
  thumbnail: BLOG_BATCH_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "package icons",
    "search icons",
    "cloud icons",
    "icon redraw",
    "sharp icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "v0.4.0 added forty-four drawings and redrew three hundred and " +
        "fifteen. The changelog will tell you that much on its own, off the " +
        "commit dates, without anyone having to write it down. What it cannot " +
        "tell you is why any of it happened, and that turns out to be the more " +
        "interesting half. So here it is: the families, and the faults.",
    },
    {
      kind: "p",
      text:
        "Two things about that redraw count before anything else, because it " +
        "is the number that looks wrong. The overwhelming majority of it is " +
        "one change applied across the set: how a sharp stroke ends, which is " +
        "its own story and not this one. What this post covers is the " +
        "forty-four new drawings, and the handful of redraws that were faults " +
        "rather than a treatment: seven bells, a database, a credit card and " +
        "the duplicate below.",
    },

    {
      kind: "h2",
      text: "Four families, not forty-four decisions",
      id: "families",
    },
    {
      kind: "p",
      text:
        "Most of a batch this size is not forty-four separate calls. It is four " +
        "or five, applied consistently. The parcel is the clearest example, " +
        "and it is the one where the set answered the question for me.",
    },
    {
      kind: "p",
      text:
        "Which modifiers a base is allowed to take is not a matter of taste " +
        "here, it is something you can read off the drawings that already " +
        "ship. Six bases carry the four arrows: calendar, clock, file, folder, " +
        "image and smartphone. Every one of them holds content that moves in " +
        "and out. A parcel is the thing that moves. Its absence from that list " +
        "was a gap rather than a decision, so it got the arrows, plus the plus, " +
        "minus, check, x and alert that every container base carries.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_PACKAGE_ICON_NAMES,
        caption:
          "The parcel base and its nine modifiers. Nine of these ten are new.",
      },
    },
    {
      kind: "p",
      text:
        "The same test, applied the other way, is why the app tile did not get " +
        "arrows. No base outside those six carries one, a tile is not a " +
        "container of moving things, and its verbs are install, remove and " +
        "approve, which plus, minus and check already say. It got the dot " +
        "instead, which is what a notification looks like everywhere else in " +
        "the set.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_APP_ICON_NAMES,
        caption:
          "The app tile's five. No arrows, on purpose: download already " +
          "exists as its own word.",
      },
    },
    {
      kind: "p",
      text:
        "Search got ten, five on each glass. The construction came out of the " +
        "existing search icon rather than being invented for the batch: the " +
        "plate is the lens disc, the fill is that disc solid with the handle " +
        "still stroked, and the sharp treatment pushes the handle a unit along " +
        "its own diagonal.",
    },
    {
      kind: "p",
      text:
        "One of the five would not cooperate. The signs are sized so that each " +
        "one's furthest point lands on a path radius of 3, which is forced " +
        "rather than chosen: the glass's inner ink edge is at 6, the gap the " +
        "set keeps between elements takes 2, and the sign's own ink takes 1. " +
        "The plus and the minus already sat exactly there. The list did not " +
        "fit at any size that also cleared the 2-unit gap between its bars, so " +
        "it is redrawn on a pitch of 4, which caps the bars at a radius of " +
        "2.236. Both glasses take the same signs, sized for the smaller of the " +
        "two, because two sizes of check would read as two different checks.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_SEARCH_ICON_NAMES,
        caption:
          "Ten new search icons. The top row is the angled glass, the bottom " +
          "row the round one.",
      },
    },
    {
      kind: "p",
      text:
        "The cloud took the same five signs on the same reasoning, and the " +
        "umbrella turned into three drawings out of one: the canopy with its " +
        "hem, the canopy with a slash across it, and a parasol, which is the " +
        "umbrella with a pole where the hook should be. There was a fourth, " +
        "the same canopy closed and stood upright, and I dropped it before " +
        "the tag.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_CLOUD_ICON_NAMES,
        caption: "Five for the cloud.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_UMBRELLA_ICON_NAMES,
        caption:
          "One canopy, three icons. The parasol differs by its pole and by " +
          "nothing else.",
      },
    },
    {
      kind: "p",
      text: "And then the ones that belong to nothing, which is the rest of it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_SINGLES_ICON_NAMES,
        caption: "Twelve singles, which belong to no family and to each other.",
      },
    },

    {
      kind: "h2",
      text: "git-merge was git-branch under a second name",
      id: "duplicate",
    },
    {
      kind: "p",
      text: "This is the one worth reading if you maintain an icon set of your own.",
    },
    {
      kind: "p",
      text:
        "While checking something unrelated, git-merge and git-branch turned " +
        "out to be the same drawing. Not similar. The same. Byte-identical in " +
        "fill, and in the other four variants identical but for the winding " +
        "direction of the circles, which is a difference no renderer can show " +
        "you on a stroke or on non-overlapping fills. Put side by side at any " +
        "size, they were pixel-identical.",
    },
    {
      kind: "p",
      text:
        "I drew both on 8 August and found the fault on 4 September, by which " +
        "point it had gone out in every release the set has ever cut: " +
        "v0.1.0 through v0.3.0, seven of them, on npm, in the Figma library " +
        "and in the plugin. Nobody reported it, and I would not expect anyone " +
        "to have. You reach for git-merge, you get a picture of some lines " +
        "joining, and it looks like a merge because you were already thinking " +
        "about merging.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "git-merge as it shipped, laid over git-branch",
            a: { name: "git-merge", take: "before" },
            b: { name: "git-branch", take: "current" },
            verdict: {
              text: "Nothing to see. That is the finding.",
              tone: "bad",
            },
          },
          {
            title: "git-merge as it ships now, laid over git-branch",
            a: { name: "git-merge", take: "current" },
            b: { name: "git-branch", take: "current" },
            verdict: { text: "Two drawings", tone: "good" },
          },
        ],
        caption:
          "Each panel is one drawing painted on top of the other. Anywhere " +
          "the two disagree, one of them keeps its colour. The left panel " +
          "has no colour in it anywhere, which is what a duplicate looks " +
          "like: every mark either drawing makes, the other makes too.",
        legend: {
          a: "git-merge only",
          b: "git-branch only",
          both: "ink the two share",
        },
      },
    },
    {
      kind: "note",
      text:
        "A duplicate that renders identically is invisible to every check that " +
        "looks at the picture. It is only visible to one that looks at the path.",
    },
    {
      kind: "p",
      text:
        "Which of the two was wrong is answerable from the drawing itself. The " +
        "shared picture has its junction at the top node, one arm carrying on " +
        "down the trunk and the other running out to a leaf: one line becoming " +
        "two, flowing down. That is a branch. So git-branch keeps it, and " +
        "git-merge is the one that had been copied.",
    },
    {
      kind: "p",
      text:
        "It is now that drawing mirrored about the horizontal centre line, so " +
        "the trunk keeps its node at the bottom, the branch node moves to the " +
        "top right, and both arms converge into the bottom node: two strands " +
        "into one, going down. Closing the gap in git-pull-request was the " +
        "other candidate and was rejected, because that gap is this family's " +
        "spelling of a proposed rejoin, and a merge drawn four units of line " +
        "away from it trades one collision for another.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_GIT_ICON_NAMES,
        caption:
          "The two, as they now ship. One line becoming two, and two becoming one.",
      },
    },

    { kind: "h2", text: "Grey where there should be none", id: "plates" },
    {
      kind: "p",
      text:
        "The duotone style paints a grey plate behind the black outline. The " +
        "plate is supposed to be the outline's own offset, one unit inside the " +
        "stroke, all the way around. On every bell in the set, it was not: each " +
        "plate's flank had been sampled by hand rather than offset, and along " +
        "about two thirds of its length it ran outside the ink.",
    },
    {
      kind: "p",
      text:
        "I found it by recolouring the plate in Figma, which is the only way " +
        "anyone was ever going to. The worst of it was 0.10 of a grid " +
        "unit, on the plain bell in sharp. The grid is 24 units across and the " +
        "icon is 24 pixels across, so that is a tenth of a pixel. Which is why " +
        "it shipped, and why it kept shipping.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The whole bell, old plate over new",
            a: { name: "bell", take: "before" },
            b: { name: "bell", take: "after" },
            verdict: {
              text: "Barely a hairline, and this is fifteen times icon size",
              tone: "good",
            },
          },
          {
            title: "Three units of its left flank, same two plates",
            a: { name: "bell", take: "before" },
            b: { name: "bell", take: "after" },
            viewBox: "3.2 11 3 3",
            verdict: { text: "0.054 of a unit outside the ink", tone: "bad" },
          },
        ],
        caption:
          "The same two drawings in both panels, one painted over the other. " +
          "The rose down the edge of the second panel is the whole fault: " +
          "plate the old drawing put outside the outline it was meant to sit " +
          "one unit inside. The first panel is the whole bell at roughly " +
          "fifteen times the size it ships at, where that same rose is barely " +
          "a hairline; at 24px it is 0.054 of a pixel, which is how it " +
          "survived fourteen files and seven releases. There is no emerald in " +
          "either panel, and that is a finding too: the correction never added " +
          "plate anywhere, it only ever pulled it back.",
        legend: {
          a: "plate as it shipped",
          b: "plate as it is now",
          both: "ink that did not move",
        },
      },
    },
    {
      kind: "p",
      text:
        "I rebuilt twenty-one such runs across fourteen files as real " +
        "offsets: endpoints and end tangents held, handle lengths solved from " +
        "the midpoint, each piece split until every sample sits at exactly one " +
        "unit from the stroke. Worst error is now 0.0026, down from 0.10. Five " +
        "of the runs are the rounded sign bells, which leave the notch at the " +
        "point one unit above the stroke's cut and turn onto the offset along " +
        "the cap's own circle; that turn was 0.0145 loose and is now the arc it " +
        "was always meant to be.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_BELL_ICON_NAMES,
        caption:
          "The seven bells, before and after. At this size the fix is invisible, " +
          "which was the whole problem.",
      },
    },
    {
      kind: "p",
      text:
        "A handful of the other redraws are the same shape of fault, found the " +
        "same way: sharp caps standing outside the ink on the music notes, the " +
        "map pins and the message dot; the clock rings sitting off their own " +
        "circle; the database cylinder's plate offset the way the bells' now " +
        "are. The remaining three hundred are the sharp end cut, one rule " +
        "applied to every drawing at once, and they are a post of their own. " +
        "What both have in common is the lesson: a treatment applied across " +
        "three thousand files finds you every drawing that was only " +
        "approximately right.",
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "p",
      text:
        "All of it shipped in v0.4.0, in stroke, duotone and fill, rounded or " +
        "sharp, free under the MIT licence.",
    },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text: "every drawing, filterable by style, corner treatment and category.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install it",
      text: "the React package, the CLI, the shadcn registry and the plain SVGs.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "the same events without the commentary, generated off the commits.",
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
const BATCH_0_5_0: BlogPost = {
  /* Named for the story, never for a version: a batch is usually untagged when
     the post goes up, and a URL announcing a number is a URL that has to be
     corrected. */
  slug: "35-new-icons-and-two-names-the-wrong-way-round",
  version: "0.5.0",
  title: "35 new icons, and two names that were the wrong way round",
  description:
    "Inside Keyline Icons v0.5.0: a Text shelf for the formatting marks, the " +
    "day link and link-2 turned out to be on each other's drawings, and a " +
    "pair of sliders that broke their rails to give the knob air.",
  standfirst:
    "Everything that landed in v0.5.0, and what each of it was actually for. " +
    "Free SVG icons for shadcn/ui, drawn on one 24×24 grid.",
  date: "2026-09-08",
  updated: "2026-09-08",
  readingMinutes: 5,
  thumbnail: BLOG_V050_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "text formatting icons",
    "quotation mark icons",
    "link icons",
    "slider icons",
    "icon redraw",
  ],
  body: [
    {
      kind: "p",
      text:
        "Thirty-five new drawings and seven redrawn, which takes the set to " +
        "663 names.",
    },
    {
      kind: "p",
      text:
        "Most of a batch this size is four or five decisions applied " +
        "consistently rather than forty separate ones, and this one is no " +
        "exception. Fourteen of the thirty-five are formatting marks that " +
        "arrived with a shelf of their own. Two of the seven redraws are a " +
        "pair of names that had been on each other's drawings since the " +
        "beginning. And the sliders gave up four units of rail each, so the " +
        "knob has air without a knockout.",
    },

    {
      kind: "h2",
      text: "Two names on the wrong drawings",
      id: "the-swap",
    },
    {
      kind: "p",
      text:
        "This set follows the naming of the most widely used open icon set, and " +
        "that is a decision worth being " +
        "boring about: somebody arriving with an import list should not have " +
        "to learn a second vocabulary to use a second icon set. That set calls " +
        "the interlocked diagonal chain `link`, and the horizontal one with " +
        "the bar through it `link-2`. This set had them the other way round, " +
        "and " +
        "had done from the start.",
    },
    {
      kind: "p",
      text:
        "So they swapped bodies. `link` is the diagonal chain now and " +
        "`link-2` is the horizontal one. The component sets in Figma kept " +
        "their ids " +
        "through it, so every instance in the catalogue stayed linked to the " +
        "thing it was already pointing at, and only the geometry inside moved.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`link` as it shipped, laid over `link-2` as it ships now",
            a: { name: "link", take: "before" },
            b: { name: "link-2", take: "current" },
            verdict: {
              text: "Nothing to see. That is the finding.",
              tone: "bad",
            },
          },
          {
            title: "`link` as it ships now, laid over `link-2`",
            a: { name: "link", take: "current" },
            b: { name: "link-2", take: "current" },
            verdict: { text: "Two drawings", tone: "good" },
          },
        ],
        caption:
          "Each panel is one drawing painted on top of the other. Where the " +
          "two disagree, one of them keeps its colour. The left panel has no " +
          "colour anywhere, because the drawing that used to answer to " +
          "`link` is the drawing that answers to `link-2` now: a swap, " +
          "stated as " +
          "plainly as it can be. The right panel is the same comparison after " +
          "it, and there is nothing subtle about that one.",
        legend: {
          a: "`link` only",
          b: "`link-2` only",
          both: "ink the two share",
        },
      },
    },
    {
      kind: "p",
      text:
        "`link-off` came with them. It draws the horizontal chain with a " +
        "slash through it, which makes it the negated form of `link-2` " +
        "rather than of `link`, so it is `link-2-off` now. That is the one " +
        "change here that will break a build: `LinkOff` leaves the React " +
        "exports and `Link2Off` replaces it. The old name is kept as a " +
        "search alias, so looking for `link-off` on the site still lands on " +
        "the drawing.",
    },
    {
      kind: "note",
      text:
        "A rename reads to every check in this repository as one name added " +
        "and one quietly absent. Nothing counts what left.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_LINK_ICON_NAMES,
        caption:
          "The chain after the swap: `link`, `link-2`, `link-2-off` and " +
          "`unlink`. `unlink` is new, and it is the diagonal chain come " +
          "apart rather than " +
          "the horizontal one, which is that set's reading of that name too.",
      },
    },

    {
      kind: "h2",
      text: "The formatting marks got a shelf",
      id: "text-shelf",
    },
    {
      kind: "p",
      text:
        "Fourteen names, and a category that did not exist before this " +
        "release: `bold`, `italic`, `underline` and `strikethrough`, the " +
        "four-way alignment stack, the double and single quotation marks in " +
        "both hands, and `language`.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_TEXT_SHELF_ICON_NAMES,
        caption:
          "The Text shelf. The set otherwise draws no letters, and the eight " +
          "sort icons that carried an A and a Z were drawn and dropped for " +
          "it: a counter closes into a blob at 24px. These survive because a " +
          "B and a U at this size are bowls and a bar rather than letterforms " +
          "with a typographic proportion to hold.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V050_SINGLES_ICON_NAMES,
        caption:
          "The rest of what is new. `bell-ring` is the bell with two waves " +
          "concentric with its own dome, which is what makes the clearance " +
          "one number instead of a curve-to-curve solve: the dome paints out " +
          "to 6, so a wave whose centre line sits at 9 paints in to 8, and " +
          "the gap is exactly the two units the guide asks for. The two " +
          "planes are one construction with two sets of numbers, so the flat " +
          "one cannot drift away from the diagonal.",
      },
    },

    {
      kind: "h2",
      text: "The sliders broke their rails",
      id: "sliders",
    },
    {
      kind: "p",
      text:
        "`sliders-horizontal` and `sliders-vertical` used to draw three " +
        "unbroken rails with a tick crossing each. They break at the knob " +
        "now, which " +
        "gives it air without a knockout the stroke style is not allowed to " +
        "have.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`sliders-horizontal`, old rails over new",
            a: { name: "sliders-horizontal", take: "before" },
            b: { name: "sliders-horizontal", take: "after" },
            verdict: { text: "Three breaks and one knob moved", tone: "good" },
          },
          {
            title: "Seven units of the top rail, same two drawings",
            a: { name: "sliders-horizontal", take: "before" },
            b: { name: "sliders-horizontal", take: "after" },
            viewBox: "11 2 7 6",
            verdict: { text: "Four units of rail, gone", tone: "good" },
          },
        ],
        caption:
          "The rose is rail the old drawing painted and the new one does " +
          "not. The emerald in the first panel is the middle knob, which " +
          "moved two units along its rail to sit where the break leaves it " +
          "room. The cut lands on the knob's position minus four: the knob's " +
          "own ink reaches one unit, the guide asks for two, and the rail's " +
          "cap adds the last one.",
        legend: {
          a: "rail as it was",
          b: "as it is now",
          both: "ink that did not move",
        },
      },
    },
    {
      kind: "p",
      text:
        "Which side breaks is not a choice made per row. It is the longer " +
        "side every time, so the gap lands where there is room for it, and " +
        "the vertical is the horizontal transposed exactly. That last part is " +
        "not tidiness: a pair drawn twice drifts apart one member at a time, " +
        "and the only reliable defence is for there to be one drawing.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V050_REDRAWN_ICON_NAMES,
        caption:
          "All seven redraws, before beside after. At 24px most of these are " +
          "honestly hard to tell apart, which is the argument for the " +
          "superimposed figures above: the `pen` family is the same drawing " +
          "scaled 10/9 with its band moved from the nib to the cap, and " +
          "`clock` is now exactly `clock-3`, both names kept.",
      },
    },

    {
      kind: "h2",
      text: "Seven currencies, and what a letterform owes",
      id: "currencies",
    },
    {
      kind: "p",
      text:
        "The second half of the batch is money: a wallet, the four signs on " +
        "the payment card, and seven currency marks. The marks are the " +
        "interesting ones, because they are letterforms rather than objects " +
        "and the set already had three, in `bold`, `italic` and `underline`. " +
        "Those sit on a cap that paints 20 tall, and so do these: one height " +
        "for the family, so a price field can put a euro next to a pound and " +
        "have them agree.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_CURRENCY_ICON_NAMES,
        caption:
          "One cap for all seven. The dollar and the bitcoin carry it on the " +
          "BAR and let the letter sit inside, which is what type does and why " +
          "the dollar's S is shorter than the euro's bowl rather than the two " +
          "being drawn to one height.",
      },
    },
    {
      kind: "note",
      text:
        "None of the seven ships a filled style, and none is missing one: " +
        "what closes in a euro or a bitcoin is a counter, and a counter is " +
        "white by definition.",
    },
    {
      kind: "p",
      text:
        "That is a rule this set writes down rather than judges each time. A " +
        "fill needs a region to fill, so the obligation comes from the " +
        "geometry: an open glyph with no container owes a stroke and nothing " +
        "else. Filled, a bitcoin is a blob with two dots in it. The B is " +
        "drawn as two open runs sharing its stem for exactly that reason, " +
        "which is also how the set already draws `bold`.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_MONEY_ICON_NAMES,
        caption:
          "The wallet is the card's own envelope with a pocket cut into its " +
          "right side, and the pocket is open to the wall rather than a " +
          "closed rectangle beside it: closed, it leaves a one-unit sliver " +
          "that shuts at 16 pixels. A clasp bead was drawn and dropped, " +
          "because the pocket's interior is 5 by 4 and a bead is 3 across.",
      },
    },

    {
      kind: "h2",
      text: "Getting it",
      id: "getting-it",
    },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text: "All 663 drawings, in three styles and two corner treatments.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "The React package, the CLI, the shadcn registry, the MCP server and " +
        "the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text:
        "What moved, generated off git, with every redraw shown before and " +
        "after.",
    },
  ],
}

const BATCH_0_7_0: BlogPost = {
  slug: "the-message-family-in-a-second-body",
  version: "0.7.0",
  title: "71 new icons, and the message family in a second body",
  description:
    "Inside Keyline Icons v0.7.0: the message family drawn again on a square " +
    "body, option for option, a scan frame with six things to read, " +
    "twenty-six charts, four diagrams, seven faces and a badge with nine " +
    "signs.",
  standfirst:
    "Everything that landed in v0.7.0: the square bubble, the scan family, " +
    "twenty-six charts, four diagrams, the faces and the badges. Free SVG icons for shadcn/ui, drawn on one " +
    "24\u00d724 grid.",
  date: "2026-09-10",
  updated: "2026-09-10",
  readingMinutes: 4,
  thumbnail: BLOG_V070_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "message square icon",
    "chat icons",
    "qr code icon",
    "scissors icon",
    "hourglass icon",
    "chart icons",
    "diagram icons",
    "scan icons",
    "emoji icons",
    "badge icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "Seventy-one new drawings, which takes the set to 765 names.",
    },
    {
      kind: "p",
      text:
        "Three singles that had been waiting: a QR code, scissors in both " +
        "bodies and an hourglass. A scan frame with six things to read " +
        "inside it. Twenty-six charts, four diagrams, seven faces, two " +
        "thumbs and a badge with nine signs. And the message family drawn " +
        "again on a square body, which took the most care: the point is " +
        "that you can swap one bubble for the other and nothing else on the " +
        "screen moves.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_THUMBNAIL_ICON_NAMES,
        caption:
          "All seventy-one, in the order the changelog lists them.",
      },
    },

    {
      kind: "h2",
      text: "Four singles",
      id: "the-singles",
    },
    {
      kind: "p",
      text:
        "The QR code is three finder squares and a corner of data, with no " +
        "centre dots: the wells are too small to hold one and keep two " +
        "units of air.",
    },
    {
      kind: "p",
      text:
        "`scan` is `scan-face` with the face taken out. The corner brackets " +
        "were already the frame.",
    },
    {
      kind: "p",
      text:
        "The scissors are two rings two apart, each sending a blade to the " +
        "opposite top corner. The rising blade runs unbroken; the other " +
        "passes underneath and is cut the way a slash cuts a drawing.",
    },
    {
      kind: "p",
      text:
        "The hourglass plate is one outline, because two would overlap at " +
        "the waist and the design file turns an overlap into a hole. The " +
        "filled style opens the top bulb and leaves the bottom solid. The " +
        "sand has run down.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_SINGLES_ICON_NAMES,
        caption:
          "The four singles. Three sit in a 20 square, the hourglass stands " +
          "taller at 18 by 22.",
      },
    },

    {
      kind: "h2",
      text: "A frame with six things to read",
      id: "the-scan-family",
    },
    {
      kind: "p",
      text:
        "The family is that frame with something inside it: a line, a line " +
        "of text, a barcode, a QR code, a magnifier and an eye. The first " +
        "QR code had a bar down its right and one along its bottom, and at " +
        "16px both read as more frame, so it is squares and dots now.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_SCAN_ICON_NAMES,
        caption:
          "The scan frame and what it reads, then the slash on its own and " +
          "through a search.",
      },
    },

    {
      kind: "h2",
      text: "Sixteen charts on one axis",
      id: "the-axis-charts",
    },
    {
      kind: "p",
      text:
        "Fifteen of the sixteen hang off the same axis, one bent line that " +
        "fixes the plot at sixteen units square. The columns sit on a " +
        "five-unit pitch, and the same three readings, sorted, are what an " +
        "increasing and a decreasing chart are.",
    },
    {
      kind: "p",
      text:
        "The pie is pulled apart, each slice slid straight out from the " +
        "centre by an amount worked out from its own angle. That is the " +
        "only way to get exactly two units of white into every cut; sliding " +
        "them all by the same amount leaves the wide cuts at nearly three.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_AXIS_CHART_ICON_NAMES,
        caption:
          "The sixteen. Every one but the pie shares the elbow and the plot.",
      },
    },

    {
      kind: "h2",
      text: "Ten more charts and four diagrams",
      id: "charts-and-diagrams",
    },
    {
      kind: "p",
      text:
        "Nine of these hang off the same axis. The waterfall runs four " +
        "bars: standing, floating, falling, standing to the total. The " +
        "scatter with a third axis puts its origin at a true corner, " +
        "because three lines meeting cannot take the rounded turn.",
    },
    {
      kind: "p",
      text:
        "The pyramid is `triangle-alert`'s triangle cut into three layers, " +
        "and `chart-line-up` and `chart-line-down` are `chart-line` rising " +
        "and falling into `trending-up`'s bracket.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_CHART_ICON_NAMES,
        caption:
          "The ten charts. Every axis chart shares one elbow and one plot.",
      },
    },
    {
      kind: "p",
      text:
        "The four diagrams are boxes on wires, on a shelf of their own, " +
        "because a diagram says how things relate where a chart says how " +
        "much.",
    },
    {
      kind: "p",
      text:
        "Every box takes the same corner radius, and the first cut did not: " +
        "a wide box came out rounder than a narrow one, a pill next to a " +
        "squared neighbour. The standard's table is right about a shape on " +
        "its own and wrong about a family drawn side by side.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_DIAGRAM_ICON_NAMES,
        caption:
          "The four diagrams. One radius on every box.",
      },
    },

    {
      kind: "h2",
      text: "Seven faces, two thumbs and a badge",
      id: "faces-and-badges",
    },
    {
      kind: "p",
      text:
        "The faces are `scan-face`'s face, which the set already owned. A " +
        "frown is the mouth turned over, a neutral mouth is a flat line, " +
        "flat eyes are dashes, and the angry brows slant in. The first cut " +
        "had nudged the eyes up a row and landed on another set's " +
        "coordinates, so the family went back to the face it already had.",
    },
    {
      kind: "p",
      text:
        "`face-smile-plus` is stroke only, because the notch for a " +
        "top-right sign covers the right eye. The thumbs' filled style " +
        "opens the cuff as a panel.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_EMOJI_ICON_NAMES,
        caption:
          "The Emoji shelf. One face, seven expressions, and the two thumbs.",
      },
    },
    {
      kind: "p",
      text:
        "The badge is eight bumps around a ring, and it carries the " +
        "circle's signs exactly as the circle draws them. The space inside " +
        "is a hair wider than the circle's, which is why the dollar is the " +
        "one currency mark that fits. The first ring turned out to be " +
        "another set's badge to the number, and was drawn again.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_BADGE_ICON_NAMES,
        caption:
          "The badge and its nine signs. Seven are the circle's own; the " +
          "percent and the dollar are the two that fit.",
      },
    },

    {
      kind: "h2",
      text: "One vocabulary, two bodies",
      id: "one-vocabulary",
    },
    {
      kind: "p",
      text:
        "The round `message` is an oval with a tail pulled out of its lower " +
        "left. The square one is a rounded box whose left side keeps going " +
        "and comes back to the bottom edge at an angle. That is the whole " +
        "tail. Both take up the same 20 by 20 space, so a row that mixes " +
        "them does not jump.",
    },
    {
      kind: "p",
      text:
        "Every mark sits where the round bubble already puts it: the signs " +
        "in the middle of the body at full size, the badge in the same ring " +
        "at the top right, the slash corner to corner, cutting into the " +
        "body on one side and standing clear on the other.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V070_PAIR_ICON_NAMES,
        caption:
          "Each pair is one option in the two bodies. Inside the square the " +
          "sign has two units of air above and below, which is what set the " +
          "body's height.",
      },
    },

    {
      kind: "h2",
      text: "The one behind is cut, the one in front is filled",
      id: "the-pair",
    },
    {
      kind: "p",
      text:
        "`messages-square` is the round `messages` built the same way: the " +
        "bigger bubble behind, the reply in front with its tail turned the " +
        "other way. Only the front one gets the grey plate and the solid. " +
        "Fill both and you get two shapes stacked. Fill one and you get one " +
        "thing in front of another, which is what a conversation looks " +
        "like.",
    },

    {
      kind: "h2",
      text: "Getting it",
      id: "getting-it",
    },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text:
        "All 765, in three styles and two corner treatments, with copy and " +
        "download on every drawing.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "The shadcn registry, the React package, the CLI, the MCP server " +
        "and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text:
        "What moved, generated off git, with every redraw shown before and " +
        "after.",
    },
  ],
}

const BATCH_0_6_0: BlogPost = {
  /* Named for the story rather than the number, for the reason the type says:
     a batch is untagged while the post is written. */
  slug: "23-new-icons-and-a-shopfront-that-took-three-passes",
  version: "0.6.0",
  title: "23 new icons, and a shopfront that took three passes",
  description:
    "Inside Keyline Icons v0.6.0: a shopfront redrawn three times, the book " +
    "that has three corners and a roll, seven currency marks with circled " +
    "halves, and the spacing rule those were allowed to break.",
  standfirst:
    "Everything that landed in v0.6.0, and what each of it was actually for. " +
    "Free SVG icons for shadcn/ui, drawn on one 24\u00d724 grid.",
  date: "2026-09-09",
  updated: "2026-09-09",
  readingMinutes: 7,
  thumbnail: BLOG_V060_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "book icons",
    "store icon",
    "currency icons",
    "flame icon",
    "cpu icon",
  ],
  body: [
    {
      kind: "p",
      text:
        "Twenty-three new drawings under twenty-nine names, which takes the " +
        "set to 692. Six of the twenty-nine are currency marks a second " +
        "time, boxed in a ring.",
    },
    {
      kind: "p",
      text:
        "Most of them were drawn by hand before anything was fitted to the " +
        "grid, and that order is the point: the drawing decides what the " +
        "object is, the fitting decides where its edges land. The ones worth " +
        "writing about are the ones that came back.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_THUMBNAIL_ICON_NAMES,
        caption:
          "The first half: five objects and the book family. Four of these " +
          "were redrawn after being seen on the grid, which is normal. A " +
          "drawing at 24 pixels is not the same thing as the drawing.",
      },
    },

    {
      kind: "h2",
      text: "The shop, three times",
      id: "the-store",
    },
    {
      kind: "p",
      text:
        "The awning is the whole icon, and it took three goes. Drawn as a " +
        "flat strip it reads as a house with a stripe across it, so the wavy " +
        "edge went back on. The wave alone was not enough either: it read as " +
        "lace. What fixed it is three short ribs standing on the low points " +
        "of the wave, which is what a real awning has. Four panels read as " +
        "an awning. One wavy band does not.",
    },
    {
      kind: "p",
      text:
        "Then the door. It had been cut through the line the shop stands on, " +
        "which turns the front into an archway you can see through. A door " +
        "stands on the floor. That is one number in the drawing, and it is " +
        "the difference between a shopfront and a gate.",
    },
    {
      kind: "p",
      text:
        "The filled version nearly shipped broken, and only looking at it " +
        "caught that. A fill is built out of solid shapes, here the awning " +
        "and the building, and the two overlap where the awning dips below " +
        "the top of the walls. Overlapping shapes can be painted two ways. " +
        "Browsers merge them, so the files in the set were right. The design " +
        "file does the opposite and turns an overlap into a hole, so in " +
        "Figma a white band cut straight across the awning.",
    },
    {
      kind: "note",
      text:
        "Every check passed. Both sides held the same shape, only the rule " +
        "that fills it differed, and nothing compared that.",
    },
    {
      kind: "p",
      text:
        "The fix is the shape rather than the setting. The awning and the " +
        "walls are traced as one outline now, with no overlap left to turn " +
        "into a hole, so it paints the same either way. Nothing downstream " +
        "has to agree about which rule it uses.",
    },

    {
      kind: "h2",
      text: "The book has three corners and a roll",
      id: "the-book",
    },
    {
      kind: "p",
      text:
        "The first book was rejected on sight, and it took a minute to say " +
        "why. It did not look like a book. One feature was missing: a closed " +
        "book seen from the front does not have four corners. It has three " +
        "and a roll, because the cover wraps around the spine instead of " +
        "turning. Drawn as a corner, what you get is a card with a line on it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_BOOK_ICON_NAMES,
        caption:
          "The roll is a half circle of radius 2 on the spine and it sets " +
          "everything else: the page block's depth is the roll's inner " +
          "edge, and the crease stands two roll-radii in. The foot has a " +
          "notch scooped into the front edge, half a unit deep over three, " +
          "which is the cover's board sitting proud of the pages.",
      },
    },
    {
      kind: "p",
      text:
        "The crease was shortened afterwards. Run the full height of the " +
        "cover it reads as a second spine rather than as the fold a " +
        "hardback has. On the sharp treatment the foot is squared as well: " +
        "a lone three-unit curve at the bottom of a drawing whose every " +
        "other corner is square reads as something left behind, not as a " +
        "treatment.",
    },

    {
      kind: "h2",
      text: "The flame is an arch, not a point",
      id: "the-flame",
    },
    {
      kind: "p",
      text:
        "A flame is a bowl with a tongue curling inside it, and the tongue " +
        "is the part that goes wrong. Drawn as a point, at 16 pixels the " +
        "bowl closes over it and what is left is a comma. As an arch it " +
        "reads at every size, and the difference is one arc.",
    },
    {
      kind: "p",
      text:
        "The outer edge has a matching rule. A single sweep from tip to " +
        "bowl can only make a teardrop. What makes a lick is the tip " +
        "dropping straight down first and swinging out afterwards, so it is " +
        "two arcs. Both are radius 10 turned through the angle whose sine " +
        "is three fifths, because that pair carries the flank exactly four " +
        "across and twelve down and leaves nothing to round.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_SINGLES_ICON_NAMES,
        caption:
          "The five singles. The skyline is one silhouette rather than two " +
          "overlapping blocks, so the party wall is a real edge and not a " +
          "seam, and its low block comes up high enough to be a building " +
          "rather than a shed. The processor puts its pins on the package " +
          "rather than through it.",
      },
    },

    {
      kind: "h2",
      text: "The rule the currencies were allowed to break",
      id: "the-circled-currencies",
    },
    {
      kind: "p",
      text:
        "The seven currency marks arrive with circled halves, and the first " +
        "pass at those looked broken. Nothing was wrong with it. It followed " +
        "the set's own rule, two units of daylight between elements. Against " +
        "a ring, two leaves the letter at about half the well, and that " +
        "reads as a mistake rather than as spacing.",
    },
    {
      kind: "p",
      text:
        "So the currencies clear the ring by one, and the exception is " +
        "written down. Two exists so a reader can tell two things apart. A " +
        "container is not a second thing, it is the frame the drawing sits " +
        "in. The eighteen circled icons already in the set are not an " +
        "argument against that, and it is worth saying why: their glyphs are " +
        "marks. A slash, a chevron, three dots. A mark has no counters to " +
        "hold open and can afford the two. A letter cannot.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_CIRCLED_ICON_NAMES,
        caption:
          "Six of the seven. The euro and the yen were drawn again after " +
          "being seen in the ring: the circled euro is centred on its bowl " +
          "rather than on its box, because its two open ends reach further " +
          "right than the bowl reaches left and a box counts them at full " +
          "weight.",
      },
    },
    {
      kind: "p",
      text:
        "Bitcoin has no circled half and is not going to be forced into " +
        "one. Its four stubs stand outside the letter at both ends, on the " +
        "part of the ring with no room, and every way of solving that " +
        "shrinks the B until its bowls carry one unit of white instead of " +
        "two. A blob with a bad B in it is worse than no icon.",
    },

    {
      kind: "h2",
      text: "Getting it",
      id: "getting-it",
    },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text:
        "All 692, in three styles and two corner treatments, with copy and " +
        "download on every drawing.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text:
        "What moved, generated off git, with every redraw shown before and " +
        "after.",
    },
  ],
}

const BATCH_0_8_0: BlogPost = {
  /* Named for the story, as every slug here is. The story is that nobody chose
     this batch: the search box did. */
  slug: "the-search-box-chose-this-one",
  version: "0.8.0",
  title: "33 new icons, chosen by the search box",
  description:
    "Inside Keyline Icons v0.8.0: thirty-three drawings taken off a month of " +
    "empty searches, five new shelves, a door drawn in perspective, and a " +
    "phone whose negation slash had to change diagonal.",
  standfirst:
    "Everything that landed in v0.8.0: a printer, a keyboard, furniture, " +
    "food, art tools and three keys, every one of them a word somebody typed " +
    "and got nothing back for. Free SVG icons for shadcn/ui, drawn on one " +
    "24\u00d724 grid.",
  date: "2026-09-11",
  updated: "2026-09-11",
  readingMinutes: 5,
  thumbnail: BLOG_V080_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "printer icon",
    "keyboard icon",
    "calculator icon",
    "furniture icons",
    "door icon",
    "food icons",
    "key icon",
    "palette icon",
  ],
  body: [
    {
      kind: "p",
      text: "Thirty-three new drawings, which takes the set to 798 names.",
    },
    {
      kind: "p",
      text:
        "None of them were chosen. The site records every search that comes " +
        "back empty, along with the word that was typed, and a month of that " +
        "is a list of what people wanted and could not find. This release is " +
        "the top of that list, drawn.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_THUMBNAIL_ICON_NAMES,
        caption: "All thirty-three, in the order the changelog lists them.",
      },
    },

    { kind: "h2", text: "The list was already written", id: "the-list" },
    {
      kind: "p",
      text:
        "A month of empty searches came to 744 of them over 451 different " +
        "words. Six in ten were for drawings the set already had under a name " +
        "nobody guesses: money for the wallet, reload for refresh, school for " +
        "the mortarboard. Those are not missing drawings, they are missing " +
        "words, and they were fixed as words.",
    },
    {
      kind: "note",
      text: "Nothing in this release was drawn because it rounded out a shelf.",
    },

    { kind: "h2", text: "Ten for the desk", id: "desk" },
    {
      kind: "p",
      text:
        "The printer, the keyboard and the calculator were the three most " +
        "asked-for objects the set did not have, and all three are the same " +
        "problem: a panel with rows of small detail inside it. Keys, buttons " +
        "and a paper tray all turn into texture at 16px, so each is drawn " +
        "with as few marks as the object survives being reduced to.",
    },
    {
      kind: "p",
      text:
        "`file-code` and `file-zip` join the file family and `folder-search` " +
        "the folders, all three built from the body those families already " +
        "use rather than drawn again. The eraser and the roll of tape open a " +
        "Stationery shelf with two names on it. A shelf of two is fine; a " +
        "drawing sits where it belongs whatever the count.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_DESK_ICON_NAMES,
        caption:
          "Five for Devices, three for Files, and two that opened Stationery.",
      },
    },

    { kind: "h2", text: "Five shelves opened", id: "shelves" },
    {
      kind: "p",
      text:
        "The set went from 26 categories to 31. Home took the beds, the sofa, " +
        "both doors and the wall. Gender took the Mars and Venus marks. Food " +
        "& Drink took the coffee, the cake, the soup and the bottle. Art took " +
        "the brush, the roller, the palette and the easel. Stationery took " +
        "the eraser and the tape.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_HOME_ICON_NAMES,
        caption: "Home: three beds, a sofa, both doors and a wall.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_TABLE_ICON_NAMES,
        caption: "Food & Drink, which people searched for eight times in a month.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_ART_ICON_NAMES,
        caption: "Art. The palette answers colour and theme as well as paint.",
      },
    },
    {
      kind: "p",
      text:
        "The three keys are three different keys rather than one key in three " +
        "containers, which is why they are `key`, `key-round` and " +
        "`key-square` and not `square-key`. A container wraps a drawing; " +
        "these have different bows.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_KEY_ICON_NAMES,
        caption: "Three bows, one shaft.",
      },
    },

    { kind: "h2", text: "A door that opens toward you", id: "doors" },
    {
      kind: "p",
      text:
        "`door-open` keeps `door`'s frame exactly: the same jamb at 18, the " +
        "same head, the same threshold at 21, with the threshold cut where " +
        "the swung leaf crosses it. What it does not keep is the leaf.",
    },
    {
      kind: "p",
      text:
        "The leaf is not the closed one rotated, it is drawn in perspective. " +
        "Its near edge stands 19 units tall and its far edge, the one on the " +
        "hinge, only 16, and the handle travels with it. Drawn flat the two " +
        "icons read as one picture with a line moved. Drawn this way the " +
        "second one reads as open at 16px, which is the size that decides it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V080_DOOR_ICON_NAMES,
        caption: "One frame, two leaves. Only the leaf and the handle move.",
      },
    },

    { kind: "h2", text: "The phone turns over, and the slash goes with it", id: "phone" },
    {
      kind: "p",
      text:
        "The phone had its earpiece at the bottom left, and a receiver reads " +
        "earpiece first at the top left everywhere else. Turning it over is a " +
        "mirror about the centre line, so nothing about the handset changes. " +
        "It is the same drawing lying the other way, coordinate for " +
        "coordinate.",
    },
    {
      kind: "p",
      text:
        "What that breaks is `phone-off`. A negation slash in this set always " +
        "runs from the top left corner to the bottom right, because a slash " +
        "should cut against the thing it cancels rather than lie along it. " +
        "The turned handset lies along exactly that line.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The phone as it shipped, laid over the phone as it ships now",
            a: { name: "phone", take: "before" },
            b: { name: "phone", take: "after" },
            verdict: { text: "The same drawing, lying the other way", tone: "good" },
          },
        ],
        caption:
          "A mirror has no shared ink except where the two cross, which is " +
          "what makes this an X rather than a sliver. Nothing was nudged to " +
          "line up.",
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
        "So the slash turns instead, and that is the whole exception. It " +
        "costs nothing, because a mirror keeps every distance: the cuts, the " +
        "standoffs and the muted plate all land where they already were, " +
        "handed over. `bluetooth` is the drawing that has no way out of this, " +
        "and the difference is that both of its diagonals are taken.",
    },

    { kind: "h2", text: "And the calendar is a unit taller", id: "calendar" },
    {
      kind: "p",
      text:
        "The calendar's body grew by one unit at the top. Its two posts used " +
        "to stand three units above the edge and one inside it; they cross it " +
        "symmetrically now, two and two. The header rule did not move, the " +
        "posts did not move, and the ink box is the same 20 by 20, because " +
        "the posts already set it. Ten compounds follow the base.",
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V080_REDRAWN_ICON_NAMES,
        caption:
          "All twelve redrawn, before against after. At this size the " +
          "calendar's unit is a hairline and the phone's is the whole " +
          "drawing, which is the honest difference between the two changes.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text: "All 798 drawings, in three styles and two corner treatments.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "The React package, the CLI, the shadcn registry, the MCP server and " +
        "the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text:
        "What moved, generated off git, with every redraw shown before and " +
        "after.",
    },
  ],
}

const BATCH_0_9_0: BlogPost = {
  /* Named for what the post is found by, on his word (14 Sep 2026): the truck
     is the story inside it, but nobody searches for a truck's free corner, and
     the six shelves are what a search for these icons types. */
  slug: "transport-nature-ai-science-health-icons",
  version: "0.9.0",
  title: "53 free shadcn/ui icons for transport, nature, AI and health",
  description:
    "v0.9.0: 53 free, MIT-licensed SVG icons for React and " +
    "shadcn/ui. Planes, trains, leaves, a bot, flasks, lungs and " +
    "thermometers, in stroke, duotone and fill.",
  standfirst:
    "Everything that landed in v0.9.0: planes, a ship and a train, water and " +
    "leaves, a bot, flasks and test tubes, lungs and ears, the temperatures, " +
    "and a truck that finally takes a sign. Free SVG icons for shadcn/ui, " +
    "drawn on one 24×24 grid.",
  date: "2026-09-13",
  updated: "2026-09-13",
  readingMinutes: 5,
  thumbnail: BLOG_V090_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "transport icons",
    "react icons",
    "plane icon",
    "truck icons",
    "nature icons",
    "ai icon",
    "bot icon",
    "science icons",
    "flask icon",
    "health icons",
    "thermometer icon",
  ],
  body: [
    {
      kind: "p",
      text:
        "Fifty-three new drawings, which takes the set to 851 names, and six " +
        "new shelves to hold them.",
    },
    {
      kind: "p",
      text:
        "Most of the batch is subjects the set had no drawings for at all: " +
        "things that move, things that grow, and the tools of a lab and a " +
        "clinic. The rest fills out families the set already had: a truck " +
        "that carries a sign, a hand that points four ways and a temperature " +
        "at five levels.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_THUMBNAIL_ICON_NAMES,
        caption: "All fifty-three.",
      },
    },

    { kind: "h2", text: "Six shelves opened", id: "shelves" },
    {
      kind: "p",
      text:
        "The set went from 31 categories to 37, because nothing that existed " +
        "could take these. Transport took the plane with its takeoff and " +
        "landing, the ship, the train and the bike. Nature took the palm, the " +
        "leaf, the wind turbine and the droplet in all three of its states. " +
        "Animals took the bird and the pig.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_TRANSPORT_ICON_NAMES,
        caption: "Transport: a plane taking off and landing, a ship, a train and a bike.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_NATURE_ICON_NAMES,
        caption: "Nature: a palm, a leaf, a turbine and the water.",
      },
    },
    {
      kind: "p",
      text:
        "The piggy bank is shelved with the wallet. A shelf follows what a " +
        "thing is, and a money box is not an animal, so `piggy-bank` is in " +
        "Finance while `pig` is in Animals.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_ANIMAL_ICON_NAMES,
        caption: "The bird, the pig, and the pig that holds coins.",
      },
    },
    {
      kind: "p",
      text:
        "AI took the bot and the brain wired to a circuit. Science took the " +
        "flasks and the test tubes, with the off state and the rack. Health " +
        "took the brain, the lungs, the ear with what it hears, and the " +
        "clinical thermometer.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_AI_ICON_NAMES,
        caption: "AI, which is two names. A shelf of two is fine.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_SCIENCE_ICON_NAMES,
        caption: "Science: the glassware.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_HEALTH_ICON_NAMES,
        caption: "Health.",
      },
    },
    {
      kind: "p",
      text:
        "The brain is drawn from above, three lobes a side. Two a side read " +
        "as a butterfly.",
    },

    { kind: "h2", text: "Filed with what was already there", id: "families" },
    {
      kind: "p",
      text:
        "The rest of the new drawings joined shelves that existed. The five " +
        "temperature levels and the two weather thermometers went to Weather, " +
        "the earbuds went beside the headphones in Media, the radar beside " +
        "the compass in Maps, and the pointing hand to the cursors.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_MEASURE_ICON_NAMES,
        caption: "Empty to full, then hot and cold.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_HAND_ICON_NAMES,
        caption: "One hand, turned to face each way.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_LISTEN_ICON_NAMES,
        caption: "Earbuds, the case shut and open, and the radar.",
      },
    },

    { kind: "h2", text: "A truck with one free corner", id: "truck" },
    {
      kind: "p",
      text:
        "Signs go in a corner. `file-plus`, `calendar-check` and `mail-x` all " +
        "open their body at the bottom right and put the sign in the gap. " +
        "The truck has no bottom right to give. A 6 unit sign there sits 2 " +
        "units into the rear wheel, and at the top right it sits 2 units into " +
        "the cab roof. Neither a wheel nor a roof can be opened.",
    },
    {
      kind: "p",
      text:
        "The cargo box can, at its top left. It cannot hold a sign closed, " +
        "because its walls are 10 units apart inside and a sign wants 8 plus " +
        "2 clear on each side. So the box opens, and the question was how.",
    },
    {
      kind: "p",
      text:
        "The first answer tightened the box's two top corners from a radius " +
        "of 3 to 2, which made room for the usual 6 unit sign with a straight " +
        "cut. Laid over the truck that already shipped, the smaller corner " +
        "read as a mistake rather than a choice, so the truck stayed as it " +
        "is. The second answer cut into the rounded corner itself. That " +
        "left a round end whose top reached 3.17 on the rounded drawing " +
        "and 3 on the sharp one, so on the minus and the check the sharp " +
        "truck painted outside its rounded twin.",
    },
    {
      kind: "p",
      text:
        "The third answer stops the outline exactly where the corner's curve " +
        "turns straight, at 11 across and 4 down, the one cut that leaves both " +
        "treatments at 3. The round end of that cut reaches 10 across, and " +
        "the sign has to stop 2 units short of it. A sign of size s ends at " +
        "3 plus s, so s is 5.",
    },
    {
      kind: "note",
      text:
        "Five units is a size nothing else in the set uses: lists take 4 and " +
        "every other corner family takes 6. It is what this body allows.",
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
            verdict: { text: "The truck itself does not move", tone: "good" },
          },
        ],
        caption:
          "The only colour is the corner that opens and the sign inside it. " +
          "Every one of the nine covers the same box as `truck`, to four " +
          "decimals, in both corner treatments.",
        legend: {
          a: "only the truck",
          b: "only the compound",
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
          "The base and its nine. The bolt is an object rather than a sign, so " +
          "it is drawn at its size rather than shrunk off `zap`.",
      },
    },

    { kind: "h2", text: "A grey sliver since August", id: "sliver" },
    {
      kind: "p",
      text:
        "Looking this closely at the truck turned up something older. On the " +
        "sharp duotone truck, the stroke ends square at the rear wheel from " +
        "two directions, and the corner between those two ends is left " +
        "unpainted. The grey shape underneath ran straight across it, so a " +
        "sliver of grey showed past the black. It had shipped that way since " +
        "August, and every compound copies its grey shape.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The sharp duotone truck, as it shipped and as it ships now",
            a: { name: "truck", take: "before" },
            b: { name: "truck", take: "after" },
          },
          {
            title: "Beside the rear wheel",
            a: { name: "truck", take: "before" },
            b: { name: "truck", take: "after" },
            viewBox: "13.5 17.5 2 2",
            verdict: { text: "0.17 of a unit of grey past the black", tone: "bad" },
          },
        ],
        caption:
          "At its widest the sliver is 0.17 of a unit, which at 24px is a " +
          "sixth of a pixel. The grey now follows the wheel up to the corner " +
          "and back down. There is no second colour because the fix only took " +
          "grey away.",
        legend: {
          a: "only the old truck",
          b: "only the new one",
          both: "both",
        },
      },
    },

    { kind: "h2", text: "One name turned round", id: "rename" },
    {
      kind: "p",
      text:
        "`heart-hand` is `hand-heart` now. The drawing is a heart held in an " +
        "open hand, so the hand is the thing and the heart says which kind, " +
        "which is the order every other name in the set follows. The old name " +
        "still finds it in search. In React, `HeartHand` is `HandHeart`.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V090_RENAMED_ICON_NAMES,
        caption: "The same drawing under the right name.",
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text: "All 851 drawings, in three styles and two corner treatments.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "The React package, the CLI, the shadcn registry, the MCP server and " +
        "the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text:
        "What moved, generated off git, with every redraw shown before and " +
        "after.",
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
  "rocket-2",
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
  "rocket-2",
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
  "bot-2",
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
  "bot-2",
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

const RELEASE_1_1_0: BlogPost = {
  /* React Native first, then the count, and nothing else: the title is also
     the breadcrumb, and every other fact is the body's to say once. The slug
     names the drawings, not the version, so it survives a renumbering. */
  slug: "free-ai-icons-math-symbols-mac-keys",
  version: "1.1.0",
  title: "React Native, 114 new drawings",
  description:
    "1,114 free, MIT-licensed SVG icons for React, React Native, shadcn/ui, " +
    "Figma and Paper. 114 new drawings: an AI shelf of sparkles, twenty " +
    "maths marks and the four Mac modifier keys.",
  standfirst:
    "Sparkles on one shelf, maths marks, Mac keys, and the set now installs " +
    "in React Native, Expo included.",
  date: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: 3,
  thumbnail: BLOG_V110_THUMBNAIL_ICON_NAMES,
  keywords: [
    "ai icons",
    "sparkle icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "react native icons",
    "expo icons",
    "figma icons",
    "math symbol icons",
    "keyboard icons",
    "command key icon",
    "chart icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "The set is 1,114 drawings. Each one comes in stroke, two-tone, " +
        "duotone and fill, rounded or sharp: 8,912 SVGs.",
    },
    {
      kind: "p",
      text:
        "Seventy-six of the new ones carry a star. Twenty are maths marks. " +
        "Four are command, option, escape and space. Then corner turns, two " +
        "file kinds, eject, a line that goes both ways, and a plain wand.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V110_HERO_ICON_NAMES,
        caption:
          "Eight of the new drawings, one style to a row, in that same order.",
      },
    },

    { kind: "h2", text: "One shelf for everything with a star", id: "ai-shelf" },
    {
      kind: "p",
      text:
        "Sparkle versions used to sit next to their plain twin. " +
        "`mail-sparkles` lived under Mail, `folder-sparkles` under Files. " +
        "You only found them if you already knew the name.",
    },
    {
      kind: "p",
      text:
        "They're one family now: bots, a brain on a circuit, two bare stars, " +
        "and all the new ones. Every star is the same pair, in the " +
        "same place relative to the thing it marks. You can still search any " +
        "of them by the object they mark.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_AI_ICON_NAMES,
        caption: "Thirty-six from the new shelf, which the category list calls AI.",
      },
    },

    { kind: "h2", text: "One size for every star", id: "one-size" },
    {
      kind: "p",
      text:
        "Early drafts put the stars wherever they fit. At 16px they stopped " +
        "looking like stars. They looked like a speck in the corner.",
    },
    {
      kind: "note",
      text:
        "A sparkle has to read as a sparkle at 16 pixels, or it's just a " +
        "small mark next to something else.",
    },
    {
      kind: "p",
      text:
        "So there's one pair now: lead star eight units, second star five, " +
        "with clear space from each other and from the drawing. Two icons " +
        "drop the second star to four units, because five wouldn't fit. " +
        "Nothing gets cut: a star never breaks an outline, an axis, or a " +
        "closed shape. If the pair couldn't sit without breaking something, " +
        "the drawing didn't ship.",
    },
    {
      kind: "p",
      text:
        "`pen-sparkles` shipped earlier with plus signs instead of stars. " +
        "The pen itself never moved. Only the marks did. The star is bigger " +
        "than the plus it replaced. That's the point.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "The whole pen, old marks over new",
            a: { name: "pen-sparkles", take: "before" },
            b: { name: "pen-sparkles", take: "after" },
            verdict: {
              text: "Same pen in both",
              tone: "good",
            },
          },
          {
            title: "The top left corner, same two drawings",
            a: { name: "pen-sparkles", take: "before" },
            b: { name: "pen-sparkles", take: "after" },
            viewBox: "0 0 10 10",
            verdict: { text: "A plus of six units, a star of eight", tone: "bad" },
          },
        ],
        caption:
          "One drawing painted over the other. The rose is the plus sign as " +
          "it shipped, the emerald is the star that replaced it, and the " +
          "dark is the pen, identical in both.",
        legend: {
          a: "the plus signs as they shipped",
          b: "the stars as they are now",
          both: "ink that did not move",
        },
      },
    },

    { kind: "h2", text: "Maths marks and Mac keys", id: "math-keys" },
    {
      kind: "p",
      text:
        "The maths marks are for sums and formulas: asterisk, divide, equal (plus " +
        "approximate and not-equal), hash, infinity, parentheses, radical, " +
        "variable, and a barred x. Four of them also come circled and " +
        "squared, for a toolbar that wants a button instead of a symbol.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_MATH_ICON_NAMES,
        caption: "The plain marks first, the eight in a circle or a square last.",
      },
    },
    {
      kind: "p",
      text:
        "The four modifier keys are drawn the way a Mac prints them, for " +
        "shortcut hints and keycaps. " +
        "Stroke only. A filled keycap stops reading as a key.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_KEY_ICON_NAMES,
        caption: "The four keys, at the weight the rest of the set uses.",
      },
    },

    { kind: "h2", text: "Corners, files and a wand", id: "the-rest" },
    {
      kind: "p",
      text:
        "Six corner turns, for a reply, a forward, a redirect, or a branch " +
        "in a flow. Plus a big arrow with a dash over its head, and an arrow " +
        "that runs into a line and stops.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_CORNER_ICON_NAMES,
        caption: "The six turns first, the two straight arrows after.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V110_SINGLE_ICON_NAMES,
        caption:
          "The five singles: `file-audio`, `file-video`, `eject`, " +
          "`trending-up-down` and `wand`.",
      },
    },

    { kind: "h2", text: "Now in React Native", id: "react-native" },
    {
      kind: "p",
      text:
        "The whole set works in React Native and Expo, as " +
        "`@keyline-icons/react-native`. Same drawings, same names as the " +
        "React package. `Check` is `Check`. Styles live at `/two-tone`, " +
        "`/duotone` and `/fill`. Sharp corners at `/sharp`. Shared code " +
        "between web and phone only changes the package name.",
    },
    {
      kind: "p",
      text:
        "The one difference is colour. On the web an icon inherits text " +
        "colour. A phone has nothing to inherit from, so each icon takes a " +
        "`color` prop. The grey halves of two-tone and duotone follow it, so " +
        "one colour still sets both tones.",
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
        "React, React Native, the shadcn/ui registry, the CLI, the MCP " +
        "server, and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Read the changelog",
      text: "What every release added, with the drawings in it.",
    },
  ],
}

const RELEASE_1_0_0: BlogPost = {
  /* A search types the count, "free", "shadcn/ui" and the styles, so the
     title and slug carry those; the duotone story is an h2 inside. The 8,000
     leads on his word (18 Sep 2026): four styles in two corner shapes is the
     size of this release, and a title without it undersold it. */
  slug: "1000-free-shadcn-ui-icons-in-four-styles",
  version: "1.0.0",
  title:
    "1,000 free shadcn/ui icons for React, Figma and Paper, in four styles and two corners",
  description:
    "1,000 free, MIT-licensed SVG icons for React, shadcn/ui, Figma and " +
    "Paper, each in stroke, two-tone, duotone and fill, rounded and sharp: " +
    "8,000 SVGs.",
  standfirst:
    "A month, fourteen releases and one style nobody planned. Version " +
    "1.0.0 takes the set out of beta, with a new colour, a new logo and " +
    "free SVG icons for shadcn/ui, React, Figma and Paper.",
  date: "2026-09-18",
  updated: "2026-09-18",
  readingMinutes: 9,
  thumbnail: BLOG_V100_THUMBNAIL_ICON_NAMES,
  keywords: [
    "icon set update",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "figma icons",
    "duotone icons",
    "two-tone icons",
    "fill icons",
    "people icons",
    "panel icons",
    "phone icons",
    "tablet icons",
    "banknote icons",
    "rocket icon",
    "heading icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "The first release went out on 20 August. A month later, 1.0.0 has " +
        "1,000 icons, and every one of them comes in four styles: stroke, " +
        "two-tone, duotone and fill. " +
        "Each style comes with rounded corners or sharp ones. A thousand " +
        "icons, times four styles, times two kinds of corner: 8,000 in all, " +
        "with nothing missing.",
    },
    {
      kind: "p",
      text:
        "Stroke is the outline. Fill is solid. Two-tone is the outline with " +
        "a light grey inside. Duotone drops the outline: a grey shape with " +
        "the important part in black.",
    },
    {
      kind: "p",
      text:
        "149 of the icons are new, from a new People category to panels on " +
        "every side, and 59 older ones were redrawn. Two-tone came out of a " +
        "mistake spotted by accident, and this release was rebuilt around " +
        "it.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_HERO_ICON_NAMES,
        caption:
          "Eight of the new icons, one style to a row, in that same order.",
      },
    },

    { kind: "h2", text: "One month, out of beta", id: "one-month" },
    {
      kind: "p",
      text:
        "The beta started on a plain black and white site, with rounded " +
        "corners only. Here is where things stand on 18 September.",
    },
    {
      kind: "list",
      items: [
        "1,000 icons, up from 503.",
        "8,000 SVG files, up from 1,286.",
        "Four styles, up from three, and every one with rounded or sharp " +
          "corners.",
        "14 releases in a month, this one included.",
        "6,676 downloads on npm, 2,092 of them in the last week alone.",
        "86 stars on GitHub.",
        "38 categories, from Actions to Web.",
      ],
    },
    {
      kind: "p",
      text:
        "The one breaking change of the month, the duotone rename further " +
        "down, was saved for this release on purpose, so it lands once, " +
        "with the move out of beta.",
    },

    { kind: "h2", text: "A colour and a logo", id: "look" },
    {
      kind: "p",
      text:
        "Out of beta, the site dropped its plain black and white for a " +
        "colour of its own: Keyline blue, deep in light mode and a softer " +
        "sky blue in dark mode. It is the only accent on an otherwise " +
        "neutral site: the buttons, the selected controls, the logo and " +
        "the little dots that mark new icons.",
    },
    {
      kind: "p",
      text:
        "The blue takes its hue from non-photo blue, the pale pencil " +
        "designers used for guide lines, because the cameras that made " +
        "printing plates couldn't see it. A keyline comes from the same " +
        "world: the outline that shows where something goes on the page.",
    },
    {
      kind: "p",
      text:
        "The logo is made from the set itself: four shapes, one in each " +
        "style. A sharp diamond in stroke, a triangle in duotone, a circle " +
        "in two-tone and a square in fill. It's a small picture of what the " +
        "set is.",
    },

    { kind: "h2", text: "Two-tone was an accident", id: "two-tone" },
    {
      kind: "p",
      text:
        "It started with something that looked off in the design file. In " +
        "the duotone style, `circle` had " +
        "an outline, but `circle-x`, right next to it, didn't. The same went " +
        "for `badge` and `badge-check`, and for `shield-plus` and " +
        "`square-plus`.",
    },
    {
      kind: "p",
      text:
        "So every duotone icon got checked, all 765 of them. 633 had an " +
        "outline filled with light grey. The other 132, every icon drawn " +
        "inside a square, a circle or a badge shape, had no outline at all: " +
        "just a grey shape with a black symbol on top. Two different styles " +
        "had been sharing one name.",
    },
    {
      kind: "p",
      text:
        "It wasn't a recent slip. It went all the way back to the first " +
        "release, and new icons kept copying whichever look sat next to " +
        "them. The automatic checks didn't catch it either, because both " +
        "looks used two shades, and that was all the checks asked for.",
    },
    {
      kind: "p",
      text:
        "The quick fix was to add an outline to those 132 and move on. But " +
        "that would only have turned them into the other style, and both " +
        "looks were good.",
    },
    {
      kind: "note",
      text:
        "Neither look was wrong. The problem was two good styles sharing one " +
        "name. So both stayed, each got its own name, and each was drawn for " +
        "every icon in the set.",
    },
    {
      kind: "p",
      text:
        "The outlined look is now called two-tone. Those icons haven't " +
        "changed, only their name. If you use the React package and want " +
        "that look, change `@keyline-icons/react/duotone` to " +
        "`@keyline-icons/react/two-tone`.",
    },
    {
      kind: "p",
      text:
        "Duotone keeps its name for the look without an outline. It went " +
        "from 132 icons to all 1,000 in this one release.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_ACCIDENT_ICON_NAMES,
        caption:
          "The icons that gave it away, as they are now. In two-tone they all " +
          "have an outline. In duotone, the ones with a check, an x or a plus " +
          "on them drop it, and the plain shapes keep theirs, for a reason " +
          "explained below.",
      },
    },

    { kind: "h2", text: "What goes black in a duotone", id: "duotone" },
    {
      kind: "list",
      items: [
        "A small symbol is black, and whatever it sits on is grey: the check " +
          "on `file-check`, the plus on a calendar.",
        "On an icon with a slash through it, like `bell-off`, only the slash " +
          "is black.",
        "Background parts stay grey. A chart's axes are grey and its bars " +
          "are black. A slider's track is grey and its knob is black.",
        "On a tool, the working end is black and the handle is grey, like " +
          "the head of `hammer`.",
        "Small details on a black shape show through in grey, like the " +
          "keyhole on `lock` or the pillows on `bed`.",
        "Two grey parts never overlap. Grey on top of grey makes a darker " +
          "grey, which looks like a mistake.",
        "No big empty holes in the middle of a shape. They read as a third " +
          "colour, and a duotone only has two.",
      ],
    },
    {
      kind: "note",
      text:
        "And every duotone has something black in it. An icon that is all " +
        "grey looks disabled, like a button you can't press. So a simple " +
        "shape, a heart, a star or a circle, keeps a black outline instead.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_DUOTONE_ICON_NAMES,
        caption:
          "One icon for each rule. Two-tone, the second row, keeps the " +
          "outline and fills the shape with grey. Duotone, the third row, " +
          "drops the outline and keeps only the important part black.",
      },
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V100_DETAIL_ICON_NAMES,
        caption:
          "A few more: a black arrow over a grey tray, a grey keyhole on a " +
          "black lock, grey pillows on a black bed, and the tape, kept to " +
          "just two shades.",
      },
    },

    { kind: "h2", text: "No gaps, in any style", id: "every-style" },
    {
      kind: "p",
      text:
        "Before this release, an icon only came in a style if that style " +
        "added something. An exclamation mark has nothing inside to fill, so " +
        "`alert` had no fill version, and an app that switched to fill icons " +
        "was left with a hole where it should have been.",
    },
    {
      kind: "p",
      text:
        "Now every icon comes in every style. When a style has nothing to " +
        "add, it simply uses the same drawing: the fill version of `x` is " +
        "its outline, because a cross has no inside. Even the first plan for " +
        "this release would have left 84 icons without a duotone, and it was " +
        "dropped the next morning.",
    },

    { kind: "h2", text: "149 new icons", id: "new" },
    {
      kind: "p",
      text:
        "There were no people in the set until now. This release adds a boy " +
        "and a girl, a baby with a curl and one with a bow, and both babies " +
        "again with a pacifier. They get a category of their own, the set's " +
        "thirty-eighth.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V100_PEOPLE_ICON_NAMES,
        caption: "The new People category.",
      },
    },
    {
      kind: "p",
      text:
        "Panels now open, close and come dashed on all four sides, and there " +
        "are three split layouts and a table to go with them.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V100_PANEL_ICON_NAMES,
        caption:
          "Left and bottom shown here, right and top are mirror images. Then " +
          "the split layouts and the table.",
      },
    },
    {
      kind: "p",
      text:
        "Devices got the most. The phone now has calls: a call, and " +
        "incoming, outgoing, missed and forwarded ones. The tablet comes " +
        "upright and sideways, with the same eight small symbols as the " +
        "phone, a check, a plus, a minus, an x and four arrows. There's a " +
        "laptop on its own and next to a phone, a watch, a hard drive, a " +
        "cable, a VR headset, a CCTV camera, a mouse and a shredder.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V100_DEVICE_ICON_NAMES,
        caption: "Sixteen of the thirty-two new device icons.",
      },
    },
    {
      kind: "p",
      text:
        "The rest came as families. Two banknotes with a check, a minus, a " +
        "plus and an x, and a wallet holding cards. An alarm clock with a " +
        "check, a plus and a minus, and a stopwatch. Three rockets and a car. " +
        "Big block arrows in four directions, long and short. And a heading " +
        "icon with all six levels.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V100_FAMILY_ICON_NAMES,
        caption: "A few from each family.",
      },
    },
    {
      kind: "p",
      text:
        "Plus a handful of one-offs: snow, wind, humidity, a cloud over the " +
        "sun, the earth, a recycle sign, a bot with a slash, a brain with a " +
        "cog, sticky notes, a swatch book, a shield with a key, a siren, a " +
        "gauge, a milestone, a shirt and a paper bag.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V100_SINGLES_ICON_NAMES,
        caption: "The one-offs.",
      },
    },

    { kind: "h2", text: "Redrawn icons", id: "redrawn" },
    {
      kind: "p",
      text:
        "59 icons that were already out got redrawn. Most of them are one " +
        "change made across a whole family.",
    },
    {
      kind: "list",
      items: [
        "The pointing hand is new, in all four directions, with a closed " +
          "hand and an open hand to go with it.",
        "The dots on the dice are bigger, and so are the three dots of the " +
          "more menu.",
        "The paperclip is longer, and the play button is smaller.",
        "The gallery frames have tighter corners.",
        "In the fill style, the file icons' folded corners and the grid " +
          "icons' lines no longer run into the edge.",
        "In two-tone, charts keep their axes grey and the data black.",
      ],
    },
    {
      kind: "figure",
      figure: {
        kind: "pairs",
        names: BLOG_V100_REDRAWN_ICON_NAMES,
        caption:
          "A few of them, old on the left and new on the right. The file, " +
          "grid and chart changes only show in the fill and two-tone styles, " +
          "so they aren't pictured here.",
      },
    },

    { kind: "h2", text: "Coins that looked too heavy", id: "coins" },
    {
      kind: "p",
      text:
        "The coins icon was drawn with the same line as everything else, but " +
        "it looked heavier. The coins were squashed flat, so the gap inside " +
        "each one was tiny. They were stacked so close together that there " +
        "was hardly any white between them. And the flat ends of each coin " +
        "pinched into little blobs.",
    },
    {
      kind: "p",
      text:
        "At small sizes a thin gap fills in, and the lines on either side of " +
        "it look like one thick line. The coins are taller now and spaced " +
        "further apart, so every gap matches the gaps in the rest of the set.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`coins`, old and new, laid on top of each other",
            a: { name: "coins", take: "before" },
            b: { name: "coins", take: "after" },
            verdict: { text: "Even gaps now", tone: "good" },
          },
        ],
        caption:
          "Where the colours split, the coins moved: the new ones are taller " +
          "and further apart.",
        legend: {
          a: "only the old coins",
          b: "only the new ones",
          both: "both",
        },
      },
    },

    { kind: "h2", text: "A sparkle a sliver too small", id: "sparkle" },
    {
      kind: "p",
      text:
        "Every icon in the set leaves the same small margin around its " +
        "edges. The sparkle was meant to reach that margin exactly, and ever " +
        "since it was first drawn it had fallen short by a sliver: less than " +
        "a thirtieth of a pixel at normal size.",
    },
    {
      kind: "p",
      text:
        "Nobody could have seen it. It's fixed anyway, because a rule that " +
        "holds for 999 icons should hold for all 1,000.",
    },
    {
      kind: "figure",
      figure: {
        kind: "diagnostic",
        panels: [
          {
            title: "`sparkle`, old over new",
            a: { name: "sparkle", take: "before" },
            b: { name: "sparkle", take: "after" },
          },
          {
            title: "The top point, zoomed in",
            a: { name: "sparkle", take: "before" },
            b: { name: "sparkle", take: "after" },
            viewBox: "11 1.5 2 2",
            verdict: { text: "A sliver short", tone: "bad" },
          },
        ],
        caption:
          "Green is the sliver the new sparkle adds at its point. At normal " +
          "size there's nothing to see.",
        legend: {
          a: "only the old sparkle",
          b: "only the new one",
          both: "both",
        },
      },
    },

    { kind: "h2", text: "Getting it", id: "getting-it" },
    {
      kind: "link",
      href: "/icons",
      label: "Browse the set",
      text: "All 1,000 icons, in every style and both kinds of corner.",
    },
    {
      kind: "link",
      href: "/install",
      label: "Install",
      text:
        "The React package, the command-line tool, the shadcn registry, the " +
        "MCP server and the Figma plugin.",
    },
    {
      kind: "link",
      href: "/changelog",
      label: "Changelog",
      text: "Every release, with each redrawn icon shown before and after.",
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
  "database-arrow-up",
  "database-arrow-down",
  "database-arrow-left",
  "database-arrow-right",
  "database-sparkles",
  "server-plus",
  "server-minus",
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
  /* Count, "free", "shadcn/ui" and the three families a search would type; the
     one-frame story is an h2 inside. The slug names the drawings, not the
     version, so it survives a renumbering. */
  slug: "table-database-and-quick-action-icons",
  version: "1.2.0",
  title: "64 free shadcn/ui icons for tables, databases and quick actions",
  description:
    "1,178 free, MIT-licensed SVG icons for React and shadcn/ui. 64 new: " +
    "table edits, database and server signs, a lightning bolt family and " +
    "more progress states.",
  standfirst:
    "A row added, two columns merged, a cache that answers at once: now " +
    "each has its own drawing.",
  date: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: 4,
  thumbnail: BLOG_V120_THUMBNAIL_ICON_NAMES,
  keywords: [
    "table icons",
    "spreadsheet icons",
    "database icons",
    "server icons",
    "lightning bolt icons",
    "progress icons",
    "hourglass icon",
    "panel icons",
    "free svg icons",
    "shadcn/ui icons",
    "react icons",
    "vue icons",
    "svelte icons",
  ],
  body: [
    {
      kind: "p",
      text:
        "The set is 1,178 drawings. Each one comes in stroke, two-tone, " +
        "duotone and fill, rounded or sharp: 9,424 SVGs.",
    },
    {
      kind: "p",
      text:
        "Sixty-four of them are new. Nineteen are tables, one for each thing " +
        "a spreadsheet toolbar does to rows, columns and cells. Thirteen " +
        "carry a lightning bolt. The database and the server get the signs " +
        "a data app asks for, and waiting can now be paused, half done or " +
        "over. The table and all twenty-seven panels were also redrawn, in " +
        "their filled styles only.",
    },
    {
      kind: "figure",
      figure: {
        kind: "styles",
        names: BLOG_V120_HERO_ICON_NAMES,
        caption: "Eight of the new drawings, one style to a row.",
      },
    },

    { kind: "h2", text: "Nineteen tables, one frame", id: "tables" },
    {
      kind: "p",
      text:
        "Adding a row, deleting a column, merging two rows into one: a " +
        "toolbar needs a picture for each, and until now the set had only " +
        "the table itself.",
    },
    {
      kind: "p",
      text:
        "The first round let the table grow or shrink to make room for a " +
        "plus sign, so a toolbar of them looked like four different tables " +
        "side by side. Now every one is drawn on the `table` the set already " +
        "had, at its size, and moves one pixel at most, only to centre a " +
        "sign that hangs over an edge.",
    },
    {
      kind: "note",
      text:
        "A row of these reads as one table being edited, because it is one " +
        "table in every icon.",
    },
    {
      kind: "p",
      text:
        "The plus or the cross sits on the edge it acts on: along the top " +
        "for a row added above, down the left side for a column added " +
        "before. A merge is an arrow crossing the line it takes away. Cells " +
        "merge and split across the middle row of a grid. After those come " +
        "a table with a header column, a tree table, a pivot, and a table " +
        "that's switched off.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_TABLE_ICON_NAMES,
        caption: "Rows first, then columns, then cells, then the new kinds of table.",
      },
    },

    { kind: "h2", text: "A bolt for anything instant", id: "bolt" },
    {
      kind: "p",
      text:
        "The bolt goes on thirteen drawings: the bell, calendar, " +
        "clock, file, folder, house, envelope, parcel, phone, tablet, " +
        "person, server and database. It marks whatever happens straight " +
        "away: an automation, a trigger, express delivery, a fast cache.",
    },
    {
      kind: "p",
      text:
        "Each bolt takes the spot the plus sign already had on that " +
        "drawing, so the plus, minus and bolt versions line up in a list. " +
        "It sits in the middle of that spot. Pushed to its right edge, it " +
        "looked like it was sliding off, on every one of them.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_BOLT_ICON_NAMES,
        caption: "All thirteen, from the bell to the database.",
      },
    },

    { kind: "h2", text: "Signs for data, and more plus signs", id: "signs" },
    {
      kind: "p",
      text:
        "The database now has the full run of signs a data app reaches for: " +
        "plus, minus, check, cross, four arrows for import and export, and " +
        "the sparkle pair. The server gets a plus and a minus.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_DATA_ICON_NAMES,
        caption: "The database's nine, then the server's two.",
      },
    },
    {
      kind: "p",
      text:
        "A plus also lands on the heart, the bookmark, the cart, the " +
        "basket, the house, three grids, the dashed circle, the terminal, " +
        "the link and wifi.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_PLUS_ICON_NAMES,
        caption: "Twelve more places to add something.",
      },
    },

    { kind: "h2", text: "Waiting, in more ways", id: "progress" },
    {
      kind: "p",
      text:
        "Progress rings now pause and stop, beside the play, check and " +
        "cross they already had. The hourglass comes full, half run and " +
        "emptied. The gauge reads low and high. There's a plain open ring " +
        "for a spinner, and a cloud with a terminal prompt in it, for a " +
        "shell that runs somewhere else.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V120_PROGRESS_ICON_NAMES,
        caption: "Rings, hourglasses and gauges, then the cloud shell.",
      },
    },

    {
      kind: "h2",
      text: "Tables and panels you can tell apart when filled",
      id: "redrawn",
    },
    {
      kind: "p",
      text:
        "The outlines of `table` and the twenty-seven panels didn't change. " +
        "Their filled versions did. Before, the fill of `panel-left` was a " +
        "black square with one white line down it, and `panel-right` was " +
        "the same square with the line moved over. At 16 pixels you had to " +
        "look twice.",
    },
    {
      kind: "p",
      text:
        "Now the fill keeps the outline and fills only the part that " +
        "matters: the header row of a table, the docked side of a panel. " +
        "Duotone does the same in black over grey. Two-tone greys the rest " +
        "and leaves the header or the docked side light.",
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
          "Six of the twenty-eight as they are now, in every style. The " +
          "stroke row is exactly as it was.",
      },
    },

    { kind: "h2", text: "Vue, Svelte and Solid", id: "vue-svelte-solid" },
    {
      kind: "p",
      text:
        "The install page now covers Vue, Svelte and Solid through " +
        "unplugin-icons. It turns each icon you import into a component for " +
        "your framework when the app builds, so only the icons you use end " +
        "up in your bundle and nothing is fetched while it runs.",
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

export const BLOG_POSTS: readonly BlogPost[] = [
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
