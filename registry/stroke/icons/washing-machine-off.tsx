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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.8715 19.8715C19.4981 21.1033 18.3538 22 17 22L7 22C5.3431 22 4 20.6569 4 19L4 5C4 4.6969 4.0449 4.4043 4.1285 4.1285M15.6465 15.6465C15.0188 17.0343 13.6222 18 12 18C9.7909 18 8 16.2091 8 14C8 12.3778 8.9657 10.9812 10.3535 10.3535M7.6569 2L17 2C18.6569 2 20 3.3431 20 5L20 14.3431M12 6L16 6M2 2L22 22" fill="none"/>
    </svg>
  )
}
