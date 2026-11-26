import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RectangleGogglesOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19H16C15.696 19 15.409 18.8619 15.219 18.6247L12 14.6008L8.781 18.6247C8.591 18.8619 8.304 19 8 19H2C1.448 19 1 18.5523 1 18V6C1 5.4477 1.448 5 2 5H5L19 19ZM8.657 5H12H22C22.552 5 23 5.4477 23 6V18C23 18.3641 22.805 18.6828 22.514 18.8576L8.657 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 18H16L12 13L8 18H2V6H6M1.707 1.7071L22.293 22.2929"/>
    </svg>
  )
}
