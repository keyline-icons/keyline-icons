import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bike({ size = 24, ...props }: IconProps) {
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
      <path d="M23 17.5C23 19.9853 20.9853 22 18.5 22C16.0147 22 14 19.9853 14 17.5C14 15.0147 16.0147 13 18.5 13C20.9853 13 23 15.0147 23 17.5ZM10 17.5C10 19.9853 7.9853 22 5.5 22C3.0147 22 1 19.9853 1 17.5C1 15.0147 3.0147 13 5.5 13C7.9853 13 10 15.0147 10 17.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.8277 17.7858L12.8624 13.0671L9.0351 10.9545L14.4065 7.2897L16.0617 10.9109L19.4635 11.0352M17 5C17.5523 5 18 4.5523 18 4C18 3.4477 17.5523 3 17 3C16.4477 3 16 3.4477 16 4C16 4.5523 16.4477 5 17 5Z"/>
    </svg>
  )
}
