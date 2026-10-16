import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShoppingBasket({ size = 24, ...props }: IconProps) {
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
      <path d="M3.0003 9L20.9997 9C22.1043 9 22.9997 9.8954 22.9997 11C22.9997 11.1974 22.9705 11.3937 22.913 11.5826L20.3882 19.8739C20.0037 21.1369 18.8386 22 17.5183 22L6.4817 22C5.1614 22 3.9963 21.1369 3.6118 19.8739L1.087 11.5826C1.0295 11.3937 1.0003 11.1974 1.0003 11C1.0003 9.8954 1.8957 9 3.0003 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.0003 10L20.9997 10C21.6713 10 22.152 10.6488 21.9563 11.2913L19.4316 19.5826C19.1752 20.4246 18.3985 21 17.5183 21L6.4817 21C5.6015 21 4.8248 20.4246 4.5684 19.5826L2.0437 11.2913C1.848 10.6488 2.3287 10 3.0003 10ZM9 10L9.8773 3.8586C9.9477 3.3659 10.3696 3 10.8673 3L14.847 3C15.4555 3 15.923 3.539 15.8369 4.1414L15 10"/>
    </svg>
  )
}
