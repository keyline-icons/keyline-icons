import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bomb({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5858 10.5858L12.9497 8.2218C13.1372 8.0342 13.3916 7.9289 13.6569 7.9289C13.9221 7.9289 14.1765 8.0342 14.364 8.2218L15.7782 9.636C15.9658 9.8235 16.0711 10.0779 16.0711 10.3432C16.0711 10.6084 15.9658 10.8628 15.7782 11.0503L13.4142 13.4142M15.0711 8.9289L16.6874 7.3126M15.6521 3.4489L15.2639 2M19.5158 4.4842L20.5765 3.4235M20.5511 8.3479L22 8.7361M14 16C14 19.3137 11.3137 22 8 22C4.6863 22 2 19.3137 2 16C2 12.6863 4.6863 10 8 10C11.3137 10 14 12.6863 14 16Z"/>
    </svg>
  )
}
