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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18 4C20.209 4 22 5.79 22 8V18H18M18 4V8M18 4H13M18 18V16M18 18V20M18 8H13M18 8V12M13 4V8M13 4H7M18 16V12M18 16H13M18 20H13M18 20V23M13 8V12M18 12H13M7 4H2V18H7M7 4V1M7 18C5.895 18 5 18.9 5 20C5 21.1 5.895 22 7 22C8.105 22 9 21.1 9 20C9 18.9 8.105 18 7 18ZM7 18H13M13 18V16M13 18V20M13 16V12M13 20V23M2 8H6V12H2"/>
    </svg>
  )
}
