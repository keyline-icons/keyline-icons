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
      <path d="M20.8715 20.8715C20.5957 20.9551 20.3031 21 20 21L4 21C2.3431 21 1 19.6569 1 18L1 14C1 12.3431 2.3431 11 4 11L11 11ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16ZM21.2929 17.0502L16.9498 12.7071C16.7688 12.5262 16.6569 12.2762 16.6569 12C16.6569 11.4477 17.1046 11 17.6569 11L20 11C21.6569 11 23 12.3431 23 14L23 16.3431C23 16.8954 22.5523 17.3431 22 17.3431C21.7239 17.3431 21.4739 17.2312 21.2929 17.0502Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 12L5.3333 5.3333M17.1314 11.4745L19 4M2 2L22 22"/>
    </svg>
  )
}
