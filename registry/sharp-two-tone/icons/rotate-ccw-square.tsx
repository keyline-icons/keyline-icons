import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCcwSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M15 10C15.552 10 16 10.45 16 11V22C16 22.55 15.552 23 15 23H4C3.448 23 3 22.55 3 22V11C3 10.45 3.448 10 4 10H15ZM15.372 2.46L14.528 3.25H20C20.552 3.25 21 3.7 21 4.25V10H19V5.25H14.529L15.4 6.07L14.032 7.53L11.316 4.98C11.115 4.79 11 4.53 11 4.25C11 3.97 11.115 3.71 11.316 3.52L14.005 1L15.372 2.46Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.688 1.73L12 4.25L14.716 6.8M12 4.25H20V10M15 22V11H4V22H15Z"/>
    </svg>
  )
}
