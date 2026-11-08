import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function School({ size = 24, ...props }: IconProps) {
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
      <path d="M10 22V18C10 16.9 10.895 16 12 16C13.105 16 14 16.9 14 18V22M18 11V14M18 16V19M6 11V14M6 16V19M6 8H2V22H22V8H18V6L12 2L6 6.02V8ZM12 12C10.895 12 10 11.1 10 10C10 8.9 10.895 8 12 8C13.105 8 14 8.9 14 10C14 11.1 13.105 12 12 12Z"/>
    </svg>
  )
}
