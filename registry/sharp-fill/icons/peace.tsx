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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM13 14.4142L17.6569 19.0711L19.0711 17.6569L13 11.5858L13 3L11 3L11 11.5858L4.9289 17.6569L6.3431 19.0711L11 14.4142L11 21L13 21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
