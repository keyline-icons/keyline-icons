import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PillBottle({ size = 24, ...props }: IconProps) {
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
      <path d="M20 8V22C20 22.55 19.552 23 19 23H5C4.448 23 4 22.55 4 22V8H20ZM11 10.5C10.724 10.5 10.5 10.72 10.5 11V12.5C10.5 12.78 10.276 13 10 13H8.5C8.224 13 8 13.22 8 13.5V15.5C8 15.78 8.224 16 8.5 16H10C10.276 16 10.5 16.22 10.5 16.5V18C10.5 18.28 10.724 18.5 11 18.5H13C13.276 18.5 13.5 18.28 13.5 18V16.5C13.5 16.22 13.724 16 14 16H15.5C15.776 16 16 15.78 16 15.5V13.5C16 13.22 15.776 13 15.5 13H14C13.724 13 13.5 12.78 13.5 12.5V11C13.5 10.72 13.276 10.5 13 10.5H11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M20 1C20.552 1 21 1.45 21 2V6H3V2C3 1.45 3.448 1 4 1H20Z" fill="currentColor"/>
    </svg>
  )
}
