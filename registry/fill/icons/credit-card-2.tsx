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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 7C1 4.7909 2.7909 3 5 3H19C21.2091 3 23 4.7909 23 7V17C23 19.2091 21.2091 21 19 21H5C2.7909 21 1 19.2091 1 17V7ZM3 14H21V16H3V14ZM14 8.5H17C17.5523 8.5 18 8.9477 18 9.5C18 10.0523 17.5523 10.5 17 10.5H14C13.4477 10.5 13 10.0523 13 9.5C13 8.9477 13.4477 8.5 14 8.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
