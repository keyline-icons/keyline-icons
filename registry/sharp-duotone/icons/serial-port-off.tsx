import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SerialPortOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19H4.159C3.675 19 3.26 18.653 3.175 18.177L1.017 6.177C1.007 6.119 1.001 6.059 1.001 6C1.001 5.448 1.449 5 2.001 5H5L19 19ZM8.657 5H12H21.998C22.551 5 22.998 5.448 22.998 6C22.998 6.059 22.993 6.119 22.983 6.177L20.979 17.322L8.657 5ZM17 10C17 9.448 16.552 9 16 9C15.448 9 15 9.448 15 10C15 10.552 15.448 11 16 11C16.552 11 17 10.552 17 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
