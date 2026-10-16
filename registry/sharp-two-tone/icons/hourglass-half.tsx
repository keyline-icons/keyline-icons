import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HourglassHalf({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3L4 3L3 3L3 1L21 1L21 3L19 3L19 7C19 7.2968 18.8682 7.5782 18.6402 7.7682L13.562 12L18.6402 16.2318C18.8682 16.4218 19 16.7032 19 17L19 21L21 21L21 23L3 23L3 21L5 21L5 17C5 16.7032 5.1318 16.4218 5.3598 16.2318L10.438 12L5.3598 7.7682C5.1318 7.5782 5 7.2968 5 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 2L21 2M3 22L21 22M6 2L6 7L12 12L18 7L18 2L6 2ZM6 22L6 17L12 12L18 17L18 22L6 22ZM7.2 8L16.8 8M6 18L18 18" fill="none"/>
    </svg>
  )
}
