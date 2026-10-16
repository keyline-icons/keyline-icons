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
      <path d="M2 15L2 11C2 9.3431 3.3431 8 5 8C6.6569 8 8 9.3431 8 11L8 13C8 13.5523 8.4477 14 9 14L15 14C15.5523 14 16 13.5523 16 13L16 11C16 9.3431 17.3431 8 19 8C20.6569 8 22 9.3431 22 11L22 15C22 16.6569 20.6569 18 19 18L5 18C3.3431 18 2 16.6569 2 15ZM5 8L5 6C5 4.8954 5.8954 4 7 4L17 4C18.1046 4 19 4.8954 19 6L19 8M5 18L5 20M19 18L19 20" fill="none"/>
    </svg>
  )
}
