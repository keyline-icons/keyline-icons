import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DoorOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M18 21L18 4C18 3.4477 17.5523 3 17 3L14 3" strokeOpacity="0.4"/>
      <path d="M2 21L10.5517 21M14 21L22 21"/>
      <path d="M12 11C12 10.4477 11.5523 10 11 10C10.4477 10 10 10.4477 10 11L10 13C10 13.5523 10.4477 14 11 14C11.5523 14 12 13.5523 12 13L12 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6.4402 2.83L12.4402 1.0805C12.622 1.0275 12.8105 1.0006 13 1.0006C14.1046 1.0006 15 1.896 15 3.0006L15 22C15 22.5523 14.5523 23 14 23C13.9058 23 13.812 22.9867 13.7215 22.9604L6.443 20.8497C5.5881 20.6018 5 19.8188 5 18.9288L5 4.7501C5 3.8611 5.5867 3.0789 6.4402 2.83ZM12 11C12 10.4477 11.5523 10 11 10C10.4477 10 10 10.4477 10 11L10 13C10 13.5523 10.4477 14 11 14C11.5523 14 12 13.5523 12 13L12 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
