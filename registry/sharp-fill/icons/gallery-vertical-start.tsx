import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryVerticalStart({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 13C22 13.5523 21.5523 14 21 14L3 14C2.4477 14 2 13.5523 2 13L2 3C2 2.4477 2.4477 2 3 2Z" fill="currentColor" stroke="none"/>
      <path d="M4 17L20 17M6 21L18 21"/>
    </svg>
  )
}
