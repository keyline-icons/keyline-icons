import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PillBottle({ size = 24, ...props }: IconProps) {
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
      <path d="M18.5 1C19.8807 1 21 2.12 21 3.5V5.5C21 6.32 20.6061 7.04 20 7.5V19C20 21.21 18.2092 23 16 23H8C5.7908 23 4 21.21 4 19V7.5C3.3939 7.04 3 6.32 3 5.5V3.5C3 2.12 4.1193 1 5.5 1H18.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 7V19C5 20.66 6.3431 22 8 22H16C17.6569 22 19 20.66 19 19V7M5.5 2H18.5C19.3284 2 20 2.67 20 3.5V5.5C20 6.33 19.3284 7 18.5 7H5.5C4.6716 7 4 6.33 4 5.5V3.5C4 2.67 4.6716 2 5.5 2Z"/>
      <path d="M11 10.5H13C13.2761 10.5 13.5 10.72 13.5 11V12.5C13.5 12.78 13.7239 13 14 13H15.5C15.7761 13 16 13.22 16 13.5V15.5C16 15.78 15.7761 16 15.5 16H14C13.7239 16 13.5 16.22 13.5 16.5V18C13.5 18.28 13.2761 18.5 13 18.5H11C10.7239 18.5 10.5 18.28 10.5 18V16.5C10.5 16.22 10.2761 16 10 16H8.5C8.2239 16 8 15.78 8 15.5V13.5C8 13.22 8.2239 13 8.5 13H10C10.2761 13 10.5 12.78 10.5 12.5V11C10.5 10.72 10.7239 10.5 11 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
