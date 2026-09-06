/**
 * The root card, claimed for this segment. `opengraph-image` applies to the
 * segment it sits in and does not reach a child, so a route without one unfurls
 * as a bare title beside a blank rectangle and nothing in the build says so.
 *
 * The index takes the site's card rather than one of its own: it is a list of
 * posts, and the only thing a card for it could show that the site card does
 * not is a headline that changes every time something is published.
 * `[slug]` has its own, which is the level where the picture is worth having.
 */
export { default, alt, size, contentType } from "../opengraph-image"
