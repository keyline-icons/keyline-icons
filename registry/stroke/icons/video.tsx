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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 12L13 12C14.6569 12 16 13.3431 16 15L16 18C16 19.6569 14.6569 21 13 21L5 21C3.3431 21 2 19.6569 2 18L2 15C2 13.3431 3.3431 12 5 12ZM16 15L20.5528 12.7236C21.2177 12.3912 22 12.8747 22 13.618L22 19.382C22 20.1253 21.2177 20.6088 20.5528 20.2764L16 18M8 5.5C8 6.8807 6.8807 8 5.5 8C4.1193 8 3 6.8807 3 5.5C3 4.1193 4.1193 3 5.5 3C6.8807 3 8 4.1193 8 5.5ZM17 5.5C17 6.8807 15.8807 8 14.5 8C13.1193 8 12 6.8807 12 5.5C12 4.1193 13.1193 3 14.5 3C15.8807 3 17 4.1193 17 5.5Z"/>
    </svg>
  )
}
