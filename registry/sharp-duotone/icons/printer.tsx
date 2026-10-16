import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Printer({ size = 24, ...props }: IconProps) {
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
      <path d="M6 10L6 2L14 2L18 6L18 10M6 15L18 15L18 22L6 22L6 15Z" strokeOpacity="0.4"/>
      <path d="M2 9L22 9C22.5523 9 23 9.4477 23 10L23 19C23 19.5523 22.5523 20 22 20L2 20C1.4477 20 1 19.5523 1 19L1 10C1 9.4477 1.4477 9 2 9ZM7 16L7 20L17 20L17 16L7 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
