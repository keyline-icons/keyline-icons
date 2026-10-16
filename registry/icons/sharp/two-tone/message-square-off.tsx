import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.7348 2.1054 2.4804 2.2929 2.2929ZM5.6569 2L21 2C21.5523 2 22 2.4477 22 3L22 17C22 17.3513 21.8157 17.6768 21.5144 17.8575Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 17L7 17L3 21L3 3M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
