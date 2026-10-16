import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 21L13.5 21M3 13.5L3 10.5M7 3L6 3C4.3431 3 3 4.3431 3 6M3 18C3 19.6569 4.3431 21 6 21M21 17L21 18C21 19.6569 19.6569 21 18 21" strokeOpacity="0.4"/>
      <path d="M15.5 4L15.5 14M10 9L15.1314 3.4021C15.3296 3.1859 15.6704 3.1859 15.8686 3.4021L21 9"/>
    </svg>
  )
}
