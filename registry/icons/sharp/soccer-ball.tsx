import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SoccerBall({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM14.9389 7.9549L16.7553 13.5451L12 17L7.2447 13.5451L9.0611 7.9549L14.9389 7.9549ZM14.9389 7.9549L17.8779 3.9098M16.7553 13.5451L21.5106 15.0902M12 17L12 22M7.2447 13.5451L2.4894 15.0902M9.0611 7.9549L6.1221 3.9098" fill="none"/>
    </svg>
  )
}
