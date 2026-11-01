import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BuildingComplex({ size = 24, ...props }: IconProps) {
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
      <path d="M9 21L4 21L4 15M9 21L13.5 21M9 5.9167L16 3.8333L19.1313 2.9635M16 11L22 11L22 21L17.5 21M1.2852 8.2127L4 7.4048L9 5.9167M4 15L4 7.4048M9 21L9 5.9167M16 3.8333L16 11M16 11L9 11M9 15L4 15M13.5 21L13.5 16L17.5 16L17.5 21M13.5 21L17.5 21" fill="none"/>
    </svg>
  )
}
