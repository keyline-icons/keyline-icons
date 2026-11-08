import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Fuel({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2C14.552 2 15 2.45 15 3V10H18C18.552 10 19 10.45 19 11V16.06C19.055 16.56 19.485 17 20 17C20.515 17 20.945 16.55 21 16.05V8.5L16.999 5.5L18.2 3.9L22.6 7.2C22.851 7.39 23 7.69 23 8V16.01L22.984 16.31C22.827 17.81 21.551 19 20 19C18.449 19 17.172 17.81 17.015 16.3L17 16.01V12H15V20H16V22H1V20H2V3C2 2.45 2.448 2 3 2H14ZM6 8V10H11V8H6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
