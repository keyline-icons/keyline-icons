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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1.5767 11.931L3.187 6.5633C3.8215 4.4483 5.7681 3 7.9761 3L16.0239 3C18.2319 3 20.1785 4.4483 20.813 6.5633L22.4233 11.931C22.8006 12.5552 23 13.2706 23 14L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 14C1 13.2706 1.1994 12.5552 1.5767 11.931ZM4.2211 10.0766C4.4776 10.0256 4.7385 10 5 10L19 10C19.2615 10 19.5224 10.0256 19.7789 10.0766L18.8974 7.138C18.5167 5.869 17.3487 5 16.0239 5L7.9761 5C6.6513 5 5.4833 5.869 5.1026 7.138L4.2211 10.0766ZM19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17C18.3284 17 19 16.3284 19 15.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
