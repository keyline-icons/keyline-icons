import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RouterOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20L4 20C2.8954 20 2 19.1046 2 18L2 14C2 12.8954 2.8954 12 4 12L12 12M17.6569 12L20 12C21.1046 12 22 12.8954 22 14L22 16.3431M7 12L5.3333 5.3333M17.1314 11.4745L19 4M2 2L22 22"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
