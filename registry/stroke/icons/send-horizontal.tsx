import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M3.4714 2.12L22 12L3.4714 21.88C2.7309 22.2749 1.8627 21.637 2.0182 20.8123L3.575 12.5559C3.6443 12.1885 3.6443 11.8115 3.575 11.4441L2.0182 3.1877C1.8627 2.363 2.7309 1.7251 3.4714 2.12ZM3.6799 12L22 12" fill="none"/>
    </svg>
  )
}
