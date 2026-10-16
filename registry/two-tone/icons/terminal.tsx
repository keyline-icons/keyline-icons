import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Terminal({ size = 24, ...props }: IconProps) {
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
      <path d="M4 5L10.5571 10.6204C10.7899 10.8199 10.7899 11.1801 10.5571 11.3796L4 17" strokeLinejoin="miter"/>
      <path d="M20 19L13 19" strokeLinejoin="miter" strokeOpacity="0.4"/>
    </svg>
  )
}
