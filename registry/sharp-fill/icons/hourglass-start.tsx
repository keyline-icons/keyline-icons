import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HourglassStart({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3L4 3L3 3L3 1L21 1L21 3L19 3L19 7C19 7.2968 18.8682 7.5782 18.6402 7.7682L13.562 12L18.6402 16.2318C18.8682 16.4218 19 16.7032 19 17L19 21L21 21L21 23L3 23L3 21L5 21L5 17C5 16.7032 5.1318 16.4218 5.3598 16.2318L10.438 12L5.3598 7.7682C5.1318 7.5782 5 7.2968 5 7ZM7 3L7 5L17 5L17 3ZM12 13.3017L7 17.4684L7 21L17 21L17 17.4684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
