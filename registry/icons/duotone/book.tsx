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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 1L17 1C19.2091 1 21 2.7909 21 5L21 18C21 18.4327 20.8596 18.8538 20.6 19.2C20.5351 19.2865 20.5 19.3918 20.5 19.5C20.5 19.6082 20.5351 19.7135 20.6 19.8C20.8596 20.1462 21 20.5673 21 21C21 22.1046 20.1046 23 19 23L6 23C4.3431 23 3 21.6569 3 20L3 5C3 2.7909 4.7909 1 7 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 20C4 18.8954 4.8954 18 6 18L20 18M8 6L8 14"/>
    </svg>
  )
}
