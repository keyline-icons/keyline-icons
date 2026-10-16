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
      <path d="M12.8907 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H12.8907M2.76928 12H12.8907M7.83 6.5L2.16411 11.6314C1.9453 11.8296 1.9453 12.1704 2.16411 12.3686L7.83 17.5"/>
    </svg>
  )
}
