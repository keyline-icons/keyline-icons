import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZapOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17.6213 13.3786L20.9999 10L14.2426 10M13.1553 8.9127L14 3.0001L10.6214 6.3787M8.5 8.5L3.0001 14L11 14L10 20.9999L15.5 15.5M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
