import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SymmetryVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M4 16.3168L4 7.6832C4 6.8592 4.5054 6.1195 5.273 5.82L17.2731 1.1377C17.5047 1.0473 17.7513 1.0009 18 1.0009C19.1045 1.0009 20 1.8963 20 3.0009L20 20.9991C20 22.1036 19.1046 22.999 18.0001 22.999C17.7513 22.999 17.5047 22.9526 17.273 22.8622L5.2729 18.18C4.5053 17.8804 4 17.1408 4 16.3168Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 12L22 12" fill="none"/>
    </svg>
  )
}
