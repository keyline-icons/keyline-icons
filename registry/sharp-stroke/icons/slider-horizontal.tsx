import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SliderHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M20 19C20 17.34 18.657 16 17 16H15C13.343 16 12 17.34 12 19M20 19C20 20.66 18.657 22 17 22H15C13.343 22 12 20.66 12 19M20 19H23M12 19H1M2 2V12H22V2H2Z"/>
    </svg>
  )
}
