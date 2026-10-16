import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Laptop({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15L3 4C3 3.4477 3.4477 3 4 3L20 3C20.5523 3 21 3.4477 21 4L21 15L22 15C22.5523 15 23 15.4477 23 16L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 16C1 15.4477 1.4477 15 2 15L3 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 16L4 4L20 4L20 16M2 16L22 16L22 20L2 20L2 16Z"/>
    </svg>
  )
}
