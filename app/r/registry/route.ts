/**
 * The catalog without `.json`, which the catch-all used to answer as well.
 * `.json` is optional everywhere under `/r/`, and this is the one address the
 * catch-all no longer covers.
 */
export const dynamic = "force-static"

export { GET } from "../registry.json/route"
