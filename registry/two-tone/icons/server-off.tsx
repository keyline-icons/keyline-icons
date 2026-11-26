import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ServerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 11H6C4.343 11 3 9.657 3 8V4C3 3.705 3.043 3.411 3.129 3.128L11 11ZM20.872 20.872C20.487 22.136 19.321 23 18 23H6C4.343 23 3 21.657 3 20V16C3 14.343 4.343 13 6 13H13L20.872 20.872ZM7.657 1H18C19.657 1 21 2.343 21 4V8C21 9.657 19.657 11 18 11H15.657V10.98C15.397 10.98 15.148 10.877 14.964 10.693L14.95 10.707L6.95 2.707L6.964 2.693C6.78 2.509 6.677 2.26 6.677 2C6.677 1.458 7.116 1.02 7.657 1.02V1ZM17.243 13H18C19.657 13 21 14.343 21 16V16.757L17.243 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 18C9 18.552 8.552 19 8 19C7.448 19 7 18.552 7 18C7 17.448 7.448 17 8 17C8.552 17 9 17.448 9 18ZM13 18C13 18.552 12.552 19 12 19C11.448 19 11 18.552 11 18C11 17.448 11.448 17 12 17C12.552 17 13 17.448 13 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 10H6C4.895 10 4 9.105 4 8V4M20 20C20 21.105 19.105 22 18 22H6C4.895 22 4 21.105 4 20V16C4 14.895 4.895 14 6 14H14M2 2L22 22"/>
    </svg>
  )
}
