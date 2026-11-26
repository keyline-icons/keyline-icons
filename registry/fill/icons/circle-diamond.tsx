import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleDiamond({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM10.5858 6.5858L6.5858 10.5858C5.8047 11.3668 5.8047 12.6332 6.5858 13.4142L10.5858 17.4142C11.3668 18.1953 12.6332 18.1953 13.4142 17.4142L17.4142 13.4142C18.1953 12.6332 18.1953 11.3668 17.4142 10.5858L13.4142 6.5858C12.6332 5.8047 11.3668 5.8047 10.5858 6.5858Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
