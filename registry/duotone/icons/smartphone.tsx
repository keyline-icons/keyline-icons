import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Smartphone({ size = 24, ...props }: IconProps) {
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
      <path d="M20 6V18C20 20.7614 17.7614 23 15 23H9C6.23858 23 4 20.7614 4 18V6C4 3.23858 6.23858 1 9 1H15C17.7614 1 20 3.23858 20 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.5 6L13.5 6"/>
    </svg>
  )
}
