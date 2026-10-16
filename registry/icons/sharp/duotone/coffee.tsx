import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Coffee({ size = 24, ...props }: IconProps) {
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
      <path d="M16 13L17 13C18.6569 13 20 14.3431 20 16C20 17.6569 18.6569 19 17 19L16 19" strokeOpacity="0.4"/>
      <path d="M4 10L16 10C16.5523 10 17 10.4477 17 11L17 22C17 22.5523 16.5523 23 16 23L4 23C3.4477 23 3 22.5523 3 22L3 11C3 10.4477 3.4477 10 4 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8.5 7L8.5 6C8.5 5.2131 8.8705 4.4721 9.5 4C10.1295 3.5279 10.5 2.7869 10.5 2L10.5 1M13.5 7L13.5 6C13.5 5.2131 13.8705 4.4721 14.5 4C15.1295 3.5279 15.5 2.7869 15.5 2L15.5 1"/>
    </svg>
  )
}
