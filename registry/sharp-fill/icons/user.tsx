import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function User({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C14.071 2 16 3.929 16 6C16 8.071 14.071 10 12 10C9.929 10 8 8.071 8 6C8 3.929 9.929 2 12 2ZM11 12H13C16.728 12 20 15.272 20 19V21C20 21.552 19.552 22 19 22H5C4.448 22 4 21.552 4 21V19C4 15.272 7.272 12 11 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
