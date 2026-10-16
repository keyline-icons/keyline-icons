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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 9C1 6.7909 2.7909 5 5 5L19 5C21.2091 5 23 6.7909 23 9L23 15C23 17.2091 21.2091 19 19 19L5 19C2.7909 19 1 17.2091 1 15L1 9Z" fill="currentColor"/>
    </svg>
  )
}
