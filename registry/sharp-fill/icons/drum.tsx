import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Drum({ size = 24, ...props }: IconProps) {
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
      <path d="M4.988 10.0001C4.992 10 4.996 10 5 10L12 10L19 10C19.004 10 19.008 10 19.012 10.0001L21 10.0001L22 10.0001L22 12.0001L21 12.0001L20 12.0001L20 20.0001L22 20.0001L22 22.0001L2 22.0001L2 20.0001L4 20.0001L4 16L4 12.0001L3 12.0001L2 12.0001L2 10.0001L3 10.0001ZM11 12L11 20L13 20L13 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3.7071 2.7071L4 3L8 7L8.2929 7.2929M20.2929 2.7071L20 3L16 7L15.7071 7.2929"/>
    </svg>
  )
}
