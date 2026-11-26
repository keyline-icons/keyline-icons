import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IframeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17.4142 17.414C17.0523 17.776 16.5523 18 16 18H8C6.8954 18 6 17.105 6 16V14C6 12.895 6.8954 12 8 12H12L17.4142 17.414ZM20.8285 20.829C20.1046 21.552 19.1046 22 18 22H6C3.7909 22 2 20.209 2 18V9V6C2 4.895 2.4477 3.896 3.1716 3.172L10 10H4V18C4 19.105 4.8954 20 6 20H18C18.5523 20 19.0523 19.776 19.4142 19.414L20.8285 20.829ZM20.2929 16.05L20 15.757V10H14.2426L7.9498 3.707C7.7688 3.526 7.6569 3.276 7.6569 3C7.6569 2.448 8.1046 2 8.6569 2H12H18C20.2092 2 22 3.791 22 6V9V15.343C22 15.895 21.5523 16.343 21 16.343C20.7239 16.343 20.4739 16.231 20.2929 16.05Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
