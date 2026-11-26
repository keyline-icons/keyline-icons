import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BinX({ size = 24, ...props }: IconProps) {
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
      <path d="M5 6L19 6L19 19C19 21.2091 17.2091 23 15 23L9 23C6.7909 23 5 21.2091 5 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 2H14M4 7H20M10 13L14 17M14 13L10 17"/>
    </svg>
  )
}
