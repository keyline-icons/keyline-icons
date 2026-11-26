import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareBraces({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2H21C21.552 2 22 2.448 22 3V21C22 21.552 21.552 22 21 22H3C2.448 22 2 21.552 2 21V3C2 2.448 2.448 2 3 2ZM11 8V6H9C8.448 6 8 6.448 8 7V10.586L7.293 11.293C6.902 11.683 6.902 12.317 7.293 12.707L8 13.414V17C8 17.552 8.448 18 9 18H11V16H10V13C10 12.735 9.895 12.48 9.707 12.293L9.414 12L9.707 11.707C9.895 11.52 10 11.265 10 11V8H11ZM13 6V8H14V11C14 11.265 14.105 11.52 14.293 11.707L14.586 12L14.293 12.293C14.105 12.48 14 12.735 14 13V16H13V18H15C15.552 18 16 17.552 16 17V13.414L16.707 12.707C17.098 12.317 17.098 11.683 16.707 11.293L16 10.586V7C16 6.448 15.552 6 15 6H13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
