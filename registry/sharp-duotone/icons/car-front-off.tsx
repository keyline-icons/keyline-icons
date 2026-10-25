import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.5 9.1338C21.8095 9.3124 22.0002 9.6426 22 10L22 18.3431L17 13.3432L16.1569 12.5001L17 12.5001L16.1569 12.5L12.6569 9L17.5598 9L15.8413 5L8.6569 5L6.8757 3.2188C7.0529 3.0771 7.2731 3 7.5 3L16.5 3C16.8997 3 17.261 3.238 17.4188 3.6053L19.3069 8L21.5 8L21.5 9.1338ZM4.693 8L5.6868 5.6868L7.2095 7.2096L21 21.0001L18.1715 21L17.5 21C17.0411 21 16.6411 20.6877 16.5299 20.2425L16.2351 19.0636L16.1715 19L7.7808 19L7.4701 20.2425C7.3589 20.6877 6.9589 21 6.5 21L3 21C2.4477 21 2 20.5523 2 20L2 10C1.9998 9.6426 2.1905 9.3124 2.5 9.1338L2.5 8L4.693 8ZM9 12.5L7 12.5L7 15.5L9 15.5L9 12.5Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
