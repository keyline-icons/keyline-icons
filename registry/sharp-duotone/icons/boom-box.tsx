import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BoomBox({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7L22 7C22.5523 7 23 7.4477 23 8L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 8C1 7.4477 1.4477 7 2 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 8L6 4L18 4L18 8M10 14C10 15.1046 9.1046 16 8 16C6.8954 16 6 15.1046 6 14C6 12.8954 6.8954 12 8 12C9.1046 12 10 12.8954 10 14ZM18 14C18 15.1046 17.1046 16 16 16C14.8954 16 14 15.1046 14 14C14 12.8954 14.8954 12 16 12C17.1046 12 18 12.8954 18 14Z" fill="none"/>
    </svg>
  )
}
