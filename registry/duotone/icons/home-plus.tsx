import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomePlus({ size = 24, ...props }: IconProps) {
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
      <path d="M21 12L21 20C20.9999 21.6568 19.6568 23 18 23L4 23C2.34318 23 1.00011 21.6568 1 20L1 11.9268C1.00002 11.0452 1.38775 10.20775 2.06055 9.63773L9.0605 3.70707C10.0406 2.8767 11.4213 2.7737 12.5008 3.398C12.8099 3.5767 13 3.907 13 4.264L13 8C13 9.6569 14.3431 11 16 11L20 11C20.5523 11 21 11.4477 21 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 22L8 15L14 15L14 22M19 2V8M16 5H22"/>
    </svg>
  )
}
