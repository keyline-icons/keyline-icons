import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VolumeMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M2 10C2 9.447715 2.447715 9 3 9L5.477658 9C5.804909 9 6.111453 8.839879 6.298408 8.571288L9.17925 4.432477C9.738582 3.628903 11 4.024692 11 5.003764L11 18.996236C11 19.975308 9.738582 20.371097 9.17925 19.567523L6.298408 15.428712C6.111453 15.160121 5.804909 15 5.477658 15L3 15C2.447715 15 2 14.552285 2 14ZM16 12H22"/>
    </svg>
  )
}
