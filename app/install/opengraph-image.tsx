/**
 * The root card, claimed for this segment. See `app/demo/opengraph-image.tsx`:
 * `opengraph-image` does not inherit downward, so a route without one unfurls
 * as a bare title beside a blank rectangle and nothing in the build says so.
 */
export { default, alt, size, contentType } from "../opengraph-image"
