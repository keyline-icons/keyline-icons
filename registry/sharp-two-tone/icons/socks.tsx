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
      <path d="M21.001 2C21.553 2 22.001 2.45 22.001 3V15.16C22.001 15.4 21.918 15.63 21.766 15.81L17.805 20.5C16.328 22.26 13.741 22.51 11.963 21.06C10.126 19.57 9.858 16.84 11.359 15.01L14.02 11.76V3C14.02 2.45 14.467 2 15.02 2H21.001ZM12.03 4H7.543V6.05H12.03V8.05H7.543V12.12C7.543 12.35 7.463 12.58 7.316 12.76L4.529 16.16C3.691 17.18 3.871 18.71 4.911 19.5C5.455 19.92 6.151 20.06 6.806 19.89L8.048 19.58L8.54 21.51L7.299 21.83C6.049 22.15 4.725 21.87 3.698 21.09C1.752 19.61 1.431 16.78 2.982 14.89L5.543 11.76V3C5.543 2.45 5.991 2 6.543 2H12.03V4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.019 7.05V3H21.001V7.05M15.019 7.05V12.12L12.132 15.64C10.98 17.05 11.188 19.14 12.594 20.28C13.946 21.38 15.913 21.2 17.04 19.86L21.001 15.16V7.05M15.019 7.05H21.001M12.03 3H6.543V7.05M6.543 7.05V12.12L3.756 15.52C2.561 16.98 2.811 19.16 4.305 20.3C5.09 20.9 6.1 21.1 7.052 20.86L8.294 20.54M6.543 7.05H12.03"/>
    </svg>
  )
}
