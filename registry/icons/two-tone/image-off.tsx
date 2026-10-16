import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.8284 20.8284C20.0791 21.5797 19.0611 22.0014 18 22L6 22C3.7909 22 2 20.2091 2 18L2 6C1.9986 4.9389 2.4203 3.9209 3.1716 3.1716L20.8284 20.8284ZM7.9497 3.7071C7.7622 3.5196 7.6569 3.2652 7.6569 3C7.6569 2.4477 8.1046 2 8.6569 2L18 2C20.2091 2 22 3.7909 22 6L22 15.3431C22 15.8954 21.5523 16.3431 21 16.3431C20.7348 16.3431 20.4804 16.2378 20.2929 16.0503Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M20.1213 20.1213C19.5785 20.6642 18.8285 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 6C3 5.1716 3.3358 4.4216 3.8787 3.8787M3 18L7.9393 13.0607C8.5251 12.4749 9.4749 12.4749 10.0607 13.0607L12.0801 15.0801C12.6079 15.6079 13.4436 15.6673 14.0408 15.2194L14.7143 14.7143M2 2L22 22" fill="none"/>
    </svg>
  )
}
