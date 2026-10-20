import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TriangleRight({ size = 24, ...props }: IconProps) {
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
      <path d="M21 4.503L21 18C21 19.6569 19.6569 21 18 21L4.503 21C3.1667 21 2.4974 19.3843 3.4423 18.4393L18.4393 3.4423C19.3843 2.4974 21 3.1667 21 4.503Z" fill="none"/>
    </svg>
  )
}
