import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCard({ size = 24, ...props }: IconProps) {
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
      <path d="M4 9L20 9"/>
    </svg>
  )
}
