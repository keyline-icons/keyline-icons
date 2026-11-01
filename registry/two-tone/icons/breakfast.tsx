import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Breakfast({ size = 24, ...props }: IconProps) {
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
      <path d="M6 13.0001L6 12.99C5.4533 12.99 5.01 12.5468 5.01 12.0001L5 12.0001L5 11C5 9.8954 5.8954 9 7 9L17 9C18.1046 9 19 9.8954 19 11L19 12C21.2091 12 23 13.7909 23 16C23 18.2091 21.2091 20 19 20L18.8737 20C18.5872 21.1069 17.8414 22.0387 16.8241 22.5606C16.941 22.2036 17.0004 21.8302 17 21.4545C17.0001 17.9227 14.8052 14.7628 11.4956 13.5298C10.5517 13.1787 9.5526 12.9993 8.5455 13L7.4546 13C7.4364 13 7.4182 13.0001 7.4 13.0001L6 13.0001ZM8 15L8.5455 15C11.2419 14.9999 13.6544 16.6755 14.5959 19.2023C14.8639 19.9229 15.0007 20.6857 15 21.4545C15 22.3081 14.3081 23 13.4545 23L2.5455 23C1.6919 23 1 22.308 1 21.4545C0.9999 18.7581 2.6755 16.3455 5.2023 15.4041C5.9229 15.1361 6.6857 14.9993 7.4546 15L8 15Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M6 12L6 11C6 10.4477 6.4477 10 7 10L17 10C17.5523 10 18 10.4477 18 11L18 19C18 20.6569 16.6569 22 15 22L13 22M18 13L19 13C20.6569 13 22 14.3431 22 16C22 17.6569 20.6569 19 19 19L18 19M10.5 6C10.5 5.2131 10.8705 4.4721 11.5 4C12.1295 3.5279 12.5 2.7869 12.5 2M15.5 6C15.5 5.2131 15.8705 4.4721 16.5 4C17.1295 3.5279 17.5 2.7869 17.5 2M8 16L8.54545 16C11.5579 16 14 18.4421 14 21.4545C14 21.7558 13.7558 22 13.4545 22L2.54545 22C2.24421 22 2 21.7558 2 21.4545C2 18.4421 4.44208 16 7.45455 16ZM8 16L8 22" fill="none"/>
    </svg>
  )
}
