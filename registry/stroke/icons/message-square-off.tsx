import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17 17L7 17L3 21L3 6C3 5.2044 3.3161 4.4413 3.8787 3.8787M8.6569 3L18 3C19.6569 3 21 4.3431 21 6L21 14C21 14.3854 20.9257 14.7672 20.7813 15.1244M2 2L22 22" fill="none"/>
    </svg>
  )
}
