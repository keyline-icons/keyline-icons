import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomeZap({ size = 24, ...props }: IconProps) {
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
      <path d="M21 11L20.9998 22.0002C20.9998 22.5525 20.5521 23.0002 19.9998 23.0002L15 23.0002L15 14.0002L7 14.0002L7 23.0002L2.0002 23.0002C1.4479 23.0002 1.0002 22.5525 1.0002 22.0002L1 10.9999C1 10.706 1.1293 10.4269 1.3536 10.2369L10.3881 3.2069C10.7482 2.9266 11.2524 2.9258 11.6135 3.2048L13 4.2856L13 11L21 11Z" fill="currentColor" stroke="none"/>
      <path d="M19.2929 1.7071L16 5L20 5L16.7071 8.2929"/>
    </svg>
  )
}
