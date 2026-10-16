import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Route({ size = 24, ...props }: IconProps) {
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
      <path d="M9 18H14C16.2091 18 18 16.2091 18 14V3M15 6L18 3L21 6"/>
      <path d="M10 18C10 20.2091 8.2091 22 6 22C3.7909 22 2 20.2091 2 18C2 15.7909 3.7909 14 6 14C8.2091 14 10 15.7909 10 18Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
