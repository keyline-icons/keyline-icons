import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ServerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 11H4C3.448 11 3 10.552 3 10V3L11 11ZM21 21V22C21 22.552 20.552 23 20 23H4C3.448 23 3 22.552 3 22V14C3 13.448 3.448 13 4 13H13L21 21ZM4.743 1H20C20.552 1 21 1.448 21 2V10C21 10.552 20.552 11 20 11H14.743L4.743 1ZM16.743 13H20C20.552 13 21 13.448 21 14V17.257L16.743 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 18C9 18.552 8.552 19 8 19C7.448 19 7 18.552 7 18C7 17.448 7.448 17 8 17C8.552 17 9 17.448 9 18ZM13 18C13 18.552 12.552 19 12 19C11.448 19 11 18.552 11 18C11 17.448 11.448 17 12 17C12.552 17 13 17.448 13 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 10H4V4M20 20V22H4V14H14M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
