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
      <path d="M3 8L21 8L21 12L10 12L10 13C10 14.1046 9.1046 15 8 15C6.8954 15 6 14.1046 6 13L6 12L3 12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3ZM3 8L3 12L6 12L6 13C6 14.1046 6.8954 15 8 15C9.1046 15 10 14.1046 10 13L10 12L21 12L21 8L3 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
