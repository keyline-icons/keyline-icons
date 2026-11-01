import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Blinds({ size = 24, ...props }: IconProps) {
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
      <path d="M21 3.0001L21 11C21 13.2092 19.2092 15 17 15L7 15C4.7908 15 3 13.2092 3 11L3 3.0001L2 3.0001C1.4477 3.0001 1 2.5524 1 2.0001C1 1.4478 1.4477 1.0001 2 1.0001L3.988 1.0001C3.992 1 3.996 1 4 1L20 1C20.004 1 20.008 1 20.012 1.0001L22 1.0001C22.5523 1.0001 23 1.4478 23 2.0001C23 2.5524 22.5523 3.0001 22 3.0001L21 3.0001Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 6L16 6M8 10L16 10M12 14L12 18M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z" fill="none"/>
    </svg>
  )
}
