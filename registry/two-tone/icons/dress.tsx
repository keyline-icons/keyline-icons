import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dress({ size = 24, ...props }: IconProps) {
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
      <path d="M14.9619 1.16C15.2051 1.02 15.5507 0.96 15.8175 1.05L17.0001 1.45L17.2774 1.55C18.5371 2.12 19.2521 3.48 19.0011 4.83L18.9327 5.12L17.5684 9.9C17.557 9.94 17.5582 9.98 17.5723 10.02L20.8456 19.04C21.4687 20.97 20.0603 23 18.003 23H5.9971C3.9445 23 2.5308 21 3.1446 19.07C3.1462 19.07 3.1473 19.06 3.1485 19.06L3.1505 19.05L3.1602 19.03L3.1671 19.01L3.172 19L6.4268 10.03C6.4411 9.99 6.4432 9.94 6.4317 9.9L5.0645 5.12C4.6245 3.57 5.4774 1.96 6.9991 1.45L8.1954 1.05L8.2022 1.05L8.2843 1.03C8.2898 1.02 8.2954 1.02 8.3009 1.02L8.4019 1.01C8.5557 0.99 8.9457 1.1 9.0902 1.15C9.2474 1.34 9.5009 1.76 9.5011 2V2.5C9.5014 3.88 10.6203 5 12.0001 5C13.3804 5 14.4997 3.88 14.5001 2.5V2C14.5002 1.68 14.7019 1.34 14.9619 1.16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.5 10L6.0261 4.84C5.7319 3.81 6.3008 2.73 7.3167 2.39L8.5 2V2.5C8.5 4.43 10.067 6 12 6C13.933 6 15.5 4.43 15.5 2.5V2L16.6833 2.39C17.6992 2.73 18.2681 3.81 17.9739 4.84L16.5 10M7.5 10L4.1 19.37C3.6805 20.66 4.6322 22 5.9973 22H18.0027C19.3678 22 20.3195 20.66 19.9 19.37L16.5 10M7.5 10H16.5"/>
    </svg>
  )
}
