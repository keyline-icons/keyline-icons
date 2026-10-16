import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LightbulbOn({ size = 24, ...props }: IconProps) {
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
      <path d="M10 18L14 18M11 22L13 22M20.5 12L22 12M3.5 12L2 12M12 3.5L12 2M5.9896 5.9896L4.9289 4.9289M18.0104 5.9896L19.0711 4.9289" strokeLinejoin="miter" strokeOpacity="0.4"/>
      <path d="M7.9689 14C7.6605 13.3784 7.5 12.6939 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4853 7.5 16.5 9.5147 16.5 12C16.5 12.6939 16.3395 13.3784 16.0311 14" strokeLinejoin="miter"/>
    </svg>
  )
}
