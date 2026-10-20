import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L7 3L7 7L3 7ZM17 3L21 3L21 7L17 7ZM3 17L7 17L7 21L3 21ZM17 17L21 17L21 21L17 21ZM7 5L17 5M7 19L17 19M5 7L5 17M19 7L19 17" fill="none"/>
    </svg>
  )
}
