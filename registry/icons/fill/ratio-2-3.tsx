import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio23({ size = 24, ...props }: IconProps) {
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
      <path d="M4 5C4 2.7909 5.7909 1 8 1L16 1C18.2091 1 20 2.7909 20 5L20 19C20 21.2091 18.2091 23 16 23L8 23C5.7909 23 4 21.2091 4 19L4 5Z" fill="currentColor"/>
    </svg>
  )
}
