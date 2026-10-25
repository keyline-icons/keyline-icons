import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrafficCone({ size = 24, ...props }: IconProps) {
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
      <path d="M3.0422 21.7127L8.6146 3.138C8.9953 1.869 10.1633 1 11.4881 1L12.5119 1C13.8367 1 15.0047 1.869 15.3854 3.138L20.9578 21.7127C20.9858 21.8059 21 21.9027 21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22C3 21.9027 3.0142 21.8059 3.0422 21.7127ZM9.344 7.6667L8.744 9.6667L15.256 9.6667L14.656 7.6667L9.344 7.6667ZM7.344 14.3333L6.744 16.3333L17.256 16.3333L16.656 14.3333L7.344 14.3333Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 22L22 22" fill="none"/>
    </svg>
  )
}
