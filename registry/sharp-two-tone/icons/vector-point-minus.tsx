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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 8L13 8C13.5523 8 14 8.4477 14 9L14 13C14 13.5523 13.5523 14 13 14L9 14C8.4477 14 8 13.5523 8 13L8 9C8 8.4477 8.4477 8 9 8Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 9L13 9L13 13L9 13ZM2 20L2 19C2 15 5 11 9 11M13 11C17 11 22 9 22 5L22 4M15 19L23 19"/>
    </svg>
  )
}
