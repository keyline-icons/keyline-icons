import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Slider({ size = 24, ...props }: IconProps) {
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
      <path d="M12 17V19H1V17H12ZM23 17V19H20V17H23ZM10 2C10.552 2 11 2.45 11 3V11C11 11.55 10.552 12 10 12H2C1.448 12 1 11.55 1 11V3C1 2.45 1.448 2 2 2H10Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18 2C20.761 2 23 4.24 23 7C23 9.76 20.761 12 18 12C15.239 12 13 9.76 13 7C13 4.24 15.239 2 18 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17 14C19.209 14 21 15.79 21 18C21 20.21 19.209 22 17 22H15C12.791 22 11 20.21 11 18C11 15.79 12.791 14 15 14H17Z" fill="currentColor"/>
    </svg>
  )
}
