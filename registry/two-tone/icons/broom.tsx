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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.6106 13.5362C10.257 14.466 6.6399 16.1295 3 15.3456C5.8769 18.8355 12.2148 24.7603 14.5521 20.5399C15.1662 19.4704 16.3379 17.1141 16.1118 16.2453ZM11.6106 13.5362C12.0558 12.2895 13.5424 10.069 15.9271 11.1603C18.0077 12.3742 16.9171 15.0561 16.1118 16.2453Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.6106 13.5362C10.257 14.466 6.6399 16.1295 3 15.3456C5.8769 18.8355 12.2148 24.7603 14.5521 20.5399C15.1662 19.4704 16.3379 17.1141 16.1118 16.2453ZM11.6106 13.5362C12.0558 12.2895 13.5424 10.069 15.9271 11.1603M16.1118 16.2453C16.9171 15.0561 18.0077 12.3742 15.9271 11.1603M15.9271 11.1603L21 2" fill="none"/>
    </svg>
  )
}
