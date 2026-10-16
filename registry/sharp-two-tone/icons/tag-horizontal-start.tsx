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
      <path d="M22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L9.1716 21C8.8874 21 8.6167 20.8791 8.427 20.6675L1.2554 12.6675C0.9149 12.2876 0.9149 11.7124 1.2554 11.3325L8.427 3.3325C8.6167 3.1209 8.8874 3 9.1716 3L22 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 4L9.1716 4L2 12L9.1716 20L22 20L22 4Z"/>
      <path d="M10.5 12C10.5 12.8284 9.8284 13.5 9 13.5C8.1716 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.1716 10.5 9 10.5C9.8284 10.5 10.5 11.1716 10.5 12Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
