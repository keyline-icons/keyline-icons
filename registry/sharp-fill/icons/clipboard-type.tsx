import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardType({ size = 24, ...props }: IconProps) {
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
      <path d="M18 3L20 3C20.5523 3 21 3.4477 21 4L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 4C3 3.4477 3.4477 3 4 3L6 3L6 2C6 1.4477 6.4477 1 7 1L17 1C17.5523 1 18 1.4477 18 2L18 3ZM8 3L8 6L16 6L16 3L8 3ZM11 17L9 17L9 19L15 19L15 17L13 17L13 13L15 13L15 15L17 15L17 12C17 11.4477 16.5523 11 16 11L8 11C7.4477 11 7 11.4477 7 12L7 15L9 15L9 13L11 13L11 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
