import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitMerge({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 22C8.0711 22 10 20.0711 10 18C10 15.9289 8.0711 14 6 14C3.9289 14 2 15.9289 2 18C2 20.0711 3.9289 22 6 22ZM18 10C20.0711 10 22 8.0711 22 6C22 3.9289 20.0711 2 18 2C15.9289 2 14 3.9289 14 6C14 8.0711 15.9289 10 18 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 2L6 15C6.1667 12 8.2 6 15 6"/>
    </svg>
  )
}
