import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudMoonLightning({ size = 24, ...props }: IconProps) {
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
      <path d="M9 18.887L8.5 18.598C7.572 18.062 7 17.072 7 16C7 14.343 8.343 13 10 13C10 10.515 12.015 8.5 14.5 8.5C16.985 8.5 19 10.515 19 13C20.657 13 22 14.343 22 16C22 17.072 21.428 18.062 20.5 18.598L20 18.887M4.016 13.226L3.719 12.904C2.614 11.704 2 10.132 2 8.5C2 4.91 4.91 2 8.5 2C7.844 2.82 7.487 3.839 7.487 4.889C7.487 5.747 7.725 6.588 8.176 7.318L8.469 7.793M15.798 17.169L13.25 20H16.25L13.716 22.253"/>
    </svg>
  )
}
