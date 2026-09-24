import Icon from "./Icon.svelte"

export function createIcon(root: Record<string, string>, body: string) {
  return class extends (Icon as any) {
    constructor(options: any) {
      super({
        ...options,
        props: {
          attrs: root,
          body: body,
          ...options?.props,
        },
      })
    }
  }
}
