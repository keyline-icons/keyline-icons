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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.707 17.707C17.526 17.888 17.276 18 17 18H7C6.448 18 6 17.552 6 17V13C6 12.448 6.448 12 7 12H12L17.707 17.707ZM10 10H4V20H20L21.707 21.707C21.526 21.888 21.276 22 21 22H3C2.448 22 2 21.552 2 21V3C2 2.724 2.112 2.474 2.293 2.293L10 10ZM15.657 12H17C17.552 12 18 12.448 18 13V14.343L15.657 12ZM20 16.343V10H13.657L5.657 2H12H21C21.552 2 22 2.448 22 3V18.343L20 16.343Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
