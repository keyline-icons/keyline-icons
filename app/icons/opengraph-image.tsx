/**
 * The root card, claimed for this segment.
 *
 * `opengraph-image` does **not** inherit downward, so the file in `app/` gives
 * the origin a card and gives `/icons` nothing at all. That matters more here
 * than on any other route: the grid is the page people paste into Slack.
 *
 * This note used to add "`/` is a redirect now", which it was when the browser
 * lived at the origin and `/` was a 308 to here. Both are gone: `/` is a real
 * page again, with its own hero, and the card that hero is now built from is the
 * one this file re-exports.
 *
 * A sibling of `[name]/opengraph-image.tsx`, not a parent of it. That one draws
 * the icon it is about; this one is the set's card, shared with `/install` and
 * the two demos through the same re-export.
 */
export { default, alt, size, contentType } from "../opengraph-image"
