import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SolarPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M5.0513 2.6838C5.1874 2.2754 5.5696 2 6 2L18 2C18.4304 2 18.8126 2.2754 18.9487 2.6838L22.9487 14.6838C22.9827 14.7857 23 14.8925 23 15C23 15.5523 22.5523 16 22 16L2 16C1.4477 16 1 15.5523 1 15C1 14.8925 1.0173 14.7857 1.0513 14.6838Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3L18 3L22 15L2 15ZM10 3L8.6667 15M14 3L15.3333 15M4 9L20 9M12 15L12 21M7 21L17 21"/>
    </svg>
  )
}
