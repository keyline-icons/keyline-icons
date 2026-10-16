import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hexagons({ size = 24, ...props }: IconProps) {
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
      <path d="M6 12.7623L10 15.0717L10 19.6905L6 22L2 19.6905L2 15.0717L6 12.7623ZM18 12.7623L22 15.0717L22 19.6905L18 22L14 19.6905L14 15.0717L18 12.7623ZM12 2L16 4.3095L16 8.9283L12 11.2377L8 8.9283L8 4.3095L12 2Z" fill="none"/>
    </svg>
  )
}
