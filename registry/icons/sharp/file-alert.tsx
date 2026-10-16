import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2L4 2L4 22L11 22M14 2L20 8L20 13M14 2L14 8L20 8M17 15L17 19" fill="none"/>
      <path d="M18 22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22C16 21.4477 16.4477 21 17 21C17.5523 21 18 21.4477 18 22Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
