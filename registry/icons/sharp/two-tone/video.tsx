import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Video({ size = 24, ...props }: IconProps) {
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
      <path d="M2 11L16 11C16.5523 11 17 11.4477 17 12L17 13.382L21.5528 11.1056C21.6916 11.0361 21.8448 11 22 11C22.5523 11 23 11.4477 23 12L23 21C23 21.5523 22.5523 22 22 22C21.8448 22 21.6916 21.9639 21.5528 21.8944L17 19.618L17 21C17 21.5523 16.5523 22 16 22L2 22C1.4477 22 1 21.5523 1 21L1 12C1 11.4477 1.4477 11 2 11ZM9 5.5C9 7.433 7.433 9 5.5 9C3.567 9 2 7.433 2 5.5C2 3.567 3.567 2 5.5 2C7.433 2 9 3.567 9 5.5ZM18 5.5C18 7.433 16.433 9 14.5 9C12.567 9 11 7.433 11 5.5C11 3.567 12.567 2 14.5 2C16.433 2 18 3.567 18 5.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 12L16 12L16 21L2 21L2 12ZM16 15L22 12L22 21L16 18M8 5.5C8 6.8807 6.8807 8 5.5 8C4.1193 8 3 6.8807 3 5.5C3 4.1193 4.1193 3 5.5 3C6.8807 3 8 4.1193 8 5.5ZM17 5.5C17 6.8807 15.8807 8 14.5 8C13.1193 8 12 6.8807 12 5.5C12 4.1193 13.1193 3 14.5 3C15.8807 3 17 4.1193 17 5.5Z"/>
    </svg>
  )
}
