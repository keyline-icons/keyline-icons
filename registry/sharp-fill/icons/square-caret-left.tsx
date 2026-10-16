import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareCaretLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM7.0144 12.8742L16.0144 17.8742C16.6809 18.2445 17.5 17.7625 17.5 17L17.5 7C17.5 6.2375 16.6809 5.7555 16.0144 6.1258L7.0144 11.1258C6.3285 11.5068 6.3285 12.4932 7.0144 12.8742Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
