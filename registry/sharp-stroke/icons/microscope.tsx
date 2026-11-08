import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Microscope({ size = 24, ...props }: IconProps) {
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
      <path d="M5.065 3.64L3.619 1.57M10.227 11.01L10.8 11.83M9.681 5H15C18.314 5 21 7.69 21 11C21 14.31 18.314 17 15 17M15 17H7M15 17V22M2 22H22M3.426 4.79L6.703 2.49C6.871 2.37 7.071 2.31 7.277 2.31C7.603 2.31 7.909 2.47 8.096 2.74L12.111 8.47C12.228 8.64 12.292 8.84 12.292 9.04C12.292 9.37 12.132 9.68 11.865 9.86L8.589 12.16C8.421 12.28 8.22 12.34 8.015 12.34C7.689 12.34 7.383 12.18 7.196 11.91L3.181 6.18C3.063 6.01 3 5.81 3 5.61C3 5.28 3.159 4.97 3.426 4.79Z"/>
    </svg>
  )
}
