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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 5C3 2.79086 4.79086 1 7 1H17C19.2091 1 21 2.79086 21 5V20C21 20.3788 20.786 20.725 20.4472 20.8944L16.4472 22.8944C16.1657 23.0352 15.8343 23.0352 15.5528 22.8944L12 21.118L8.44721 22.8944C8.16569 23.0352 7.83431 23.0352 7.55279 22.8944L3.55279 20.8944C3.214 20.725 3 20.3788 3 20V5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 9H12M8 13H16M4 5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V20L16 22L12 20L8 22L4 20V5Z"/>
    </svg>
  )
}
