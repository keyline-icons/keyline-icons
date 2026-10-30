import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Vault({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3L18 3C19.6569 3 21 4.3431 21 6L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 6C3 4.3431 4.3431 3 6 3ZM8.5 7L15.5 7C16.3284 7 17 7.6716 17 8.5L17 15.5C17 16.3284 16.3284 17 15.5 17L8.5 17C7.6716 17 7 16.3284 7 15.5L7 8.5C7 7.6716 7.6716 7 8.5 7ZM3 10L7 10M3 14L7 14M13 11L13 13" fill="none"/>
    </svg>
  )
}
