import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarTaxiFront({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12L21 12L21 20L3 20ZM5.0513 12L5.35177 11L6 6L18 6L18.6482 11L18.9487 12M8.63617 6L10.5 2L13.5 2L15.3638 6M18 20L19 20L19 22L18 22ZM5 20L6 20L6 22L5 22ZM5.35177 11L2.5 11M18.6482 11L21.5 11M6 16L9 16M15 16L18 16" fill="none"/>
    </svg>
  )
}
