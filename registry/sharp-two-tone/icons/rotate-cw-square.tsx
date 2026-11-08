import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCwSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M20 10C20.552 10 21 10.45 21 11V22C21 22.55 20.552 23 20 23H9C8.448 23 8 22.55 8 22V11C8 10.45 8.448 10 9 10H20ZM12.684 3.52C12.885 3.71 13 3.97 13 4.25C13 4.53 12.885 4.79 12.684 4.98L9.968 7.53L8.6 6.07L9.471 5.25H5V10H3V4.25C3 3.7 3.448 3.25 4 3.25H9.472L8.628 2.46L9.995 1L12.684 3.52Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9.312 1.73L12 4.25L9.284 6.8M12 4.25H4V10M9 22V11H20V22H9Z"/>
    </svg>
  )
}
