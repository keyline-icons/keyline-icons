import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorPointMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M10 9L12 9C12.5523 9 13 9.4477 13 10L13 12C13 12.5523 12.5523 13 12 13L10 13C9.4477 13 9 12.5523 9 12L9 10C9 9.4477 9.4477 9 10 9ZM2 19C2 15 5 11 9 11M13 11C17 11 22 9 22 5M16 19L22 19"/>
    </svg>
  )
}
