import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindow2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L21 3L21 21L3 21L3 3ZM3 11L21 11"/>
      <path d="M8 7C8 7.5523 7.5523 8 7 8C6.4477 8 6 7.5523 6 7C6 6.4477 6.4477 6 7 6C7.5523 6 8 6.4477 8 7ZM12 7C12 7.5523 11.5523 8 11 8C10.4477 8 10 7.5523 10 7C10 6.4477 10.4477 6 11 6C11.5523 6 12 6.4477 12 7ZM16 7C16 7.5523 15.5523 8 15 8C14.4477 8 14 7.5523 14 7C14 6.4477 14.4477 6 15 6C15.5523 6 16 6.4477 16 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
