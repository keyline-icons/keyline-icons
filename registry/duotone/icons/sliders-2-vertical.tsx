import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sliders2Vertical({ size = 24, ...props }: IconProps) {
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
      <path d="M7 3L7 6M7 14L7 21M17 3L17 10M17 18L17 21" strokeOpacity="0.4"/>
      <path d="M3 9C3 6.7909 4.7909 5 7 5C9.2091 5 11 6.7909 11 9L11 11C11 13.2091 9.2091 15 7 15C4.7909 15 3 13.2091 3 11L3 9ZM13 13C13 10.7909 14.7909 9 17 9C19.2091 9 21 10.7909 21 13L21 15C21 17.2091 19.2091 19 17 19C14.7909 19 13 17.2091 13 15L13 13Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
