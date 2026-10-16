import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio169({ size = 24, ...props }: IconProps) {
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
      <path d="M2 9C2 7.3431 3.3431 6 5 6L19 6C20.6569 6 22 7.3431 22 9L22 15C22 16.6569 20.6569 18 19 18L5 18C3.3431 18 2 16.6569 2 15L2 9Z" fill="none"/>
    </svg>
  )
}
