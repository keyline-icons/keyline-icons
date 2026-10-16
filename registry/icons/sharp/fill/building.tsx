import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Building({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C20.5523 1 21 1.4477 21 2L21 22C21 22.5523 20.5523 23 20 23L15 23L15 20C15 18.3432 13.6569 17 12 17C10.3431 17 9 18.3432 9 20L9 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1ZM8 5L8 9L10 9L10 5L8 5ZM14 5L14 9L16 9L16 5L14 5ZM8 11L8 15L10 15L10 11L8 11ZM14 11L14 15L16 15L16 11L14 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
