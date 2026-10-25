import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Speaker({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L19 1C19.5523 1 20 1.4477 20 2L20 22C20 22.5523 19.5523 23 19 23L5 23C4.4477 23 4 22.5523 4 22L4 2C4 1.4477 4.4477 1 5 1ZM16 15C16 12.7909 14.2091 11 12 11C9.7909 11 8 12.7909 8 15C8 17.2091 9.7909 19 12 19C14.2091 19 16 17.2091 16 15ZM14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15ZM13.5 7C13.5 6.1716 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.1716 10.5 7C10.5 7.8284 11.1716 8.5 12 8.5C12.8284 8.5 13.5 7.8284 13.5 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
