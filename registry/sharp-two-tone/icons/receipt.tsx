import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Receipt({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C20.5523 1 21 1.4477 21 2L21 20C21 20.3788 20.786 20.725 20.4472 20.8944L16.4472 22.8944C16.1657 23.0352 15.8343 23.0352 15.5528 22.8944L12 21.118L8.4472 22.8944C8.1657 23.0352 7.8343 23.0352 7.5528 22.8944L3.5528 20.8944C3.214 20.725 3 20.3788 3 20L3 2C3 1.4477 3.4477 1 4 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 9L13 9M7 13L17 13M4 2L20 2L20 20L16 22L12 20L8 22L4 20L4 2Z"/>
    </svg>
  )
}
