import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Headset({ size = 24, ...props }: IconProps) {
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
      <path d="M4 10C4 8.8954 4.8954 8 6 8L8 8L8 18L6 18C4.8954 18 4 17.1046 4 16L4 10ZM20 10C20 8.8954 19.1046 8 18 8L16 8L16 18L18 18C19.1046 18 20 17.1046 20 16L20 10ZM4 10C4 5.5817 7.5817 2 12 2C16.4183 2 20 5.5817 20 10M18 18L18 22L11 22"/>
    </svg>
  )
}
