import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableColumnsAddBefore({ size = 24, ...props }: IconProps) {
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
      <path d="M4 18L4 21L13 21M13 3L4 3L4 6" strokeOpacity="0.4"/>
      <path d="M12 22L12 2L22 2C22.5523 2 23 2.4477 23 3L23 21C23 21.5523 22.5523 22 22 22L12 22Z" fill="currentColor" stroke="none"/>
      <path d="M5 8L5 16M1 12L9 12"/>
    </svg>
  )
}
