import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bug({ size = 24, ...props }: IconProps) {
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
      <path d="M15 7.694L15 5.695C15 4.972 14.683 4.316 14.168 3.832C13.622 3.319 12.852 3 12 3C11.148 3 10.378 3.319 9.832 3.832C9.317 4.316 9 4.972 9 5.695L9 7.694M7.7071 1.7071L9.832 3.832M16.2929 1.7071L14.168 3.832M20 3.6L20 5.57C20 7.485 18.796 9.055 17.2 9.4M4 3.6L4 5.57C4 7.485 5.204 9.055 6.8 9.4M22 13.4L17.5 13.4M2 13.4L6.5 13.4M20.5 23L20.5 21.03C20.5 19.215 18.931 17.727 16.85 17.4M3.5 23L3.5 21.03C3.5 19.215 5.07 17.727 7.15 17.4" strokeOpacity="0.4"/>
      <path d="M11 11L13 11L13 16.6L11 16.6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.8715 9.0286C5.6143 9.6717 5.5 10.3228 5.5 10.9L5.5 14.6C5.5 18.2152 8.4058 21.2 12 21.2C15.5942 21.2 18.5 18.2152 18.5 14.6L18.5 10.9C18.5 10.3228 18.3857 9.6717 18.1285 9.0286C18.0881 8.9277 18.0316 8.8341 17.9611 8.7514C16.473 7.0053 14.2937 6 12 6C9.7063 6 7.527 7.0053 6.0389 8.7514C5.9684 8.8341 5.9119 8.9277 5.8715 9.0286ZM11 11L13 11L13 16.6L11 16.6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
