import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Calendar({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4H18C20.2091 4 22 5.79086 22 8V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V8C2 5.79086 3.79086 4 6 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 11L17 11M8 3L8 7M16 3L16 7"/>
    </svg>
  )
}
