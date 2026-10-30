import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EvCharger({ size = 24, ...props }: IconProps) {
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
      <path d="M5 2L11 2C12.6569 2 14 3.3431 14 5L14 22L2 22L2 5C2 3.3431 3.3431 2 5 2ZM14 22L22 22M14 17L18 17C19.1046 17 20 16.1046 20 15L20 10M18 6L22 6L22 8.5C22 9.3284 21.3284 10 20.5 10L19.5 10C18.6716 10 18 9.3284 18 8.5L18 6ZM22 6L22 4M18 6L18 4M9 8L6 12L10 12L7 16" fill="none"/>
    </svg>
  )
}
