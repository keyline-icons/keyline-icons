import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedSingle({ size = 24, ...props }: IconProps) {
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
      <path d="M3 18L3 13C3 11.3431 4.3431 10 6 10L6 6C6 4.3431 7.3431 3 9 3L15 3C16.6569 3 18 4.3431 18 6L18 10C19.6569 10 21 11.3431 21 13L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 11L18 11C19.1046 11 20 11.8954 20 13L20 18C20 19.1046 19.1046 20 18 20L6 20C4.8954 20 4 19.1046 4 18L4 13C4 11.8954 4.8954 11 6 11ZM7 11L7 6C7 4.8954 7.8954 4 9 4L15 4C16.1046 4 17 4.8954 17 6L17 11M4 15L20 15" fill="none"/>
    </svg>
  )
}
