import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextAlignTop({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2H18C20.209 2 22 3.791 22 6V18C22 20.209 20.209 22 18 22H6C3.791 22 2 20.209 2 18V6C2 3.791 3.791 2 6 2H12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 6H17C17.552 6 18 6.448 18 7C18 7.552 17.552 8 17 8H7C6.448 8 6 7.552 6 7C6 6.448 6.448 6 7 6ZM7 10H13C13.552 10 14 10.448 14 11C14 11.552 13.552 12 13 12H7C6.448 12 6 11.552 6 11C6 10.448 6.448 10 7 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
