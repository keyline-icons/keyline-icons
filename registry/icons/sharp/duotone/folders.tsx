import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Folders({ size = 24, ...props }: IconProps) {
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
      <path d="M5 9L3 9L3 21L16 21L16 19" strokeOpacity="0.4"/>
      <path d="M8 2L12 2C12.2652 2 12.5196 2.1054 12.7071 2.2929L14.4142 4L21 4C21.5523 4 22 4.4477 22 5L22 16C22 16.5523 21.5523 17 21 17L8 17C7.4477 17 7 16.5523 7 16L7 3C7 2.4477 7.4477 2 8 2Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
