import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartBarBig({ size = 24, ...props }: IconProps) {
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
      <path d="M8 4L15 4C16.1046 4 17 4.8954 17 6L17 8C17 9.1046 16.1046 10 15 10L8 10C6.8954 10 6 9.1046 6 8L6 6C6 4.8954 6.8954 4 8 4ZM8 12L18 12C19.1046 12 20 12.8954 20 14L20 16C20 17.1046 19.1046 18 18 18L8 18C6.8954 18 6 17.1046 6 16L6 14C6 12.8954 6.8954 12 8 12Z" fill="currentColor" stroke="none"/>
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21" fill="none"/>
    </svg>
  )
}
