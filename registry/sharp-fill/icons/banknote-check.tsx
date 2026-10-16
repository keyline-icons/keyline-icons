import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BanknoteCheck({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 1L22 1C22.5523 1 23 1.4477 23 2L23 13L13 13L13 17L2 17C1.4477 17 1 16.5523 1 16L1 2C1 1.4477 1.4477 1 2 1ZM15 9C15 7.3431 13.6569 6 12 6C10.3431 6 9 7.3431 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9ZM16 5L16 7L19 7L19 5L16 5ZM5 11L5 13L8 13L8 11L5 11ZM13 9C13 9.5523 12.5523 10 12 10C11.4477 10 11 9.5523 11 9C11 8.4477 11.4477 8 12 8C12.5523 8 13 8.4477 13 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15.7055 19.2971L18.3333 22L22.1467 15.76"/>
    </svg>
  )
}
