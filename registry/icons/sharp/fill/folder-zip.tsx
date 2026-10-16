import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderZip({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L9.5 3C9.7652 3 10.0196 3.1054 10.2071 3.2929L12.4142 5.5L21 5.5C21.5523 5.5 22 5.9477 22 6.5L22 20C22 20.5523 21.5523 21 21 21L3 21C2.4477 21 2 20.5523 2 20L2 4C2 3.4477 2.4477 3 3 3ZM8 5L8 7L10 7L10 5.9142L9.0858 5L8 5ZM8 11.1716C6.8014 11.5954 6 12.7287 6 14C6 15.6569 7.3431 17 9 17C10.6569 17 12 15.6569 12 14C12 12.7287 11.1986 11.5954 10 11.1716L10 9L8 9ZM10 14C10 14.5523 9.5523 15 9 15C8.4477 15 8 14.5523 8 14C8 13.4477 8.4477 13 9 13C9.5523 13 10 13.4477 10 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
