import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IdBadge({ size = 24, ...props }: IconProps) {
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
      <path d="M19 1C19.5523 1 20 1.44772 20 2V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V2C4 1.44772 4.44772 1 5 1H19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 2L19 2L19 22L5 22ZM9 6L10 6L14 6L15 6M14 13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13C10 11.8954 10.8954 11 12 11C13.1046 11 14 11.8954 14 13ZM8 22C8 20.3431 9.3432 19 11 19L13 19C14.6569 19 16 20.3431 16 22"/>
    </svg>
  )
}
