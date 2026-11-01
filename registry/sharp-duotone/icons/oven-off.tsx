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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21 21L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 3L9 9L5 9L5 11L11 11L13 13L8 13L8 15L15 15L21 21ZM4.6569 1L20 1C20.5523 1 21 1.4477 21 2L21 17.3431L14.6569 11L19 11L19 9L12.6569 9L4.6569 1ZM13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6C11 6.5523 11.4477 7 12 7C12.5523 7 13 6.5523 13 6ZM17 6C17 5.4477 16.5523 5 16 5C15.4477 5 15 5.4477 15 6C15 6.5523 15.4477 7 16 7C16.5523 7 17 6.5523 17 6Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
