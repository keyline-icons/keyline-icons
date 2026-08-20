/**
 * The same card again, under the name X looks for.
 *
 * `opengraph-image` emits `og:image` and nothing else. X falls back to
 * `og:image` in practice, but only after checking `twitter:image`, and the
 * fallback is the kind of thing that works until a platform tightens up. One
 * re-export costs nothing and makes both tags explicit.
 *
 * `alt`, `size` and `contentType` have to come across too: Next reads them off
 * this module, not off the one it forwards to.
 */
export { default, alt, size, contentType } from "./opengraph-image"
