import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BracketArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M20 12.8907V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V12.8907M12 2.76928V12.8907M17.5 7.83L12.3686 2.16411C12.1704 1.9453 11.8296 1.9453 11.6314 2.16411L6.5 7.83"/>
    </svg>
  )
}
