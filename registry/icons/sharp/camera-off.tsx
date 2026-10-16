import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CameraOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20L2 20L2 6L6 6M8.6569 4L14.9999 4L16.5 6L22 6L22 17.3431M14.5619 14.5619C14.035 15.4244 13.0847 16 12 16C10.3431 16 9 14.6569 9 13C9 11.9153 9.5756 10.965 10.4381 10.4381M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
