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

import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises"
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

const native = (file) => [
  `packages/react-native/src/${file}`,
  join(ROOT, "packages", "react-native", "src", file),
]

const WEB_MODULES = [
  {
    style: "stroke",
    corners: "regular",
    outs: [
      ["components/icons/index.tsx", join(ROOT, "components", "icons", "index.tsx")],
      pkg("index.tsx"),
    ],
  },
  { style: "two-tone", corners: "regular", outs: [pkg("two-tone.tsx")] },
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
  { style: "two-tone", corners: "sharp", outs: [pkg("sharp-two-tone.tsx")] },
  { style: "duotone", corners: "sharp", outs: [pkg("sharp-duotone.tsx")] },
  { style: "fill", corners: "sharp", outs: [pkg("sharp-fill.tsx")] },
]

/*
 * React Native, the same eight modules under the same eight entry points,
 * drawn through `react-native-svg` because there is no DOM `<svg>` to render.
 *
 * It is a second target of this pass rather than a generator of its own, for
 * the reason the stroke module has two targets: a package built separately
 * drifts from the other the moment either is touched alone, and both still
 * compile. Here a new drawing reaches both packages or neither.
 *
 * The translation is small because the set is. Every SVG in icons/ is `<svg>`
 * and `<path>` and nothing else, and every attribute they carry (the opacities,
 * fill-rule, the caps and joins) is a `react-native-svg` prop under the same
 * camelCase name React uses, so the attribute map in `glyph.tsx` serves both.
 */
const NATIVE_MODULES = WEB_MODULES.map(({ style, corners, outs }) => ({
  style,
  corners,
  target: "native",
  outs: [native(outs.at(-1)[0].split("/").at(-1))],
}))

const MODULES = [...WEB_MODULES, ...NATIVE_MODULES]

/*
 * React Native also gets one module per drawing, beside the eight above:
 * `@keyline-icons/react-native/icons/check`, `/fill/icons/check`,
 * `/sharp/fill/icons/check`.
 *
 * Metro does not tree-shake. Each style module is one file holding every
 * drawing, so `import { Check } from "@keyline-icons/react-native"` puts all
 * of them in the app: 1.05 MB of minified JavaScript for stroke and 1.60 MB for
 * two-tone, measured off `dist/` with terser on 15 Nov 2026, for one icon.
 * Expo strips unused exports only in production builds, and only from SDK 54,
 * where its own docs still call it experimental. `lucide-react-native`,
 * `phosphor-react-native` and `@tabler/icons-react-native` all publish a path
 * per icon for this reason; this package was the one that did not.
 *
 * The style comes first and `icons` is a fixed segment after it, so the path
 * can never collide with a style entry point: `/sharp/fill` is a style and
 * `/sharp/icons/fill` would be a drawing named fill. The eight modules above are
 * left exactly as they were, so every existing import bundles what it bundled
 * before, and web gets none of this, because every web bundler drops the
 * drawings a module exports and nobody imports.
 */
const SINGLE_STYLES = NATIVE_MODULES.map(({ style, corners }) => ({
  style,
  corners,
  dir: [corners === "sharp" && "sharp", style !== "stroke" && style, "icons"]
    .filter(Boolean)
    .join("/"),
}))

const NATIVE_SRC = join(ROOT, "packages", "react-native", "src")

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

/**
 * Renames since 1.0.0, each kept as a deprecated alias of what it became.
 *
 * A 1.x export is a promise to everyone who imported it, and until `rocket-2`
 * became `rocket-fast` in 1.3.0 a rename here simply deleted the old name: the
 * next install broke the build of anyone using it, and nothing in this
 * pipeline reported it. The alias is the same component under the old name,
 * and the JSDoc tag is what makes an editor strike it through, so the import
 * keeps working and says what to change it to. They go at the next major.
 * Renames from 0.x are left out: they were breaking by the rules of 0.x, and
 * bringing their names back now would make them look current. A `reclaimed` name
 * is a drawing again, under its own export, so it keeps no alias.
 */
const ALIASES = JSON.parse(
  await readFile(join(ROOT, "lib", "icon-renames.json"), "utf8")
).renames.filter(({ version, reclaimed }) => Number(version.split(".")[0]) >= 1 && !reclaimed)

/**
 * Every drawing again under its name plus `Icon`: `CheckIcon` beside `Check`.
 *
 * shadcn/ui's components import that form, `CheckIcon` and `ChevronDownIcon`,
 * so pointing a shadcn/create project at this package failed in every
 * component and each import had to be renamed by hand. With the twin, the
 * switch is a find-and-replace on the module path.
 *
 * A re-export rather than a `const`, so the twin is the same binding: it adds
 * nothing to a bundle, and go-to-definition lands on the drawing. Deprecated
 * names get no twin, because a name born deprecated only adds to what the next
 * major removes. The site's stroke module carries the twins as well, being the
 * same text as the package's, and a bundler drops every one it never imports.
 */
const SUFFIX = "Icon"

/**
 * The release the twins first shipped in.
 *
 * A name renamed after it already had a twin on npm: 1.4.1 exported `Bot2Icon`
 * beside `Bot2`, and `bot-2` became `bot-circle` in 1.5.0. Its alias keeps the
 * twin, deprecated the same way, or the rename breaks the very imports the
 * alias exists to keep. A name renamed before it never had one (`Rocket2Icon`
 * was never published) and gets none.
 */
const TWINS_SINCE = "1.4.1"

/** Whether dotted version `a` comes after `b`. */
const isAfter = (a, b) => {
  const [x, y] = [a, b].map((v) => v.split(".").map(Number))
  const i = x.findIndex((part, at) => part !== y[at])
  return i >= 0 && x[i] > y[i]
}

/** Numeric-looking attribute values become JSX expressions: `strokeWidth={2}`, not `"2"`. */
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
  /** Rendered box in px, set as both width and height. Defaults to 24. */
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
/**
 * The native wrapper. Two things differ from the web one beyond the element.
 *
 * Colour: a native view has no CSS to inherit from, so `currentColor` has
 * nothing to resolve against until `react-native-svg` is handed a `color` prop,
 * which it then threads through every fill and stroke the drawing marks
 * `currentColor`. Defaulting it keeps a bare `<Check />` visible, and the
 * two-tone and duotone plates keep their opacities off that same colour.
 *
 * Accessibility: `aria-hidden`, which React Native has accepted since 0.71
 * and maps to VoiceOver's and TalkBack's own hiding. The platform pair,
 * `accessibilityElementsHidden` and `importantForAccessibility`, was the first
 * draft and does the same on a phone, but `react-native-svg`'s web build passes
 * both straight to the DOM, so every icon in an Expo web app logged two
 * unknown-prop warnings. Measured by server-rendering the packed tarball
 * through react-native-web. A caller who wants the icon announced passes
 * `aria-hidden={false}` and a label.
 */
const nativeHeader = (dir, tags) => `// GENERATED BY pipeline/build-react.mjs — DO NOT EDIT.
// Source: ${dir}/*.svg. Regenerate with \`npm run icons:react\`.

import type { ReactNode } from "react"
import Svg, { ${tags.join(", ")}, type SvgProps } from "react-native-svg"

${NATIVE_WRAPPER}`

/**
 * The same wrapper once more, exported, for the single-drawing modules.
 *
 * They import it rather than carry it. Twenty lines in each of 14,664 files
 * would be more wrapper than drawing, and an app importing one icon still gets
 * that file plus this one and nothing else. The eight style modules keep their
 * own copy so that not a byte of them changes.
 */
const nativeBase = () => `// GENERATED BY pipeline/build-react.mjs — DO NOT EDIT.
// The wrapper every module under */icons/ imports. Regenerate with \`npm run icons:react\`.

import type { ReactNode } from "react"
import Svg, { type SvgProps } from "react-native-svg"

${NATIVE_WRAPPER.replace("\nfunction Icon(", "\nexport function Icon(")}`

/** One drawing's module: `@keyline-icons/react-native/fill/icons/check`. */
const nativeSingle = ({ rel, file, dir, tags, component, name }) => {
  const own = pascal(name)
  const up = "../".repeat(dir.split("/").length)
  return `// GENERATED BY pipeline/build-react.mjs — DO NOT EDIT.
// Source: ${rel}/${file}. Regenerate with \`npm run icons:react\`.

import { ${tags.join(", ")} } from "react-native-svg"
import { Icon, type IconProps } from "${up}icon-base.js"

export type { IconProps }

${component}

export { ${own} as ${own}${SUFFIX} }
export default ${own}
`
}

/** The wrapper's text, shared by the style modules and `icon-base.tsx`. */
const NATIVE_WRAPPER = `export type IconProps = Omit<SvgProps, "children"> & {
  /** Rendered box in points. Matches the web package's \`size\` prop. */
  size?: number | string
}

/**
 * Shared wrapper. Presentation attributes come from each icon's own root — a
 * pure-fill drawing carries no stroke, and forcing one on paints an outline
 * over every knockout — so they are spread by the generated component, not
 * hardcoded here.
 */
function Icon({
  size = 24,
  color = "#000",
  ...props
}: IconProps & { children?: ReactNode }) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      aria-hidden
      {...props}
    />
  )
}
`

async function build(style, corners, target = "web") {
  const rel = corners === "sharp" ? `icons/sharp/${style}` : `icons/${style}`
  const dir = join(ROOT, rel)
  const files = (await readdir(dir)).filter((f) => f.endsWith(".svg")).sort()

  const tag = (t) => (target === "native" ? t[0].toUpperCase() + t.slice(1) : t)
  const used = new Set()

  const single = SINGLE_STYLES.find((s) => s.style === style && s.corners === corners)
  const singles = []

  const components = []
  for (const file of files) {
    const name = file.slice(0, -4)
    const src = await readFile(join(dir, file), "utf8")

    const open = src.match(/<svg\b([^>]*)>/)?.[1] ?? ""
    const root = attrs(open).filter(([k]) => !ROOT_DROP.has(k))

    const own = new Set()
    const body = [...src.matchAll(TAG)]
      .map(([, el, chunk]) => {
        used.add(tag(el))
        own.add(tag(el))
        return `      <${tag(el)}${jsxAttrs(attrs(chunk))} />`
      })
      .join("\n")

    const component =
      `export function ${pascal(name)}(props: IconProps) {\n` +
      `  return (\n` +
      `    <Icon${jsxAttrs(root)} {...props}>\n` +
      `${body}\n` +
      `    </Icon>\n` +
      `  )\n` +
      `}`
    components.push(component)

    if (target === "native")
      singles.push({
        path: join(NATIVE_SRC, single.dir, `${name}.tsx`),
        label: `packages/react-native/src/${single.dir}/${name}.tsx`,
        text: nativeSingle({
          rel,
          file,
          dir: single.dir,
          tags: [...own].sort(),
          component,
          name,
        }),
      })
  }

  // Counted before the aliases, which are names rather than drawings.
  const count = components.length
  const names = new Set(files.map((f) => f.slice(0, -4)))
  const renamed = ALIASES.filter(({ to }) => names.has(to))
  const oldTwins = renamed.filter(({ version }) => isAfter(version, TWINS_SINCE))
  for (const { from, to, version } of renamed) {
    const forms = oldTwins.some((r) => r.from === from) ? ["", SUFFIX] : [""]
    for (const suffix of forms)
      components.push(
        `/**\n` +
          ` * @deprecated \`${from}\` was renamed \`${to}\` in ${version}. Import\n` +
          ` * ${pascal(to)}${suffix}: this name keeps working until the next major.\n` +
          ` */\n` +
          `export const ${pascal(from)}${suffix} = ${pascal(to)}`
      )
  }

  // A twin that collides with a drawing or a rename would be a duplicate export,
  // which `tsc` reports only after the module is written, as a line number deep
  // in generated code. Named here, it says which icon to look at.
  const taken = new Set([
    ...[...names, ...renamed.map(({ from }) => from)].map(pascal),
    ...oldTwins.map(({ from }) => pascal(from) + SUFFIX),
  ])
  const twins = [...names].map((name) => [pascal(name), pascal(name) + SUFFIX])
  for (const [own, twin] of twins) {
    if (taken.has(twin))
      throw new Error(`${rel}: ${own}'s twin ${twin} is already exported`)
  }
  const list = twins.map(([own, twin]) => `  ${own} as ${twin},`).join("\n")
  components.push(`export {\n${list}\n}`)

  return {
    text: `${
      target === "native" ? nativeHeader(rel, [...used].sort()) : header(rel)
    }\n${components.join("\n\n")}\n`,
    count,
    rel,
    singles,
  }
}

const built = []
for (const mod of MODULES)
  built.push({ ...mod, ...(await build(mod.style, mod.corners, mod.target)) })

/*
 * The single-drawing modules and the wrapper they share. A rename would leave
 * the old file behind, still shipping a drawing the set no longer has under a
 * path that still resolves, so any file in the eight `icons/` folders that this
 * pass did not produce counts as drift and is deleted on a write.
 */
const singles = [
  {
    path: join(NATIVE_SRC, "icon-base.tsx"),
    label: "packages/react-native/src/icon-base.tsx",
    text: nativeBase(),
  },
  ...built.flatMap((m) => m.singles),
]
const expected = new Set(singles.map(({ path }) => path))
const strays = []
for (const { dir } of SINGLE_STYLES) {
  const at = join(NATIVE_SRC, dir)
  if (!existsSync(at)) continue
  for (const f of (await readdir(at)).sort()) {
    const path = join(at, f)
    if (!expected.has(path))
      strays.push({ path, label: `packages/react-native/src/${dir}/${f}` })
  }
}

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
  // Thousands of single modules go stale together after a wrapper change, so
  // the first few are named and the rest counted.
  const stale = []
  for (const { label, path, text } of singles) {
    const prev = existsSync(path) ? await readFile(path, "utf8") : null
    if (prev !== text) stale.push(`${label} ${prev === null ? "does not exist" : "is out of sync"}`)
  }
  stale.push(...strays.map(({ label }) => `${label} is not in icons/`))
  for (const line of stale.slice(0, 10)) console.error(`  ${c(33, "DRIFT")} ${line}`)
  if (stale.length > 10) console.error(`  ${c(33, "DRIFT")} and ${stale.length - 10} more`)
  if (drift || stale.length) {
    console.error(`\nRun: node pipeline/build-react.mjs`)
    process.exit(1)
  }
  const targets = built.reduce((n, m) => n + m.outs.length, 0)
  const summary = built
    .filter((m) => m.target !== "native")
    .map((m) => `${m.corners === "sharp" ? "sharp " : ""}${m.style} ${m.count}`)
    .join(", ")
  console.log(
    c(
      32,
      `${targets} generated modules and ${(singles.length - 1).toLocaleString("en-US")} ` +
        `single-icon native modules in sync with icons/ (${summary})`
    )
  )
} else {
  for (const { outs, text, count } of built) {
    for (const [label, path] of outs) {
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, text, "utf8")
      console.log(`Wrote ${count} components to ${label}`)
    }
  }
  // Written only when the text changed, so a rebuild that changes one drawing
  // touches eight files rather than 14,664.
  let wrote = 0
  for (const { path, text } of singles) {
    if (existsSync(path) && (await readFile(path, "utf8")) === text) continue
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, text, "utf8")
    wrote++
  }
  for (const { path } of strays) await unlink(path)
  console.log(
    `Wrote ${wrote} of ${singles.length.toLocaleString("en-US")} single-icon native modules` +
      (strays.length ? `, removed ${strays.length} no longer in icons/` : "")
  )
}
