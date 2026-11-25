import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacVirgo({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14L2 6C2 4.3431 3.3431 3 5 3C6.6569 3 8 4.3431 8 6L8 14M8 6C8 4.3431 9.3431 3 11 3C12.6569 3 14 4.3431 14 6L14 22M14 11L18 11C20.2091 11 22 12.7909 22 15C22 17.2091 20.2091 19 18 19L9 19" fill="none"/>
    </svg>
  )
}
