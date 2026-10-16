import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileCode({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L20.7071 7.2929C20.8946 7.4804 21 7.7348 21 8L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1L14 1ZM14 8L18.5858 8L14 3.4142L14 8ZM11.1289 12.1094L9.4648 11L7.1679 14.4453C7.0584 14.6096 7 14.8026 7 15C7 15.1974 7.0584 15.3904 7.1679 15.5547L9.4648 19L11.1289 17.8906L9.2019 15L11.1289 12.1094ZM14.5352 11L12.8711 12.1094L14.7981 15L12.8711 17.8906L14.5352 19L16.8321 15.5547C16.9416 15.3904 17 15.1974 17 15C17 14.8026 16.9416 14.6096 16.8321 14.4453L14.5352 11Z" fill="currentColor"/>
    </svg>
  )
}
