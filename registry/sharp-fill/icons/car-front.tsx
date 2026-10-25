import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFront({ size = 24, ...props }: IconProps) {
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
      <path d="M19.6924 9L21 9C21.5523 9 22 9.4477 22 10L22 20C22 20.5523 21.5523 21 21 21L17.5 21C17.0411 21 16.6411 20.6877 16.5299 20.2425L16.2192 19L7.7808 19L7.4701 20.2425C7.3589 20.6877 6.9589 21 6.5 21L3 21C2.4477 21 2 20.5523 2 20L2 10C2 9.4477 2.4477 9 3 9L4.3076 9L4.3941 8.7122C4.405 8.6759 4.418 8.6401 4.433 8.6052L6.5812 3.6052C6.739 3.238 7.1003 3 7.5 3L16.5 3C16.8997 3 17.261 3.238 17.4188 3.6053L19.567 8.6053C19.582 8.6401 19.595 8.6758 19.6059 8.7122L19.6924 9ZM6.4402 9L17.5598 9L15.8413 5L8.1587 5L6.4402 9ZM9 12.5L7 12.5L7 15.5L9 15.5L9 12.5ZM17 12.5L15 12.5L15 15.5L17 15.5L17 12.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5.35177 9L2.5 9M18.6482 9L21.5 9" fill="none"/>
    </svg>
  )
}
