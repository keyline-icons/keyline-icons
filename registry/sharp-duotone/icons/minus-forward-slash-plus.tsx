import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MinusForwardSlashPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M20.118 2.15L5.521 23L3.883 21.85L18.48 1L20.118 2.15Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18.999 17H23V19H18.999L18.997 23L16.997 23L16.999 19H13V17H16.999L17 13H19L18.999 17ZM11 7H1V5H11V7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
