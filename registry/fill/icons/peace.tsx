import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Peace({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM13 14.4142L16.9498 18.364C17.3403 18.7545 17.9735 18.7545 18.364 18.364C18.7545 17.9735 18.7545 17.3403 18.364 16.9498L13 11.5858L13 4C13 3.4477 12.5523 3 12 3C11.4477 3 11 3.4477 11 4L11 11.5858L5.636 16.9498C5.2455 17.3403 5.2455 17.9735 5.636 18.364C6.0265 18.7545 6.6597 18.7545 7.0502 18.364L11 14.4142L11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
