import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlipHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M1.9999 7.0001L8 12L1.9999 16.9999L1.9999 7.0001ZM22.0001 7.0001L16.0001 12L22.0001 16.9999L22.0001 7.0001ZM12 1L12 5M12 7L12 11M12 13L12 17M12 19L12 23" fill="none"/>
    </svg>
  )
}
