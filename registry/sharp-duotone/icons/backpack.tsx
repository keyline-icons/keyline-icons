import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Backpack({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C14.17 1 15.939 2.845 16 5H20C20.552 5 21 5.448 21 6V22C21 22.552 20.552 23 20 23H4C3.448 23 3 22.552 3 22V6C3 5.448 3.448 5 4 5H8C8.061 2.845 9.83 1 12 1ZM12 3C10.938 3 10.064 3.955 9.998 5H14.002C13.936 3.955 13.062 3 12 3Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M21 14V16H9V19H7V16H3V14H21ZM15 9V11H9V9H15Z" fill="currentColor"/>
    </svg>
  )
}
