import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ExpandDashedDownRight({ size = 24, ...props }: IconProps) {
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
      <path d="M6 10L6 21M2.7071 17.7071L6 21L9.2929 17.7071M10 6L21 6M17.7071 9.2929L21 6L17.7071 2.7071M21 12L21 15.3333M21 17.3333L21 21L17.3333 21M15.3333 21L12 21"/>
    </svg>
  )
}
