import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M10 1C10.5523 1 11 1.448 11 2V22C11 22.552 10.5523 23 10 23C9.4477 23 9 22.552 9 22V16.825C8.6869 16.936 8.3511 17 8 17H6C4.3432 17 3 15.657 3 14V10C3 8.343 4.3431 7 6 7H8C8.351 7 8.6869 7.063 9 7.174V2C9 1.448 9.4477 1 10 1ZM20 1C20.5523 1 21 1.448 21 2V22C21 22.552 20.5523 23 20 23C19.4477 23 19 22.552 19 22V20.825C18.6869 20.936 18.3511 21 18 21H16C14.3431 21 13 19.657 13 18V6C13 4.343 14.3431 3 16 3H18C18.351 3 18.6869 3.063 19 3.174V2C19 1.448 19.4477 1 20 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 2V22M10 2V22M6 8H8C9.1046 8 10 8.895 10 10V14C10 15.105 9.1046 16 8 16H6C4.8954 16 4 15.105 4 14V10C4 8.895 4.8954 8 6 8ZM20 6V18C20 19.105 19.1046 20 18 20H16C14.8954 20 14 19.105 14 18V6C14 4.895 14.8954 4 16 4H18C19.1046 4 20 4.895 20 6Z"/>
    </svg>
  )
}
