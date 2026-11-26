import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareListCheck({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 11C22 11.5523 21.5523 12 21 12L15 12C13.3431 12 12 13.3431 12 15L12 21C12 21.5523 11.5523 22 11 22L6 22C3.7909 22 2 20.2091 2 18L2 6C2 3.7909 3.7909 2 6 2ZM9 8C9 7.4477 8.5523 7 8 7C7.4477 7 7 7.4477 7 8C7 8.5523 7.4477 9 8 9C8.5523 9 9 8.5523 9 8ZM9 12C9 11.4477 8.5523 11 8 11C7.4477 11 7 11.4477 7 12C7 12.5523 7.4477 13 8 13C8.5523 13 9 12.5523 9 12ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16ZM12 7C11.4477 7 11 7.4477 11 8C11 8.5523 11.4477 9 12 9L16 9C16.5523 9 17 8.5523 17 8C17 7.4477 16.5523 7 16 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 18L17 20L21 16"/>
    </svg>
  )
}
