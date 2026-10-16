import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BatteryFull({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5L18 5C18.5523 5 19 5.4477 19 6L19 18C19 18.5523 18.5523 19 18 19L2 19C1.4477 19 1 18.5523 1 18L1 6C1 5.4477 1.4477 5 2 5ZM7 9L7 15L5 15L5 9L7 9ZM11 9L11 15L9 15L9 9L11 9ZM15 9L15 15L13 15L13 9L15 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M22 8.5L22 15.5"/>
    </svg>
  )
}
