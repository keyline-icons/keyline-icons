import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SunMedium({ size = 24, ...props }: IconProps) {
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
      <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.5147 16.5 7.5 14.4853 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4853 7.5 16.5 9.5147 16.5 12ZM19.5 12L22 12M17.3033 17.3033L19.0711 19.0711M12 19.5L12 22M6.6967 17.3033L4.9289 19.0711M4.5 12L2 12M6.6967 6.6967L4.9289 4.9289M12 4.5L12 2M17.3033 6.6967L19.0711 4.9289" fill="none"/>
    </svg>
  )
}
