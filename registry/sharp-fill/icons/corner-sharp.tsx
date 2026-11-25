import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CornerSharp({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 3L21 3L21 14.5M3 7L3 6C3 4.3431 4.3431 3 6 3L7 3M21 17L21 18C21 19.6569 19.6569 21 18 21L17 21M14.5 21L9.5 21M7 21L6 21C4.3431 21 3 19.6569 3 18L3 17M3 14.5L3 9.5"/>
    </svg>
  )
}
