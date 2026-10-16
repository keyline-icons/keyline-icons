import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Anchor({ size = 24, ...props }: IconProps) {
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
      <path d="M16 5C16 7.2091 14.2091 9 12 9C9.7909 9 8 7.2091 8 5C8 2.7909 9.7909 1 12 1C14.2091 1 16 2.7909 16 5Z" fill="currentColor" stroke="none"/>
      <path d="M12 8L12 22M5.9377 12.9377L4 12.9377C3.4477 12.9377 3 13.3854 3 13.9377C3 13.9792 3.0025 14.0206 3.0077 14.0617C3.5746 18.5968 7.4297 22 12 22C16.5703 22 20.4254 18.5968 20.9923 14.0617C20.9975 14.0206 21 13.9792 21 13.9377C21 13.3854 20.5523 12.9377 20 12.9377L18.0623 12.9377" fill="none"/>
    </svg>
  )
}
