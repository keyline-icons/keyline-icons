import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MouseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17.4697 17.4697C16.5283 19.5515 14.4333 21 12 21C8.6863 21 6 18.3137 6 15L6 9C6 8.1196 6.1896 7.2835 6.5303 6.5303M8.4056 4.0922L9.2982 3.6413C10.1102 3.2311 11.0281 3 12 3C15.3137 3 18 5.6863 18 9L18 13.3431M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
