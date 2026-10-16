import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TablePivot({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8H20V5C20 3.34315 18.65685 2 17 2H5C3.34315 2 2 3.34315 2 5V17C2 18.65685 3.34315 20 5 20H8V8" strokeOpacity="0.4"/>
      <path d="M20 12V17C20 18.65685 18.65685 20 17 20H12M18 14L20 12L22 14M14 18L12 20L14 22"/>
    </svg>
  )
}
