import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleChampagne({ size = 24, ...props }: IconProps) {
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
      <path d="M5.5 5V6.5C5.5 8.5 3 9.5 3 12V15M5.5 5H8.5M5.5 5C5.2239 5 5 4.7761 5 4.5V2.5C5 2.2239 5.2239 2 5.5 2H8.5C8.7761 2 9 2.2239 9 2.5V4.5C9 4.7761 8.7761 5 8.5 5M3 15V20C3 21.1046 3.8954 22 5 22H9C10.1046 22 11 21.1046 11 20V15M3 15H11M11 15V12C11 9.5 8.5 8.5 8.5 6.5V5M18 16C19.1046 16 21 14.2091 21 12V6H15V12C15 14.2091 16.8954 16 18 16ZM18 16V22M18 22H15M18 22H21"/>
    </svg>
  )
}
