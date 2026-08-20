// The plugin's main thread. It owns the document and nothing else.
//
// Search, ranking and the grid all live in ui.html, because the iframe is the
// only side with a DOM and the only side that can reach the network: this
// sandbox has no `fetch`. So the set never passes through here. The UI hands
// over one assembled SVG per insert and this side decides where it lands.

figma.showUI(__html__, { width: 400, height: 560, themeColors: true })

/**
 * Figma's SVG importer does not resolve `currentColor`. It is a CSS keyword with
 * no cascade to resolve against once the markup leaves a page, so every path
 * arrives unpainted and the insert looks empty. The exports carry it on purpose,
 * it is what makes an icon take the colour of the text around it, so it is
 * swapped for real ink on the way onto the canvas.
 */
const INK = "#000000"

/**
 * Centre the node in the selected frame, or in the viewport when nothing usable
 * is selected.
 *
 * Only FRAME and COMPONENT are accepted as parents. Both establish a coordinate
 * space, so `x`/`y` mean what they look like they mean. A section's children
 * keep absolute page coordinates and an instance refuses `appendChild`
 * altogether, so those fall through to the viewport rather than landing
 * somewhere surprising.
 */
function place(node) {
  const [sel] = figma.currentPage.selection
  const box = sel && (sel.type === "FRAME" || sel.type === "COMPONENT") ? sel : null

  if (box) {
    box.appendChild(node)
    node.x = Math.round((box.width - node.width) / 2)
    node.y = Math.round((box.height - node.height) / 2)
    return
  }

  figma.currentPage.appendChild(node)
  node.x = Math.round(figma.viewport.center.x - node.width / 2)
  node.y = Math.round(figma.viewport.center.y - node.height / 2)
}

figma.ui.onmessage = (msg) => {
  if (!msg || msg.type !== "insert") return

  const node = figma.createNodeFromSvg(String(msg.svg).replace(/currentColor/g, INK))
  // Figma names the import `svg`. The icon name is the only useful label, and it
  // is what a later export or a Code Connect mapping reads back.
  node.name = String(msg.name)

  place(node)
  figma.currentPage.selection = [node]
  figma.notify(`Inserted ${msg.name}`)
}
