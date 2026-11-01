import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RepeatOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18.5858 7L10.6569 7L10.6569 5L18.5858 5L17 3.4142L18.4142 2L21.7071 5.2929C21.8946 5.4804 22 5.7348 22 6C22 6.2652 21.8946 6.5196 21.7071 6.7071L18.4142 10L17 8.5858L18.5858 7ZM22 11L22 16.3431L20 16.3431L20 11L22 11Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 13L3 6L6 6" fill="none" strokeOpacity="0.4"/>
      <path d="M18 18L3 18M6.2929 21.2929L3 18L6.2929 14.7071M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
