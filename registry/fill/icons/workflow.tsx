import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Workflow({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 4.3431 3.3431 3 5 3L9 3C10.6569 3 12 4.3431 12 6L12 8C12 9.6569 10.6569 11 9 11L5 11C3.3431 11 2 9.6569 2 8L2 6ZM12 16C12 14.3431 13.3431 13 15 13L19 13C20.6569 13 22 14.3431 22 16L22 18C22 19.6569 20.6569 21 19 21L15 21C13.3431 21 12 19.6569 12 18L12 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 10L7 14C7 15.6569 8.3431 17 10 17L13 17" fill="none"/>
    </svg>
  )
}
