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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 11L3 6C3 3.2386 5.2386 1 8 1L16 1C18.7614 1 21 3.2386 21 6L21 11L22 11C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13L21 13L21 20C21 20.5523 20.5523 21 20 21L12 21L4 21C3.4477 21 3 20.5523 3 20L3 13L2 13C1.4477 13 1 12.5523 1 12C1 11.4477 1.4477 11 2 11Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M5 7L11 7L11 11L5 11ZM13 7L19 7L19 11L13 11ZM6 19L8 19C8.5523 19 9 19.4477 9 20L9 21C9 22.1046 8.1046 23 7 23L5 23C3.8954 23 3 22.1046 3 21L3 20C3 19.4477 3.4477 19 4 19ZM18 19L20 19C20.5523 19 21 19.4477 21 20L21 21C21 22.1046 20.1046 23 19 23L17 23C15.8954 23 15 22.1046 15 21L15 20C15 19.4477 15.4477 19 16 19Z" fill="currentColor"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16ZM17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor"/>
    </svg>
  )
}
