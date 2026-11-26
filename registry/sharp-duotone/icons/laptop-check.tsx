import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M21 13L21 17L3 17L3 3L13 3L13 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 16L22 16L22 20L2 20L2 16ZM15.7071 6.7071L18 9L22.2929 4.7071"/>
    </svg>
  )
}
