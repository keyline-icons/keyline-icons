/**
 * Code blocks scroll rather than wrap. A wrapped import line reads as two
 * lines of code, and the one thing a snippet has to be is copyable by eye.
 *
 * Shared by `/install` and the blog, so a snippet in a post and the same
 * snippet in the install guide are set the same way.
 */
export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-[13px] leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}
