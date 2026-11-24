import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShipWheel({ size = 24, ...props }: IconProps) {
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
      <path d="M17.6569 17.6569C16.2102 19.1035 14.2089 20 12 20C7.5817 20 4 16.4183 4 12C4 7.5817 7.5817 4 12 4C16.4183 4 20 7.5817 20 12C20 14.2089 19.1035 16.2102 17.6569 17.6569Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 12C19 15.866 15.866 19 12 19C8.134 19 5 15.866 5 12C5 8.134 8.134 5 12 5C15.866 5 19 8.134 19 12ZM12 1L12 2L12 22L12 23M21.5 6.5151L21 6.8038L3 17.1962L2.5 17.4849M21.5 17.4849L21 17.1962L3 6.8038L2.5 6.5151"/>
    </svg>
  )
}
