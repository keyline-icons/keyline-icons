import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShoppingBag({ size = 24, ...props }: IconProps) {
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
      <path d="M4.0572 7L19.9428 7M15 10L15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11L9 10M7 3L16.9999 3L20 7L20 21L4 21L4 7L7 3Z"/>
    </svg>
  )
}
