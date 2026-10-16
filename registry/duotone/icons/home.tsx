import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Home({ size = 24, ...props }: IconProps) {
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
      <path d="M10.0605 2.70707C11.1795 1.7591 12.8205 1.7591 13.9395 2.70707L20.9395 8.63773L21.0615 8.74808C21.6586 9.31297 22 10.1002 22 10.9268V19C21.9999 20.6568 20.6568 22 19 22H5C3.34318 22 2.00011 20.6568 2 19V10.9268C2.00002 10.0452 2.38775 9.20775 3.06055 8.63773L10.0605 2.70707Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 21L9 14L15 14L15 21"/>
    </svg>
  )
}
