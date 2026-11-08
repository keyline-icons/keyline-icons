import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Joystick({ size = 24, ...props }: IconProps) {
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
      <path d="M16 3C18.2092 3 20 4.79 20 7C20 9.21 18.2092 11 16 11C15.7757 11 15.5556 10.98 15.3408 10.94L14.4287 13H19C20.6569 13 22 14.34 22 16V18C22 19.66 20.6569 21 19 21H5C3.3432 21 2 19.66 2 18V16C2 14.34 3.3432 13 5 13H12.2539C12.2673 12.95 12.2832 12.9 12.3047 12.85L13.5146 10.13C12.5937 9.4 12 8.27 12 7C12 4.79 13.7908 3 16 3Z" fill="currentColor"/>
    </svg>
  )
}
