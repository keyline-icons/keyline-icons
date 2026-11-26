import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M7 4L4 4L4 22L20 22L20 4L17 4M7 2L17 2L17 7L7 7ZM12 18C10.175 16.4846 8 15.1806 8 13.2361C8 12.0011 9.0745 11 10.4 11C11 11 11.537 11.2123 12 11.5833C12.463 11.2123 13 11 13.6 11C14.9255 11 16 12.0011 16 13.2361C16 15.1806 13.825 16.4846 12 18Z" fill="none"/>
    </svg>
  )
}
