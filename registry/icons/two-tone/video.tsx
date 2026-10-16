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
      <path d="M5 11L13 11C14.6391 11 16.1123 12 16.7174 13.5233L20.1056 11.8292C20.3833 11.6903 20.6895 11.618 21 11.618C22.1046 11.618 23 12.5135 23 13.618L23 19.382C23 20.4865 22.1046 21.382 21 21.382C20.6895 21.382 20.3833 21.3097 20.1056 21.1708L16.7174 19.4767C16.1123 21 14.6391 22 13 22L5 22C2.7909 22 1 20.2091 1 18L1 15C1 12.7909 2.7909 11 5 11ZM9 5.5C9 7.433 7.433 9 5.5 9C3.567 9 2 7.433 2 5.5C2 3.567 3.567 2 5.5 2C7.433 2 9 3.567 9 5.5ZM18 5.5C18 7.433 16.433 9 14.5 9C12.567 9 11 7.433 11 5.5C11 3.567 12.567 2 14.5 2C16.433 2 18 3.567 18 5.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 12L13 12C14.6569 12 16 13.3431 16 15L16 18C16 19.6569 14.6569 21 13 21L5 21C3.3431 21 2 19.6569 2 18L2 15C2 13.3431 3.3431 12 5 12ZM16 15L20.5528 12.7236C21.2177 12.3912 22 12.8747 22 13.618L22 19.382C22 20.1253 21.2177 20.6088 20.5528 20.2764L16 18M8 5.5C8 6.8807 6.8807 8 5.5 8C4.1193 8 3 6.8807 3 5.5C3 4.1193 4.1193 3 5.5 3C6.8807 3 8 4.1193 8 5.5ZM17 5.5C17 6.8807 15.8807 8 14.5 8C13.1193 8 12 6.8807 12 5.5C12 4.1193 13.1193 3 14.5 3C15.8807 3 17 4.1193 17 5.5Z"/>
    </svg>
  )
}
