import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Archive({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 9C23 9.5523 22.5523 10 22 10L2 10C1.4477 10 1 9.5523 1 9L1 4C1 3.4477 1.4477 3 2 3ZM4 8L20 8C20.5523 8 21 8.4477 21 9L21 20C21 20.5523 20.5523 21 20 21L4 21C3.4477 21 3 20.5523 3 20L3 9C3 8.4477 3.4477 8 4 8Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 4L22 4L22 9L2 9L2 4ZM4 9L4 20L20 20L20 9M9 13L15 13"/>
    </svg>
  )
}
