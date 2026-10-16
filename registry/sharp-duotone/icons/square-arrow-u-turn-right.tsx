import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowUTurnRight({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2C2.4477 2 2 2.4477 2 3L2 21C2 21.5523 2.4477 22 3 22L21 22C21.5523 22 22 21.5523 22 21L22 3C22 2.4477 21.5523 2 21 2L3 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.9167 10.5L11.0797 10.5C9.3788 10.5 8 11.8431 8 13.5C8 15.1569 9.3788 16.5 11.0797 16.5L13.1063 16.5M12.8375 7.1909L16 10.5L12.8375 13.8091"/>
    </svg>
  )
}
