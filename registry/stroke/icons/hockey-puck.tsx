import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HockeyPuck({ size = 24, ...props }: IconProps) {
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
      <path d="M22 9C22 11.2091 17.5228 13 12 13C6.4772 13 2 11.2091 2 9C2 6.7909 6.4772 5 12 5C17.5228 5 22 6.7909 22 9ZM2 9L2 15C2 17.2091 6.4772 19 12 19C17.5228 19 22 17.2091 22 15L22 9"/>
    </svg>
  )
}
