import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareAlignOffsetTop({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2091 2 22 3.79086 22 6L22 18C22 20.2091 20.2091 22 18 22L6 22C3.79086 22 2 20.2091 2 18L2 6C2 3.79086 3.79086 2 6 2L18 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 8H13M9 12H16M14 16H16"/>
    </svg>
  )
}
