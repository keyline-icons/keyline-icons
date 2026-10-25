import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Speaker({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L19 1C19.5523 1 20 1.4477 20 2L20 22C20 22.5523 19.5523 23 19 23L5 23C4.4477 23 4 22.5523 4 22L4 2C4 1.4477 4.4477 1 5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 2L19 2L19 22L5 22ZM15 15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15Z" fill="none"/>
      <path d="M13.5 7C13.5 7.8284 12.8284 8.5 12 8.5C11.1716 8.5 10.5 7.8284 10.5 7C10.5 6.1716 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.1716 13.5 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
