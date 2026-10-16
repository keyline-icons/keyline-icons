import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Snowflake({ size = 24, ...props }: IconProps) {
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
      <path d="M4.6795 12L19.3205 12M22 14.6795L19.3205 12L22 9.3205M2 9.3205L4.6795 12L2 14.6795M8.3397 5.6603L15.6603 18.3397M14.6795 22L15.6603 18.3397L19.3205 19.3205M9.3205 2L8.3397 5.6603L4.6795 4.6795M15.6603 5.6603L8.3397 18.3397M4.6795 19.3205L8.3397 18.3397L9.3205 22M19.3205 4.6795L15.6603 5.6603L14.6795 2"/>
    </svg>
  )
}
