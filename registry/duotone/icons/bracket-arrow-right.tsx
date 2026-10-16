import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BracketArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M11.1093 4L6 4C3.7909 4 2 5.7909 2 8L2 16C2 18.2091 3.7909 20 6 20L11.1093 20" strokeOpacity="0.4"/>
      <path d="M21.2307 12L11.1093 12M16.17 6.5L21.8359 11.6314C22.0547 11.8296 22.0547 12.1704 21.8359 12.3686L16.17 17.5"/>
    </svg>
  )
}
