import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stroller({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L19 9L19 14L3 14ZM3 9C3 5.134 6.134 2 10 2L10 9M19 9L20 4L22 4M9 20C9 21.1046 8.1046 22 7 22C5.8954 22 5 21.1046 5 20C5 18.8954 5.8954 18 7 18C8.1046 18 9 18.8954 9 20ZM17 20C17 21.1046 16.1046 22 15 22C13.8954 22 13 21.1046 13 20C13 18.8954 13.8954 18 15 18C16.1046 18 17 18.8954 17 20Z" fill="none"/>
    </svg>
  )
}
