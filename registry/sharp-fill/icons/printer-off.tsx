import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PrinterOff({ size = 24, ...props }: IconProps) {
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
      <path d="M9.0001 9.0001L16 16L7 16L7 20L2 20C1.4477 20 1 19.5523 1 19L1 10C1 9.4517 1.4413 9.0065 1.988 9.0001ZM20 20L17 20L17 17ZM12.6569 9L22 9C22.5523 9 23 9.4477 23 10L23 19C23 19.1038 22.9842 19.2039 22.9549 19.298Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M6.6569 2L7.6569 2L14 2L18 6L18 10M18 18L18 22L6 22L6 15L15 15M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
