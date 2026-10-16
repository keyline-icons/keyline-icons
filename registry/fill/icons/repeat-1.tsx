import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Repeat1({ size = 24, ...props }: IconProps) {
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
      <path d="M11 4L12.5 3V9M3 18H17C19.2091 18 21 16.2091 21 14V9C21 6.79086 19.2091 5 17 5H16.5M6 15L3 18L6 21M3 11V9C3 6.79086 4.79086 5 7 5"/>
    </svg>
  )
}
