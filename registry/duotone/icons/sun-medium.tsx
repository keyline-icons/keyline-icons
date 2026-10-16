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
      <path d="M17.5 12C17.5 15.0376 15.0376 17.5 12 17.5C8.9624 17.5 6.5 15.0376 6.5 12C6.5 8.9624 8.9624 6.5 12 6.5C15.0376 6.5 17.5 8.9624 17.5 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20.5 12L21 12M18.0104 18.0104L18.364 18.364M12 20.5L12 21M5.9896 18.0104L5.636 18.364M3.5 12L3 12M5.9896 5.9896L5.636 5.636M12 3.5L12 3M18.0104 5.9896L18.364 5.636"/>
    </svg>
  )
}
