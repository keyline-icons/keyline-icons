import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeySquare({ size = 24, ...props }: IconProps) {
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
      <path d="M5.2929 13.7929L1.5858 17.5C1.2107 17.8751 1 18.3838 1 18.9142L1 20C1 21.6569 2.3431 23 4 23L5.0858 23C5.6162 23 6.1249 22.7893 6.5 22.4142L7.4142 21.5L9 21.5C9.8284 21.5 10.5 20.8284 10.5 20L10.5 19L11.5 19C12.3284 19 13 18.3284 13 17.5L13 15.9142L13.9142 15L19 15C21.2091 15 23 13.2091 23 11L23 5C23 2.7909 21.2091 1 19 1L13 1C10.7909 1 9 2.7909 9 5L9 10.0858L5.2929 13.7929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 9L17 7"/>
    </svg>
  )
}
