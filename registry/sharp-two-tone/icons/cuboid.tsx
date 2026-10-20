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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.2929 7.2929L7.2929 2.2929C7.4804 2.1054 7.7348 2 8 2L21 2C21.5523 2 22 2.4477 22 3L22 16C22 16.2652 21.8946 16.5196 21.7071 16.7071L16.7071 21.7071C16.5196 21.8946 16.2652 22 16 22L3 22C2.4477 22 2 21.5523 2 21L2 8C2 7.7348 2.1054 7.4804 2.2929 7.2929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 8L8 3L21 3L21 16L16 21L3 21ZM3 8L16 8L16 21M16 8L21 3" fill="none"/>
    </svg>
  )
}
