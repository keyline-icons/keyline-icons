import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio219({ size = 24, ...props }: IconProps) {
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
      <path d="M1 10C1 8.3431 2.3431 7 4 7L20 7C21.6569 7 23 8.3431 23 10L23 14C23 15.6569 21.6569 17 20 17L4 17C2.3431 17 1 15.6569 1 14L1 10Z" fill="currentColor"/>
    </svg>
  )
}
