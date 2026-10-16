import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Landmark({ size = 24, ...props }: IconProps) {
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
      <path d="M3.2797 7.0511C3.1085 7.1351 2.9999 7.3093 2.9999 7.5C2.9999 7.7761 3.2238 8 3.5 8L20.5 8C20.7762 8 21 7.7761 21 7.5C21 7.3093 20.8915 7.1351 20.7203 7.0511L12.881 3.2045C12.6068 3.0699 12.3054 2.9999 12 2.9999C11.6946 2.9999 11.3932 3.0699 11.119 3.2045L3.2797 7.0511ZM6 12L6 17M12 12L12 17M18 12L18 17M3 21L21 21" fill="none"/>
    </svg>
  )
}
