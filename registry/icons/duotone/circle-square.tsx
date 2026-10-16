import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M17 9C17 13.4183 13.4183 17 9 17C4.5817 17 1 13.4183 1 9C1 4.5817 4.5817 1 9 1C13.4183 1 17 4.5817 17 9Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 8H20C21.6569 8 23 9.3431 23 11V20C23 21.6569 21.6569 23 20 23H11C9.3431 23 8 21.6569 8 20V11C8 9.3431 9.3431 8 11 8Z" fill="currentColor"/>
    </svg>
  )
}
