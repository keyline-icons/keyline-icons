import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserVoice({ size = 24, ...props }: IconProps) {
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
      <path d="M8 12L10 12C13.7279 12 17 15.2721 17 19L17 21C17 21.5523 16.5523 22 16 22L2 22C1.4477 22 1 21.5523 1 21L1 19C1 15.2721 4.2721 12 8 12ZM9 2C11.0711 2 13 3.9289 13 6C13 8.0711 11.0711 10 9 10C6.9289 10 5 8.0711 5 6C5 3.9289 6.9289 2 9 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.2496 2.3333L17.4853 3C17.8259 3.9635 18 4.978 18 6C18 7.022 17.8259 8.0365 17.4853 9L17.2496 9.6667M21.4667 2.2308L21.6491 3C21.8822 3.983 22 4.9898 22 6C22 8.282 21.3993 10.5238 20.2583 12.5L19.9697 13"/>
    </svg>
  )
}
