import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardCode({ size = 24, ...props }: IconProps) {
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
      <path d="M18 3L20 3C20.5523 3 21 3.4477 21 4L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 4C3 3.4477 3.4477 3 4 3L6 3L6 2C6 1.4477 6.4477 1 7 1L17 1C17.5523 1 18 1.4477 18 2L18 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 4L4 4L4 22L20 22L20 4L17 4M7 2L17 2L17 7L7 7L7 2ZM10.2969 11.5547L8 15L10.2969 18.4453M13.7031 11.5547L16 15L13.7031 18.4453" fill="none"/>
    </svg>
  )
}
