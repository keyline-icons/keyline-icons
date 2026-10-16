import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlaneLanding({ size = 24, ...props }: IconProps) {
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
      <path d="M3.155 11.6855L2.6599 7.3552L4.0754 7.4504L5.8214 10.1889L10.2889 10.6916L9.0027 4L11.9045 4.2652L15.4127 11.2656L18.1491 11.799C20.1301 12.1833 21.5109 14.0093 21.3231 15.9956L5.7735 14.25C4.4163 14.0972 3.329 13.0323 3.155 11.6855ZM1 20L23 20" fill="none"/>
    </svg>
  )
}
