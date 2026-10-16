import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Broom({ size = 24, ...props }: IconProps) {
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
      <path d="M11.5304 13.5362C10.1768 14.466 6.5597 16.1295 2.9198 15.3456C5.7967 18.8355 12.1346 24.7603 14.4719 20.5399C15.086 19.4704 16.2577 17.1141 16.0316 16.2453ZM11.5304 13.5362C11.9756 12.2895 13.4622 10.069 15.8469 11.1603C17.9275 12.3742 16.8369 15.0561 16.0316 16.2453Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.5304 13.5362C10.1768 14.466 6.5597 16.1295 2.9198 15.3456C5.7967 18.8355 12.1346 24.7603 14.4719 20.5399C15.086 19.4704 16.2577 17.1141 16.0316 16.2453ZM11.5304 13.5362C11.9756 12.2895 13.4622 10.069 15.8469 11.1603M16.0316 16.2453C16.8369 15.0561 17.9275 12.3742 15.8469 11.1603M15.8469 11.1603L21.2053 1.4845" fill="none"/>
    </svg>
  )
}
