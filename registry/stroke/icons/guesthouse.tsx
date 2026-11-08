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
      <path d="M4 3V4.8M4 4.8V15C4 16.1 4.8954 17 6 17H18C19.1046 17 20 16.1 20 15V3.2M4 4.8L20 3.2M4 4.8L2 5M20 3.2L22 3M10 17V14C10 12.9 10.8954 12 12 12C13.1046 12 14 12.9 14 14V17M10 21H14"/>
      <path d="M9 9C9 9.55 8.5523 10 8 10C7.4477 10 7 9.55 7 9C7 8.45 7.4477 8 8 8C8.5523 8 9 8.45 9 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
