import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SunRain({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 12C7.5 9.515 9.5147 7.5 12 7.5C14.4853 7.5 16.5 9.515 16.5 12M2 12H3.5M20.5 12H22M4.9289 4.929L5.9896 5.99M19.0711 4.929L18.0104 5.99M12 3.5V2" strokeOpacity="0.4"/>
      <path d="M4 16H20M7 20L6 22M12 20L11 22M17 20L16 22"/>
    </svg>
  )
}
