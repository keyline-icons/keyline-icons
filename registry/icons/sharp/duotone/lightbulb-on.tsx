import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightbulbOn({ size = 24, ...props }: IconProps) {
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
      <path d="M9 18L15 18M10 22L14 22M19.5 12L23 12M4.5 12L1 12M12 4.5L12 1M6.6967 6.6967L4.2218 4.2218M17.3033 6.6967L19.7782 4.2218" strokeOpacity="0.4"/>
      <path d="M8.0129 14.0886L7.9689 14C7.6605 13.3784 7.5 12.6939 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4853 7.5 16.5 9.5147 16.5 12C16.5 12.6939 16.3395 13.3784 16.0311 14L15.9871 14.0886"/>
    </svg>
  )
}
