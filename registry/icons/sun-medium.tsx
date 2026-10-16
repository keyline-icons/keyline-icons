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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.5147 16.5 7.5 14.4853 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4853 7.5 16.5 9.5147 16.5 12ZM20.5 12L21 12M18.0104 18.0104L18.364 18.364M12 20.5L12 21M5.9896 18.0104L5.636 18.364M3.5 12L3 12M5.9896 5.9896L5.636 5.636M12 3.5L12 3M18.0104 5.9896L18.364 5.636" fill="none"/>
    </svg>
  )
}
