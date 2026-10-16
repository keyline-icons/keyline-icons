import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Regex({ size = 24, ...props }: IconProps) {
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
      <path d="M17 3L17 13M13 11L21 5M13 5L21 11" fill="none"/>
      <path d="M6 20C6 21.1046 5.1046 22 4 22C2.8954 22 2 21.1046 2 20C2 18.8954 2.8954 18 4 18C5.1046 18 6 18.8954 6 20Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
