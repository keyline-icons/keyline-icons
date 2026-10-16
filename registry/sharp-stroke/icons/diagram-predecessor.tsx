import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiagramPredecessor({ size = 24, ...props }: IconProps) {
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
      <path d="M3 16L12 16L12 21L3 21L3 16ZM3 3L21 3L21 8L3 8L3 3ZM12 18.5L18 18.5L18 12M15.7071 14.2929L18 12L20.2929 14.2929" fill="none"/>
    </svg>
  )
}
