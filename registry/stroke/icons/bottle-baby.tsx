import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleBaby({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 6C9.5 4.5 10.5 5 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5C13.5 5 14.5 4.5 14.5 6M17 18V19C17 20.6569 15.6569 22 14 22H10C8.3431 22 7 20.6569 7 19V13.1803C7 12.4041 7.18073 11.6385 7.52786 10.9443L8 10M17 18V14M17 18H14M17 14V13.1803C17 12.4041 16.8193 11.6385 16.4721 10.9443L16 10M17 14H14M8 10V8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V10M8 10H16"/>
    </svg>
  )
}
