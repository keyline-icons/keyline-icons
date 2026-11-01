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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.7147 6.4463L8.7147 4.9583L15.7147 2.8749C15.8073 2.8473 15.9034 2.8333 16 2.8333C16.5523 2.8333 17 3.281 17 3.8333L17 10L21 10C22.1046 10 23 10.8954 23 12L23 20C23 21.1046 22.1046 22 21 22L5 22C3.8954 22 3 21.1046 3 20L3 7.4048C3 6.9624 3.2907 6.5725 3.7147 6.4463Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 21L5 21C4.4477 21 4 20.5523 4 20L4 15M9 21L13.5 21M9 5.9167L16 3.8333L19 3M16 11L21 11C21.5523 11 22 11.4477 22 12L22 20C22 20.5523 21.5523 21 21 21L17.5 21M2 8L4 7.4048L9 5.9167M4 15L4 7.4048M9 21L9 5.9167M16 3.8333L16 11M16 11L9 11M9 15L4 15M13.5 21L13.5 17C13.5 16.4477 13.9477 16 14.5 16L16.5 16C17.0523 16 17.5 16.4477 17.5 17L17.5 21M13.5 21L17.5 21" fill="none"/>
    </svg>
  )
}
