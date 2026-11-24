import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clapperboard({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3H18C19.6569 3 21 4.3431 21 6V18C21 19.6569 19.6569 21 18 21H6C4.3431 21 3 19.6569 3 18V6C3 4.3431 4.3431 3 6 3ZM3 8H21M6.5 8L8.5 3M11 8L13 3M15.5 8L17.5 3"/>
    </svg>
  )
}
