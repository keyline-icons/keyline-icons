import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M11 22H2C1.44772 22 1 21.5523 1 21V19C1 15.134 4.13402 12 8 12H11V22ZM9 2C11.2092 2 13 3.79082 13 6C13 8.20918 11.2092 10 9 10C6.79094 10 5 8.20921 5 6C5 3.79079 6.79094 2 9 2Z" fill="currentColor" stroke="none"/>
      <path d="M18 21C16.175 19.4846 14 18.1806 14 16.2361C14 15.0011 15.0745 14 16.4 14C17 14 17.537 14.2123 18 14.5833C18.463 14.2123 19 14 19.6 14C20.9255 14 22 15.0011 22 16.2361C22 18.1806 19.825 19.4846 18 21Z"/>
    </svg>
  )
}
