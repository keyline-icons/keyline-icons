import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Easel({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L20 2C20.5523 2 21 2.4477 21 3L21 16C21 16.5523 20.5523 17 20 17L4 17C3.4477 17 3 16.5523 3 16L3 3C3 2.4477 3.4477 2 4 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 16L23 16M8 16L6.2862 21.7127M16 16L17.7138 21.7127M12 16L12 20"/>
    </svg>
  )
}
