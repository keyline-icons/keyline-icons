import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shredder({ size = 24, ...props }: IconProps) {
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
      <path d="M4 12L4 6C4 3.7909 5.7909 2 8 2L14 2L20 8L20 12M14 2L14 5C14 6.6569 15.3431 8 17 8L20 8M2 12L22 12M6 16L6 22M10 16L10 20M14 16L14 22M18 16L18 20"/>
    </svg>
  )
}
