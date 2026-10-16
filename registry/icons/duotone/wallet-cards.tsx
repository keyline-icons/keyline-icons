import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WalletCards({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8L21 8L21 12L11 12C10.4477 12 10 12.4477 10 13C10 14.1046 9.1046 15 8 15C6.8954 15 6 14.1046 6 13C6 12.4477 5.5523 12 5 12L3 12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M5 3L19 3C21.2091 3 23 4.7909 23 7L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 7C1 4.7909 2.7909 3 5 3ZM3 8L3 12L5 12C5.5523 12 6 12.4477 6 13C6 14.1046 6.8954 15 8 15C9.1046 15 10 14.1046 10 13C10 12.4477 10.4477 12 11 12L21 12L21 8L3 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
