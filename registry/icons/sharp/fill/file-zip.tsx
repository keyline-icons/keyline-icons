import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileZip({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L20.7071 7.2929C20.8946 7.4804 21 7.7348 21 8L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1L14 1ZM14 8L18.5858 8L14 3.4142L14 8ZM9 3L9 7L11 7L11 3L9 3ZM9 13.1716C7.8014 13.5954 7 14.7287 7 16C7 17.6569 8.3431 19 10 19C11.6569 19 13 17.6569 13 16C13 14.7287 12.1986 13.5954 11 13.1716L11 9L9 9L9 13.1716ZM11 16C11 15.4477 10.5523 15 10 15C9.4477 15 9 15.4477 9 16C9 16.5523 9.4477 17 10 17C10.5523 17 11 16.5523 11 16Z" fill="currentColor"/>
    </svg>
  )
}
