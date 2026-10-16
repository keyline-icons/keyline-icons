import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Repeat1({ size = 24, ...props }: IconProps) {
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
      <path d="M3 18L21 18L21 5L15.5 5M6.2929 14.7071L3 18L6.2929 21.2929" strokeOpacity="0.4"/>
      <path d="M10.5547 4.2968L12.5 3L12.5 10M3 12L3 5L8 5"/>
    </svg>
  )
}
