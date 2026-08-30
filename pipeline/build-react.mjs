// Generate React components from the exported SVGs.
//
// The SVGs in `icons/` are the source of truth; this only restates them as JSX
// so app code can `import { Check } from "@/components/icons"` the way it would
// import from any icon package. Run `npm run icons:react` after `icons:build`.
//
//   node pipeline/build-react.mjs [--check]
//
// --check writes nothing and exits non-zero if the output would differ, the same
// contract `build.mjs --check` offers for icons/. It closes the window between
// renaming an icon and regenerating: until this runs, the old component is still
// exported, so `tsc` type-checks the app against a module the set no longer
// backs, and the app renders a glyph that is no longer in icons/.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))

/**
 * One entry per generated module.
 *
 * `stroke` has two targets and they are byte-identical on purpose: the site
 * imports the first, the package publishes the second, and one pass writes
 * both. A package built by its own generator drifts from the app the moment
 * either is touched alone, and the drift is invisible, because both sides
 * compile and the published icons are simply a different set from the ones the
 * site demonstrates.
 *
 * `duotone` and `fill` go to the package only. The site renders those styles
 * from the raw art in `lib/icons.ts` rather than from components, so shipping
 * 645 more of them into the app would be dead weight in every page bundle.
 *
 * They are separate modules rather than one file with a `weight` prop. The
 * three styles do not cover the same icons — 414, 340 and 305 — so a single
 * component taking a weight would have to accept a combination that does not
 * exist and decide what to do at runtime. A missing import is a build error,
 * which is the right time to find out.
 */
const pkg = (file) => [
  `packages/react/src/${file}`,
  join(ROOT, "packages", "react", "src", file),
]

const MODULES = [
  {
    style: "stroke",
    corners: "regular",
    outs: [
      ["components/icons/index.tsx", join(ROOT, "components", "icons", "index.tsx")],
      pkg("index.tsx"),
    ],
  },
  { style: "duotone", corners: "regular", outs: [pkg("duotone.tsx")] },
  { style: "fill", corners: "regular", outs: [pkg("fill.tsx")] },

  /*
   * The sharp half, three more entry points and no renamed export.
   *
   * The style axis is already spelled as entry points — `ArrowDown` means the
   * stroke drawing from the root and the duotone drawing from `/duotone` — so
   * a treatment is the same move one level along: `@keyline-icons/react/sharp`
   * and `/sharp/duotone`. Every existing import goes on resolving to exactly
   * the component it resolved to before, which matters more here than tidiness,
   * because a rename is a breaking change nothing in the pipeline reports (the
   * v0.2.0 `tag-horizontal` rename is the entry in the distribution skill).
   *
   * Suffixed export names — `ArrowDownSharp` — were the alternative and are
   * worse twice over: they would make the treatment part of a name whose own
   * rule is `[element]-[modifier]`, and they would put two spellings of the
   * same axis in one API, since the styles would still be entry points.
   *
   * The site's own `components/icons/` stays rounded: its chrome is drawn in
   * one treatment, and 1497 more components in every page bundle buys nothing.
   */
  { style: "stroke", corners: "sharp", outs: [pkg("sharp.tsx")] },
  { style: "duotone", corners: "sharp", outs: [pkg("sharp-duotone.tsx")] },
  { style: "fill", corners: "sharp", outs: [pkg("sharp-fill.tsx")] },
]

const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

/** Attributes the wrapper supplies itself, so they must not be re-emitted. */
const ROOT_DROP = new Set(["width", "height", "xmlns", "viewBox"])

/**
 * kebab-case SVG attribute -> React prop name, read from `components/glyph.tsx`
 * rather than written out again here.
 *
 * It was written out again here, and the two drifted: this copy was missing
 * `fill-opacity` and `stroke-opacity`, which only duotone drawings carry. The
 * site renders duotone correctly because `glyph.tsx` maps them; the package
 * emitted `fill-opacity={0.4}` as JSX, which React rejects at runtime with
 * "Invalid DOM property" and then drops. 416 attributes across 415 duotone
 * components, every one of them the muted plate that makes a duotone a duotone.
 *
 * `tsc` does not catch it. A kebab-cased name cannot be a JSX identifier, so it
 * is parsed as a string-keyed attribute and typechecks clean, and nothing in
 * the repository renders the generated module. Only mounting it does, which is
 * why this survived until the package was installed from a tarball and
 * server-rendered.
 *
 * Reading the map means the two cannot disagree again. `glyph.tsx` is the copy
 * that is exercised on every page of the site, so it is the one to trust.
 */
const CAMEL = Object.fromEntries(
  [
    ...(await readFile(join(ROOT, "components", "glyph.tsx"), "utf8")).matchAll(
      /"([a-z]+-[a-z-]+)":\s*"([a-zA-Z]+)"/g
    ),
  ].map(([, kebab, prop]) => [kebab, prop])
)

if (!CAMEL["fill-opacity"] || !CAMEL["stroke-opacity"]) {
  throw new Error(
    "REACT_ATTR in components/glyph.tsx no longer parses: the opacity mappings are missing"
  )
}

const ATTR = /([\w-]+)="([^"]*)"/g
const TAG = /<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)\/?>/g

const attrs = (chunk) => [...chunk.matchAll(ATTR)].map(([, k, v]) => [k, v])

const pascal = (name) =>
  name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")

/** Numeric-looking attribute values become JSX expressions, like lucide's. */
function jsxValue(value) {
  return /^-?\d+(\.\d+)?$/.test(value) ? `{${value}}` : `"${value}"`
}

function jsxAttrs(pairs) {
  return pairs.map(([k, v]) => ` ${CAMEL[k] ?? k}=${jsxValue(v)}`).join("")
}

/**
 * The wrapper is emitted into every module rather than imported from a shared
 * one. Fifteen duplicated lines buys each module the property that matters
 * more: importing `@keyline-icons/react/fill` pulls in that file and nothing
 * else, and the stroke module stays byte-identical to the copy the site holds.
 */
const header = (dir) => `// GENERATED BY pipeline/build-react.mjs — DO NOT EDIT.
// Source: ${dir}/*.svg. Regenerate with \`npm run icons:react\`.

import type { ReactNode, SVGProps } from "react"

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px. Matches lucide's \`size\` prop. */
  size?: number | string
}

/**
 * Shared wrapper. Presentation attributes come from each icon's own root — a
 * pure-fill drawing carries no stroke, and forcing one on paints an outline
 * over every knockout — so they are spread by the generated component, not
 * hardcoded here.
 */
function Icon({ size = 24, ...props }: IconProps & { children?: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}
`

/** One module's full text, plus how many components it carries. */
async function build(style, corners) {
  const rel = corners === "sharp" ? `icons/sharp/${style}` : `icons/${style}`
  const dir = join(ROOT, rel)
  const files = (await readdir(dir)).filter((f) => f.endsWith(".svg")).sort()

  const components = []
  for (const file of files) {
    const name = file.slice(0, -4)
    const src = await readFile(join(dir, file), "utf8")

    const open = src.match(/<svg\b([^>]*)>/)?.[1] ?? ""
    const root = attrs(open).filter(([k]) => !ROOT_DROP.has(k))

    const body = [...src.matchAll(TAG)]
      .map(([, tag, chunk]) => `      <${tag}${jsxAttrs(attrs(chunk))} />`)
      .join("\n")

    components.push(
      `export function ${pascal(name)}(props: IconProps) {\n` +
        `  return (\n` +
        `    <Icon${jsxAttrs(root)} {...props}>\n` +
        `${body}\n` +
        `    </Icon>\n` +
        `  )\n` +
        `}`
    )
  }

  return {
    text: `${header(rel)}\n${components.join("\n\n")}\n`,
    count: components.length,
    rel,
  }
}

const built = []
for (const mod of MODULES) built.push({ ...mod, ...(await build(mod.style, mod.corners)) })

if (check) {
  // Every target is reported before exiting. Bailing on the first would hide a
  // second stale module behind the one that happens to sort earlier, so the
  // fix looks complete after one rebuild and CI fails again on the next push.
  let drift = false
  for (const { rel, outs, text } of built) {
    for (const [label, path] of outs) {
      const prev = existsSync(path) ? await readFile(path, "utf8") : null
      if (prev === text) continue
      const why = prev === null ? "does not exist" : `is out of sync with ${rel}/`
      console.error(`  ${c(33, "DRIFT")} ${label} ${why}`)
      drift = true
    }
  }
  if (drift) {
    console.error(`\nRun: node pipeline/build-react.mjs`)
    process.exit(1)
  }
  const targets = built.reduce((n, m) => n + m.outs.length, 0)
  const summary = built
    .map((m) => `${m.corners === "sharp" ? "sharp " : ""}${m.style} ${m.count}`)
    .join(", ")
  console.log(c(32, `${targets} generated modules in sync with icons/ (${summary})`))
} else {
  for (const { outs, text, count } of built) {
    for (const [label, path] of outs) {
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, text, "utf8")
      console.log(`Wrote ${count} components to ${label}`)
    }
  }
}
