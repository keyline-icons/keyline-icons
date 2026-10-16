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
      <path d="M12 18L12 22M7.7574 16.2426L4.9289 19.0711M2 12L6 12M7.7574 7.7574L4.9289 4.9289" strokeOpacity="0.4"/>
      <path d="M12 2L12 6M16.2426 7.7574L19.0711 4.9289M18 12L22 12M16.2426 16.2426L19.0711 19.0711"/>
    </svg>
  )
}
