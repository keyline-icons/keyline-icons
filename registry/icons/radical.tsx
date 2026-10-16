import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radical({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14L4.0159 12.656C4.5307 12.3129 5.2305 12.5148 5.4833 13.0794L8.3172 19.4085C8.7054 20.2756 9.9704 20.1635 10.2002 19.2418L13.811 4.7581C13.9221 4.3126 14.3222 4 14.7813 4L22 4"/>
    </svg>
  )
}
