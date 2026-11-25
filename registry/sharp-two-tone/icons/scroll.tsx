import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Scroll({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L7 22C6.4477 22 6 21.5523 6 21L6 10L2 10C1.4477 10 1 9.5523 1 9L1 6L1 3C1 2.4477 1.4477 2 2 2L7 2L18 2C18.5523 2 19 2.4477 19 3L19 9.5L19 15L22 15C22.5523 15 23 15.4477 23 16L23 21C23 21.5523 22.5523 22 22 22L17 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 16L18 3L2 3L2 9L7 9M7 3L7 21L22 21L22 16L12 16L12 21M10 8L15 8M10 12L15 12"/>
    </svg>
  )
}
