import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WindowAwningOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M20 2C20.486 2 20.902 2.35 20.985 2.829L22.89 13.829C22.94 14.12 22.86 14.418 22.67 14.644C22.48 14.869 22.199 15 21.904 15H21V20H23V22H1V20H3V15H2.096C1.801 15 1.521 14.869 1.331 14.644C1.141 14.418 1.06 14.12 1.11 13.829L3.015 2.829L3.034 2.741C3.15 2.308 3.544 2 4 2H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 14H2.095L4 3H12M4 14H20M4 14V21M12 3H20L21.904 14H20M12 3V14M20 14V21M3.048 8.5H20.952M1 21H23"/>
    </svg>
  )
}
