import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SliderHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M17 15C18.864 15 20.43 16.27 20.874 18H23V20H20.874C20.43 21.73 18.864 23 17 23H15C13.136 23 11.57 21.73 11.126 20H1V18H11.126C11.57 16.27 13.136 15 15 15H17ZM22 1C22.552 1 23 1.45 23 2V12C23 12.55 22.552 13 22 13H2C1.448 13 1 12.55 1 12V2C1 1.45 1.448 1 2 1H22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 19C20 17.34 18.657 16 17 16H15C13.343 16 12 17.34 12 19M20 19C20 20.66 18.657 22 17 22H15C13.343 22 12 20.66 12 19M20 19H23M12 19H1M2 2V12H22V2H2Z"/>
    </svg>
  )
}
