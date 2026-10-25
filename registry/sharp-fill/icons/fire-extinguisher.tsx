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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.495 6.6662C16.0453 7.5585 17.0006 9.2112 17 11L17 21C17 21.5523 16.5523 22 16 22L8 22C7.4477 22 7 21.5523 7 21L7 11C6.9994 9.2112 7.9547 7.5585 9.505 6.6662C9.1756 6.173 8.9999 5.5932 8.9999 5.0001C8.9999 3.3432 10.3431 2 12 2C13.6569 2 15.0001 3.3432 15.0001 5.0001C15.0001 5.5932 14.8244 6.173 14.495 6.6662ZM9 15L9 17L15 17L15 15L9 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14 5L18 5M18 5L20.2929 2.7071M18 5L20.2929 7.2929M10 5C6.6863 5 4 7.6863 4 11L4 21M8 16L4 16" fill="none"/>
    </svg>
  )
}
