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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.0605 2.7073C11.1795 1.7593 12.8205 1.7593 13.9395 2.7073L20.9395 8.6379L21.0615 8.7483C21.6586 9.3132 22 10.1004 22 10.927L22 19.0002C21.9999 20.657 20.6568 22.0002 19 22.0002L5 22.0002C3.3432 22.0002 2.0001 20.657 2 19.0002L2 10.927C2 10.0454 2.3878 9.208 3.0606 8.6379L10.0605 2.7073Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20.2928 9.4009L13.2928 3.4703C12.5468 2.8383 11.4532 2.8383 10.7072 3.4703L3.7072 9.4009C3.2586 9.7809 3 10.339 3 10.9268L3 19C3 20.1046 3.8954 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 10.9268C21 10.339 20.7414 9.7809 20.2928 9.4009ZM9 10.5L9 11.5M15 10.5L15 11.5M9 15.5C10 16.5 11 17 12 17C13 17 14 16.5 15 15.5" fill="none"/>
    </svg>
  )
}
