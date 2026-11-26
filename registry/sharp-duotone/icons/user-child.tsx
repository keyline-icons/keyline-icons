import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserChild({ size = 24, ...props }: IconProps) {
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
      <path d="M15.879 13.121C15.337 12.579 15 11.828 15 11C15 9.343 16.343 8 18 8C19.657 8 21 9.343 21 11C21 12.657 19.657 14 18 14C17.172 14 16.421 13.663 15.879 13.121ZM18 22H14C13.448 22 13 21.552 13 21V20C13 17.791 14.791 16 17 16H19C21.209 16 23 17.791 23 20V21C23 21.552 22.552 22 22 22H18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 21H2V19C2 15.686 4.686 13 8 13H10C10.895 13 11.778 13.2 12.585 13.586L13.155 13.857"/>
      <path d="M6.172 8.828C5.449 8.106 5 7.104 5 6C5 3.791 6.791 2 9 2C11.209 2 13 3.791 13 6C13 8.209 11.209 10 9 10C7.896 10 6.894 9.551 6.172 8.828Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
