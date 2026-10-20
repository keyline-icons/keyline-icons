import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cylinder({ size = 24, ...props }: IconProps) {
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
      <path d="M20 5C20 6.6569 16.4183 8 12 8C7.5817 8 4 6.6569 4 5C4 3.3431 7.5817 2 12 2C16.4183 2 20 3.3431 20 5ZM4 5L4 19M20 5L20 19M20 19C20 20.6569 16.4183 22 12 22C7.5817 22 4 20.6569 4 19" fill="none"/>
    </svg>
  )
}
