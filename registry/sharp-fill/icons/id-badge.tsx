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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19 1C19.5523 1 20 1.44772 20 2V22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22V2C4 1.44772 4.44772 1 5 1H19ZM11 18C9.13619 18 7.57003 19.2748 7.12598 21H16.874C16.43 19.2748 14.8638 18 13 18H11ZM12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10ZM9 5V7H15V5H9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
