import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M8 12L10 12C13.866 12 17 15.134 17 19V20C17 21.1046 16.1046 22 15 22L3 22C1.8954 22 1 21.1046 1 20V19C1 15.134 4.134 12 8 12ZM13 6C13 8.2091 11.2091 10 9 10C6.7909 10 5 8.2091 5 6C5 3.7909 6.7909 2 9 2C11.2091 2 13 3.7909 13 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 6H16M19 3L16 6L19 9"/>
    </svg>
  )
}
