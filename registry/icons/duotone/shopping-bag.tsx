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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5.3 3.6C6.05542 2.59278 7.24097 2 8.5 2H15.5C16.759 2 17.9446 2.59278 18.7 3.6L20.6 6.13333C20.8596 6.47953 21 6.90059 21 7.33333V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.33333C3 6.90059 3.14036 6.47953 3.4 6.13333L5.3 3.6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.0572 7L19.9428 7M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11"/>
    </svg>
  )
}
