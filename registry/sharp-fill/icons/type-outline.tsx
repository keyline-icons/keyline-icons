import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeOutline({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 2L22 2C22.5523 2 23 2.4477 23 3L23 11C23 11.5523 22.5523 12 22 12L18 12C17.4477 12 17 11.5523 17 11L17 8L15 8L15 16L18 16C18.5523 16 19 16.4477 19 17L19 21C19 21.5523 18.5523 22 18 22L6 22C5.4477 22 5 21.5523 5 21L5 17C5 16.4477 5.4477 16 6 16L9 16L9 8L7 8L7 11C7 11.5523 6.5523 12 6 12L2 12C1.4477 12 1 11.5523 1 11L1 3C1 2.4477 1.4477 2 2 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
