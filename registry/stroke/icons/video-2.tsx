import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Video2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6L15 6C16.1046 6 17 6.8954 17 8L17 16C17 17.1046 16.1046 18 15 18L4 18C2.8954 18 2 17.1046 2 16L2 8C2 6.8954 2.8954 6 4 6ZM17 10L20.5528 8.2236C21.2177 7.8912 22 8.3747 22 9.118L22 14.882C22 15.6253 21.2177 16.1088 20.5528 15.7764L17 14"/>
    </svg>
  )
}
