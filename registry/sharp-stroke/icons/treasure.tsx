import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Treasure({ size = 24, ...props }: IconProps) {
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
      <path d="M2 11L6 11L10 11M6 4.1L6 11L6 20M18 4.1L18 11L18 20M22 11L18 11L14 11M14 11L14 9L10 9L10 11L10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13ZM18 4.1C17.6769 4.0344 17.3425 4 17 4L7 4C6.6575 4 6.3231 4.0344 6 4.1C3.7178 4.5633 2 6.5811 2 9L2 11L2 20L6 20L18 20L22 20L22 11L22 9C22 6.5811 20.2822 4.5633 18 4.1Z" fill="none"/>
    </svg>
  )
}
