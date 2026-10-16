import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaseUpper({ size = 24, ...props }: IconProps) {
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
      <path d="M1.9417 19.6637L7.1788 5L12.4158 19.6637M3.9645 14L10.3931 14" strokeOpacity="0.4"/>
      <path d="M15.6146 19.7127L18.8284 9L22.0422 19.7127M16.7284 16L20.9284 16"/>
    </svg>
  )
}
