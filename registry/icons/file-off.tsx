import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 14.3431L20 8L14 2L8 2C7.889 2 7.779 2.0045 7.6703 2.0134M4.3535 4.3535C4.1264 4.8556 4 5.4131 4 6L4 18C4 20.2091 5.7909 22 8 22L16 22C17.6222 22 19.0188 21.0343 19.6465 19.6465M14 2L14 5C14 6.6569 15.3431 8 17 8L20 8M2 2L22 22"/>
    </svg>
  )
}
