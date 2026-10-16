import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomeSimple({ size = 24, ...props }: IconProps) {
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
      <path d="M10.0605 2.70727C11.1795 1.75931 12.8205 1.75931 13.9395 2.70727L20.9395 8.63794L21.0615 8.74829C21.6586 9.31317 22 10.1004 22 10.927V19.0002C21.9999 20.657 20.6568 22.0002 19 22.0002H5C3.34318 22.0002 2.00011 20.657 2 19.0002V10.927C2.00002 10.0454 2.38775 9.20795 3.06055 8.63794L10.0605 2.70727Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20.2928 9.4009L13.2928 3.4703C12.5468 2.8383 11.4532 2.8383 10.7072 3.4703L3.7072 9.4009C3.2586 9.7809 3 10.339 3 10.9268L3 19C3 20.1046 3.8954 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 10.9268C21 10.339 20.7414 9.7809 20.2928 9.4009Z"/>
    </svg>
  )
}
