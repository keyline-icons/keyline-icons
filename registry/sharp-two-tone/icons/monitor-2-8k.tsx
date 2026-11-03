import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor28k({ size = 24, ...props }: IconProps) {
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
      <path d="M2 2L22 2C22.5523 2 23 2.4477 23 3L23 17C23 17.5523 22.5523 18 22 18L2 18C1.4477 18 1 17.5523 1 17L1 3C1 2.4477 1.4477 2 2 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 3L22 3L22 17L2 17ZM12 17L12 21M7 21L17 21M8 10C9.1 10 10 9.33 10 8.5C10 7.67 9.1 7 8 7C6.9 7 6 7.67 6 8.5C6 9.33 6.9 10 8 10ZM8 10C6.9 10 6 10.67 6 11.5C6 12.33 6.9 13 8 13C9.1 13 10 12.33 10 11.5C10 10.67 9.1 10 8 10ZM14 6L14 14M18 7L14 10.8M15.2 9.66L18 13" fill="none"/>
    </svg>
  )
}
