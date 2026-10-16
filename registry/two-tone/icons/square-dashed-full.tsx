import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareDashedFull({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.34315 4.34315 3 6 3M10.5 3H13.5M18 3C19.6569 3 21 4.34315 21 6M21 10.5V13.5M21 18C21 19.6569 19.6569 21 18 21M13.5 21H10.5M6 21C4.34315 21 3 19.6569 3 18M3 13.5V10.5" strokeOpacity="0.4"/>
      <path d="M8.5 6L15.5 6C16.8807 6 18 7.1193 18 8.5L18 15.5C18 16.8807 16.8807 18 15.5 18L8.5 18C7.1193 18 6 16.8807 6 15.5L6 8.5C6 7.1193 7.1193 6 8.5 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
