import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 21L14.5 21M3 14.5L3 9.5M8 3L3 3L3 7M3 17L3 21L7 21M21 16L21 21.0001L17 21" strokeOpacity="0.4"/>
      <path d="M15.5 3.4751L15.5 15M9.7045 9.3094L15.5 3.2399L21.2768 9.2898"/>
    </svg>
  )
}
