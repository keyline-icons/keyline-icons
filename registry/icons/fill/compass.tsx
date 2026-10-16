import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Compass({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM14.786405 6.683772C16.349921 6.1626 17.8374 7.650079 17.316228 9.213595L15.764911 13.867544C15.466306 14.763359 14.763359 15.466306 13.867544 15.764911L9.213595 17.316228C7.650079 17.8374 6.1626 16.349921 6.683772 14.786405L8.235089 10.132456C8.533694 9.236641 9.236641 8.533694 10.132456 8.235089Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
