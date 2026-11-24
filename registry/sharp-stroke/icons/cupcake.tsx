import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cupcake({ size = 24, ...props }: IconProps) {
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
      <path d="M12 9L12 5M15 14L14 22M9 14L10 22M5 14L21 14L21 13C21 10.7909 19.2091 9 17 9L7 9C4.7909 9 3 10.7909 3 13L3 14ZM5 14L7.0001 22L16.9999 22L19 14" fill="none"/>
      <path d="M13 2C13 2.5523 12.5523 3 12 3C11.4477 3 11 2.5523 11 2C11 1.4477 11.4477 1 12 1C12.5523 1 13 1.4477 13 2Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
