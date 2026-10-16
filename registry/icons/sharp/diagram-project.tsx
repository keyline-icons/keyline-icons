import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiagramProject({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L10 3L10 8L3 8L3 3ZM14 3L21 3L21 8L14 8L14 3ZM8.5 16L15.5 16L15.5 21L8.5 21L8.5 16ZM10 5.5L14 5.5M6.5 8L6.5 12L12 12L12 16" fill="none"/>
    </svg>
  )
}
