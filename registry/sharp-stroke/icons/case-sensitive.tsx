import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaseSensitive({ size = 24, ...props }: IconProps) {
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
      <path d="M1.93 18.627L7.002 6L12.074 18.627M4.19 13H9.813M22.002 10V19M22.002 15C22.002 16.657 20.659 18 19.002 18C17.345 18 16.002 16.657 16.002 15C16.002 13.343 17.345 12 19.002 12C20.659 12 22.002 13.343 22.002 15Z"/>
    </svg>
  )
}
