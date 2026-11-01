import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OvenOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20C20 21.1046 19.1046 22 18 22L6 22C4.8954 22 4 21.1046 4 20L4 6C4 5.4131 4.1264 4.8557 4.3535 4.3535M4 10L10 10M9 14L14 14M7.6703 2.0134C7.779 2.0045 7.889 2 8 2L16 2C18.2091 2 20 3.7909 20 6L20 14.3431M15.6569 10L20 10M2 2L22 22" fill="none"/>
      <path d="M13 6C13 6.5523 12.5523 7 12 7C11.4477 7 11 6.5523 11 6C11 5.4477 11.4477 5 12 5C12.5523 5 13 5.4477 13 6ZM17 6C17 6.5523 16.5523 7 16 7C15.4477 7 15 6.5523 15 6C15 5.4477 15.4477 5 16 5C16.5523 5 17 5.4477 17 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
