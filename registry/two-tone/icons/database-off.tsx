import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DatabaseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.785 20.785C20.675 20.977 20.535 21.136 20.397 21.263C20.099 21.536 19.719 21.748 19.326 21.918C18.493 22.278 17.409 22.539 16.143 22.722C14.877 22.904 13.44 23 12 23C10.56 23 9.123 22.904 7.857 22.722C6.592 22.539 5.507 22.278 4.674 21.918C4.281 21.748 3.901 21.536 3.603 21.263C3.307 20.99 3 20.567 3 20V4C3 3.697 3.088 3.435 3.215 3.215L20.785 20.785ZM19.293 15.05L7.227 2.984C7.046 2.803 6.934 2.553 6.934 2.277C6.934 1.786 7.288 1.377 7.755 1.293C7.789 1.288 7.823 1.283 7.857 1.278C9.123 1.096 10.56 1 12 1C13.44 1 14.877 1.096 16.143 1.278C17.409 1.461 18.493 1.722 19.326 2.082C19.719 2.252 20.099 2.464 20.397 2.737C20.693 3.01 21 3.433 21 4V14.343C21 14.895 20.552 15.343 20 15.343C19.724 15.343 19.474 15.231 19.293 15.05Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 4V20C4 21.105 7.582 22 12 22C16.418 22 20 21.105 20 20M4 12C4 13.105 7.582 14 12 14C12.669 14 13.319 13.979 13.941 13.941M2 2L22 22"/>
    </svg>
  )
}
