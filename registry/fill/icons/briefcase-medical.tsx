import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BriefcaseMedical({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5.5L19 5.5C21.2091 5.5 23 7.2909 23 9.5L23 18C23 20.2091 21.2091 22 19 22L5 22C2.7909 22 1 20.2091 1 18L1 9.5C1 7.2909 2.7909 5.5 5 5.5ZM11 10C10.7239 10 10.5 10.2239 10.5 10.5L10.5 12C10.5 12.2761 10.2761 12.5 10 12.5L8.5 12.5C8.2239 12.5 8 12.7239 8 13L8 15C8 15.2761 8.2239 15.5 8.5 15.5L10 15.5C10.2761 15.5 10.5 15.7239 10.5 16L10.5 17.5C10.5 17.7761 10.7239 18 11 18L13 18C13.2761 18 13.5 17.7761 13.5 17.5L13.5 16C13.5 15.7239 13.7239 15.5 14 15.5L15.5 15.5C15.7761 15.5 16 15.2761 16 15L16 13C16 12.7239 15.7761 12.5 15.5 12.5L14 12.5C13.7239 12.5 13.5 12.2761 13.5 12L13.5 10.5C13.5 10.2239 13.2761 10 13 10L11 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8.25 6.5L8.25 6C8.25 4.3431 9.5931 3 11.25 3L12.75 3C14.4069 3 15.75 4.3431 15.75 6L15.75 6.5" fill="none"/>
    </svg>
  )
}
