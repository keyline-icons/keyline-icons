import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Phi({ size = 24, ...props }: IconProps) {
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
      <path d="M7.4416 4.9724L6.9117 5.8205C6.3159 6.774 6 7.8757 6 9C6 12.3137 8.6863 15 12 15C15.3137 15 18 12.3137 18 9C18 5.6863 15.3137 3 12 3L12 22" fill="none"/>
    </svg>
  )
}
