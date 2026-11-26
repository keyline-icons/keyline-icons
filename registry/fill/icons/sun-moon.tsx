import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SunMoon({ size = 24, ...props }: IconProps) {
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
      <path d="M3.343 9.343C1.897 10.79 1 12.791 1 15C1 19.418 4.582 23 9 23C13.418 23 17 19.418 17 15C17 14.448 16.552 14 16 14C15.784 14 15.573 14.07 15.4 14.2C14.708 14.719 13.865 15 13 15C10.791 15 9 13.209 9 11C9 10.135 9.281 9.292 9.8 8.6C9.93 8.427 10 8.216 10 8C10 7.448 9.552 7 9 7C6.791 7 4.79 7.896 3.343 9.343Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M13 4.5V2M17.596 6.404L19.364 4.636M19.5 11H22"/>
    </svg>
  )
}
