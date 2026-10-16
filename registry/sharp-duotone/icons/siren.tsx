import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Siren({ size = 24, ...props }: IconProps) {
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
      <path d="M6 16L6 13C6 9.6863 8.6863 7 12 7C15.3137 7 18 9.6863 18 13L18 16L20 16C20.5523 16 21 16.4477 21 17L21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 17C3 16.4477 3.4477 16 4 16L6 16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 16L6 13C6 9.6863 8.6863 7 12 7C15.3137 7 18 9.6863 18 13L18 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5.9289 6.9289L4.636 5.636M12 5L12 2M18.0711 6.9289L19.364 5.636"/>
    </svg>
  )
}
