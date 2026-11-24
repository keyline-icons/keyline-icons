import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Atm({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4H4C2.8954 4 2 4.8954 2 6V8C2 9.10457 2.89543 10 4 10H6M6 4H18M6 4V10M18 4H20C21.1046 4 22 4.8954 22 6V8C22 9.10457 21.1046 10 20 10H18M18 4V10M6 10V18C6 19.1046 6.8954 20 8 20H16C17.1046 20 18 19.1046 18 18V10M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"/>
    </svg>
  )
}
