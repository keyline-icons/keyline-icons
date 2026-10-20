import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grid2x2Check({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L17 1C19.2091 1 21 2.7909 21 5L21 9C21 10.6569 19.6569 12 18 12L12 12L12 18C12 19.6569 10.6569 21 9 21L5 21C2.7909 21 1 19.2091 1 17L1 5C1 2.7909 2.7909 1 5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 11L18 11C19.1046 11 20 10.1046 20 9L20 5C20 3.3431 18.6569 2 17 2L5 2C3.3431 2 2 3.3431 2 5L2 17C2 18.6569 3.3431 20 5 20L9 20C10.1046 20 11 19.1046 11 18L11 2M16 19.6L18.3333 22L22 16" fill="none"/>
    </svg>
  )
}
