import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 8C3 7.4477 3.4477 7 4 7L7 7L21 21ZM8 12.5858L8 14L10 14L10 12.5858L8 12.5858ZM9 16L9 18L13 18L13 16L9 16ZM1 13.5L3 13.5L3 15.5L1 15.5L1 13.5ZM9.5858 7L20 7C20.5523 7 21 7.4477 21 8L21 18.4142L9.5858 7ZM11 3.5L13 3.5L13 7L11 7L11 3.5ZM13.5 3.5C13.5 3.9268 13.3182 4.3335 13 4.618L13 3.5L11 3.5L11 4.618C10.6818 4.3335 10.5 3.9268 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5ZM21 13.5L23 13.5L23 15.5L21 15.5L21 13.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
