import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Soup({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12L22 12C20.9477 16.6771 16.794 20 12 20C7.206 20 3.0523 16.6771 2 12ZM5 20L19 20M5 8C5 7.2131 5.3705 6.4721 6 6C6.6295 5.5279 7 4.7869 7 4M11 8C11 7.2131 11.3705 6.4721 12 6C12.6295 5.5279 13 4.7869 13 4M17 8C17 7.2131 17.3705 6.4721 18 6C18.6295 5.5279 19 4.7869 19 4" fill="none"/>
    </svg>
  )
}
