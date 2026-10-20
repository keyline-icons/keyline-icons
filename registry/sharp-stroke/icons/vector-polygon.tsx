import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorPolygon({ size = 24, ...props }: IconProps) {
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
      <path d="M10 2L14 2L14 6L10 6ZM18 8L22 8L22 12L18 12ZM15 18L19 18L19 22L15 22ZM5 18L9 18L9 22L5 22ZM2 8L6 8L6 12L2 12ZM14 5.5L18 8.5M19.4 12L17.6 18M15 20L9 20M6.4 18L4.6 12M6 8.5L10 5.5" fill="none"/>
    </svg>
  )
}
