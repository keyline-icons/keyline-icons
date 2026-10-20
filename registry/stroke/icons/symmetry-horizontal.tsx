import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SymmetryHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M7.6832 5L16.3168 5C16.7288 5 17.0986 5.2527 17.2484 5.6365L21.9307 17.6365C22.1865 18.2922 21.7029 19 20.9991 19L3.0009 19C2.2971 19 1.8135 18.2922 2.0694 17.6365L6.7516 5.6365C6.9014 5.2527 7.2712 5 7.6832 5ZM12 2L12 22" fill="none"/>
    </svg>
  )
}
