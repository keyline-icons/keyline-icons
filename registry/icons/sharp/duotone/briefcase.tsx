import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Briefcase({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5.5L22 5.5C22.5523 5.5 23 5.9477 23 6.5L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21L1 6.5C1 5.9477 1.4477 5.5 2 5.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.25 6.5L8.25 3L15.75 3L15.75 6.5M2 10.5C6 12.75 18 12.75 22 10.5M9.5 12.1132L9.5 15.5L14.5 15.5L14.5 12.1132"/>
    </svg>
  )
}
