import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ConciergeBell({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15C2.999 11.6739 4.8327 8.6186 7.7684 7.0551C9.0719 6.3617 10.5257 5.999 12.0022 5.999C12.7484 5.999 13.4918 6.0917 14.2153 6.2749C17.4133 7.0895 19.9105 9.5867 20.7251 12.7847C20.9081 13.5089 21.0005 14.253 21 15C21 15.5523 20.5523 16 20 16L4 16C3.4477 16 3 15.5523 3 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 14L22 14C22.5523 14 23 14.4477 23 15L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21L1 15C1 14.4477 1.4477 14 2 14Z" fill="currentColor" stroke="none"/>
      <path d="M12 7L12 3M8 3L16 3" fill="none"/>
    </svg>
  )
}
