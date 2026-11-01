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
      <path d="M11 11L4 11C3.4477 11 3 10.5523 3 10L3 3L11 11ZM21 21L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 14C3 13.4477 3.4477 13 4 13L13 13L21 21ZM9 18C9 17.4477 8.5523 17 8 17C7.4477 17 7 17.4477 7 18C7 18.5523 7.4477 19 8 19C8.5523 19 9 18.5523 9 18ZM13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18ZM4.6569 1L20 1C20.5523 1 21 1.4477 21 2L21 10C21 10.5523 20.5523 11 20 11L14.6569 11L4.6569 1ZM16.6569 13L20 13C20.5523 13 21 13.4477 21 14L21 17.3431L16.6569 13ZM13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6C11 6.5523 11.4477 7 12 7C12.5523 7 13 6.5523 13 6Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
