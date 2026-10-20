import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WeightTilde({ size = 24, ...props }: IconProps) {
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
      <path d="M8.3336 9L15.6664 9C16.4739 9 17.2022 9.4856 17.5127 10.2311L20.8442 18.2311C21.3928 19.5484 20.4249 21 18.998 21L5.002 21C3.5751 21 2.6072 19.5484 3.1558 18.2311L6.4873 10.2311C6.7978 9.4856 7.5261 9 8.3336 9ZM15 6C15 7.6569 13.6569 9 12 9C10.3431 9 9 7.6569 9 6C9 4.3431 10.3431 3 12 3C13.6569 3 15 4.3431 15 6ZM8.99 15.7982C9.222 14.9146 9.6752 14.3293 10.244 14.1784C10.8128 14.0276 11.4474 14.3245 12 15C12.5526 15.6755 13.1872 15.9724 13.756 15.8216C14.3248 15.6707 14.778 15.0854 15.01 14.2018" fill="none"/>
    </svg>
  )
}
