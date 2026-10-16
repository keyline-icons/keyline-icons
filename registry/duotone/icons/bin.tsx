import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bin({ size = 24, ...props }: IconProps) {
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
      <path d="M5 6H19V19C19 21.2091 17.2091 23 15 23H9C6.79086 23 5 21.2091 5 19V6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 2L14 2M4 7L20 7"/>
    </svg>
  )
}
