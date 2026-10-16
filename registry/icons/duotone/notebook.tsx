import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Notebook({ size = 24, ...props }: IconProps) {
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
      <path d="M4 5C4 2.7909 5.7909 1 8 1L18 1C20.2091 1 22 2.7909 22 5L22 19C22 21.2091 20.2091 23 18 23L8 23C5.7909 23 4 21.2091 4 19L4 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 7L7 7M3 12L7 12M3 17L7 17M17 6L17 18" fill="none"/>
    </svg>
  )
}
