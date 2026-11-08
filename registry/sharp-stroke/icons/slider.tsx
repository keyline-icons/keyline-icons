import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Slider({ size = 24, ...props }: IconProps) {
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
      <path d="M20 18C20 16.34 18.657 15 17 15H15C13.343 15 12 16.34 12 18M20 18C20 19.66 18.657 21 17 21H15C13.343 21 12 19.66 12 18M20 18H23M12 18H1M2 3V11H10V3H2ZM22 7C22 4.79 20.209 3 18 3C15.791 3 14 4.79 14 7C14 9.21 15.791 11 18 11C20.209 11 22 9.21 22 7Z"/>
    </svg>
  )
}
