import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lightbulb({ size = 24, ...props }: IconProps) {
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
      <path d="M5.0718 14C4.3697 12.7838 4 11.4043 4 10C4 5.5817 7.5817 2 12 2C16.4183 2 20 5.5817 20 10C20 11.4043 19.6303 12.7838 18.9282 14M9 18L15 18M11 22L13 22"/>
    </svg>
  )
}
