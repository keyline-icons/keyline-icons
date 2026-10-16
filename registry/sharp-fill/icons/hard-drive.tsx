import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HardDrive({ size = 24, ...props }: IconProps) {
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
      <path d="M1.0809 10.6061L4.0809 3.6061C4.2384 3.2384 4.6 3 5 3L19 3C19.4 3 19.7616 3.2384 19.9191 3.6061L22.9191 10.6061C22.9725 10.7306 23 10.8646 23 11L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 11C1 10.8646 1.0275 10.7306 1.0809 10.6061ZM3.5165 10L20.4835 10L18.3406 5L5.6594 5L3.5165 10ZM19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17C18.3284 17 19 16.3284 19 15.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
