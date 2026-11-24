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
      <path d="M7 11L7 9.7321C6.3819 9.3746 6.0013 8.7148 6.0013 8.0008C6.0013 6.8962 6.8967 6.0008 8.0013 6.0008C8.3832 6.0008 8.7572 6.1102 9.079 6.316C9.3967 4.9593 10.6066 4 12 4C13.3934 4 14.6033 4.9593 14.921 6.316C15.2428 6.1102 15.6168 6.0008 15.9987 6.0008C17.1033 6.0008 17.9987 6.8962 17.9987 8.0008C17.9987 8.7148 17.6181 9.3746 17 9.7321L17 11M2 11L22 11L22 20L2 20Z" fill="none"/>
      <path d="M18.5 15.5C18.5 16.3284 17.8284 17 17 17C16.1716 17 15.5 16.3284 15.5 15.5C15.5 14.6716 16.1716 14 17 14C17.8284 14 18.5 14.6716 18.5 15.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
