import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FireExtinguisher({ size = 24, ...props }: IconProps) {
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
      <path d="M14.495 6.6662C16.0453 7.5585 17.0006 9.2112 17 11L17 19C17 20.6569 15.6569 22 14 22L10 22C8.3431 22 7 20.6569 7 19L7 11C6.9994 9.2112 7.9547 7.5585 9.505 6.6662C9.1756 6.173 8.9999 5.5932 8.9999 5.0001C8.9999 3.3432 10.3431 2 12 2C13.6569 2 15.0001 3.3432 15.0001 5.0001C15.0001 5.5932 14.8244 6.173 14.495 6.6662Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 11C8 8.7909 9.7909 7 12 7C14.2091 7 16 8.7909 16 11L16 19C16 20.1046 15.1046 21 14 21L10 21C8.8954 21 8 20.1046 8 19L8 11ZM14 5C14 6.1046 13.1046 7 12 7C10.8954 7 10 6.1046 10 5C10 3.8954 10.8954 3 12 3C13.1046 3 14 3.8954 14 5ZM8 16L16 16M14 5L18 5M18 5L20 3M18 5L20 7M10 5C6.6863 5 4 7.6863 4 11L4 20M8 16L4 16" fill="none"/>
    </svg>
  )
}
