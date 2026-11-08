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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 1C7.5523 1 8 1.448 8 2V4C9.6561 4 11 5.345 11 7V17C11 18.658 9.6606 20 8 20V22C8 22.552 7.5523 23 7 23C6.4477 23 6 22.552 6 22V20C4.3487 20 3 18.662 3 17V7C3 5.348 4.3405 4 6 4V2C6 1.448 6.4477 1 7 1ZM17 1C17.5523 1 18 1.448 18 2V6C19.6588 6 21 7.345 21 9V15C21 16.658 19.6578 18 18 18V22C18 22.552 17.5523 23 17 23C16.4477 23 16 22.552 16 22V18C14.3449 18 13 16.659 13 15V9C13 7.344 14.3444 6 16 6V2C16 1.448 16.4477 1 17 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 17H16C14.8964 17 14 16.106 14 15V9C14 7.897 14.8967 7 16 7H17M17 17H18C19.1055 17 20 16.105 20 15V9C20 7.896 19.1058 7 18 7H17M17 17V22M17 7V2M7 5H8C9.1035 5 10 5.897 10 7V17C10 18.107 9.1079 19 8 19H7M7 5H6C4.8943 5 4 5.899 4 7V17C4 18.108 4.8988 19 6 19H7M7 5V2M7 19V22"/>
    </svg>
  )
}
