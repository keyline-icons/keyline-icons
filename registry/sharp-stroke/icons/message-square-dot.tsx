import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareDot({ size = 24, ...props }: IconProps) {
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
      <path d="M21 6C21 7.6569 19.6569 9 18 9C16.3431 9 15 7.6569 15 6C15 4.3431 16.3431 3 18 3C19.6569 3 21 4.3431 21 6ZM12.3431 3L3 3L3 21L7 17L21 17L21 11.6569" fill="none"/>
    </svg>
  )
}
