import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomeSmile({ size = 24, ...props }: IconProps) {
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
      <path d="M21 10L12 2.9963L3 10L3 21L21 21ZM9 9.5L9 12.5M15 9.5L15 12.5M8.7071 15.2071L9 15.5C10 16.5 11 17 12 17C13 17 14 16.5 15 15.5L15.2929 15.2071" fill="none"/>
    </svg>
  )
}
