import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagHorizontalStart({ size = 24, ...props }: IconProps) {
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
      <path d="M22 4L9.1716 4L2 12L9.1716 20L22 20L22 4Z"/>
      <path d="M10.5 12C10.5 12.8284 9.8284 13.5 9 13.5C8.1716 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.1716 10.5 9 10.5C9.8284 10.5 10.5 11.1716 10.5 12Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
