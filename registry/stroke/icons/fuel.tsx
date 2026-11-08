import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Fuel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 21V5C3 3.9 3.8954 3 5 3H12C13.1046 3 14 3.9 14 5V21M3 21H14M3 21H2M14 21H15M15 11H16C17.1046 11 18 11.9 18 13V16C18 17.1 18.8954 18 20 18C21.1046 18 22 17.1 22 16V8.91C22 8.34 21.7306 7.8 21.2727 7.45L18 5M7 9H10"/>
    </svg>
  )
}
