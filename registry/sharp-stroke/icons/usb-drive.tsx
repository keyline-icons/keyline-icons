import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UsbDrive({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4L14 4L14 20L2 20L2 4ZM14 6L22 6L22 18L14 18" fill="none"/>
      <path d="M19 10C19 10.5523 18.5523 11 18 11C17.4477 11 17 10.5523 17 10C17 9.4477 17.4477 9 18 9C18.5523 9 19 9.4477 19 10ZM19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
