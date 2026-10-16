import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoreVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M14 5C14 6.1045 13.1045 7 12 7C10.8955 7 10 6.1045 10 5C10 3.8955 10.8955 3 12 3C13.1045 3 14 3.8955 14 5ZM14 12C14 13.1045 13.1045 14 12 14C10.8955 14 10 13.1045 10 12C10 10.8955 10.8955 10 12 10C13.1045 10 14 10.8955 14 12ZM14 19C14 20.1045 13.1045 21 12 21C10.8955 21 10 20.1045 10 19C10 17.8955 10.8955 17 12 17C13.1045 17 14 17.8955 14 19Z" fill="currentColor"/>
    </svg>
  )
}
