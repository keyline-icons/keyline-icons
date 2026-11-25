import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StrokeLineJoinBevel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 21V11.4142C3 11.149 3.1054 10.8946 3.2929 10.7071L10.7071 3.2929C10.8946 3.1054 11.149 3 11.4142 3H21M11 21V12C11 11.4477 11.4477 11 12 11H21"/>
    </svg>
  )
}
