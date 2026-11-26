import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PrinterOff({ size = 24, ...props }: IconProps) {
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
      <path d="M15.88 16L15 16H7V21H17V20V17.12L19.88 20H19V22C19 22.552 18.552 23 18 23H6C5.448 23 5 22.552 5 22V20H2C1.448 20 1 19.552 1 19V10C1 9.452 1.441 9.006 1.988 9H8.88L15.88 16ZM6.657 3V1H7.657H14C14.265 1 14.52 1.105 14.707 1.293L18.707 5.293C18.895 5.48 19 5.735 19 6V9H22C22.552 9 23 9.448 23 10V19C23 19.104 22.984 19.204 22.955 19.298L12.657 9H17V6.414L13.586 3H7.657L6.657 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
