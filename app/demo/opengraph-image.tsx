/**
 * The root card, claimed for this segment.
 *
 * `opengraph-image` does **not** inherit downward. The file in `app/` gives
 * `/` an `og:image` and gives `/demo` nothing at all. A link to the dashboard
 * demo unfurls as a bare title with a blank rectangle where the card should
 * be, and nothing in the build says so. The only signal is the absence of a
 * tag.
 *
 * So each segment that should have a card names one. This re-export means the
 * three routes share one generator (`app/opengraph-image.tsx`) rather than
 * three copies of it; if a demo ever earns its own card, this file is where it
 * gets drawn.
 */
export { default, alt, size, contentType } from "../opengraph-image"
