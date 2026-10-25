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
      <path d="M4 3L20 3C21.6569 3 23 4.3431 23 6L23 9C23 10.6569 21.6569 12 20 12L4 12C2.3431 12 1 10.6569 1 9L1 6C1 4.3431 2.3431 3 4 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 4L20 4C21.1046 4 22 4.8954 22 6L22 9C22 10.1046 21.1046 11 20 11L4 11C2.8954 11 2 10.1046 2 9L2 6C2 4.8954 2.8954 4 4 4ZM5.5 11L12.5 4M11.5 11L18.5 4M6 11L6 20M18 11L18 20M4 20L8 20M16 20L20 20" fill="none"/>
    </svg>
  )
}
