import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio32({ size = 24, ...props }: IconProps) {
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
      <path d="M1 8C1 5.7909 2.7909 4 5 4L19 4C21.2091 4 23 5.7909 23 8L23 16C23 18.2091 21.2091 20 19 20L5 20C2.7909 20 1 18.2091 1 16L1 8Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 8C2 6.3431 3.3431 5 5 5L19 5C20.6569 5 22 6.3431 22 8L22 16C22 17.6569 20.6569 19 19 19L5 19C3.3431 19 2 17.6569 2 16L2 8Z" fill="none"/>
    </svg>
  )
}
