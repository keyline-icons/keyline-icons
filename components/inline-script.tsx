/**
 * A script that runs while the HTML is parsed, before the first paint.
 *
 * `text/plain` on the client because a script React inserts during a client
 * navigation never runs and React warns about rendering one. That render does
 * not need it: it reads the browser directly. Only a full page load does.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
