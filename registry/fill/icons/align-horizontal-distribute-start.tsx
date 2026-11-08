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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 1C4.5523 1 5 1.448 5 2V2.903C5 2.965 5.0291 3.024 5.0781 3.062C5.1271 3.099 5.1911 3.112 5.251 3.097C5.4906 3.034 5.7414 3 6 3H8C9.6569 3 11 4.343 11 6V18C11 19.657 9.6568 21 8 21H6C5.7416 21 5.4911 20.964 5.251 20.901C5.191 20.886 5.1272 20.899 5.0781 20.937C5.029 20.974 5 21.033 5 21.095V22C5 22.552 4.5523 23 4 23C3.4477 23 3 22.552 3 22V2C3 1.448 3.4477 1 4 1ZM14 1C14.5523 1 15 1.448 15 2V6.903C15 6.965 15.0291 7.024 15.0781 7.062C15.1271 7.099 15.1911 7.112 15.251 7.097C15.4906 7.034 15.7414 7 16 7H18C19.6569 7 21 8.343 21 10V14C21 15.657 19.6569 17 18 17H16C15.7416 17 15.4911 16.964 15.251 16.901C15.191 16.886 15.1272 16.899 15.0781 16.937C15.029 16.974 15 17.033 15 17.095V22C15 22.552 14.5523 23 14 23C13.4477 23 13 22.552 13 22V2C13 1.448 13.4477 1 14 1Z" fill="currentColor"/>
    </svg>
  )
}
