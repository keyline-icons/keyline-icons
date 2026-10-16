import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneCast({ size = 24, ...props }: IconProps) {
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
      <path d="M6 11.0455L6 2L20 2L20 22L16 22L15 22M10.5 6L15.5 6M3 18L4 18C6.2091 18 8 19.7909 8 22L8 23M3 14L4 14C8.4183 14 12 17.5817 12 22L12 23"/>
      <path d="M5 22C5 22.5523 4.5523 23 4 23C3.4477 23 3 22.5523 3 22C3 21.4477 3.4477 21 4 21C4.5523 21 5 21.4477 5 22Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
