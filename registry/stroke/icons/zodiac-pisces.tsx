import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacPisces({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3C6.8802 4.2851 9.5 7.9125 9.5 12C9.5 16.0875 6.8802 19.7149 3 21M21 3C17.1198 4.2851 14.5 7.9125 14.5 12C14.5 16.0875 17.1198 19.7149 21 21M5 12L19 12"/>
    </svg>
  )
}
