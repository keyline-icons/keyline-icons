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
      <path d="M6 19L2 19L2 10L10 10M14.6569 10L15.6569 10L22 10L22 16.3431L22 17.3431M6.6569 2L7.6569 2L14 2L18 6L18 10M18 18L18 22L6 22L6 15L15 15M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
