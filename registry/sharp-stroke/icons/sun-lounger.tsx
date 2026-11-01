import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SunLounger({ size = 24, ...props }: IconProps) {
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
      <path d="M2 20L22 20M6 20L6 23M6 20L3.7031 16.5547M18 20L18 23M12 11.6C9.5 9 5 9.5 3 11.6C3 9.6 4.575 7.8 6.4875 6.2C8.4 4.6 10.65 3.2 12 2C13.35 3.2 15.6 4.6 17.5125 6.2C19.425 7.8 21 9.6 21 11.6C18.5 9 14 9.5 12 11.6ZM12 11.6L12 20" fill="none"/>
    </svg>
  )
}
