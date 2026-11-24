import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Skirt({ size = 24, ...props }: IconProps) {
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
      <path d="M5 7.8L5 5C5 3.8954 5.8954 3 7 3L17 3C18.1046 3 19 3.8954 19 5L19 7.8L22.7693 16.8462C22.9218 17.2119 23 17.6042 23 18C23 19.6569 21.6569 21 20 21L12 21L4 21C2.3431 21 1 19.6569 1 18C1 17.6042 1.0782 17.2119 1.2308 16.846Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 8V5C18 4.4477 17.5523 4 17 4H7C6.4477 4 6 4.4477 6 5V8M18 8L21.8462 17.2308C21.9478 17.4745 22 17.736 22 18C22 19.1046 21.1046 20 20 20H15.6667M18 8H14M15.6667 20H8.3333M15.6667 20L14 8M8.3333 20H4C2.8954 20 2 19.1046 2 18C2 17.736 2.0522 17.4745 2.1538 17.2308L6 8M8.3333 20L10 8M6 8H10M10 8H14"/>
    </svg>
  )
}
