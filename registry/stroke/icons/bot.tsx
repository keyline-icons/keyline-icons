import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bot({ size = 24, ...props }: IconProps) {
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
      <path d="M7 8L17 8C18.6569 8 20 9.3431 20 11L20 18C20 19.6569 18.6569 21 17 21L7 21C5.3431 21 4 19.6569 4 18L4 11C4 9.3431 5.3431 8 7 8ZM12 8L12 3.5M2 14.5L4 14.5M22 14.5L20 14.5M9 12L9 13M15 12L15 13M9 17L15 17" fill="none"/>
      <path d="M13.5 3.5C13.5 4.3284 12.8284 5 12 5C11.1716 5 10.5 4.3284 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
