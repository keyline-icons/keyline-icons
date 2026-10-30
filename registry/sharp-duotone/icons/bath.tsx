import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bath({ size = 24, ...props }: IconProps) {
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
      <path d="M2.988 10.0001C2.992 10 2.996 10 3 10L21 10C21.004 10 21.008 10 21.012 10.0001L23 10.0001L23 12.0001L22 12.0001L22 19C22 19.5523 21.5523 20 21 20L3 20C2.4477 20 2 19.5523 2 19L2 12.0001L1 12.0001L1 10.0001L2.988 10.0001Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 11L3 6C3 4.3431 4.3431 3 6 3C7.0463 3 8.0169 3.5451 8.5615 4.4384M7.2071 5.7929L10.2929 2.7071M8 19L6.7236 21.5528M16 19L17.2764 21.5528" fill="none"/>
    </svg>
  )
}
