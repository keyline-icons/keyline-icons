import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShoppingBasketPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M12 21L6.4817 21C5.6015 21 4.8248 20.4246 4.5684 19.5826L2.0437 11.2913C1.848 10.6488 2.3287 10 3.0003 10L20.9997 10C21.5692 10 22.0014 10.4664 22.0004 11M9 10L9.8773 3.8586C9.9477 3.3659 10.3696 3 10.8673 3L14.847 3C15.4555 3 15.923 3.539 15.8369 4.1414L15 10M19 15V21M16 18H22"/>
    </svg>
  )
}
