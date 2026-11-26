import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBoxOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L3 3M15 3L21 3L21 9M21 21L15 21M9 21L3 21L3 15M7 9.4239L12 12M12.3751 7.1818L17 9.4239L17 12.3431M12 12L12 17L7 14.5761L7 9.4239L8.6327 8.6327M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
