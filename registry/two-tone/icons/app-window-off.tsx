import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.8284 20.8284C20.1046 21.5523 19.1046 22 18 22H6C3.7909 22 2 20.2091 2 18V6C2 4.8955 2.4477 3.8955 3.1716 3.1716L20.8284 20.8284ZM20.2929 16.0502L7.9498 3.7071C7.7688 3.5261 7.6569 3.2761 7.6569 3C7.6569 2.4477 8.1046 2 8.6569 2H18C20.2091 2 22 3.7909 22 6V15.3431C22 15.8954 21.5523 16.3431 21 16.3431C20.7239 16.3431 20.4739 16.2312 20.2929 16.0502Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20.1213 20.1213C19.5785 20.6642 18.8285 21 18 21H6C4.3431 21 3 19.6569 3 18V6C3 5.1715 3.3358 4.4215 3.8787 3.8787M2 2L22 22"/>
    </svg>
  )
}
