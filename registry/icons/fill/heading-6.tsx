import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Heading6({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4V20M11 4V20M2 12H11M17 18C17 16.8954 17.8954 16 19 16C20.1046 16 21 16.8954 21 18C21 19.1046 20.1046 20 19 20C17.8954 20 17 19.1046 17 18ZM17 18C17 15.5811 18.7178 13.4633 21 13"/>
    </svg>
  )
}
