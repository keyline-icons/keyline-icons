import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WashingMachineOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 3L9.6081 9.6081C8.0004 10.4841 6.9998 12.1686 6.9998 13.9995C6.9998 16.7613 9.2387 19.0002 12.0005 19.0002C13.8314 19.0002 15.5159 17.9996 16.3919 16.3919L21 21ZM4.6569 1L20 1C20.5523 1 21 1.4477 21 2L21 17.3431L16.9505 13.2936C16.6357 11.0932 14.9068 9.3643 12.7064 9.0495L4.6569 1ZM11 5L11 7L17 7L17 5L11 5Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
