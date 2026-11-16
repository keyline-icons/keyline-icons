import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers3({ size = 24, ...props }: IconProps) {
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
      <path d="M6.091 9.75L2 12L6.091 14.25M6.091 9.75L2 7.5L12 2L22 7.5L17.909 9.75M6.091 9.75L12 13L17.909 9.75M6.091 14.25L2 16.5L12 22L22 16.5L17.909 14.25M6.091 14.25L12 17.5L17.909 14.25M17.909 9.75L22 12L17.909 14.25"/>
    </svg>
  )
}
