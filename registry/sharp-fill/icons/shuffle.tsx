import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shuffle({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6L8.308 6L10.5316 9.6139M13.4684 14.3861L15.692 18L21 18M2 18L8.308 18L15.692 6L21 6M17.7071 2.7071L21 6L17.7071 9.2929M17.7071 14.7071L21 18L17.7071 21.2929"/>
    </svg>
  )
}
