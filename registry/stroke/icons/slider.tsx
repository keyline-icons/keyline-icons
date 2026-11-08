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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 18C20 16.34 18.6569 15 17 15H15C13.3431 15 12 16.34 12 18M20 18C20 19.66 18.6569 21 17 21H15C13.3431 21 12 19.66 12 18M20 18H22M12 18H2M2 5V9C2 10.1 2.8954 11 4 11H8C9.1046 11 10 10.1 10 9V5C10 3.9 9.1046 3 8 3H4C2.8954 3 2 3.9 2 5ZM22 7C22 4.79 20.2091 3 18 3C15.7909 3 14 4.79 14 7C14 9.21 15.7909 11 18 11C20.2091 11 22 9.21 22 7Z"/>
    </svg>
  )
}
