import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sofa({ size = 24, ...props }: IconProps) {
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
      <path d="M1 11C1 9.176 2.2339 7.583 4 7.127L4 6C4 4.3431 5.3431 3 7 3L17 3C18.6569 3 20 4.3431 20 6L20 7.127C21.7661 7.583 23 9.176 23 11L23 15C23 17.2091 21.2091 19 19 19L5 19C2.7909 19 1 17.2091 1 15L1 11ZM9 13L15 13L15 11C15 9.176 16.2339 7.583 18 7.127L18 6C18 5.4477 17.5523 5 17 5L7 5C6.4477 5 6 5.4477 6 6L6 7.127C7.7661 7.583 9 9.176 9 11L9 13Z" fill="currentColor" stroke="none"/>
      <path d="M5 8L5 6C5 4.8954 5.8954 4 7 4L17 4C18.1046 4 19 4.8954 19 6L19 8M5 18L5 20M19 18L19 20" fill="none"/>
    </svg>
  )
}
