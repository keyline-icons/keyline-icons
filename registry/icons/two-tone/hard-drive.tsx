import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HardDrive({ size = 24, ...props }: IconProps) {
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
      <path d="M1.5767 11.931L3.187 6.5633C3.8215 4.4483 5.7681 3 7.9761 3L16.0239 3C18.2319 3 20.1785 4.4483 20.813 6.5633L22.4233 11.931C22.8006 12.5552 23 13.2706 23 14L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 14C1 13.2706 1.1994 12.5552 1.5767 11.931Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 11L19 11C20.6569 11 22 12.3431 22 14L22 17C22 18.6569 20.6569 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 14C2 12.3431 3.3431 11 5 11ZM2.4954 12.3486L4.1448 6.8506C4.6524 5.1587 6.2097 4 7.9761 4L16.0239 4C17.7903 4 19.3476 5.1587 19.8552 6.8506L21.5046 12.3486"/>
      <path d="M19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
