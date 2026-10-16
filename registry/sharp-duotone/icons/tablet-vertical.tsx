import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TabletVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M20 23C20.5523 23 21 22.5523 21 22L21 2C21 1.4477 20.5523 1 20 1L4 1C3.4477 1 3 1.4477 3 2L3 22C3 22.5523 3.4477 23 4 23L20 23Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8.5 13.5C9.3284 13.5 10 12.8284 10 12C10 11.1716 9.3284 10.5 8.5 10.5C7.6716 10.5 7 11.1716 7 12C7 12.8284 7.6716 13.5 8.5 13.5Z" fill="currentColor"/>
    </svg>
  )
}
