import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M2 11.8473L10.7072 4.4703C11.0802 4.1543 11.5401 3.9963 12 3.9963M4 10.1528L4 20C4 21.1046 4.8954 22 6 22L18 22C19.1046 22 20 21.1046 20 20L20 12M9 22L9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19L15 22M16 5.6L18.3333 8L22 2"/>
    </svg>
  )
}
