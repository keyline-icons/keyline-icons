import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RepeatOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3 13L3 6L6 6M18 18L3 18M6.2929 21.2929L3 18L6.2929 14.7071M10.6569 6L21 6M17.7071 2.7071L21 6L17.7071 9.2929M21 11L21 16.3431M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
