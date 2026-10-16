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
      <path d="M7 2L16.9999 2C17.3147 2 17.611 2.1482 17.7999 2.4L20.8 6.4C20.9298 6.5731 21 6.7836 21 7L21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 7C3 6.7836 3.0702 6.5731 3.2 6.4L6.2 2.4C6.3889 2.1482 6.6852 2 7 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.0572 7L19.9428 7M15 10L15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11L9 10M7 3L16.9999 3L20 7L20 21L4 21L4 7L7 3Z"/>
    </svg>
  )
}
