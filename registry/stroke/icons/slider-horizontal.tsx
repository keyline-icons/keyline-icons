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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 19C20 17.34 18.6569 16 17 16H15C13.3431 16 12 17.34 12 19M20 19C20 20.66 18.6569 22 17 22H15C13.3431 22 12 20.66 12 19M20 19H22M12 19H2M2 4V10C2 11.1 2.8954 12 4 12H20C21.1046 12 22 11.1 22 10V4C22 2.9 21.1046 2 20 2H4C2.8954 2 2 2.9 2 4Z"/>
    </svg>
  )
}
