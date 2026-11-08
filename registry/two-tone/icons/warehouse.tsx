import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Warehouse({ size = 24, ...props }: IconProps) {
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
      <path d="M23 20C23 21.66 21.6569 23 20 23H4C2.3431 23 1 21.66 1 20V9C1 8.03 1.5619 7.15 2.4336 6.74L10.6816 1.32L10.7617 1.27C10.7891 1.26 10.8171 1.24 10.8457 1.23C11.2114 1.08 11.6038 1 12 1C12.2971 1 12.5919 1.04 12.875 1.13L13.1543 1.23L13.2383 1.27C13.2657 1.29 13.2923 1.3 13.3184 1.32L21.5654 6.74C22.4376 7.15 23 8.03 23 9V20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 22H20C21.1046 22 22 21.1 22 20V9C22 8.39 21.6359 7.85 21.0769 7.62L12.7692 2.15C12.5255 2.05 12.2641 2 12 2C11.7359 2 11.4745 2.05 11.2308 2.15L2.9231 7.62C2.3641 7.85 2 8.39 2 9V20C2 21.1 2.8954 22 4 22H6M18 22H6M18 22V18M6 22V18M18 18H6M18 18V14M6 18V14M6 14V12C6 10.9 6.8954 10 8 10H16C17.1046 10 18 10.9 18 12V14M6 14H18"/>
    </svg>
  )
}
