import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserUnlock({ size = 24, ...props }: IconProps) {
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
      <path d="M10 13C10.3396 13 10.6733 13.0255 11 13.0723L11 22L2 22C1.4477 22 1 21.5523 1 21L1 20C1 16.134 4.134 13 8 13ZM9 3C11.2092 3 13 4.7908 13 7C13 9.2092 11.2092 11 9 11C6.7909 11 5 9.2092 5 7C5 4.7908 6.7909 3 9 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 16L22 16L22 21L15 21ZM20.5 16L20.5 12C20.5 10.8954 19.6046 10 18.5 10C17.3954 10 16.5 10.8954 16.5 12L16.5 13"/>
    </svg>
  )
}
