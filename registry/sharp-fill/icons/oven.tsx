import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Oven({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C20.5523 1 21 1.4477 21 2L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1ZM5 9L5 11L19 11L19 9L5 9ZM8 13L8 15L16 15L16 13L8 13ZM9 6C9 5.4477 8.5523 5 8 5C7.4477 5 7 5.4477 7 6C7 6.5523 7.4477 7 8 7C8.5523 7 9 6.5523 9 6ZM13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6C11 6.5523 11.4477 7 12 7C12.5523 7 13 6.5523 13 6ZM17 6C17 5.4477 16.5523 5 16 5C15.4477 5 15 5.4477 15 6C15 6.5523 15.4477 7 16 7C16.5523 7 17 6.5523 17 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
