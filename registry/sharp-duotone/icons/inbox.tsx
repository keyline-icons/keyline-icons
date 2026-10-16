import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Inbox({ size = 24, ...props }: IconProps) {
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
      <path d="M7 3L17 3C17.3478 3 17.6706 3.1807 17.8525 3.4772L22.8525 11.6306C22.9489 11.7879 23 11.9689 23 12.1534L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 12.1534C1 11.9689 1.0511 11.7879 1.1475 11.6306L6.1475 3.4772C6.3294 3.1807 6.6522 3 7 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 13L8 13L10 16L14 16L16 13L23 13"/>
    </svg>
  )
}
