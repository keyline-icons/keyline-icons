import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Laptop({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15V6C3 4.3431 4.3431 3 6 3H18C19.6569 3 21 4.3431 21 6V15H21.5C22.3284 15 23 15.6716 23 16.5V18C23 19.6569 21.6569 21 20 21H4C2.3431 21 1 19.6569 1 18V16.5C1 15.6716 1.6716 15 2.5 15H3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 16V6C4 4.8954 4.8954 4 6 4H18C19.1046 4 20 4.8954 20 6V16M2.5 16H21.5C21.7761 16 22 16.2239 22 16.5V18C22 19.1046 21.1046 20 20 20H4C2.8954 20 2 19.1046 2 18V16.5C2 16.2239 2.2239 16 2.5 16Z"/>
    </svg>
  )
}
