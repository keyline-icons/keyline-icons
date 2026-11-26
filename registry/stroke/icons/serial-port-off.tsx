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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.9639 17.964C17.8118 17.988 17.6564 18 17.4987 18H6.5013C5.1247 18 3.9248 17.063 3.5909 15.728L2.0909 9.728C1.6175 7.834 3.0496 6 5.0013 6H6M11.6569 6H18.9987C20.9504 6 22.3825 7.834 21.9091 9.728L20.6042 14.947M2 2L22 22"/>
      <path d="M17 10C17 10.552 16.5523 11 16 11C15.4477 11 15 10.552 15 10C15 9.448 15.4477 9 16 9C16.5523 9 17 9.448 17 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
