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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.6795 12L19.3205 12M22.2929 14.9724L19.3205 12L22.2929 9.0276M1.7071 9.0276L4.6795 12L1.7071 14.9724M8.3397 5.6603L15.6603 18.3397M14.4809 22.7412L15.6603 18.3397L20.0617 19.5191M9.5191 1.2588L8.3397 5.6603L3.9383 4.4809M15.6603 5.6603L8.3397 18.3397M3.9383 19.5191L8.3397 18.3397L9.5191 22.7412M20.0617 4.4809L15.6603 5.6603L14.4809 1.2588"/>
    </svg>
  )
}
