#!/usr/bin/env node
/**
 * Verify each package's `VERSION` constant matches its own package.json, and
 * that the MCP server's registry listing names the same package and version.
 *
 *   node pipeline/check-versions.mjs
 *
 * The MCP server and the CLI each hardcode their version in the source, and
 * both report it: `serverInfo.version` in the initialize response, `--version`
 * and the help header in the CLI. npm reads package.json and never looks at the
 * constant, so the two drift silently and npm publishes the mismatch happily.
 *
 * 0.1.1 shipped that way. Both package.json files said 0.1.1 and both binaries
 * introduced themselves as 0.1.0, because the release bumped the manifests and
 * not the constants. Nothing broke, which is the problem: the only symptom is a
 * wrong answer to "what version are you on", months later, from someone
 * reporting a bug.
 *
 * `packages/mcp/server.json` drifts the same way, with a worse symptom. It is
 * the server's entry on the official MCP Registry, and it pins an exact npm
 * version, so clients that install from the registry keep getting the old set
 * after a release that bumped only the manifest. Its name has to equal the
 * manifest's `mcpName` too: the registry proves the name by reading that field
 * out of the published package, so a mismatch is only discovered when the
 * listing is refused, one npm release too late to fix without another.
 */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const PACKAGES = ["mcp", "cli"]

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const problems = []
const manifests = {}
for (const name of PACKAGES) {
  const manifest = JSON.parse(
    await readFile(join(ROOT, "packages", name, "package.json"), "utf8")
  )
  manifests[name] = manifest
  const src = await readFile(join(ROOT, "packages", name, "src", "index.mjs"), "utf8")
  const m = src.match(/const VERSION = "([^"]+)"/)

  if (!m) {
    problems.push(`${name}: no VERSION constant in src/index.mjs`)
  } else if (m[1] !== manifest.version) {
    problems.push(
      `${name}: package.json says ${manifest.version}, src/index.mjs says ${m[1]}`
    )
  }
}

const mcp = manifests.mcp
const listing = JSON.parse(
  await readFile(join(ROOT, "packages", "mcp", "server.json"), "utf8")
)
const npm = listing.packages?.find((p) => p.registryType === "npm")

if (listing.name !== mcp.mcpName) {
  problems.push(
    `mcp: package.json's mcpName is ${mcp.mcpName}, server.json is named ${listing.name}`
  )
}
if (listing.version !== mcp.version) {
  problems.push(`mcp: package.json says ${mcp.version}, server.json says ${listing.version}`)
}
if (npm?.identifier !== mcp.name || npm?.version !== mcp.version) {
  problems.push(
    `mcp: server.json installs ${npm?.identifier}@${npm?.version}, not ${mcp.name}@${mcp.version}`
  )
}

if (problems.length) {
  for (const p of problems) console.error(`  ${c(31, "MISMATCH")} ${p}`)
  console.error(
    `\nBump them together, or the published binary reports the wrong version` +
      ` and the registry keeps installing the old one.`
  )
  process.exit(1)
}

console.log(
  c(32, `${PACKAGES.length} packages and the MCP listing report the version they ship as`)
)
