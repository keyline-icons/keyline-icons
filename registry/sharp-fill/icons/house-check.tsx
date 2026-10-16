import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3857 3.20703C11.7469 2.92599 12.253 2.92599 12.6142 3.20703L13 3.50684V11H21V22C20.9998 22.5521 20.5521 23 20 23H16V19C16 16.7909 14.2091 15 12 15C9.79088 15 7.99996 16.7909 7.99996 19V23H3.99996C3.44782 23 3.00016 22.5521 2.99996 22V12.2666L2.22848 12.8672L0.999962 11.2891L11.3857 3.20703Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15.7055 5.2971L18.3333 8L22.1371 1.5054"/>
    </svg>
  )
}
