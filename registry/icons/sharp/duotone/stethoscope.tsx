import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stethoscope({ size = 24, ...props }: IconProps) {
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
      <path d="M23 10C23 11.6569 21.6569 13 20 13C18.3431 13 17 11.6569 17 10C17 8.3431 18.3431 7 20 7C21.6569 7 23 8.3431 23 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 15C2.9955 15 1.7856 8.2335 2.0294 4.623L2.139 3L6.117 3M8 15C13.0045 15 14.2144 8.2335 13.9706 4.623L13.861 3L9.883 3M20 12L20 15C20 18.3137 17.3137 21 14 21C10.6863 21 8 18.3137 8 15" fill="none"/>
    </svg>
  )
}
