import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoreHorizontal({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 12C7 13.1045 6.1045 14 5 14C3.8955 14 3 13.1045 3 12C3 10.8955 3.8955 10 5 10C6.1045 10 7 10.8955 7 12ZM14 12C14 13.1045 13.1045 14 12 14C10.8955 14 10 13.1045 10 12C10 10.8955 10.8955 10 12 10C13.1045 10 14 10.8955 14 12ZM21 12C21 13.1045 20.1045 14 19 14C17.8955 14 17 13.1045 17 12C17 10.8955 17.8955 10 19 10C20.1045 10 21 10.8955 21 12Z" fill="currentColor"/>
    </svg>
  )
}
