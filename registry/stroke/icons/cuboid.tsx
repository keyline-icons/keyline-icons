import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cuboid({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8L7.7071 3.2929C7.8946 3.1054 8.149 3 8.4142 3L21 3L21 15.5858C21 15.851 20.8946 16.1054 20.7071 16.2929L16 21L4 21C3.4477 21 3 20.5523 3 20L3 8ZM3 8L16 8L16 21M16 8L21 3" fill="none"/>
    </svg>
  )
}
