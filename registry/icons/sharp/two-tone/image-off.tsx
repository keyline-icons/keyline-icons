import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.7071 21.7071C21.5198 21.8949 21.2653 22.0003 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C1.9997 2.7347 2.1051 2.4802 2.2929 2.2929L21.7071 21.7071ZM5.6569 2L21 2C21.5523 2 22 2.4477 22 3L22 18.3431L5.6569 2Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M21 21L3 21L3 3M3 18L9 12L13 16L14.7143 14.7143M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
