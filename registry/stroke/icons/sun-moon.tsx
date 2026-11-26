import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SunMoon({ size = 24, ...props }: IconProps) {
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
      <path d="M9 8C5.134 8 2 11.134 2 15C2 18.866 5.134 22 9 22C12.866 22 16 18.866 16 15C15.1345 15.6491 14.0819 16 13 16C10.2386 16 8 13.7614 8 11C8 9.9181 8.3509 8.8655 9 8ZM13 4.5V2M17.5962 6.4038L19.364 4.636M19.5 11H22"/>
    </svg>
  )
}
