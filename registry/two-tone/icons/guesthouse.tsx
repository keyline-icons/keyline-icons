import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guesthouse({ size = 24, ...props }: IconProps) {
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
      <path d="M14.0001 20C14.5523 20 15 20.45 15.0001 21C15.0001 21.55 14.5524 22 14.0001 22H10.0001C9.448 22 9.0001 21.55 9.0001 21C9.0003 20.45 9.448 20 10.0001 20H14.0001ZM21.9005 2.01C22.45 1.95 22.9402 2.35 22.9953 2.9C23.0502 3.45 22.6492 3.94 22.0997 4L21.0001 4.1V15C21.0001 16.66 19.657 18 18.0001 18H6.0001C4.3434 18 3.0001 16.66 3.0001 15V5.9L2.0997 6C1.5503 6.05 1.06 5.65 1.005 5.1C0.9502 4.55 1.3512 4.06 1.9005 4.01L3.0001 3.89V3C3.0002 2.45 3.448 2 4.0001 2C4.5524 2 5.0001 2.45 5.0001 3V3.69L21.9005 2.01Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 3V4.8M4 4.8V15C4 16.1 4.8954 17 6 17H18C19.1046 17 20 16.1 20 15V3.2M4 4.8L20 3.2M4 4.8L2 5M20 3.2L22 3M10 17V14C10 12.9 10.8954 12 12 12C13.1046 12 14 12.9 14 14V17M10 21H14"/>
      <path d="M9 9C9 9.55 8.5523 10 8 10C7.4477 10 7 9.55 7 9C7 8.45 7.4477 8 8 8C8.5523 8 9 8.45 9 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
