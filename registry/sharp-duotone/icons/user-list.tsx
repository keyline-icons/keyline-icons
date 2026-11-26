import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserList({ size = 24, ...props }: IconProps) {
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
      <path d="M10 12C10.3396 12 10.6733 12.0255 11 12.0723V22H2C1.44772 22 1 21.5523 1 21V19C1 15.134 4.13402 12 8 12H10ZM9 2C11.2092 2 13 3.79082 13 6C13 8.20918 11.2092 10 9 10C6.79094 10 5 8.20921 5 6C5 3.79079 6.79094 2 9 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 13L15 13L21 13L22 13M14 17L15 17L22 17L23 17M14 21L15 21L19 21L20 21"/>
    </svg>
  )
}
