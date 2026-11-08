import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeStart({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1C4.5523 1 5 1.448 5 2V3.174C5.3131 3.063 5.649 3 6 3H8C9.6569 3 11 4.343 11 6V18C11 19.657 9.6568 21 8 21H6C5.6489 21 5.3131 20.936 5 20.825V22C5 22.552 4.5523 23 4 23C3.4477 23 3 22.552 3 22V2C3 1.448 3.4477 1 4 1ZM14 1C14.5523 1 15 1.448 15 2V7.174C15.3131 7.063 15.649 7 16 7H18C19.6569 7 21 8.343 21 10V14C21 15.657 19.6569 17 18 17H16C15.6489 17 15.3131 16.936 15 16.825V22C15 22.552 14.5523 23 14 23C13.4477 23 13 22.552 13 22V2C13 1.448 13.4477 1 14 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 2V22M14 2V22M18 8H16C14.8954 8 14 8.895 14 10V14C14 15.105 14.8954 16 16 16H18C19.1046 16 20 15.105 20 14V10C20 8.895 19.1046 8 18 8ZM4 6V18C4 19.105 4.8954 20 6 20H8C9.1046 20 10 19.105 10 18V6C10 4.895 9.1046 4 8 4H6C4.8954 4 4 4.895 4 6Z"/>
    </svg>
  )
}
