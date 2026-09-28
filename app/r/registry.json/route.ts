import { catalog, json } from "@/lib/registry"

/**
 * The whole catalog, as one prerendered file.
 *
 * This is what every shadcn CLI before 4.17.0 downloads for `search`, and it
 * searches the file itself. Those CLIs send no parameters and do not read
 * `pagination`, so a first page served here would look to them like the entire
 * set: 100 icons, no error, no hint that anything was missing. A request with
 * parameters never reaches this file; `next.config.ts` rewrites it to
 * `registry/search` first. That split is also what keeps this a static file
 * the CDN answers, since a handler that read the query would have to run for
 * every request, parameters or not.
 */
export const dynamic = "force-static"

export async function GET() {
  return json(await catalog())
}
