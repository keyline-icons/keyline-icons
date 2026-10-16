import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BracketArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M12.8907 4L18 4C20.2091 4 22 5.7909 22 8L22 16C22 18.2091 20.2091 20 18 20L12.8907 20" strokeOpacity="0.4"/>
      <path d="M2.7693 12L12.8907 12M7.83 6.5L2.1641 11.6314C1.9453 11.8296 1.9453 12.1704 2.1641 12.3686L7.83 17.5"/>
    </svg>
  )
}
