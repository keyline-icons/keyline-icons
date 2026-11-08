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
      <path d="M18 4C20.2091 4 22 5.79 22 8V16C22 17.1 21.1046 18 20 18H18M18 4V8M18 4H13M18 18V16M18 18V20M18 8H13M18 8V12M13 4V8M13 4H7M7 18C5.8954 18 5 18.9 5 20C5 21.1 5.8954 22 7 22C8.1046 22 9 21.1 9 20C9 18.9 8.1046 18 7 18ZM7 18H4C2.8954 18 2 17.1 2 16V6C2 4.9 2.8954 4 4 4H7M7 18H13M7 4V2M13 18V16M13 18V20M13 8V12M13 12H18M13 12V16M18 12V16M13 16H18M13 20H18M13 20V22M18 20V22M2 8H4.5C5.3284 8 6 8.67 6 9.5V10.5C6 11.33 5.3284 12 4.5 12H2"/>
    </svg>
  )
}
