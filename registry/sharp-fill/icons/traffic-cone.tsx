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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.0422 21.7127L9.0422 1.7127C9.1691 1.2897 9.5584 1 10 1L14 1C14.4416 1 14.8309 1.2897 14.9578 1.7127L20.9578 21.7127C20.9858 21.8059 21 21.9027 21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22C3 21.9027 3.0142 21.8059 3.0422 21.7127ZM9.344 7.6667L8.744 9.6667L15.256 9.6667L14.656 7.6667L9.344 7.6667ZM7.344 14.3333L6.744 16.3333L17.256 16.3333L16.656 14.3333L7.344 14.3333Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1 22L23 22" fill="none"/>
    </svg>
  )
}
