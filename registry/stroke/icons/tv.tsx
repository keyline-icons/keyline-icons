import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tv({ size = 24, ...props }: IconProps) {
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
      <path d="M2 11C2 9.3431 3.3431 8 5 8L19 8C20.6569 8 22 9.3431 22 11L22 18C22 19.6569 20.6569 21 19 21L5 21C3.3431 21 2 19.6569 2 18L2 11ZM8 3L12 8L16 3" fill="none"/>
    </svg>
  )
}
