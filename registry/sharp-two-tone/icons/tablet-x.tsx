import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TabletX({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 3L22 3C22.5523 3 23 3.44772 23 4L23 11L13 11L13 21L2 21C1.44772 21 1 20.5523 1 20L1 4C1 3.44772 1.44772 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 11L22 4L2 4L2 20L13 20M22.2929 13.7071L15.7071 20.2929M15.7071 13.7071L22.2929 20.2929"/>
      <path d="M13.5 8.5C13.5 9.3284 12.8284 10 12 10C11.1716 10 10.5 9.3284 10.5 8.5C10.5 7.6716 11.1716 7 12 7C12.8284 7 13.5 7.6716 13.5 8.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
