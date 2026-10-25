import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7.75L3 6C3 4.3431 4.3431 3 6 3M10.5 3L13.5 3M18 3C19.6569 3 21 4.3431 21 6L21 7.75M21 12.25L21 14C21 15.6569 19.6569 17 18 17M14 17L11 17M7 17L3 21L3 12.25" fill="none"/>
    </svg>
  )
}
