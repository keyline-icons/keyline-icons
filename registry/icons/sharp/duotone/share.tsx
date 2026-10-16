import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Share({ size = 24, ...props }: IconProps) {
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
      <path d="M8.5913 10.4884L15.4087 6.5116M8.5913 13.5116L15.4087 17.4884" strokeOpacity="0.4"/>
      <path d="M22 5C22 7.0711 20.0711 9 18 9C15.9289 9 14 7.0711 14 5C14 2.9289 15.9289 1 18 1C20.0711 1 22 2.9289 22 5ZM10 12C10 14.0711 8.0711 16 6 16C3.9289 16 2 14.0711 2 12C2 9.9289 3.9289 8 6 8C8.0711 8 10 9.9289 10 12ZM22 19C22 21.0711 20.0711 23 18 23C15.9289 23 14 21.0711 14 19C14 16.9289 15.9289 15 18 15C20.0711 15 22 16.9289 22 19Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
