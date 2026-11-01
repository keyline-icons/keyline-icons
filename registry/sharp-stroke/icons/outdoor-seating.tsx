import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OutdoorSeating({ size = 24, ...props }: IconProps) {
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
      <path d="M2.1758 8L2 8L2.1125 7.865L3.7991 5.8411C5.8273 3.4072 8.8318 2 12 2C15.1682 2 18.1727 3.4072 20.2009 5.8411L21.8875 7.865L22 8L21.8242 8L2.1758 8ZM12 8L12 23M6 14L18 14M22 11L22 23M22 18L17 18L17 23M2 11L2 23M2 18L7 18L7 23" fill="none"/>
    </svg>
  )
}
