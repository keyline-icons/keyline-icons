import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shield({ size = 24, ...props }: IconProps) {
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
      <path d="M5.1825 5.168C7.8303 4.854 9.8295 3.532 11.0242 2.373C11.537 1.876 12.463 1.876 12.9758 2.373C14.1705 3.532 16.1697 4.854 18.8175 5.168C19.4672 5.246 20 5.751 20 6.383V12.571C20 14.345 19.7111 16.151 18.612 17.573C17.4097 19.128 15.5033 20.87 12.8298 21.852C12.2945 22.049 11.7055 22.049 11.1702 21.852C8.4967 20.87 6.5903 19.128 5.388 17.573C4.2889 16.151 4 14.345 4 12.571V6.383C4 5.751 4.5328 5.246 5.1825 5.168Z"/>
    </svg>
  )
}
