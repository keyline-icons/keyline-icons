import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M18 4C20.7614 4 23 6.23858 23 9V15C23 17.7614 20.7614 20 18 20H6C3.23858 20 1 17.7614 1 15V9C1 6.23858 3.23858 4 6 4H18ZM6 9.5C5.44772 9.5 5 9.94772 5 10.5V13.5C5 14.0523 5.44772 14.5 6 14.5C6.55228 14.5 7 14.0523 7 13.5V10.5C7 9.94772 6.55228 9.5 6 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
