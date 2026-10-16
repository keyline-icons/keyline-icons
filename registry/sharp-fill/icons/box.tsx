import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Box({ size = 24, ...props }: IconProps) {
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
      <path d="M22 6.8477L22 17.1523L12 22L2 17.1523L2 6.8477L12 12L22 6.8477Z" fill="currentColor" stroke="none"/>
      <path d="M2 6.8477L12 12M12 12L22 6.8477M12 12L12 22M12 2L22 6.8477L22 17.1523L12 22L2 17.1523L2 6.8477L12 2Z" fill="none"/>
    </svg>
  )
}
