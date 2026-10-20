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
      <path d="M5 16.3168L5 7.6832C5 7.2712 5.2527 6.9014 5.6365 6.7516L17.6365 2.0693C18.2922 1.8135 19 2.2971 19 3.0009L19 20.9991C19 21.7029 18.2922 22.1865 17.6365 21.9306L5.6365 17.2484C5.2527 17.0986 5 16.7288 5 16.3168ZM2 12L22 12" fill="none"/>
    </svg>
  )
}
