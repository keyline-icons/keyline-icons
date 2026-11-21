import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PipeSection({ size = 24, ...props }: IconProps) {
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
      <path d="M17.7782 17.7782C15.7886 19.7677 13.0373 21 10 21L6 21C5.4477 21 5 20.5523 5 20L5 13C5 12.4477 5.4477 12 6 12L10 12C11.1046 12 12 11.1046 12 10L12 6C12 5.4477 12.4477 5 13 5L20 5C20.5523 5 21 5.4477 21 6L21 10C21 13.0373 19.7677 15.7886 17.7782 17.7782Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 22V11M22 6H11M2 13L6 13M2 20L6 20M13 2L13 6M20 2L20 6"/>
    </svg>
  )
}
