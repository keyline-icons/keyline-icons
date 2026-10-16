import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M7 2L17 2C17.5523 2 18 2.4477 18 3L18 21C18 21.5523 17.5523 22 17 22L7 22C6.4477 22 6 21.5523 6 21L6 3C6 2.4477 6.4477 2 7 2Z" fill="currentColor" stroke="none"/>
      <path d="M3 2L3 22M21 2L21 22"/>
    </svg>
  )
}
