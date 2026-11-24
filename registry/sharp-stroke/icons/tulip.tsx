import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tulip({ size = 24, ...props }: IconProps) {
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
      <path d="M7 8L7 2.0011L9.5 6.0001L12 2.0017L14.5 6.0001L17 2.0011L17 8C17 10.7614 14.7614 13 12 13C9.2386 13 7 10.7614 7 8ZM12 13L12 22M12 22C7 22 4 20 4 16.5L4 15.4L5 15.5C8 15.8 12 18.5 12 22C17 22 20 20 20 16.5L20 15.4L19 15.5C16 15.8 12 18.5 12 22" fill="none"/>
    </svg>
  )
}
