import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookmarkOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21L21 22C21 22.5523 20.5523 23 20 23C19.8593 23 19.7202 22.9703 19.5918 22.9129L12 19.5177L4.4082 22.9129C4.2798 22.9703 4.1407 23 4 23C3.4477 23 3 22.5523 3 22L3 3L21 21ZM4.6569 1L20 1C20.5523 1 21 1.4477 21 2L21 17.3431L4.6569 1Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
