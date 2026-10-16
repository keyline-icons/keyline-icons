import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio916({ size = 24, ...props }: IconProps) {
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
      <path d="M6 5C6 3.3431 7.3431 2 9 2L15 2C16.6569 2 18 3.3431 18 5L18 19C18 20.6569 16.6569 22 15 22L9 22C7.3431 22 6 20.6569 6 19L6 5Z" fill="none"/>
    </svg>
  )
}
