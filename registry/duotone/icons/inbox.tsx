import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Inbox({ size = 24, ...props }: IconProps) {
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
      <path d="M8.6794 3L15.3206 3C16.7118 3 18.0031 3.7229 18.7304 4.9089L22.4099 10.9089C22.7958 11.5381 23 12.2619 23 13L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 13C1 12.2619 1.2042 11.5381 1.5901 10.9089L5.2696 4.9089C5.9969 3.7229 7.2882 3 8.6794 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 13L8 13L10 16L14 16L16 13L22 13"/>
    </svg>
  )
}
