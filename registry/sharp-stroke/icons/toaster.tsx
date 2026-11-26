import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Toaster({ size = 24, ...props }: IconProps) {
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
      <path d="M7 12L7 8.7321C6.3819 8.3746 6.0013 7.7148 6.0013 7.0008C6.0013 5.8962 6.8967 5.0008 8.0013 5.0008C8.3832 5.0008 8.7572 5.1102 9.079 5.316C9.3967 3.9593 10.6066 3 12 3C13.3934 3 14.6033 3.9593 14.921 5.316C15.2428 5.1102 15.6168 5.0008 15.9987 5.0008C17.1033 5.0008 17.9987 5.8962 17.9987 7.0008C17.9987 7.7148 17.6181 8.3746 17 8.7321L17 12M2 12L22 12L22 21L2 21Z" fill="none"/>
      <path d="M18.5 16.5C18.5 17.3284 17.8284 18 17 18C16.1716 18 15.5 17.3284 15.5 16.5C15.5 15.6716 16.1716 15 17 15C17.8284 15 18.5 15.6716 18.5 16.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
