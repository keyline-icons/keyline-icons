import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Smartphone({ size = 24, ...props }: IconProps) {
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
      <path d="M15 1C17.7614 1 20 3.23858 20 6V18C20 20.7614 17.7614 23 15 23H9C6.23858 23 4 20.7614 4 18V6C4 3.23858 6.23858 1 9 1H15ZM10.5 5C9.94772 5 9.5 5.44772 9.5 6C9.5 6.55228 9.94772 7 10.5 7H13.5C14.0523 7 14.5 6.55228 14.5 6C14.5 5.44772 14.0523 5 13.5 5H10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
