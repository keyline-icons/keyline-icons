import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeCenter({ size = 24, ...props }: IconProps) {
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
      <path d="M8 4C9.6561 4 11 5.345 11 7V17C11 18.658 9.6606 20 8 20H6C4.3487 20 3 18.662 3 17V7C3 5.348 4.3405 4 6 4H8ZM18 6C19.6588 6 21 7.345 21 9V15C21 16.658 19.6578 18 18 18H16C14.3449 18 13 16.659 13 15V9C13 7.344 14.3444 6 16 6H18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 18C7.5523 18 8 18.448 8 19V22C8 22.552 7.5523 23 7 23C6.4477 23 6 22.552 6 22V19C6 18.448 6.4477 18 7 18ZM17 16C17.5523 16 18 16.448 18 17V22C18 22.552 17.5523 23 17 23C16.4477 23 16 22.552 16 22V17C16 16.448 16.4477 16 17 16ZM17 1C17.5523 1 18 1.448 18 2V7C18 7.552 17.5523 8 17 8C16.4477 8 16 7.552 16 7V2C16 1.448 16.4477 1 17 1Z" fill="currentColor"/>
      <path d="M7 1C7.5523 1 8 1.448 8 2V5C8 5.552 7.5523 6 7 6C6.4477 6 6 5.552 6 5V2C6 1.448 6.4477 1 7 1Z" fill="currentColor"/>
    </svg>
  )
}
