/**
 * Every way an icon can leave this site as text.
 *
 * The formats live here rather than in the panel that shows them because they
 * are the same four strings the CLI and the React package promise, and a
 * snippet that drifts from the package it tells you to install is worse than no
 * snippet at all. One file, so a rename of the scope reaches all of them.
 */
import type { Style, StyleArt } from "@/components/glyph"

export const FORMATS = [
  { value: "svg", label: "SVG", lang: "html" },
  { value: "jsx", label: "JSX", lang: "tsx" },
  { value: "react", label: "React", lang: "tsx" },
  { value: "cli", label: "CLI", lang: "bash" },
] as const

export type Format = (typeof FORMATS)[number]["value"]

/** The published packages, named once. */
export const REACT_PACKAGE = "@keyline-icons/react"
export const CLI_PACKAGE = "@keyline-icons/cli"

/**
 * The four ways to say "install this" and "run this once".
 *
 * Both verbs are needed and they do not move together: the React entry point is
 * a dependency you add, the CLI is a binary you run without adding anything, and
 * every manager spells the second one differently — `npx`, `pnpm dlx`, `bunx`.
 * Getting that pair right is the whole reason this is a table rather than a
 * string with the manager's name interpolated into it.
 */
export const PACKAGE_MANAGERS = [
  { value: "npm", add: "npm i", exec: "npx" },
  { value: "pnpm", add: "pnpm add", exec: "pnpm dlx" },
  { value: "yarn", add: "yarn add", exec: "yarn dlx" },
  { value: "bun", add: "bun add", exec: "bunx" },
] as const

export type PackageManager = (typeof PACKAGE_MANAGERS)[number]["value"]

const manager = (pm: PackageManager) =>
  PACKAGE_MANAGERS.find((m) => m.value === pm) ?? PACKAGE_MANAGERS[0]

/** The whole set as a dependency. */
export const installSet = (pm: PackageManager) =>
  `${manager(pm).add} ${REACT_PACKAGE}`

/** One drawing copied into the project, no dependency left behind. */
export const installIcon = (pm: PackageManager, name: string, style: Style) =>
  `${manager(pm).exec} ${CLI_PACKAGE} add ${name}` +
  (style === "stroke" ? "" : ` --style ${style}`)

/** `circle-arrow-down` -> `CircleArrowDown`, the same rule the generator uses. */
export const componentName = (name: string) =>
  name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")

/** Where a style's components are imported from. Stroke is the root entry. */
export const importPath = (style: Style) =>
  style === "stroke" ? REACT_PACKAGE : `${REACT_PACKAGE}/${style}`

/**
 * kebab-case attribute names to their React spelling, applied to the drawing
 * itself rather than to a props object.
 *
 * The bodies are strings of SVG, so this is a rewrite of the markup: every
 * hyphenated *attribute* name becomes camelCase, and nothing else can match
 * because the pattern requires the `=` immediately after. Path data, which is
 * the only other place a hyphen shows up, sits inside the quotes.
 */
const camelizeAttrs = (markup: string) =>
  markup.replace(/\b([a-z]+(?:-[a-z]+)+)=/g, (_, attr: string) =>
    attr.replace(/-([a-z])/g, (__, c: string) => c.toUpperCase()).concat("=")
  )

type Options = {
  /** The width and height written into the copied markup. */
  size: number
  /** Overrides the drawn stroke, so a scrubbed weight comes along. */
  stroke: number
  /** Which manager the install and run lines are written for. */
  pm: PackageManager
}

/**
 * The root attributes as they should be copied: the icon's own, with the
 * scrubbed stroke width substituted.
 *
 * A pure-fill icon carries no `stroke-width`, so nothing is substituted into
 * it — handing one a width is how a 2px outline ends up painted over every
 * knockout.
 */
const rootPairs = (art: StyleArt, stroke: number) =>
  Object.entries(art.root).map(
    ([key, value]) =>
      [key, key === "stroke-width" ? String(stroke) : value] as const
  )

function svgSnippet(art: StyleArt, { size, stroke }: Options) {
  const attrs = rootPairs(art, stroke)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("")

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"` +
    ` viewBox="0 0 24 24"${attrs}>\n  ${art.body}\n</svg>`
  )
}

function jsxSnippet(art: StyleArt, { size, stroke }: Options) {
  const attrs = rootPairs(art, stroke)
    .map(([k, v]) => ` ${camelizeAttrs(`${k}=`)}"${v}"`)
    .join("")

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"` +
    ` viewBox="0 0 24 24"${attrs}>\n  ${camelizeAttrs(art.body)}\n</svg>`
  )
}

/**
 * Install the set, then the import and the tag.
 *
 * The install line leads because the import underneath it is a lie without it —
 * a snippet you paste into a project that has never heard of the package is a
 * red squiggle, not an answer. Only the props that differ from the defaults are
 * written: `size={24}` and `strokeWidth={2}` are what the component already
 * does, and spelling them out teaches the reader they are required.
 */
function reactSnippet(
  name: string,
  style: Style,
  art: StyleArt,
  { size, stroke, pm }: Options
) {
  const component = componentName(name)
  const props = [
    size === 24 ? "" : ` size={${size}}`,
    // Only where the drawing has a stroke to override.
    art.root["stroke-width"] && stroke !== 2 ? ` strokeWidth={${stroke}}` : "",
  ].join("")

  return (
    `${installSet(pm)}\n\n` +
    `import { ${component} } from "${importPath(style)}"\n\n` +
    `<${component}${props} />`
  )
}

export function snippet(
  format: Format,
  name: string,
  style: Style,
  art: StyleArt,
  options: Options
) {
  switch (format) {
    case "svg":
      return svgSnippet(art, options)
    case "jsx":
      return jsxSnippet(art, options)
    case "react":
      return reactSnippet(name, style, art, options)
    case "cli":
      return installIcon(options.pm, name, style)
  }
}

/**
 * The download's file name.
 *
 * Stroke keeps the bare name, which is what it is called on disk and what
 * everyone means by "the icon". The other two carry their style, because
 * comparing all three of one icon otherwise writes the same name three times
 * into a downloads folder and the browser silently numbers them.
 */
export const downloadName = (name: string, style: Style) =>
  style === "stroke" ? `${name}.svg` : `${name}-${style}.svg`

/**
 * Why a style is missing, in the words the CLI already uses.
 *
 * A greyed-out tab with no explanation reads as a bug in the site rather than
 * as a fact about the drawing.
 */
export const MISSING_STYLE =
  "Needs an enclosed area to fill — from the glyph itself or from a square or circle container."

/**
 * One icon as a standalone component file, for the shadcn registry.
 *
 * Deliberately not the `reactSnippet` above, which imports from
 * `@keyline-icons/react`. A registry item is source that lands in your project
 * and has to compile there on its own, so this owes nothing to the package and
 * adds no dependency: a consumer running `shadcn add` gets a file, not a
 * package reference, which is the whole reason to offer the registry alongside
 * npm rather than instead of it.
 *
 * The drawn stroke width is kept rather than a scrubbed one. The site's copy
 * button hands you what is on screen because you asked for that weight; a
 * registry install is the icon as the set defines it, and a consumer who wants
 * 1.5 passes `strokeWidth` at the call site.
 */
export function registryComponent(name: string, art: StyleArt) {
  const Name = componentName(name)

  // Numeric values become JSX expressions, the same rule the generated package
  // follows, so a file installed from the registry and one imported from the
  // package are the same text.
  const attrs = Object.entries(art.root)
    .map(([key, value]) => {
      const jsx = camelizeAttrs(`${key}=`).slice(0, -1)
      return /^-?\d+(\.\d+)?$/.test(value)
        ? `      ${jsx}={${value}}`
        : `      ${jsx}="${value}"`
    })
    .join("\n")

  const body = camelizeAttrs(art.body)
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((line) => `      ${line.trim()}`)
    .join("\n")

  return `import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px. Matches lucide's \`size\` prop. */
  size?: number | string
}

export function ${Name}({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
${attrs}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
${body}
    </svg>
  )
}
`
}
