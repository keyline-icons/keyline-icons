import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InboxDot({ size = 24, ...props }: IconProps) {
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
      <path d="M21.8284 12C21.9415 12.3197 22 12.6578 22 13L22 17C22 18.6569 20.6569 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 13C2 12.4464 2.1532 11.9036 2.4426 11.4317L6.122 5.4317C6.6675 4.5422 7.636 4 8.6794 4L14 4M2 13L8 13L10 16L14 16L16 13L22 13M22 6C22 7.1046 21.1046 8 20 8C18.8954 8 18 7.1046 18 6C18 4.8954 18.8954 4 20 4C21.1046 4 22 4.8954 22 6Z" fill="none"/>
    </svg>
  )
}
