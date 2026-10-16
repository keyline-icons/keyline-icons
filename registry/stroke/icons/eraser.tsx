import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Eraser({ size = 24, ...props }: IconProps) {
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
      <path d="M17.1716 3.5858L21.4142 7.8284C22.1952 8.6095 22.1952 9.8758 21.4142 10.6569L11.0711 21L5.4142 21L2.5858 18.1716C1.8047 17.3905 1.8047 16.1242 2.5858 15.3431L14.3431 3.5858C15.1242 2.8047 16.3905 2.8047 17.1716 3.5858ZM8 9.9289L15.0711 17M8.2427 21L22 21" fill="none"/>
    </svg>
  )
}
