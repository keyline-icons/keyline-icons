import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Repeat1({ size = 24, ...props }: IconProps) {
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
      <path d="M3 18L17 18C19.2091 18 21 16.2091 21 14L21 9C21 6.7909 19.2091 5 17 5L16.5 5M6 15L3 18L6 21" strokeOpacity="0.4"/>
      <path d="M11 4L12.5 3L12.5 9M3 11L3 9C3 6.7909 4.7909 5 7 5"/>
    </svg>
  )
}
