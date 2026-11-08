import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Vault2({ size = 24, ...props }: IconProps) {
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
      <path d="M14.5 9.5L17 7M7 17L9.5 14.5M17 17L14.5 14.5M9.5 9.5L7 7M6 3H18C19.6569 3 21 4.34 21 6V18C21 19.66 19.6569 21 18 21H6C4.3431 21 3 19.66 3 18V6C3 4.34 4.3431 3 6 3ZM12 15C10.3431 15 9 13.66 9 12C9 10.34 10.3431 9 12 9C13.6569 9 15 10.34 15 12C15 13.66 13.6569 15 12 15Z"/>
    </svg>
  )
}
