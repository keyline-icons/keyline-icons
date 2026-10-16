import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cable({ size = 24, ...props }: IconProps) {
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
      <path d="M14 4L6 4C3.7909 4 2 5.7909 2 8C2 10.2091 3.7909 12 6 12L18 12C20.2091 12 22 13.7909 22 16C22 18.2091 20.2091 20 18 20L10 20M14 2L20 2L20 6L14 6L14 2ZM4 18L10 18L10 22L4 22L4 18ZM20 4L23 4M4 20L1 20"/>
    </svg>
  )
}
