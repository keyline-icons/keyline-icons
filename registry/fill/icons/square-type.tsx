import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareType({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L18 2C20.2092 2 22 3.7908 22 6L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7908 22 2 20.2092 2 18L2 6C2 3.7908 3.7908 2 6 2ZM11 16L9.5 16C8.9477 16 8.5 16.4477 8.5 17C8.5 17.5523 8.9477 18 9.5 18L12 18L14.5 18C15.0523 18 15.5 17.5523 15.5 17C15.5 16.4477 15.0523 16 14.5 16L13 16L13 8L16 8L16 9C16 9.5523 16.4477 10 17 10C17.5523 10 18 9.5523 18 9L18 8C18 7.448 17.7751 6.9466 17.4142 6.5858C17.0534 6.2249 16.552 6 16 6L12 6L8 6C7.448 6 6.9466 6.2249 6.5858 6.5858C6.2249 6.9466 6 7.448 6 8L6 9C6 9.5523 6.4477 10 7 10C7.5523 10 8 9.5523 8 9L8 8L11 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
