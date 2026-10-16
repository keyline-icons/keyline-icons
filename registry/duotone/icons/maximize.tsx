import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Maximize({ size = 24, ...props }: IconProps) {
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
      <path d="M9 3H6C4.34315 3 3 4.34315 3 6V9M15 3H18C19.65685 3 21 4.34315 21 6V9M21 15V18C21 19.65685 19.65685 21 18 21H15M3 15V18C3 19.65685 4.34315 21 6 21H9"/>
    </svg>
  )
}
