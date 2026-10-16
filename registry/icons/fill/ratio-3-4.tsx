import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio34({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 5C3 2.7909 4.7909 1 7 1L17 1C19.2091 1 21 2.7909 21 5L21 19C21 21.2091 19.2091 23 17 23L7 23C4.7909 23 3 21.2091 3 19L3 5Z" fill="currentColor"/>
    </svg>
  )
}
