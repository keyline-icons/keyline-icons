import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Map({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5528 5.1056L8.5528 2.1056C8.8343 1.9648 9.1657 1.9648 9.4472 2.1056L15 4.882L20.5528 2.1056C21.2177 1.7731 22 2.2566 22 3L22 18C22 18.3788 21.786 18.725 21.4472 18.8944L15.4472 21.8944C15.1657 22.0352 14.8343 22.0352 14.5528 21.8944L9 19.118L3.4472 21.8944C2.7823 22.2269 2 21.7434 2 21L2 6C2 5.6212 2.214 5.275 2.5528 5.1056Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8 2.382L8.5528 2.1056C8.8343 1.9648 9.1657 1.9648 9.4472 2.1056L15 4.882L16 4.382L16 21.618L15.4472 21.8944C15.1657 22.0352 14.8343 22.0352 14.5528 21.8944L9 19.118L8 19.618Z" fill="currentColor"/>
    </svg>
  )
}
