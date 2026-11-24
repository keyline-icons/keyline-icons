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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.988 10.0001C4.992 10 4.996 10 5 10L12 10L19 10C19.004 10 19.008 10 19.012 10.0001L21 10.0001C21.5523 10.0001 22 10.4478 22 11.0001C22 11.5524 21.5523 12.0001 21 12.0001L20 12.0001L20 20.0001L21 20.0001C21.5523 20.0001 22 20.4478 22 21.0001C22 21.5524 21.5523 22.0001 21 22.0001L3 22.0001C2.4477 22.0001 2 21.5524 2 21.0001C2 20.4478 2.4477 20.0001 3 20.0001L4 20.0001L4 16L4 12.0001L3 12.0001C2.4477 12.0001 2 11.5524 2 11.0001C2 10.4478 2.4477 10.0001 3 10.0001ZM11 12L11 20L13 20L13 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M4 3L8 7M20 3L16 7"/>
    </svg>
  )
}
