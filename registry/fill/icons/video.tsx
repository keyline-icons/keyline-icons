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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 11L13 11C14.6391 11 16.1123 12 16.7174 13.5233L20.1056 11.8292C20.3833 11.6903 20.6895 11.618 21 11.618C22.1046 11.618 23 12.5135 23 13.618L23 19.382C23 20.4865 22.1046 21.382 21 21.382C20.6895 21.382 20.3833 21.3097 20.1056 21.1708L16.7174 19.4767C16.1123 21 14.6391 22 13 22L5 22C2.7909 22 1 20.2091 1 18L1 15C1 12.7909 2.7909 11 5 11ZM9 5.5C9 7.433 7.433 9 5.5 9C3.567 9 2 7.433 2 5.5C2 3.567 3.567 2 5.5 2C7.433 2 9 3.567 9 5.5ZM18 5.5C18 7.433 16.433 9 14.5 9C12.567 9 11 7.433 11 5.5C11 3.567 12.567 2 14.5 2C16.433 2 18 3.567 18 5.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
