import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCast({ size = 24, ...props }: IconProps) {
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
      <path d="M3.9852 9.1654L10.7072 3.4703C11.4532 2.8383 12.5468 2.8383 13.2928 3.4703L22 10.8473M20 9.1528L20 19C20 20.1046 19.1046 21 18 21L14 21" fill="none" strokeOpacity="0.4"/>
      <path d="M2 17C4.2091 17 6 18.7909 6 21M2 13C6.4183 13 10 16.5817 10 21"/>
      <path d="M3 21C3 21.5523 2.5523 22 2 22C1.4477 22 1 21.5523 1 21C1 20.4477 1.4477 20 2 20C2.5523 20 3 20.4477 3 21Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
