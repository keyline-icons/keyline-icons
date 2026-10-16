import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPinPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M11.2546 22.2847L5.0372 15.3333C3.7253 13.8666 3 11.9678 3 10C3 5.5817 6.5817 2 11 2C15.4183 2 19 5.5817 19 10C19 10.6747 18.9146 11.3467 18.746 12L18.496 12.9683M14 10C14 11.6569 12.6569 13 11 13C9.3431 13 8 11.6569 8 10C8 8.3431 9.3431 7 11 7C12.6569 7 14 8.3431 14 10ZM18 15L18 23M14 19L22 19"/>
    </svg>
  )
}
