import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Binary({ size = 24, ...props }: IconProps) {
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
      <path d="M17 10L17 3L15 3L14 3M14 10L15 10L19 10L20 10M7 21L7 14L5 14L4 14M4 21L5 21L9 21L10 21M4 6C4 4.3431 5.3431 3 7 3C8.6569 3 10 4.3431 10 6L10 7C10 8.6569 8.6569 10 7 10C5.3431 10 4 8.6569 4 7ZM14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17L20 18C20 19.6569 18.6569 21 17 21C15.3431 21 14 19.6569 14 18Z" fill="none"/>
    </svg>
  )
}
