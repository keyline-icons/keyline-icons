import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Book({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C20.5523 1 21 1.4477 21 2L21 18C21 18.4327 20.8596 18.8538 20.6 19.2C20.5351 19.2865 20.5 19.3918 20.5 19.5C20.5 19.6082 20.5351 19.7135 20.6 19.8C20.8596 20.1462 21 20.5673 21 21L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 18L4 18L20 18L21 18M8 6L8 14"/>
    </svg>
  )
}
