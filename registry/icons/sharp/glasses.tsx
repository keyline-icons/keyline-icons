import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Glasses({ size = 24, ...props }: IconProps) {
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
      <path d="M10 15C10 17.2091 8.2091 19 6 19C3.7909 19 2 17.2091 2 15C2 12.7909 3.7909 11 6 11C8.2091 11 10 12.7909 10 15ZM22 15C22 17.2091 20.2091 19 18 19C15.7909 19 14 17.2091 14 15C14 12.7909 15.7909 11 18 11C20.2091 11 22 12.7909 22 15ZM10 15C11 13.5 13 13.5 14 15M2.489 13.0309L2.5 13L4.2924 7.9826C4.7424 6.8011 5.6202 5.8924 6.7041 5.486L8 5L8.1698 4.9363M21.511 13.0309L21.5 13L19.7076 7.9826C19.2576 6.8011 18.3798 5.8924 17.2959 5.486L16 5L15.8302 4.9363"/>
    </svg>
  )
}
