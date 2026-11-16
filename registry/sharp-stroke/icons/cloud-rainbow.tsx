import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudRainbow({ size = 24, ...props }: IconProps) {
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
      <path d="M6.033 8.93L6.215 8.16C7.068 4.55 10.291 2 14 2C18.418 2 22 5.582 22 10V16M10.501 7.998L10.801 7.598C11.557 6.592 12.742 6 14 6C16.209 6 18 7.791 18 10V14.2M14 22H5C3.343 22 2 20.657 2 19C2 17.343 3.343 16 5 16C5 13.515 7.015 11.5 9.5 11.5C11.985 11.5 14 13.515 14 16C15.657 16 17 17.343 17 19C17 20.657 15.657 22 14 22Z"/>
    </svg>
  )
}
