import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopSmartphoneOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.7678 21.888C21.0493 22.577 20.0741 23 19 23H16C13.7909 23 12 21.209 12 19V13C12 12.726 12.0275 12.458 12.08 12.2L21.7678 21.888ZM15.558 9.024C15.7031 9.008 15.8506 9 16 9H19C21.2091 9 23 10.791 23 13V16.343C23 16.895 22.5523 17.343 22 17.343C21.7239 17.343 21.4739 17.231 21.2929 17.05L14.9638 10.721C14.7848 10.54 14.6743 10.292 14.6743 10.017C14.6743 9.504 15.0605 9.082 15.558 9.024Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 14V4M7.6569 2H18C19.1046 2 20 2.895 20 4M9 18H4C2.8954 18 2 17.105 2 16V14.5C2 14.224 2.2239 14 2.5 14H9" strokeOpacity="0.4"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
