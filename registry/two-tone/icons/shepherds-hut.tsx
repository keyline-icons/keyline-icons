import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShepherdsHut({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1C7.5523 1 8 1.45 8 2V3H18C20.7614 3 23 5.24 23 8V16C23 17.66 21.6569 19 20 19H19V22C19 22.55 18.5523 23 18 23C17.4477 23 17 22.55 17 22V21H14V22C14 22.55 13.5523 23 13 23C12.4477 23 12 22.55 12 22V19H9.8262C9.9369 19.31 10 19.65 10 20C10 21.66 8.6569 23 7 23C5.3431 23 4 21.66 4 20C4 19.65 4.0631 19.31 4.1738 19C2.5169 19 1 17.66 1 16V6C1 4.34 2.3431 3 4 3H6V2C6 1.45 6.4477 1 7 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 4C20.2091 4 22 5.79 22 8V16C22 17.1 21.1046 18 20 18H18M18 4V8M18 4H13M18 18V16M18 18V20M18 8H13M18 8V12M13 4V8M13 4H7M7 18C5.8954 18 5 18.9 5 20C5 21.1 5.8954 22 7 22C8.1046 22 9 21.1 9 20C9 18.9 8.1046 18 7 18ZM7 18H4C2.8954 18 2 17.1 2 16V6C2 4.9 2.8954 4 4 4H7M7 18H13M7 4V2M13 18V16M13 18V20M13 8V12M13 12H18M13 12V16M18 12V16M13 16H18M13 20H18M13 20V22M18 20V22M2 8H4.5C5.3284 8 6 8.67 6 9.5V10.5C6 11.33 5.3284 12 4.5 12H2"/>
    </svg>
  )
}
