import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalSpaceAround({ size = 24, ...props }: IconProps) {
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
      <path d="M13 6C14.6569 6 16 7.344 16 9V15C16 16.655 14.6671 18 13 18H11C9.3555 18 8 16.667 8 15V9C8 7.351 9.3412 6 11 6H13Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M4 1C4.5523 1 5 1.448 5 2V22C5 22.552 4.5523 23 4 23C3.4477 23 3 22.552 3 22V2C3 1.448 3.4477 1 4 1ZM20 1C20.5523 1 21 1.448 21 2V22C21 22.552 20.5523 23 20 23C19.4477 23 19 22.552 19 22V2C19 1.448 19.4477 1 20 1Z" fill="currentColor"/>
    </svg>
  )
}
