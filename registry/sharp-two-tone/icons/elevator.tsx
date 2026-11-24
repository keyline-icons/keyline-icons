import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Elevator({ size = 24, ...props }: IconProps) {
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
      <path d="M15 12L15 21C15 21.5523 14.5523 22 14 22L2 22C1.4477 22 1 21.5523 1 21L1 3C1 2.4477 1.4477 2 2 2L14 2C14.5523 2 15 2.4477 15 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 12L8 13M8 13L6 17L5.7236 17.5528M8 13L10 17L10.2764 17.5528M20 3L20 21M22.2929 5.2929L22 5L20 3L18 5L17.7071 5.2929M22.2929 18.7071L22 19L20 21L18 19L17.7071 18.7071M2 3L14 3L14 21L2 21ZM5 12L6 12L8 12L10 12L11 12"/>
      <path d="M9.5 7.5C9.5 8.3284 8.8284 9 8 9C7.1716 9 6.5 8.3284 6.5 7.5C6.5 6.6716 7.1716 6 8 6C8.8284 6 9.5 6.6716 9.5 7.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
