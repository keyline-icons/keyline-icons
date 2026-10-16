import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Minimize({ size = 24, ...props }: IconProps) {
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
      <path d="M9 3V6C9 7.65685 7.65685 9 6 9H3M15 3V6C15 7.65685 16.34315 9 18 9H21M21 15H18C16.34315 15 15 16.34315 15 18V21M3 15H6C7.65685 15 9 16.34315 9 18V21"/>
    </svg>
  )
}
