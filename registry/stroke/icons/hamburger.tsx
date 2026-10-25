import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hamburger({ size = 24, ...props }: IconProps) {
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
      <path d="M4 11C4 6.5817 7.5817 3 12 3C16.4183 3 20 6.5817 20 11M4 12L20 12C21.1046 12 22 12.8954 22 14C22 15.1046 21.1046 16 20 16L4 16C2.8954 16 2 15.1046 2 14C2 12.8954 2.8954 12 4 12ZM4 16L4 18C4 19.6569 5.3431 21 7 21L17 21C18.6569 21 20 19.6569 20 18L20 16" fill="none"/>
    </svg>
  )
}
