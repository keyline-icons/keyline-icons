import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiceD4({ size = 24, ...props }: IconProps) {
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
      <path d="M6.1268 11.5145L1.1278 20.5144C1.0453 20.663 1.002 20.8301 1.002 21C1.002 21.5523 1.4497 22 2.002 22L21.998 22C22.5503 22 22.998 21.5523 22.998 21C22.998 20.8301 22.9547 20.663 22.8722 20.5144L12.8742 2.5145C12.6978 2.197 12.3632 2.0001 12 2.0001C11.6368 2.0001 11.3022 2.197 11.1258 2.5145Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3.0001L2.002 21L21.998 21ZM12 3L12 14M3.0104 19.1834L12 14L20.9896 19.1834"/>
    </svg>
  )
}
