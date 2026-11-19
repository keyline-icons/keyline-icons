import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Teacher({ size = 24, ...props }: IconProps) {
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
      <path d="M9 5.8153L9 4C9 2.8954 9.8954 2 11 2L20 2C21.1046 2 22 2.8954 22 4L22 13C22 14.1046 21.1046 15 20 15L12.7663 15M13 6.5H18M14 10.5H18" strokeOpacity="0.4"/>
      <path d="M10.5 12C10.5 13.933 8.933 15.5 7 15.5C5.067 15.5 3.5 13.933 3.5 12C3.5 10.067 5.067 8.5 7 8.5C8.933 8.5 10.5 10.067 10.5 12ZM1 21C1 19.067 2.567 17.5 4.5 17.5L9.5 17.5C11.433 17.5 13 19.067 13 21C13 22.1046 12.1046 23 11 23L3 23C1.8954 23 1 22.1046 1 21Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
