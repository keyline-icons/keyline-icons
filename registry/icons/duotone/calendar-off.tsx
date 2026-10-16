import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H11C11.2761 12 11.5261 11.888 11.707 11.707L20.8281 20.8281C20.1043 21.552 19.1046 22 18 22H6C3.7909 22 2 20.2091 2 18V8C2 6.3778 2.96572 4.98112 4.35352 4.35352L10 10Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 4C20.2091 4 22 5.7909 22 8V15.3428C22 15.7472 21.7564 16.1117 21.3828 16.2666C21.0092 16.4214 20.579 16.3366 20.293 16.0508L9.94922 5.70703C9.66344 5.42103 9.57865 4.99077 9.7334 4.61719C9.88825 4.24362 10.2528 4 10.6572 4H18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
