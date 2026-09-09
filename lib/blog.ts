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
        "This set follows Lucide's naming, and that is a decision worth being " +
        "boring about: somebody arriving with an import list should not have " +
        "to learn a second vocabulary to use a second icon set. Lucide calls " +
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
          "the horizontal one, which is Lucide's reading of that name too.",
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

const BATCH_0_6_0: BlogPost = {
  /* Named for the story rather than the number, for the reason the type says:
     a batch is untagged while the post is written. */
  slug: "twenty-three-drawings-and-the-ones-i-sent-back",
  version: "0.6.0",
  title: "Twenty-three drawings, and the ones I sent back",
  description:
    "Inside Keyline Icons v0.6.0: the shop I rejected twice, the book that " +
    "needed three corners and a roll, seven currency marks, and the spacing " +
    "rule I decided not to follow.",
  standfirst:
    "What I drew this round, what I got wrong first, and the one rule I " +
    "broke on purpose. Free SVG icons for shadcn/ui, on one 24\u00d724 grid.",
  date: "2026-09-09",
  updated: "2026-09-09",
  readingMinutes: 6,
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
        "Twenty-three drawings this round and twenty-nine names, which puts " +
        "the set at 692. I drew most of them by hand before anything was " +
        "fitted to the grid, which is how I prefer to work: the drawing " +
        "decides what the object is, and the fitting decides where its edges " +
        "land. The interesting ones are the ones I sent back.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_THUMBNAIL_ICON_NAMES,
        caption:
          "The first half: five objects and the book family. Four of these " +
          "I redrew after seeing them on the grid, which is normal. Seeing " +
          "a drawing at 24 pixels is not the same as drawing it.",
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
        "The awning is the whole icon and I got it wrong twice. A plain " +
        "fascia reads as a house, so the scallops went back on. Then the " +
        "wave on its own still read as a lace edge, so I sent it back again " +
        "with three ribs standing on the cusps. Four panels read as an " +
        "awning. One wavy band does not.",
    },
    {
      kind: "p",
      text:
        "The third pass was the doorway. It had been cut straight through " +
        "the floor line, which turns the shop into an arch you can see " +
        "through. A door stands on a floor. That is one number in the " +
        "drawing and it is the difference between a shopfront and a gate.",
    },
    {
      kind: "p",
      text:
        "In between those, the filled style nearly shipped broken and I only " +
        "caught it by looking. The fill was the awning's plate and the " +
        "building's plate, and the two overlap, because the valance dips " +
        "below where the walls have to start. Two overlapping shapes wound " +
        "the same way paint solid under the non-zero rule, which is what " +
        "these SVGs use and what every browser therefore paints. My design " +
        "file writes its filled variants even-odd, where an overlap cancels. " +
        "So a white band cut straight across the valance, in the one place " +
        "the drawings are authored and nowhere else.",
    },
    {
      kind: "note",
      text:
        "Every check passed. The geometry was identical on both sides, only " +
        "the rule that paints it was not, and nothing compared that.",
    },
    {
      kind: "p",
      text:
        "The fix is the shape, not the fill rule. The awning's outline is " +
        "cut where its end scallop crosses the shop wall and the building's " +
        "three sides are spliced into it, so the silhouette is one closed " +
        "contour and there is no overlap left to cancel. It paints the same " +
        "under either rule now, which is the property I actually wanted: " +
        "nothing downstream has to agree with me about which rule it uses.",
    },

    {
      kind: "h2",
      text: "The book has three corners and a roll",
      id: "the-book",
    },
    {
      kind: "p",
      text:
        "I rejected the first book on sight and then took a minute to work " +
        "out why. It did not look like a book. What was missing is one " +
        "feature: a closed book seen from the front does not have four " +
        "corners, it has three and a roll, because the cover wraps round " +
        "the spine instead of turning. Drawn as a corner you get a card " +
        "with a line on it.",
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
          "notch scooped into the fore-edge, half a unit deep over three, " +
          "which is the cover's board sitting proud of the pages.",
      },
    },
    {
      kind: "p",
      text:
        "I shortened the crease afterwards. Run the full height of the " +
        "cover it reads as a second spine rather than as the fold a " +
        "hardback has. And on the sharp treatment I squared the foot: a " +
        "lone three-unit curve at the bottom of a drawing whose every other " +
        "corner is square reads as something left behind, not as a " +
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
        "is the part that goes wrong. I drew it as a point first. At 16 " +
        "pixels the bowl closes over it and you get a comma. As an arch it " +
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
      text: "The rule I broke on the currencies",
      id: "the-circled-currencies",
    },
    {
      kind: "p",
      text:
        "I asked for circled versions of the seven currency marks and the " +
        "first set came back looking broken. They were not wrong, they " +
        "followed my own rule: two units of daylight between elements. " +
        "Against a ring that leaves the letter at about half the well, and " +
        "it reads as a mistake rather than as spacing.",
    },
    {
      kind: "p",
      text:
        "So I made an exception and wrote it down. Two exists so a reader " +
        "can tell two things apart. A container is not a second thing, it " +
        "is the frame the drawing sits in. These clear the ring by one. The " +
        "eighteen circled icons already in the set are not an argument " +
        "against that, and it is worth saying why: their glyphs are marks. " +
        "A slash, a chevron, three dots. A mark has no counters to hold " +
        "open and can afford the two. A letter cannot.",
    },
    {
      kind: "figure",
      figure: {
        kind: "grid",
        names: BLOG_V060_CIRCLED_ICON_NAMES,
        caption:
          "Six of the seven. I redrew the euro and the yen myself after " +
          "seeing them in the ring: the euro is centred on its bowl rather " +
          "than on its box, because the two open ends reach further right " +
          "than the bowl reaches left and a box counts them at full weight.",
      },
    },
    {
      kind: "p",
      text:
        "Bitcoin has no circled half and I am not going to force one. Its " +
        "four stubs stand outside the letter at both ends, on the part of " +
        "the ring with no room, and every way of solving that shrinks the B " +
        "until its bowls carry one unit of white instead of two. A blob " +
        "with a bad B in it is worse than no icon.",
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

export const BLOG_POSTS: readonly BlogPost[] = [
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
