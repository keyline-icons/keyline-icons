import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OctagonMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M3 14.5645L3 9.4355C3 8.7725 3.2634 8.1366 3.7322 7.6678L7.6678 3.7322C8.1366 3.2634 8.7725 3 9.4355 3L14.5645 3C15.2275 3 15.8634 3.2634 16.3322 3.7322L20.2678 7.6678C20.7366 8.1366 21 8.7725 21 9.4355L21 14.5645C21 15.2275 20.7366 15.8634 20.2678 16.3322L16.3322 20.2678C15.8634 20.7366 15.2275 21 14.5645 21L9.4355 21C8.7725 21 8.1366 20.7366 7.6678 20.2678L3.7322 16.3322C3.2634 15.8634 3 15.2275 3 14.5645Z" fill="none"/>
      <path d="M8 12L16 12" fill="none"/>
    </svg>
  )
}
