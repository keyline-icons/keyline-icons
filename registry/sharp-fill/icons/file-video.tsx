import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileVideo({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L20.7071 7.2929C20.8946 7.4804 21 7.7348 21 8L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1L14 1ZM14 8L18.5858 8L14 3.4142L14 8ZM9.4472 18.8944L15.4472 15.8944C15.786 15.725 16 15.3788 16 15C16 14.6212 15.786 14.275 15.4472 14.1056L9.4472 11.1056C9.3084 11.0361 9.1552 11 9 11C8.4477 11 8 11.4477 8 12L8 18C8 18.5523 8.4477 19 9 19C9.1552 19 9.3084 18.9639 9.4472 18.8944Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
