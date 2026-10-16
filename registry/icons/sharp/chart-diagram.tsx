import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartDiagram({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L21 3L21 8L3 8L3 3ZM3 16L10 16L10 21L3 21L3 16ZM14 16L21 16L21 21L14 21L14 16ZM12 8L12 12M6.5 16L6.5 12L17.5 12L17.5 16" fill="none"/>
    </svg>
  )
}
