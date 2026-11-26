import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Spool({ size = 24, ...props }: IconProps) {
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
      <path d="M6 7H4C3.448 7 3 6.552 3 6V2C3 1.448 3.448 1 4 1H12H20C20.552 1 21 1.448 21 2V6C21 6.552 20.552 7 20 7H18V17H20C20.552 17 21 17.448 21 18V22C21 22.552 20.552 23 20 23H4C3.448 23 3 22.552 3 22V18C3 17.448 3.448 17 4 17H6V7Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M21 5V6C21 6.552 20.552 7 20 7H18H6H4C3.448 7 3 6.552 3 6V5H21ZM20.012 17C20.559 17.007 21 17.452 21 18V19H3V18C3 17.452 3.441 17.007 3.988 17H20.012ZM6 12.756L18 9.156V11.244L6 14.844V12.756Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
