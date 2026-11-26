import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareList({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L21 2C21.5523 2 22 2.4477 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM9 8C9 7.4477 8.5523 7 8 7C7.4477 7 7 7.4477 7 8C7 8.5523 7.4477 9 8 9C8.5523 9 9 8.5523 9 8ZM9 12C9 11.4477 8.5523 11 8 11C7.4477 11 7 11.4477 7 12C7 12.5523 7.4477 13 8 13C8.5523 13 9 12.5523 9 12ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16ZM11 7L11 9L17 9L17 7ZM11 11L11 13L17 13L17 11ZM11 15L11 17L17 17L17 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
