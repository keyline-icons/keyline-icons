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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21.5 9.1338C21.8095 9.3124 22.0002 9.6426 22 10L22 20C22 20.5523 21.5523 21 21 21L17.5 21C17.0411 21 16.6411 20.6877 16.5299 20.2425L16.2192 19L7.7808 19L7.4701 20.2425C7.3589 20.6877 6.9589 21 6.5 21L3 21C2.4477 21 2 20.5523 2 20L2 10C1.9998 9.6426 2.1905 9.3124 2.5 9.1338L2.5 8L4.693 8L6.5812 3.6052C6.739 3.238 7.1003 3 7.5 3L16.5 3C16.8997 3 17.261 3.238 17.4188 3.6053L19.3069 8L21.5 8L21.5 9.1338Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6.4402 9L8.1587 5L15.8413 5L17.5598 9L6.4402 9ZM9 12.5L9 15.5L7 15.5L7 12.5L9 12.5ZM17 12.5L17 15.5L15 15.5L15 12.5L17 12.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
