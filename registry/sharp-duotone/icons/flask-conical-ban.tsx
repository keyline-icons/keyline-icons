import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalBan({ size = 24, ...props }: IconProps) {
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
      <path d="M3.5715 18L7.5 8L7.5 2L12.5 2L12.5 8L13.9705 11.0889L14.4749 12.1487M5 2L6 2L14 2L15 2" strokeOpacity="0.4"/>
      <path d="M13.1011 23L9 23L2.0001 23C1.4478 23 1.0001 22.5523 1.0001 22C1.0001 21.8749 1.0236 21.7508 1.0693 21.6344L2.8899 17.0001L11.0709 17.0001C11.0242 17.3267 11 17.6605 11 18C11 19.9587 11.8045 21.7295 13.1011 23Z" fill="currentColor" stroke="none"/>
      <path d="M15.1716 15.1716L20.8284 20.8284M18 14C20.2092 14 22 15.7908 22 18C22 20.2092 20.2092 22 18 22C15.7908 22 14 20.2092 14 18C14 15.7908 15.7908 14 18 14Z"/>
    </svg>
  )
}
