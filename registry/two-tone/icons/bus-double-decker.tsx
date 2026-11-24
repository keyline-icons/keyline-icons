import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BusDoubleDecker({ size = 24, ...props }: IconProps) {
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
      <path d="M15 21L12 21L9 21C9 22.1046 8.1046 23 7 23L5 23C3.8954 23 3 22.1046 3 21L3 20L3 13L2 13C1.4477 13 1 12.5523 1 12C1 11.4477 1.4477 11 2 11L3 11L3 6C3 3.2386 5.2386 1 8 1L16 1C18.7614 1 21 3.2386 21 6L21 11L22 11C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13L21 13L21 20L21 21C21 22.1046 20.1046 23 19 23L17 23C15.8954 23 15 22.1046 15 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 20L4 6C4 3.7909 5.7909 2 8 2L16 2C18.2091 2 20 3.7909 20 6L20 20ZM4 6L20 6M2 12L22 12M12 6L12 12M4 20L4 21C4 21.5523 4.4477 22 5 22L7 22C7.5523 22 8 21.5523 8 21L8 20M16 20L16 21C16 21.5523 16.4477 22 17 22L19 22C19.5523 22 20 21.5523 20 21L20 20"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16ZM17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
