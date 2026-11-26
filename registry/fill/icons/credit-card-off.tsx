import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6465 20.6465C20.1443 20.8736 19.5869 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 7C1 5.3778 1.9657 3.9812 3.3535 3.3535L8 8L3 8L3 10L10 10ZM21.2929 17.0502L14.2426 10L21 10L21 8L12.2426 8L8.9498 4.7071C8.7688 4.5261 8.6569 4.2761 8.6569 4C8.6569 3.4477 9.1046 3 9.6569 3L19 3C21.2091 3 23 4.7909 23 7L23 16.3431C23 16.8954 22.5523 17.3431 22 17.3431C21.7239 17.3431 21.4739 17.2312 21.2929 17.0502Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
