import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Loader({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V6M16.24264 7.75736L19.07107 4.92893M18 12H22M16.24264 16.24264L19.07107 19.07107M12 18V22M7.75736 16.24264L4.92893 19.07107M2 12H6M7.75736 7.75736L4.92893 4.92893"/>
    </svg>
  )
}
