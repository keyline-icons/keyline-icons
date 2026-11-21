import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Postcard({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 7L18 7C18.5523 7 19 7.4477 19 8L19 12C19 12.5523 18.5523 13 18 13L14 13C13.4477 13 13 12.5523 13 12L13 8C13 7.4477 13.4477 7 14 7Z" fill="currentColor" stroke="none"/>
      <path d="M5 12L6 12L10 12L11 12M5 16L6 16L14 16L15 16"/>
    </svg>
  )
}
