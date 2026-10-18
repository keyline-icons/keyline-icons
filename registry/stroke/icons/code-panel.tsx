import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CodePanel({ size = 24, ...props }: IconProps) {
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
      <path d="M18 4C19.6569 4 21 5.3431 21 7L21 17C21 18.6569 19.6569 20 18 20L6 20C4.3431 20 3 18.6569 3 17L3 16M6.4286 4L3 8L6.4286 12M11 4L14.4286 8L11 12" fill="none"/>
    </svg>
  )
}
