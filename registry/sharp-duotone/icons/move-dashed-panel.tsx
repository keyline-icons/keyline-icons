import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoveDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7L3 3L7 3M9 3L14 3M20 8L20 3L16 3M8 20L3 20L3 16M3 9L3 14" strokeOpacity="0.4"/>
      <path d="M9 15L21 15M15 9L15 21M10.7929 13.2071L9 15L10.7929 16.7929M19.2071 13.2071L21 15L19.2071 16.7929M13.2071 10.7929L15 9L16.7929 10.7929M13.2071 19.2071L15 21L16.7929 19.2071"/>
    </svg>
  )
}
