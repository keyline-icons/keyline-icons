import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCard2({ size = 24, ...props }: IconProps) {
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
      <path d="M1 7C1 4.7909 2.7909 3 5 3H19C21.2091 3 23 4.7909 23 7V17C23 19.2091 21.2091 21 19 21H5C2.7909 21 1 19.2091 1 17V7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 15H22M14 9.5H17M2 7C2 5.3431 3.3431 4 5 4H19C20.6569 4 22 5.3431 22 7V17C22 18.6569 20.6569 20 19 20H5C3.3431 20 2 18.6569 2 17V7Z"/>
    </svg>
  )
}
