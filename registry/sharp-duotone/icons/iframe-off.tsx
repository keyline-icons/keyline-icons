import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IframeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17.7071 17.7071C17.5261 17.8881 17.2761 18 17 18L7 18C6.4477 18 6 17.5523 6 17L6 13C6 12.4477 6.4477 12 7 12L12 12ZM10 10L4 10L4 20L20 20L21.7071 21.7071C21.5262 21.8881 21.2762 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.7239 2.1119 2.4739 2.2929 2.2929ZM15.6569 12L17 12C17.5523 12 18 12.4477 18 13L18 14.3431ZM20 16.3431L20 10L13.6569 10L5.6569 2L12 2L21 2C21.5523 2 22 2.4477 22 3L22 18.3431Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
