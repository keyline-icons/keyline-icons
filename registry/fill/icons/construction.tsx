import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Construction({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L20 3C21.6569 3 23 4.3431 23 6L23 9C23 10.6569 21.6569 12 20 12L4 12C2.3431 12 1 10.6569 1 9L1 6C1 4.3431 2.3431 3 4 3ZM5.0858 10L7.9142 10L12.9142 5L10.0858 5L5.0858 10ZM11.0858 10L13.9142 10L18.9142 5L16.0858 5L11.0858 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M6 11L6 20M18 11L18 20M4 20L8 20M16 20L20 20" fill="none"/>
    </svg>
  )
}
