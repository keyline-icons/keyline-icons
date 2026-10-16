import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IdCard({ size = 24, ...props }: IconProps) {
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
      <path d="M5 4L19 4C20.6569 4 22 5.3431 22 7L22 17C22 18.6569 20.6569 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 7C2 5.3431 3.3431 4 5 4ZM11 10C11 11.1046 10.1046 12 9 12C7.8954 12 7 11.1046 7 10C7 8.8954 7.8954 8 9 8C10.1046 8 11 8.8954 11 10ZM5 20C5 17.7909 6.7909 16 9 16C11.2091 16 13 17.7909 13 20M15 10L18 10M15 14L18 14"/>
    </svg>
  )
}
