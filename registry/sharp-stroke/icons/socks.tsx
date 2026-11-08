import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Socks({ size = 24, ...props }: IconProps) {
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
      <path d="M15.019 7.05V3H21.001V7.05M15.019 7.05V12.12L12.132 15.64C10.98 17.05 11.188 19.14 12.594 20.28C13.946 21.38 15.913 21.2 17.04 19.86L21.001 15.16V7.05M15.019 7.05H21.001M12.03 3H6.543V7.05M6.543 7.05V12.12L3.756 15.52C2.561 16.98 2.811 19.16 4.305 20.3C5.09 20.9 6.1 21.1 7.052 20.86L8.294 20.54M6.543 7.05H12.03"/>
    </svg>
  )
}
